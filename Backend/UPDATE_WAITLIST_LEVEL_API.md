# Update Waitlist Level API

## Overview

This API endpoint updates waitlist levels in the `gt_generalmeta` table with automatic duplicate validation to prevent multiple levels with the same name.

---

## Endpoint

### Update Waitlist Level

**Endpoint:**

```
PATCH http://localhost:8000/api/v1/dashboard/meta/waitlist-levels/update
```

**Headers:**

```
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json
Accept: application/json
```

**Request Body:**

```json
{
  "trainer_id": 1,
  "meta_key": "waitlist_levels",
  "meta_value": "Beginner 1"
}
```

**Parameters:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `trainer_id` | integer | Yes | The ID from gt_generalmeta table |
| `meta_key` | string | Yes | Must be "waitlist_levels" |
| `meta_value` | string | Yes | The new level name |

---

## Responses

### Success Response (200)

```json
{
  "message": "Waitlist level updated successfully.",
  "data": {
    "id": 1,
    "meta_key": "waitlist_levels",
    "meta_value": "Beginner 1"
  }
}
```

### Error Responses

#### 404 - Not Found

```json
{
  "message": "Meta record not found with the provided trainer_id and meta_key."
}
```

#### 422 - Duplicate Level Name

```json
{
  "message": "This level name already exists. Please use a different name.",
  "error": "duplicate_value"
}
```

#### 422 - Validation Error

```json
{
  "message": "Validation failed.",
  "errors": {
    "trainer_id": ["The trainer_id field is required."],
    "meta_key": ["The meta_key field is required."],
    "meta_value": ["The meta_value field is required."]
  }
}
```

---

## Duplicate Validation

### How It Works

When you try to update a waitlist level, the API checks if another level already has the same name.

**Example Scenario:**

1. **Level 1** has name "Beginner 1" (ID: 1)
2. **Level 2** has name "Intermediate 1" (ID: 2)

**Attempt 1: Update Level 2 to "Beginner 1"**

```json
{
  "trainer_id": 2,
  "meta_key": "waitlist_levels",
  "meta_value": "Beginner 1"
}
```

**Result:** ❌ Error 422 - "This level name already exists"

**Attempt 2: Update Level 2 to "Intermediate 2"**

```json
{
  "trainer_id": 2,
  "meta_key": "waitlist_levels",
  "meta_value": "Intermediate 2"
}
```

**Result:** ✅ Success 200 - Level updated

**Attempt 3: Update Level 1 to keep "Beginner 1"**

```json
{
  "trainer_id": 1,
  "meta_key": "waitlist_levels",
  "meta_value": "Beginner 1"
}
```

**Result:** ✅ Success 200 - Can keep its own name

---

## Usage Examples

### Example 1: Update Level Name (Success)

**Request:**

```bash
curl -X PATCH http://localhost:8000/api/v1/dashboard/meta/waitlist-levels/update \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "trainer_id": 5,
    "meta_key": "waitlist_levels",
    "meta_value": "Advanced 1"
  }'
```

**Response:**

```json
{
  "message": "Waitlist level updated successfully.",
  "data": {
    "id": 5,
    "meta_key": "waitlist_levels",
    "meta_value": "Advanced 1"
  }
}
```

---

### Example 2: Duplicate Level Name (Error)

**Request:**

```bash
curl -X PATCH http://localhost:8000/api/v1/dashboard/meta/waitlist-levels/update \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "trainer_id": 6,
    "meta_key": "waitlist_levels",
    "meta_value": "Advanced 1"
  }'
```

**Response:**

```json
{
  "message": "This level name already exists. Please use a different name.",
  "error": "duplicate_value"
}
```

---

## Postman Setup

### Step 1: Get Authentication Token

```
POST http://localhost:8000/api/v1/auth
Body: {
  "email": "your@email.com",
  "password": "yourpassword"
}
```

### Step 2: Update Waitlist Level

1. **Method:** PATCH
2. **URL:** `http://localhost:8000/api/v1/dashboard/meta/waitlist-levels/update`
3. **Headers:**
   - `Authorization`: `Bearer YOUR_TOKEN`
   - `Content-Type`: `application/json`
   - `Accept`: `application/json`
4. **Body (raw JSON):**

```json
{
  "trainer_id": 1,
  "meta_key": "waitlist_levels",
  "meta_value": "Beginner 1"
}
```

---

## Testing Workflow

### Test 1: Get Current Levels

First, get all waitlist levels to see what exists:

```
GET http://localhost:8000/api/v1/dashboard/waitlist/levels
```

### Test 2: Update a Level with Unique Name

```
PATCH http://localhost:8000/api/v1/dashboard/meta/waitlist-levels/update
Body: {
  "trainer_id": 1,
  "meta_key": "waitlist_levels",
  "meta_value": "Beginner 1 Plus"
}
```

**Expected:** Success ✅

### Test 3: Try to Create Duplicate

```
PATCH http://localhost:8000/api/v1/dashboard/meta/waitlist-levels/update
Body: {
  "trainer_id": 2,
  "meta_key": "waitlist_levels",
  "meta_value": "Beginner 1 Plus"
}
```

**Expected:** Error 422 ❌

### Test 4: Update with Different Name

```
PATCH http://localhost:8000/api/v1/dashboard/meta/waitlist-levels/update
Body: {
  "trainer_id": 2,
  "meta_key": "waitlist_levels",
  "meta_value": "Beginner 2"
}
```

**Expected:** Success ✅

---

## Important Notes

1. **Case Sensitive:** "Beginner 1" and "beginner 1" are treated as different values
2. **Whitespace Matters:** "Beginner 1" and "Beginner 1" (extra space) are different
3. **Only for waitlist_levels:** This validation only applies when `meta_key` is "waitlist_levels"
4. **Self-Update Allowed:** A level can be updated to keep its own current name
5. **Requires Authentication:** All requests must include a valid Bearer token

---

## Common Use Cases

### Rename a Level

```json
{
  "trainer_id": 10,
  "meta_key": "waitlist_levels",
  "meta_value": "Intermediate 2 Plus"
}
```

### Fix Typo in Level Name

```json
{
  "trainer_id": 15,
  "meta_key": "waitlist_levels",
  "meta_value": "Advanced 1"
}
```

### Standardize Level Names

```json
{
  "trainer_id": 20,
  "meta_key": "waitlist_levels",
  "meta_value": "Pre-Intermediate 1"
}
```
