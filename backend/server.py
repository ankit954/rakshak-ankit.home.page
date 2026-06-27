from fastapi import FastAPI, APIRouter, HTTPException, Header, Depends
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

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Configure logging early so route handlers can reference `logger`
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# --------- Models ---------
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
    role: str = Field(default="customer", max_length=32)  # customer | guard
    source: Optional[str] = Field(default=None, max_length=64)  # hero | cta | etc.


class WaitlistEntry(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    city: Optional[str] = None
    role: str = "customer"
    source: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# --------- Admin token guard ---------
async def require_admin(x_admin_token: Optional[str] = Header(default=None)):
    expected = os.environ.get('ADMIN_TOKEN')
    if not expected:
        raise HTTPException(status_code=503, detail="Admin disabled (no token configured)")
    if not x_admin_token or x_admin_token != expected:
        raise HTTPException(status_code=401, detail="Invalid admin token")
    return True


# --------- Public routes ---------
@api_router.get("/")
async def root():
    return {"message": "RAKSHAK API"}


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
        logger.error(f"contact insert failed: {exc}")
        raise HTTPException(status_code=500, detail="Failed to save submission")
    return submission


@api_router.post("/waitlist", response_model=WaitlistEntry)
async def create_waitlist(payload: WaitlistCreate):
    # Idempotent on (email, role) — upsert keeps the original created_at
    entry = WaitlistEntry(**payload.model_dump())
    existing = await db.waitlist_signups.find_one(
        {"email": entry.email, "role": entry.role}, {"_id": 0}
    )
    if existing:
        if isinstance(existing.get('created_at'), str):
            existing['created_at'] = datetime.fromisoformat(existing['created_at'])
        return WaitlistEntry(**existing)
    doc = entry.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    try:
        await db.waitlist_signups.insert_one(doc)
    except Exception as exc:
        logger.error(f"waitlist insert failed: {exc}")
        raise HTTPException(status_code=500, detail="Failed to save signup")
    return entry


# --------- Admin (token-gated) routes ---------
@api_router.get(
    "/admin/contacts",
    response_model=List[ContactSubmission],
    dependencies=[Depends(require_admin)],
)
async def admin_list_contacts(limit: int = 200):
    items = (
        await db.contact_submissions.find({}, {"_id": 0})
        .sort("created_at", -1)
        .to_list(limit)
    )
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items


@api_router.get(
    "/admin/waitlist",
    response_model=List[WaitlistEntry],
    dependencies=[Depends(require_admin)],
)
async def admin_list_waitlist(limit: int = 500):
    items = (
        await db.waitlist_signups.find({}, {"_id": 0})
        .sort("created_at", -1)
        .to_list(limit)
    )
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items


@api_router.get("/admin/check", dependencies=[Depends(require_admin)])
async def admin_check():
    return {"ok": True}


# Keep the legacy unauthenticated GET /api/contact alias OFF — admin only now.
# Mount the router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
