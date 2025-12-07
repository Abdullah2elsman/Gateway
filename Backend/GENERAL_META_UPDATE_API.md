# Trainee Meta Update API

## Overview

This API allows you to update `meta_value` in the `gt_trainee_metas` table based on `trainee_id` and `meta_key`.

---

## Endpoints

### 1. Update Meta Value

**Endpoint:**

```
PUT http://localhost:8000/api/v1/dashboard/meta
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
  "trainee_id": 2884,
  "meta_key": "age_group",
  "meta_value": "Adult"
}
```

**Parameters:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `trainee_id` | integer | Yes | The trainee ID from gt_trainees table |
| `meta_key` | string | Yes | The meta_key to identify the record |
| `meta_value` | string | Yes | The new value to set |

**Success Response (200 - Updated):**

```json
{
  "message": "Meta value updated successfully.",
  "data": {
    "id": 1,
    "trainee_id": 2884,
    "meta_key": "age_group",
    "meta_value": "Adult"
  }
}
```

**Success Response (201 - Created):**

```json
{
  "message": "Meta value created successfully.",
  "data": {
    "id": 1,
    "trainee_id": 2884,
    "meta_key": "age_group",
    "meta_value": "Adult"
  }
}
```

**Error Responses:**

**Note:** If the record doesn't exist, it will be automatically created with a 201 status.

**422 - Validation Error:**

```json
{
  "message": "Validation failed.",
  "errors": {
    "trainee_id": ["The trainee_id field is required."],
    "meta_key": ["The meta_key field is required."],
    "meta_value": ["The meta_value field is required."]
  }
}
```

---

### 2. Get Meta Value

**Endpoint:**

```
GET http://localhost:8000/api/v1/dashboard/meta
```

**Headers:**

```
Authorization: Bearer YOUR_TOKEN
Accept: application/json
```

**Query Parameters:**

```
?trainee_id=2884&meta_key=age_group
```

**Parameters:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `trainee_id` | integer | Yes | The trainee ID from gt_trainees table |
| `meta_key` | string | Yes | The meta_key to identify the record |

**Success Response (200):**

```json
{
  "data": {
    "id": 1,
    "trainee_id": 2884,
    "meta_key": "age_group",
    "meta_value": "Adult"
  }
}
```

**Error Response (404):**

```json
{
  "message": "Meta record not found."
}
```

---

## Usage Examples

### Example 1: Update a Meta Value

**Request:**

```bash
curl -X PUT http://localhost:8000/api/v1/dashboard/meta \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "trainee_id": 2884,
    "meta_key": "age_group",
    "meta_value": "Adult"
  }'
```

**Response:**

```json
{
  "message": "Meta value updated successfully.",
  "data": {
    "id": 5,
    "trainee_id": 2884,
    "meta_key": "age_group",
    "meta_value": "Adult"
  }
}
```

---

### Example 2: Get Current Meta Value

**Request:**

```bash
curl -X GET "http://localhost:8000/api/v1/dashboard/meta?trainer_id=5&meta_key=level" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Accept: application/json"
```

**Response:**

```json
{
  "data": {
    "id": 5,
    "meta_key": "level",
    "meta_value": "Advanced"
  }
}
```

---

## Postman Examples

### Update Meta Value

1. **Method:** PUT
2. **URL:** `http://localhost:8000/api/v1/dashboard/meta`
3. **Headers:**
   - `Authorization`: `Bearer YOUR_TOKEN`
   - `Content-Type`: `application/json`
   - `Accept`: `application/json`
4. **Body (raw JSON):**

```json
{
  "trainer_id": 1,
  "meta_key": "waitlist_level",
  "meta_value": "Beginner 1"
}
```

---

### Get Meta Value

1. **Method:** GET
2. **URL:** `http://localhost:8000/api/v1/dashboard/meta`
3. **Headers:**
   - `Authorization`: `Bearer YOUR_TOKEN`
   - `Accept`: `application/json`
4. **Params:**
   - `trainer_id`: `1`
   - `meta_key`: `waitlist_level`

---

## Notes

- The `trainer_id` parameter refers to the `id` column in the `gt_generalmeta` table (not the trainer's user ID)
- Both `trainer_id` and `meta_key` are required to uniquely identify a record
- The record must exist before you can update it
- All requests require authentication (Bearer token)
- The API validates that the trainer_id exists in the gt_users table

---

## Common Use Cases

1. **Update Level Names:**

```json
{
  "trainer_id": 10,
  "meta_key": "waitlist_level",
  "meta_value": "Intermediate 2"
}
```

2. **Update Payment Types:**

```json
{
  "trainer_id": 15,
  "meta_key": "payment_type",
  "meta_value": "Credit Card"
}
```

3. **Update Time Slots:**

```json
{
  "trainer_id": 20,
  "meta_key": "time_slot",
  "meta_value": "Saturday 10:00 AM"
}
```
