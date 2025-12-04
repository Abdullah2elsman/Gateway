# Quick Setup with ngrok

## Why ngrok?

Google Forms runs on Google's servers, so it can't access `localhost:8000` on your computer. 
ngrok creates a secure tunnel that makes your local server accessible from the internet.

## Steps:

### 1. Download ngrok
- Go to: https://ngrok.com/download
- Download for Windows
- Extract the zip file

### 2. Start Your Laravel Server
```bash
cd Backend
php artisan serve
```

Keep this terminal running!

### 3. Start ngrok (in a new terminal)
```bash
ngrok http 8000
```

You'll see output like:
```
Forwarding  https://abc123.ngrok.io -> http://localhost:8000
```

### 4. Copy the HTTPS URL
Copy the `https://abc123.ngrok.io` URL (yours will be different)

### 5. Update Google Apps Script
In your Google Form's Script Editor, update line 11:
```javascript
const API_URL = "https://abc123.ngrok.io/api/v1/google-form/submit";
```

### 6. Save and Test
- Save the script (Ctrl+S)
- Run `testConnection` function
- Check the logs for success
- Submit a real form

### 7. Check Database
```bash
cd Backend
php artisan tinker --execute="echo App\Models\Trainee::latest()->first()->full_name;"
```

## Important Notes:

- **Free ngrok URLs change** every time you restart ngrok
- Keep both terminals running (Laravel server + ngrok)
- The ngrok URL is temporary - for production, use a real domain
- ngrok free tier has limits (40 connections/minute)

## Troubleshooting:

### "ERR_NGROK_3200" or connection refused
- Make sure Laravel server is running on port 8000
- Check that ngrok is pointing to the correct port

### "404 Not Found"
- Verify the full URL includes `/api/v1/google-form/submit`
- Check that the route exists: `php artisan route:list | findstr google-form`

### "500 Internal Server Error"
- Check Laravel logs: `Get-Content storage/logs/laravel.log -Tail 50`
- Make sure database is running
- Verify users and branches exist in database

## Alternative: Use Your Production Server

If you have a production server already deployed:
```javascript
const API_URL = "https://your-production-domain.com/api/v1/google-form/submit";
```

No ngrok needed!
