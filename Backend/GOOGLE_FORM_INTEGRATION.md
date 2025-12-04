# Google Form Integration Guide

## Overview
This service allows you to receive data from Google Forms and automatically save it to your database as trainee records in the Wait List.

## Setup Instructions

### 1. API Endpoint
**URL:** `http://your-domain.com/api/v1/google-form/submit`  
**Method:** `POST`  
**Authentication:** Not required (public endpoint)

### 2. Expected Data Format

```json
{
  "full_name": "John Doe",
  "phone_number": "+201234567890",
  "phone_number_2": "+201234567891",
  "email": "john@example.com",
  "country": "Egypt",
  "age_group": "Adult",
  "attend_type": "Online",
  "city": "Cairo",
  "job": "Engineer",
  "education": "Bachelor",
  "birth_date": "1990-01-01",
  "notes": "Additional notes"
}
```

### 3. Required Fields
- `full_name` (required)
- `phone_number` (required)

### 4. Optional Fields
- `phone_number_2`
- `email`
- `country`
- `age_group` (Adult or Teen)
- `attend_type` (Online, Offline, Hybrid, Private)
- `city`
- `job`
- `education`
- `birth_date`
- `notes`

## Google Form Setup

### Step 1: Create Your Google Form
1. Go to [Google Forms](https://forms.google.com)
2. Create a new form with the fields you need
3. Make sure field names match the expected format

### Step 2: Connect Form to Apps Script

1. In your Google Form, click the three dots (⋮) → **Script editor**
2. Delete any existing code and paste this:

```javascript
function onFormSubmit(e) {
  var form = FormApp.getActiveForm();
  var responses = e.response.getItemResponses();
  
  // Map form responses to API data
  var data = {
    full_name: "",
    phone_number: "",
    email: "",
    country: "",
    age_group: "Adult",
    attend_type: "Online",
    notes: "Submitted via Google Form"
  };
  
  // Extract responses
  for (var i = 0; i < responses.length; i++) {
    var response = responses[i];
    var question = response.getItem().getTitle();
    var answer = response.getResponse();
    
    // Map questions to fields (adjust based on your form)
    if (question.includes("Name") || question.includes("name")) {
      data.full_name = answer;
    } else if (question.includes("Phone") || question.includes("phone")) {
      data.phone_number = answer;
    } else if (question.includes("Email") || question.includes("email")) {
      data.email = answer;
    } else if (question.includes("Country") || question.includes("country")) {
      data.country = answer;
    } else if (question.includes("Age Group")) {
      data.age_group = answer;
    } else if (question.includes("Attend Type")) {
      data.attend_type = answer;
    }
  }
  
  // Send to your API
  var url = "http://your-domain.com/api/v1/google-form/submit";
  
  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(data),
    "muteHttpExceptions": true
  };
  
  try {
    var response = UrlFetchApp.fetch(url, options);
    Logger.log("Response: " + response.getContentText());
  } catch (error) {
    Logger.log("Error: " + error.toString());
  }
}
```

3. Save the script (Ctrl+S)
4. Click **Triggers** (clock icon) → **Add Trigger**
5. Configure:
   - Choose function: `onFormSubmit`
   - Event source: `From form`
   - Event type: `On form submit`
6. Click **Save**

### Step 3: Test the Integration

1. Test the endpoint first:
   ```bash
   curl http://localhost:8000/api/v1/google-form/test
   ```

2. Test with sample data:
   ```bash
   curl -X POST http://localhost:8000/api/v1/google-form/submit \
     -H "Content-Type: application/json" \
     -d '{
       "full_name": "Test User",
       "phone_number": "+201234567890",
       "email": "test@example.com",
       "country": "Egypt",
       "age_group": "Adult"
     }'
   ```

3. Submit a test response through your Google Form
4. Check your database to verify the trainee was created

## Response Format

### Success Response (201)
```json
{
  "success": true,
  "message": "Form data saved successfully",
  "trainee_id": 123
}
```

### Error Response (422)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "full_name": ["The full name field is required."]
  }
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Failed to save form data",
  "error": "Error details"
}
```

## Troubleshooting

### Check Logs
All requests are logged in `storage/logs/laravel.log`:
```bash
tail -f storage/logs/laravel.log
```

### Common Issues

1. **CORS Error**: Make sure CORS is properly configured in your Laravel app
2. **Validation Errors**: Check that field names match exactly
3. **Database Errors**: Verify the Wait List exists in `gt_lists` table
4. **User Not Found**: Create a system user with email `system@gateway.com`

## Security Considerations

1. **Rate Limiting**: Consider adding rate limiting to prevent abuse
2. **API Key**: You can add an API key for additional security
3. **IP Whitelist**: Restrict access to Google's IP ranges if needed
4. **Data Validation**: Always validate and sanitize incoming data

## Customization

### Add Custom Fields
Edit `GoogleFormController.php` and add your fields to:
- Validation rules
- `saveTraineeMeta()` method

### Change Default List
Modify `getWaitListId()` to return a different list ID

### Assign to Specific Branch
Pass `branch_id` in the form data or set a default in the controller

## Support

For issues or questions, check the logs or contact your system administrator.
