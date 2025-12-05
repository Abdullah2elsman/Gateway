# Session Status Toggle API ✅

## Overview

Simple API to toggle `session_status` between 0 and 1 in the `gt_session_notes` table when clicking a checkbox.

**Authorization:** Only the trainer assigned to the class can toggle the session status.

---

## API Endpoint

### **Toggle Session Status**

```
PATCH /api/v1/dashboard/batches/classes/attendance/{session_id}/toggle
```

---

## Usage in Postman

### **Method:** `PATCH`

### **URL:**

```
http://localhost:8000/api/v1/dashboard/batches/classes/attendance/1/toggle
```

_(Replace `1` with your actual session_id)_

### **Headers:**

```
Authorization: Bearer YOUR_ACCESS_TOKEN
Accept: application/json
```

### **Body:**

**No body required!** Just send the request.

---

## Authorization Check

### **How It Works:**

1. Finds the session note by `session_id`
2. Gets the attendance record from `gt_attendance` (via `attend_id`)
3. Gets the class from `gt_classes` (via `class_id`)
4. Checks if `trainer_id` in `gt_classes` matches the logged-in user's ID
5. If authorized → toggles `session_status` between 0 and 1
6. If not authorized → returns 403 error

### **Database Flow:**

```
gt_session_notes (id = session_id)
    ↓ attend_id
gt_attendance (id = attend_id)
    ↓ class_id
gt_classes (id = class_id)
    ↓ trainer_id (must match auth()->user()->id)
```

### **Example:**

```
Session ID: 1
  ↓
Attendance ID: 5 (from gt_session_notes.attend_id)
  ↓
Class ID: 10 (from gt_attendance.class_id)
  ↓
Trainer ID: 25 (from gt_classes.trainer_id)
  ↓
Check: Is logged-in user ID = 25?
  ✅ Yes → Allow toggle
  ❌ No → Return 403 Unauthorized
```

---

## Response Examples

### **Success (200):**

```json
{
  "message": "Session status updated successfully",
  "session_status": 1
}
```

### **Session Not Found (404):**

```json
{
  "message": "Session not found"
}
```

### **Attendance Not Found (404):**

```json
{
  "message": "Attendance record not found"
}
```

### **Class Not Found (404):**

```json
{
  "message": "Class not found"
}
```

### **Unauthorized (403):**

```json
{
  "message": "Unauthorized. Only the class trainer can update session status."
}
```

### **Error (400):**

```json
{
  "message": "Something went wrong. Please try again.",
  "error": "Error details here"
}
```

---

## Frontend Integration

### **JavaScript/Axios Example:**

```javascript
// When checkbox is clicked
const toggleSessionStatus = async (sessionId) => {
  try {
    const response = await axios.patch(
      `${API_URL}/dashboard/batches/classes/attendance/${sessionId}/toggle`,
      {}, // No body needed
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("New status:", response.data.session_status);
    // Update checkbox state based on response.data.session_status
  } catch (error) {
    if (error.response.status === 403) {
      alert("You are not authorized to update this session");
    } else {
      console.error("Error:", error.response.data.message);
    }
  }
};
```

### **Vue.js Example:**

```vue
<template>
  <input
    type="checkbox"
    :checked="sessionStatus === 1"
    @change="toggleStatus(sessionId)"
    :disabled="!isTrainer"
  />
</template>

<script>
export default {
  data() {
    return {
      sessionStatus: 0, // or 1
      sessionId: 123,
      isTrainer: true, // Check if current user is trainer
    };
  },
  methods: {
    async toggleStatus(sessionId) {
      try {
        const response = await this.$axios.patch(
          `/dashboard/batches/classes/attendance/${sessionId}/toggle`
        );
        this.sessionStatus = response.data.session_status;
      } catch (error) {
        if (error.response.status === 403) {
          this.$toast.error("Only the trainer can update session status");
        } else {
          console.error(error);
        }
      }
    },
  },
};
</script>
```

---

## Testing Steps

### **1. Login as a Trainer**

Make sure you login with a user who is assigned as a trainer in `gt_classes.trainer_id`

### **2. Get Session ID**

Find a session that belongs to a class where you are the trainer:

```sql
SELECT
    sn.id as session_id,
    sn.session_status,
    a.class_id,
    c.trainer_id,
    c.class_name
FROM gt_session_notes sn
JOIN gt_attendance a ON sn.attend_id = a.id
JOIN gt_classes c ON a.class_id = c.id
WHERE c.trainer_id = YOUR_USER_ID
LIMIT 10;
```

### **3. Test in Postman**

```
PATCH http://localhost:8000/api/v1/dashboard/batches/classes/attendance/1/toggle
Headers: Authorization: Bearer YOUR_TOKEN
```

### **4. Check Response**

You should see:

```json
{
  "message": "Session status updated successfully",
  "session_status": 1 // or 0
}
```

### **5. Test Unauthorized Access**

Try with a session from a class where you're NOT the trainer - you should get:

```json
{
  "message": "Unauthorized. Only the class trainer can update session status."
}
```

### **6. Verify in Database**

```sql
SELECT id, session_status FROM gt_session_notes WHERE id = 1;
```

---

## Security Features

✅ **Authentication Required** - Must be logged in
✅ **Authorization Check** - Only the class trainer can toggle
✅ **Relationship Validation** - Checks attendance and class exist
✅ **Error Logging** - Logs errors for debugging
✅ **Clear Error Messages** - Helpful responses for different scenarios

---

## Files Created/Modified

### **Created:**

- `Backend/app/Batches/Classes/Class/Attendance/ToggleSessionStatus.php`

### **Modified:**

- `Backend/app/Http/Controllers/Dashboard/Attendance/AttendanceController.php`
- `Backend/routes/api.php`

---

## Summary

✅ **New API:** `PATCH /dashboard/batches/classes/attendance/{session_id}/toggle`
✅ **Purpose:** Toggle session_status between 0 and 1
✅ **Authorization:** Only the class trainer can toggle
✅ **Security:** Validates trainer_id from gt_classes table
✅ **Usage:** Perfect for checkbox functionality
✅ **Simple:** No body required, just session_id in URL

**Use this API for your checkbox feature with trainer authorization!** 🎉
