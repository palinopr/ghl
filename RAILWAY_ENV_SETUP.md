# Railway Environment Variables Setup

## Steps to Add Environment Variables in Railway:

1. **Go to your Railway Dashboard**
   - Visit https://railway.app/dashboard
   - Click on your `ghl` project

2. **Navigate to Variables**
   - Click on your service (ghl-production)
   - Click on the "Variables" tab
   - Click "Raw Editor" or "Add Variable"

3. **Add these variables:**

```
GHL_API_KEY=your_actual_gohighlevel_api_key_here
API_KEY=my-secure-middleware-key-2024
ALLOWED_ORIGINS=*
PORT=8080
NODE_ENV=production
```

## Important Notes:
- Replace `your_actual_gohighlevel_api_key_here` with your real GoHighLevel API key
- The `API_KEY` is what your AI will use to authenticate with your middleware
- You can change `ALLOWED_ORIGINS` to specific domains for better security

## After Adding Variables:
1. Railway will automatically redeploy your app
2. Test your endpoint: `https://your-app.railway.app/health`
3. Your AI can now call: 
   ```
   GET https://your-app.railway.app/api/ghl/calendars
   Headers: X-API-Key: my-secure-middleware-key-2024
   ```