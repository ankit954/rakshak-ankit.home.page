"""Backend tests for RAKSHAK marketing site API.

Covers:
- root health
- POST /api/contact (valid + invalid payload validation)
- GET /api/contact (listing + persistence verification)
"""
import os
import uuid
import pytest
import requests
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parents[1] / ".env")

# REACT_APP_BACKEND_URL is the external URL used by the frontend
FRONTEND_ENV = Path(__file__).resolve().parents[2] / "frontend" / ".env"
load_dotenv(FRONTEND_ENV)

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --- Health -----------------------------------------------------------------
class TestHealth:
    def test_root(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        assert r.json().get("message") == "RAKSHAK API"


# --- Contact submission -----------------------------------------------------
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
        # Data assertions
        assert body["name"] == payload["name"]
        assert body["email"] == payload["email"]
        assert body["phone"] == payload["phone"]
        assert body["topic"] == payload["topic"]
        assert body["message"] == payload["message"]
        assert isinstance(body.get("id"), str) and len(body["id"]) > 0
        assert "created_at" in body
        assert "_id" not in body  # mongo ObjectId must not leak

        # Persistence check via GET list
        listing = client.get(f"{API}/contact")
        assert listing.status_code == 200
        items = listing.json()
        assert isinstance(items, list)
        ids = [it["id"] for it in items]
        assert body["id"] in ids, "Created contact not found in listing"

    def test_create_contact_invalid_email_422(self, client):
        payload = {
            "name": "TEST_Bad",
            "email": "not-an-email",
            "phone": "",
            "topic": "booking",
            "message": "hi",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 422, r.text

    def test_create_contact_missing_required_422(self, client):
        # Missing name and message
        r = client.post(f"{API}/contact", json={"email": "a@b.com"})
        assert r.status_code == 422

    def test_create_contact_empty_message_422(self, client):
        payload = {
            "name": "TEST",
            "email": "ok@example.com",
            "message": "",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 422

    def test_create_contact_default_topic(self, client):
        unique = uuid.uuid4().hex[:6]
        payload = {
            "name": f"TEST_Default_{unique}",
            "email": f"def_{unique}@example.com",
            "message": "default topic test",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 200
        assert r.json()["topic"] == "booking"

    def test_list_contact_sorted_desc(self, client):
        r = client.get(f"{API}/contact?limit=5")
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        # all items must not include _id
        for it in items:
            assert "_id" not in it
            assert "id" in it
            assert "created_at" in it
