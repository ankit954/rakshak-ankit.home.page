"""Backend tests for RAKSHAK marketing site API.

Covers:
- root health
- POST /api/contact (valid + invalid payload validation)
NOTE: Previously this file tested GET /api/contact (now removed — admin-only).
Listing is now covered in test_admin_api.py via /api/admin/contacts.
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


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


class TestHealth:
    def test_root(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        assert r.json().get("message") == "RAKSHAK API"


class TestContact:
    def test_create_contact_success(self, client):
        unique = uuid.uuid4().hex[:8]
        payload = {
            "name": f"TEST_User_{unique}",
            "email": f"test_{unique}@example.com",
            "phone": "+919999999999",
            "topic": "booking",
            "message": "Hello, this is an automated test submission.",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        body = r.json()
        assert body["name"] == payload["name"]
        assert body["email"] == payload["email"]
        assert isinstance(body.get("id"), str) and len(body["id"]) > 0
        assert "created_at" in body
        assert "_id" not in body

    def test_create_contact_invalid_email_422(self, client):
        payload = {"name": "TEST_Bad", "email": "not-an-email", "message": "hi"}
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 422

    def test_create_contact_missing_required_422(self, client):
        r = client.post(f"{API}/contact", json={"email": "a@b.com"})
        assert r.status_code == 422

    def test_legacy_public_get_contact_removed(self, client):
        """GET /api/contact must NOT be exposed publicly anymore."""
        r = client.get(f"{API}/contact")
        # FastAPI returns 405 (method not allowed) when route doesn't exist for that verb,
        # or 404 if the path no longer exists.
        assert r.status_code in (404, 405), (
            f"Public GET /api/contact should be removed but got {r.status_code}"
        )
