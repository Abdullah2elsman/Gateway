# Google Form Setup Guide - Gateway Community

## Your Form Fields

1. **Full name** (text, required)
2. **Mobile Number** (text, required)
3. **Age** (text, required)
4. **Education** (text, optional)
5. **Job** (text, optional)
6. **Are you a current trainee at Gateway Community?** (Yes/No, required)
7. **If your answer is yes, so when?** (text, optional)
8. **How did you hear about Gateway Community?** (multiple choice, required)
9. **What's your preferable time of the course?** (multiple choice, optional)

---

## Step-by-Step Setup

### Step 1: Prepare Your Backend

1. Make sure your Laravel server is running:
   ```bash
   cd Backend
   php artisan serve
   ```

2. Test the endpoint:
   ```bash
   curl http://localhost:8000/api/v1/google-form/test
   ```
   
   You should see:
   ```json
   {
     "success": true,
     "message": "Google Form service is working"
   }
   ```

### Step 2: Configure Google Form Script

1. Open your Google Form
2. Click the three dots (⋮) in the top right
3. Select **Script editor**
4. Delete any existing code
5. Copy and paste the code from `GOOGLE_FORM_SCRIPT.js`
6. **Important:** Update the `API_URL` on line 18:
   ```javascript
   // For local testing:
   const API_URL = "http://localhost:8000/api/v1/google-form/submit";
   
   // For production (replace with your domain):
   const API_URL = "https://your-domain.com/api/v1/google-form/submit";
   ```
7. Save the script (Ctrl+S or File → Save)
8. Name your project (e.g., "Gateway Form Integration")

### Step 3: Set Up Trigger

1. In the Apps Script editor, click the **Triggers** icon (⏰ clock icon on the left)
2. Click **+ Add Trigger** (bottom right)
3. Configure the trigger:
   - **Choose which function to run:** `onFormSubmit`
   - **Choose which deployment should run:** `Head`
   - **Select event source:** `From form`
   - **Select event type:** `On form submit`
4. Click **Save**
5. You may need to authorize the script:
   - Click **Review permissions**
   - Choose your Google account
   - Click **Advanced** → **Go to [Project Name] (unsafe)**
   - Click **Allow**

### Step 4: Test the Integration

#### Option A: Test with Script Function

1. In Apps Script editor, select `testConnection` from the function dropdown
2. Click **Run** (▶️ play button)
3. Check the **Execution log** (View → Logs or Ctrl+Enter)
4. You should see "✓ Success! Data saved to database."

#### Option B: Test with Actual Form Submission

1. Open your Google Form in preview mode
2. Fill out the form with test data:
   - Full name: Test User
   - Mobile: +201234567890
   - Age: 25
   - Education: Bachelor
   - Job: Engineer
   - Current trainee: No
   - How did you hear: Social Media
   - Preferable time: Morning
3. Submit the form
4. Check the Apps Script logs:
   - Go to Apps Script editor
   - Click **Executions** (list icon on the left)
   - View the latest execution
5. Check your database:
   ```sql
   SELECT * FROM gt_trainees ORDER BY id DESC LIMIT 1;
   ```

### Step 5: Verify Data in Database

Check the trainee was created:

```sql
-- View the latest trainee
SELECT * FROM gt_trainees 
ORDER BY id DESC 
LIMIT 1;

-- View the trainee meta data
SELECT tm.* 
FROM gt_trainee_meta tm
JOIN gt_trainees t ON t.id = tm.trainee_id
ORDER BY t.id DESC, tm.id DESC
LIMIT 10;
```

---

## Expected Data Mapping

| Google Form Field | Database Field | Location |
|------------------|----------------|----------|
| Full name | `full_name` | `gt_trainees` table |
| Mobile Number | `phone_number_0` | `gt_trainee_meta` table |
| Age | `age` | `gt_trainee_meta` table |
| Age (calculated) | `age_group` | `gt_trainee_meta` table (Adult/Teen) |
| Education | `education` | `gt_trainee_meta` table |
| Job | `job` | `gt_trainee_meta` table |
| Current trainee | `is_current_trainee` | `gt_trainee_meta` table |
| When joined | `when_joined` | `gt_trainee_meta` table |
| How did you hear | `how_did_you_hear` | `gt_trainee_meta` table |
| Preferable time | `preferable_time` | `gt_trainees` table (if exists in meta) |
| Notes | `notes` | `gt_trainees` table (auto-generated) |

---

## Troubleshooting

### 1. Check Apps Script Logs

In Apps Script editor:
- Click **Executions** (list icon)
- View the latest execution
- Check for errors in red

### 2. Check Laravel Logs

```bash
tail -f storage/logs/laravel.log
```

Look for lines starting with:
- `[INFO] Google Form Data Received`
- `[ERROR] Google Form Error`

### 3. Common Issues

#### "Failed to fetch" error
- **Cause:** API URL is incorrect or server is not running
- **Solution:** Verify the API_URL in the script and ensure Laravel is running

#### "Validation failed" error
- **Cause:** Required fields are missing
- **Solution:** Check that `full_name`, `mobile_number`, `age`, `is_current_trainee`, and `how_did_you_hear` are being sent

#### "CORS error"
- **Cause:** Cross-origin request blocked
- **Solution:** This shouldn't happen with Google Apps Script, but if it does, check your CORS configuration in Laravel

#### Data not appearing in database
- **Cause:** Database connection issue or validation error
- **Solution:** Check Laravel logs for specific error messages

### 4. Debug Mode

To see exactly what data is being sent, check the Apps Script logs:

```javascript
Logger.log("Mapped Data: " + JSON.stringify(data));
```

This will show you the exact data being sent to your API.

---

## Testing Checklist

- [ ] Backend server is running
- [ ] Test endpoint returns success
- [ ] Apps Script is saved with correct API_URL
- [ ] Trigger is set up for "On form submit"
- [ ] Script is authorized
- [ ] Test submission creates trainee in database
- [ ] All form fields are mapped correctly
- [ ] Meta data is saved properly
- [ ] Notes are generated correctly

---

## Production Deployment

When moving to production:

1. Update the `API_URL` in the Apps Script:
   ```javascript
   const API_URL = "https://your-production-domain.com/api/v1/google-form/submit";
   ```

2. Ensure your production server allows requests from Google:
   - Configure CORS if needed
   - Check firewall settings
   - Verify SSL certificate is valid

3. Test with a real submission

4. Monitor logs for any issues

---

## Support

If you encounter issues:

1. Check the Apps Script execution logs
2. Check Laravel logs: `storage/logs/laravel.log`
3. Verify all required fields are present
4. Test the API endpoint directly with curl
5. Contact your system administrator

---

## API Endpoint Details

**URL:** `http://your-domain.com/api/v1/google-form/submit`  
**Method:** `POST`  
**Content-Type:** `application/json`

**Request Body:**
```json
{
  "full_name": "John Doe",
  "mobile_number": "+201234567890",
  "age": "25",
  "education": "Bachelor",
  "job": "Engineer",
  "is_current_trainee": "No",
  "when_joined": "",
  "how_did_you_hear": "Social Media",
  "preferable_time": "Morning"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Form data saved successfully",
  "trainee_id": 123
}
```

**Error Response (422):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "full_name": ["The full name field is required."]
  }
}
```
