"""Backend tests for new RAKSHAK features:

- POST /api/waitlist (create + idempotency on (email, role) + 422 invalid email)
- Admin endpoints: GET /api/admin/check, /api/admin/contacts, /api/admin/waitlist
    * 401 with missing / wrong token
    * 200 with valid X-Admin-Token, arrays sorted by created_at desc
"""
import os
import uuid
import pytest
import requests
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parents[1] / ".env")
FRONTEND_ENV = Path(__file__).resolve().parents[2] / "frontend" / ".env"
load_dotenv(FRONTEND_ENV)

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")
API = f"{BASE_URL}/api"
ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "zeDO1FVnhoBEaiGPJNGk4pKDQ1jAl8ao")


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def admin_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json", "X-Admin-Token": ADMIN_TOKEN})
    return s


# -------------------- Waitlist --------------------
class TestWaitlist:
    def test_create_waitlist_success(self, client):
        unique = uuid.uuid4().hex[:8]
        payload = {
            "email": f"TEST_wl_{unique}@example.com",
            "city": "Delhi",
            "role": "customer",
            "source": "hero",
        }
        r = client.post(f"{API}/waitlist", json=payload)
        assert r.status_code == 200, r.text
        body = r.json()
        assert body["email"] == payload["email"]
        assert body["city"] == "Delhi"
        assert body["role"] == "customer"
        assert body["source"] == "hero"
        assert isinstance(body.get("id"), str) and len(body["id"]) > 0
        assert "created_at" in body
        assert "_id" not in body

    def test_waitlist_idempotent_on_email_role(self, client):
        unique = uuid.uuid4().hex[:8]
        email = f"TEST_idem_{unique}@example.com"
        p1 = {"email": email, "role": "customer", "city": "Mumbai", "source": "hero"}
        p2 = {"email": email, "role": "customer", "city": "Bengaluru", "source": "cta"}

        r1 = client.post(f"{API}/waitlist", json=p1)
        assert r1.status_code == 200
        id1 = r1.json()["id"]

        r2 = client.post(f"{API}/waitlist", json=p2)
        assert r2.status_code == 200
        id2 = r2.json()["id"]

        assert id1 == id2, "Same (email, role) must return same id (idempotent)"
        # Original record should be preserved (not overwritten)
        assert r2.json()["city"] == "Mumbai"
        assert r2.json()["source"] == "hero"

    def test_waitlist_different_role_creates_new(self, client):
        unique = uuid.uuid4().hex[:8]
        email = f"TEST_role_{unique}@example.com"
        r1 = client.post(f"{API}/waitlist", json={"email": email, "role": "customer"})
        r2 = client.post(f"{API}/waitlist", json={"email": email, "role": "guard"})
        assert r1.status_code == 200 and r2.status_code == 200
        assert r1.json()["id"] != r2.json()["id"]

    def test_waitlist_invalid_email_422(self, client):
        r = client.post(f"{API}/waitlist", json={"email": "not-an-email"})
        assert r.status_code == 422


# -------------------- Admin auth --------------------
class TestAdminAuth:
    @pytest.mark.parametrize("path", ["/admin/check", "/admin/contacts", "/admin/waitlist"])
    def test_missing_token_401(self, client, path):
        r = client.get(f"{API}{path}")
        assert r.status_code == 401, f"{path} without token must be 401, got {r.status_code}"

    @pytest.mark.parametrize("path", ["/admin/check", "/admin/contacts", "/admin/waitlist"])
    def test_wrong_token_401(self, client, path):
        r = client.get(
            f"{API}{path}",
            headers={"X-Admin-Token": "definitely-wrong-token"},
        )
        assert r.status_code == 401, f"{path} wrong token must be 401, got {r.status_code}"

    def test_admin_check_ok(self, admin_client):
        r = admin_client.get(f"{API}/admin/check")
        assert r.status_code == 200
        assert r.json().get("ok") is True


# -------------------- Admin data endpoints --------------------
class TestAdminData:
    def test_admin_contacts_returns_sorted_desc(self, client, admin_client):
        # Seed two contacts
        for i in range(2):
            u = uuid.uuid4().hex[:6]
            client.post(
                f"{API}/contact",
                json={
                    "name": f"TEST_admin_{u}",
                    "email": f"TEST_admin_{u}@example.com",
                    "message": "admin-list test",
                },
            )
        r = admin_client.get(f"{API}/admin/contacts")
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        for it in items:
            assert "_id" not in it
            assert "id" in it
            assert "created_at" in it
        if len(items) >= 2:
            ts = [it["created_at"] for it in items]
            assert ts == sorted(ts, reverse=True), "contacts must be sorted by created_at desc"

    def test_admin_waitlist_returns_sorted_desc(self, client, admin_client):
        for i in range(2):
            u = uuid.uuid4().hex[:6]
            client.post(
                f"{API}/waitlist",
                json={"email": f"TEST_adminwl_{u}@example.com", "role": "customer"},
            )
        r = admin_client.get(f"{API}/admin/waitlist")
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        for it in items:
            assert "_id" not in it
            assert "id" in it
            assert "email" in it
        if len(items) >= 2:
            ts = [it["created_at"] for it in items]
            assert ts == sorted(ts, reverse=True), "waitlist must be sorted by created_at desc"

    def test_waitlist_persists_through_admin_listing(self, client, admin_client):
        """End-to-end: POST /waitlist then verify it appears in admin listing."""
        unique = uuid.uuid4().hex[:8]
        email = f"TEST_e2e_{unique}@example.com"
        r = client.post(
            f"{API}/waitlist",
            json={"email": email, "city": "Noida", "role": "customer", "source": "hero"},
        )
        assert r.status_code == 200
        created_id = r.json()["id"]

        r2 = admin_client.get(f"{API}/admin/waitlist")
        assert r2.status_code == 200
        ids = [it["id"] for it in r2.json()]
        assert created_id in ids
