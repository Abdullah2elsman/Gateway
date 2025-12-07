# Test Trainee Level Update API

## Overview

This API updates a trainee's level. If the level name doesn't exist in `gt_generalmeta`, it creates it automatically, then assigns the level ID to the trainee.

---

## API Endpoint

```
PATCH http://localhost:8000/api/v1/dashboard/meta/waitlist-level/update
```

---

## Step-by-Step Testing Guide

### Step 1: Get Authentication Token

**Request:**

```
POST http://localhost:8000/api/v1/auth
Content-Type: application/json
```

**Body:**

```json
{
  "email": "your@email.com",
  "password": "yourpassword"
}
```

**Response:**

```json
{
  "token": "1|abc123xyz..."
}
```

**→ Copy the token for next steps**

---

### Step 2: Get a Trainee ID

**Request:**

```
PUT http://localhost:8000/api/v1/dashboard/waitlist
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json
```

**Body:**

```json
{
  "branch": ""
}
```

**Response:**

```json
{
  "trainees": [
    {
      "id": 2884,
      "full_name": "Ahmed Mohamed",
      "level": "Beginner 1"
    }
  ]
}
```

**→ Copy a trainee ID (e.g., 2884)**

---

### Step 3: Update Trainee Level (Existing Level)

**Request:**

```
PATCH http://localhost:8000/api/v1/dashboard/meta/waitlist-level/update
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json
Accept: application/json
```

**Body:**

```json
{
  "trainee_id": 2884,
  "level_name": "Beginner 1"
}
```

**Expected Response (200):**

```json
{
  "message": "Trainee level updated successfully.",
  "data": {
    "trainee_id": 2884,
    "trainee_name": "Ahmed Mohamed",
    "level_id": 5,
    "level_name": "Beginner 1",
    "level_created": false
  }
}
```

---

### Step 4: Update Trainee Level (New Level - Auto-Create)

**Request:**

```
PATCH http://localhost:8000/api/v1/dashboard/meta/waitlist-level/update
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json
Accept: application/json
```

**Body:**

```json
{
  "trainee_id": 2884,
  "level_name": "Advanced Plus"
}
```

**Expected Response (200):**

```json
{
  "message": "Trainee level updated successfully.",
  "data": {
    "trainee_id": 2884,
    "trainee_name": "Ahmed Mohamed",
    "level_id": 125,
    "level_name": "Advanced Plus",
    "level_created": false
  }
}
```

**What Happened:**

1. ✅ System checked if "Advanced Plus" exists in `gt_generalmeta`
2. ✅ Level didn't exist, so it was created with a new ID (125)
3. ✅ Trainee's `level` column was updated to 125

---

### Step 5: Verify the Update

**Request:**

```
GET http://localhost:8000/api/v1/dashboard/trainees/2884
Authorization: Bearer YOUR_TOKEN
```

**Response:**

```json
{
  "trainee": {
    "id": 2884,
    "full_name": "Ahmed Mohamed",
    "level": "Advanced Plus"
  }
}
```

---

## Postman Collection Setup

### Collection: Trainee Level Update

#### 1. Login

- **Method:** POST
- **URL:** `http://localhost:8000/api/v1/auth`
- **Body:**

```json
{
  "email": "admin@example.com",
  "password": "password"
}
```

- **Tests Script:**

```javascript
pm.environment.set("token", pm.response.json().token);
```

#### 2. Update Trainee Level

- **Method:** PATCH
- **URL:** `http://localhost:8000/api/v1/dashboard/meta/waitlist-level/update`
- **Headers:**
  - `Authorization`: `Bearer {{token}}`
  - `Content-Type`: `application/json`
  - `Accept`: `application/json`
- **Body:**

```json
{
  "trainee_id": 2884,
  "level_name": "Intermediate 2"
}
```

---

## Test Scenarios

### Scenario 1: Update to Existing Level ✅

**Request:**

```json
{
  "trainee_id": 2884,
  "level_name": "Beginner 1"
}
```

**Expected:**

- Level "Beginner 1" already exists (ID: 5)
- Trainee's level updated to 5
- `level_created: false`

---

### Scenario 2: Update to New Level (Auto-Create) ✅

**Request:**

```json
{
  "trainee_id": 2884,
  "level_name": "Super Advanced"
}
```

**Expected:**

- Level "Super Advanced" doesn't exist
- System creates it (new ID: 126)
- Trainee's level updated to 126
- `level_created: false`

---

### Scenario 3: Invalid Trainee ID ❌

**Request:**

```json
{
  "trainee_id": 99999,
  "level_name": "Beginner 1"
}
```

**Expected Response (404):**

```json
{
  "message": "Trainee not found."
}
```

---

### Scenario 4: Missing Required Fields ❌

**Request:**

```json
{
  "trainee_id": 2884
}
```

**Expected Response (422):**

```json
{
  "message": "Validation failed.",
  "errors": {
    "level_name": ["The level name field is required."]
  }
}
```

---

## cURL Examples

### Example 1: Update with Existing Level

```bash
curl -X PATCH http://localhost:8000/api/v1/dashboard/meta/waitlist-level/update \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "trainee_id": 2884,
    "level_name": "Beginner 1"
  }'
```

### Example 2: Update with New Level (Auto-Create)

```bash
curl -X PATCH http://localhost:8000/api/v1/dashboard/meta/waitlist-level/update \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "trainee_id": 2884,
    "level_name": "Expert Level"
  }'
```

---

## How It Works

### Flow Diagram:

```
1. Receive Request
   ↓
2. Validate trainee_id and level_name
   ↓
3. Find trainee in gt_trainees
   ↓
4. Check if level exists in gt_generalmeta
   ├─ YES → Use existing level ID
   └─ NO  → Create new level, get new ID
   ↓
5. Update trainee.level = level_id
   ↓
6. Return success response
```

### Database Changes:

**Before:**

```
gt_trainees:
id: 2884, full_name: "Ahmed", level: 5

gt_generalmeta:
id: 5, meta_key: "waitlist_level", meta_value: "Beginner 1"
```

**Request:**

```json
{
  "trainee_id": 2884,
  "level_name": "Advanced Plus"
}
```

**After:**

```
gt_trainees:
id: 2884, full_name: "Ahmed", level: 125  ← Updated

gt_generalmeta:
id: 5, meta_key: "waitlist_level", meta_value: "Beginner 1"
id: 125, meta_key: "waitlist_level", meta_value: "Advanced Plus"  ← Created
```

---

## Quick Test Checklist

- [ ] Get authentication token
- [ ] Get a valid trainee ID
- [ ] Test with existing level name
- [ ] Test with new level name (should auto-create)
- [ ] Verify trainee's level was updated
- [ ] Test with invalid trainee ID (should fail)
- [ ] Test with missing level_name (should fail)

---

## Common Issues

### Issue 1: "Trainee not found"

**Cause:** Invalid trainee_id
**Solution:** Use a valid trainee ID from the waitlist

### Issue 2: "Unauthenticated"

**Cause:** Missing or invalid token
**Solution:** Get a fresh token from the login endpoint

### Issue 3: "Validation failed"

**Cause:** Missing required fields
**Solution:** Ensure both `trainee_id` and `level_name` are provided

---

## Response Fields Explained

| Field           | Type    | Description                           |
| --------------- | ------- | ------------------------------------- |
| `trainee_id`    | integer | The ID of the updated trainee         |
| `trainee_name`  | string  | The full name of the trainee          |
| `level_id`      | integer | The ID of the level in gt_generalmeta |
| `level_name`    | string  | The name of the level                 |
| `level_created` | boolean | Always false (legacy field)           |

---

## Notes

- The API automatically creates levels if they don't exist
- Level names are case-sensitive
- Whitespace matters in level names
- The same level name can be reused for multiple trainees
- All requests require authentication
