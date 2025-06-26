# Deployment Guide

## Railway Deployment Steps

### 1. Set up Railway Project
1. Go to [Railway](https://railway.app)
2. Create a new project
3. Generate a Railway token from Account Settings > Tokens

### 2. Connect GitHub Repository
1. In Railway dashboard, click "New Project"
2. Choose "Deploy from GitHub repo"
3. Select `palinopr/ghl` repository
4. Railway will auto-detect the Node.js app

### 3. Configure Environment Variables
In Railway dashboard, add these environment variables:
- `GHL_API_KEY` - Your GoHighLevel API key
- `API_KEY` - Your middleware API key (create a secure one)
- `PORT` - Leave empty (Railway provides this)
- `ALLOWED_ORIGINS` - Your allowed domains (comma-separated)

### 4. Set up GitHub Actions (Optional)
1. Get your Railway token from Railway dashboard
2. Add it to GitHub repository secrets:
   - Go to Settings > Secrets > Actions
   - Add new secret: `RAILWAY_TOKEN`
3. Push to main branch to trigger deployment

### 5. Manual Deployment
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Link to your project
railway link

# Deploy
railway up
```

## Testing Your Deployment

Once deployed, test your endpoints:

```bash
# Health check
curl https://your-app.railway.app/health

# Get calendars (replace with your API key)
curl https://your-app.railway.app/api/ghl/calendars \
  -H "X-API-Key: your_middleware_api_key"
```

## Monitoring
- Check Railway dashboard for logs
- Monitor usage and performance metrics
- Set up alerts for errors

## Troubleshooting
- Ensure all environment variables are set
- Check Railway logs for errors
- Verify GHL API key has necessary permissions
- Test locally first with `npm run dev`