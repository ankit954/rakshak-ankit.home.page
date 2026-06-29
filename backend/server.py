from fastapi import FastAPI, APIRouter, HTTPException, Header, Depends, Request, Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging EARLY so all modules can log
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]


def get_db():
    return db


# Local imports (after env + db are ready)
from auth import (  # noqa: E402
    AdminLoginIn,
    AdminLoginOut,
    AdminPublic,
    COOKIE_NAME,
    login_endpoint,
    logout_endpoint,
    make_require_admin,
    seed_admin,
)
from admin_modules import make_router as make_admin_modules_router  # noqa: E402

require_admin = make_require_admin(get_db)

app = FastAPI(title="RAKSHAK API")

# ---------------- Public API ----------------
api_router = APIRouter(prefix="/api")


class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=32)
    topic: str = Field(default="booking", max_length=64)
    message: str = Field(min_length=1, max_length=4000)


class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    topic: str = "booking"
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class WaitlistCreate(BaseModel):
    email: EmailStr
    city: Optional[str] = Field(default=None, max_length=64)
    role: str = Field(default="customer", max_length=32)
    source: Optional[str] = Field(default=None, max_length=64)


class WaitlistEntry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    city: Optional[str] = None
    role: str = "customer"
    source: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


@api_router.get("/")
async def root():
    return {"message": "RAKSHAK API"}


@api_router.get("/health")
async def health():
    try:
        await db.command("ping")
        return {"ok": True, "db": "connected"}
    except Exception as exc:
        return {"ok": False, "db": "unreachable", "error": type(exc).__name__}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(payload: StatusCheckCreate):
    obj = StatusCheck(**payload.model_dump())
    doc = obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    items = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for it in items:
        if isinstance(it.get('timestamp'), str):
            it['timestamp'] = datetime.fromisoformat(it['timestamp'])
    return items


@api_router.post("/contact", response_model=ContactSubmission)
async def create_contact(payload: ContactCreate):
    submission = ContactSubmission(**payload.model_dump())
    doc = submission.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    try:
        await db.contact_submissions.insert_one(doc)
    except Exception as exc:
        logger.error("contact insert failed: %s", exc)
        raise HTTPException(status_code=500, detail="Failed to save submission")
    return submission


@api_router.post("/waitlist", response_model=WaitlistEntry)
async def create_waitlist(payload: WaitlistCreate):
    entry = WaitlistEntry(**payload.model_dump())
    try:
        existing = await db.waitlist_signups.find_one(
            {"email": entry.email, "role": entry.role}, {"_id": 0}
        )
    except Exception as exc:
        logger.error("waitlist read failed: %s", exc)
        raise HTTPException(status_code=503, detail="Database temporarily unreachable.")
    if existing:
        if isinstance(existing.get('created_at'), str):
            existing['created_at'] = datetime.fromisoformat(existing['created_at'])
        return WaitlistEntry(**existing)
    doc = entry.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    try:
        await db.waitlist_signups.insert_one(doc)
    except Exception as exc:
        logger.error("waitlist insert failed: %s", exc)
        raise HTTPException(status_code=500, detail="Failed to save signup")
    return entry


# ---------------- Admin auth ----------------
admin_auth_router = APIRouter(prefix="/api/admin/auth", tags=["admin-auth"])


@admin_auth_router.post("/login", response_model=AdminLoginOut)
async def admin_login(payload: AdminLoginIn, request: Request, response: Response):
    return await login_endpoint(db, payload, request, response)


@admin_auth_router.post("/logout")
async def admin_logout(response: Response):
    return await logout_endpoint(response)


@admin_auth_router.get("/me", response_model=AdminPublic)
async def admin_me(admin: dict = Depends(require_admin)):
    return AdminPublic(**admin)


# ---------------- Mount everything ----------------
app.include_router(api_router)
app.include_router(admin_auth_router)
app.include_router(make_admin_modules_router(get_db, require_admin))


# ---------------- CORS ----------------
origins_raw = os.environ.get('CORS_ORIGINS', '*')
allow_origins = [o.strip() for o in origins_raw.split(',') if o.strip()]
allow_credentials = True
if allow_origins == ['*']:
    # browsers reject credentials + wildcard; downgrade gracefully
    allow_credentials = False
app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=allow_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_origin_regex=r"https://.*\.therakshak\.in|https://.*\.preview\.emergentagent\.com|https://.*\.emergent\.host",
)


@app.on_event("startup")
async def on_startup():
    # Run admin seeding in the background so Atlas reachability does NOT
    # block API readiness. Health/login endpoints will surface the DB
    # status when called.
    import asyncio
    async def _bg():
        try:
            await seed_admin(db)
        except Exception as exc:
            logger.warning("background seed failed: %s", exc)
    asyncio.create_task(_bg())


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
