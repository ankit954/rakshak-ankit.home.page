"""Tests for the RAKSHAK marketing site API.

Runs fully in-process against an in-memory stand-in for MongoDB, so it never
touches a real database or a deployed server.
"""
import os
import uuid

import pytest

os.environ.setdefault("MONGO_URL", "mongodb://127.0.0.1:27017")
os.environ.setdefault("DB_NAME", "rakshak_landing_test")

from fastapi.testclient import TestClient  # noqa: E402

import server  # noqa: E402


class FakeCollection:
    def __init__(self):
        self.docs = []

    async def insert_one(self, doc):
        self.docs.append(dict(doc))

    async def find_one(self, query, projection=None):
        for d in self.docs:
            if all(d.get(k) == v for k, v in query.items()):
                return dict(d)
        return None


class FakeDB:
    def __init__(self):
        self.contact_submissions = FakeCollection()
        self.waitlist_signups = FakeCollection()

    async def command(self, name):
        return {"ok": 1}


@pytest.fixture()
def fake_db(monkeypatch):
    fake = FakeDB()
    monkeypatch.setattr(server, "db", fake)
    return fake


@pytest.fixture()
def client(fake_db):
    return TestClient(server.app)


class TestHealth:
    def test_root(self, client):
        r = client.get("/api/")
        assert r.status_code == 200
        assert r.json().get("message") == "RAKSHAK API"

    def test_health(self, client):
        r = client.get("/api/health")
        assert r.status_code == 200
        assert r.json() == {"ok": True, "db": "connected"}


class TestContact:
    def test_create_contact_success(self, client, fake_db):
        unique = uuid.uuid4().hex[:8]
        payload = {
            "name": f"TEST_User_{unique}",
            "email": f"test_{unique}@example.com",
            "phone": "+919999999999",
            "topic": "booking",
            "message": "Hello, this is an automated test submission.",
        }
        r = client.post("/api/contact", json=payload)
        assert r.status_code == 200, r.text
        body = r.json()
        assert body["name"] == payload["name"]
        assert body["email"] == payload["email"]
        assert isinstance(body.get("id"), str) and len(body["id"]) > 0
        assert "created_at" in body
        assert "_id" not in body
        assert len(fake_db.contact_submissions.docs) == 1

    def test_create_contact_invalid_email_422(self, client, fake_db):
        payload = {"name": "TEST_Bad", "email": "not-an-email", "message": "hi"}
        r = client.post("/api/contact", json=payload)
        assert r.status_code == 422
        assert fake_db.contact_submissions.docs == []

    def test_create_contact_missing_message_422(self, client):
        r = client.post("/api/contact", json={"name": "TEST", "email": "a@example.com"})
        assert r.status_code == 422


class TestWaitlist:
    def test_signup_and_duplicate_returns_same_entry(self, client, fake_db):
        payload = {"email": "lead@example.com", "city": "Noida", "role": "customer", "source": "hero"}
        first = client.post("/api/waitlist", json=payload)
        assert first.status_code == 200, first.text
        second = client.post("/api/waitlist", json=payload)
        assert second.status_code == 200
        assert second.json()["id"] == first.json()["id"]
        assert len(fake_db.waitlist_signups.docs) == 1

    def test_invalid_email_422(self, client):
        r = client.post("/api/waitlist", json={"email": "nope"})
        assert r.status_code == 422


class TestNoAdminSurface:
    def test_admin_routes_are_gone(self, client):
        assert client.get("/api/admin/users").status_code == 404
        assert client.post("/api/admin/auth/login", json={}).status_code == 404
