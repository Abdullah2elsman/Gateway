# Test Paid Value Update API

## Endpoint

```
PATCH http://localhost:8000/api/v1/dashboard/meta/paid-value/update
```

---

## How to Test in Postman

### Step 1: Login

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
  "token": "1|abc123..."
}
```

**→ Copy the token**

---

### Step 2: Update Paid Value

**Request:**

```
PATCH http://localhost:8000/api/v1/dashboard/meta/paid-value/update
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json
Accept: application/json
```

**Body:**

```json
{
  "trainee_id": 2884,
  "meta_value": "1500"
}
```

**Success Response (200):**

```json
{
  "message": "Paid value updated successfully.",
  "data": {
    "id": 123,
    "trainee_id": 2884,
    "meta_key": "paid_value",
    "meta_value": "1500"
  }
}
```

---

## What Was Fixed

### Before (Problem):

- If `paid_value` didn't exist for a trainee, the API would crash
- Returned error: "Call to a member function on null"

### After (Fixed):

- Uses `updateOrCreate()` method
- If `paid_value` exists → Updates it
- If `paid_value` doesn't exist → Creates it automatically
- Always works! ✅

---

## Test Scenarios

### Scenario 1: Update Existing Paid Value

**Trainee 2884 already has paid_value = "1000"**

**Request:**

```json
{
  "trainee_id": 2884,
  "meta_value": "1500"
}
```

**Result:**

- Updates existing record
- paid_value changes from "1000" to "1500"

---

### Scenario 2: Create New Paid Value

**Trainee 2885 has NO paid_value record**

**Request:**

```json
{
  "trainee_id": 2885,
  "meta_value": "2000"
}
```

**Result:**

- Creates new record in `gt_trainee_metas`
- trainee_id: 2885
- meta_key: "paid_value"
- meta_value: "2000"

---

### Scenario 3: Invalid Trainee ID

**Request:**

```json
{
  "trainee_id": 99999,
  "meta_value": "1500"
}
```

**Response (422):**

```json
{
  "message": "Validation failed.",
  "errors": {
    "trainee_id": ["The selected trainee id is invalid."]
  }
}
```

---

## Required Fields

| Field        | Type    | Required | Description                    |
| ------------ | ------- | -------- | ------------------------------ |
| `trainee_id` | integer | Yes      | ID from gt_trainees table      |
| `meta_value` | string  | Yes      | The paid amount (e.g., "1500") |

**Note:** `meta_key` is NOT required - it's automatically set to "paid_value"

---

## Frontend Integration

The frontend should send:

```javascript
const updatePaidValue = async (traineeId, paidValue) => {
  const response = await axios.patch(
    `${API_URL}/dashboard/meta/paid-value/update`,
    {
      trainee_id: traineeId,
      meta_value: paidValue,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
```

---

## Why It Returns NULL in Frontend

If the frontend shows `meta_value: null`, it means:

1. **The record doesn't exist yet** in `gt_trainee_metas`
2. **The trainee was never assigned a paid value**

### Solution:

Use this API to create/update the paid value, and it will automatically:

- Create the record if it doesn't exist
- Update the record if it exists

---

## Complete Test Flow

### 1. Check Current Paid Value

```
GET http://localhost:8000/api/v1/dashboard/trainees/2884
```

Look for `paid_value` in the response.

### 2. Update Paid Value

```
PATCH http://localhost:8000/api/v1/dashboard/meta/paid-value/update
Body: {
  "trainee_id": 2884,
  "meta_value": "1500"
}
```

### 3. Verify Update

```
GET http://localhost:8000/api/v1/dashboard/trainees/2884
```

Now `paid_value` should show "1500".

---

## Common Values

Examples of paid_value formats:

- `"1500"` - Simple amount
- `"100P"` - 100 paid
- `"1400<R"` - 1400 received
- `"100P+1000<R"` - 100 paid + 1000 received
- `"700<R"` - 700 received
- `"2000"` - 2000 total

---

## Troubleshooting

### Issue: "meta_value is null" in frontend

**Cause:** The paid_value record doesn't exist in gt_trainee_metas

**Solution:** Use this API to create it:

```
PATCH /dashboard/meta/paid-value/update
Body: {"trainee_id": 2884, "meta_value": "1500"}
```

### Issue: "Validation failed"

**Cause:** Missing required fields

**Solution:** Ensure both `trainee_id` and `meta_value` are provided

### Issue: "Trainee not found"

**Cause:** Invalid trainee_id

**Solution:** Use a valid trainee ID from your database

---

## Summary

✅ **Auto-Create:** Creates paid_value record if it doesn't exist
✅ **Auto-Update:** Updates paid_value record if it exists
✅ **No Errors:** Uses `updateOrCreate()` to handle both cases
✅ **Simple:** Only requires trainee_id and meta_value

The API is now robust and handles all cases! 🎉
