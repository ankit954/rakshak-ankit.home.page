# Admin Auth Testing Playbook (RAKSHAK)

## Endpoints (all under `/api/admin/auth`)
- `POST /api/admin/auth/login` — body `{email, password}` → returns `{access_token, admin: {...}}` + sets `access_token` cookie
- `GET  /api/admin/auth/me` — auth required → returns admin profile
- `POST /api/admin/auth/logout` — clears the cookie

## Step 1: MongoDB verification
```
mongosh "$MONGO_URL"
use rakshak
db.admin_users.find().pretty()
db.admin_users.findOne({}, {password_hash: 1})
```
Verify: bcrypt hash starts with `$2b$`; unique index on `admin_users.email`.

## Step 2: API smoke tests
```
API="$REACT_APP_BACKEND_URL"
EMAIL="admin@therakshak.in"
PW="Rakshak@Admin2025"

# Login
TOKEN=$(curl -s -c /tmp/cj.txt -X POST "$API/api/admin/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PW\"}" \
  | python3 -c "import sys,json;print(json.load(sys.stdin)['access_token'])")
echo "TOKEN=$TOKEN"

# Me via Bearer
curl -s "$API/api/admin/auth/me" -H "Authorization: Bearer $TOKEN"

# Me via cookie (cross-check)
curl -s -b /tmp/cj.txt "$API/api/admin/auth/me"

# Protected list endpoint
curl -s "$API/api/admin/bookings?limit=5" -H "Authorization: Bearer $TOKEN"
```

## Step 3: Lockout
- 5 wrong passwords in <10 min from same IP+email → 6th attempt returns 429 even with the correct password until the window expires.
