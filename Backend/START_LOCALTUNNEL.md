# Using localtunnel (No Signup Required!)

## Quick Start:

### 1. Install localtunnel (one time only)
```bash
npm install -g localtunnel
```

### 2. Start Laravel Server (Terminal 1)
```bash
cd Backend
php artisan serve
```

Keep this running!

### 3. Start localtunnel (Terminal 2 - New Window)
```bash
lt --port 8000
```

You'll see:
```
your url is: https://funny-cat-12.loca.lt
```

### 4. Copy the URL
Copy the URL shown (e.g., `https://funny-cat-12.loca.lt`)

### 5. Update Google Apps Script
In your Google Form's Script Editor, update line 11:
```javascript
const API_URL = "https://funny-cat-12.loca.lt/api/v1/google-form/submit";
```

### 6. Test It!
- Save the script (Ctrl+S)
- Run `testConnection` function
- Check logs for success
- Submit your form!

## Important Notes:

⚠️ **First Visit Warning**: The first time you (or Google) visits the localtunnel URL, you'll see a page saying "Localtunnel" with a button to continue. Just click it once, and it won't show again for that session.

💡 **URL Changes**: The URL changes every time you restart localtunnel. You'll need to update the script each time.

🔄 **Keep Running**: Keep both terminals open (Laravel + localtunnel) while testing.

## Troubleshooting:

### "npm: command not found"
You need Node.js installed. Download from: https://nodejs.org/

### Connection timeout
- Make sure Laravel is running on port 8000
- Check that localtunnel is running
- Try restarting localtunnel

### 404 Error
- Verify the full URL includes `/api/v1/google-form/submit`
- Test the endpoint: visit `https://your-url.loca.lt/api/v1/google-form/test` in browser

## Alternative Commands:

### Use a custom subdomain (requires paid plan)
```bash
lt --port 8000 --subdomain mygateway
```

### Use a different port
```bash
lt --port 8080
```

## When You're Done Testing:

Press `Ctrl+C` in both terminals to stop Laravel and localtunnel.

## For Production:

Deploy your Laravel app to a real server and use that URL instead. No tunneling needed!
