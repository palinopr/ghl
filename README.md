# GHL Middleware Service

A middleware service that bridges AI tools with GoHighLevel API, hosted on Railway.

## Features

- Calendar availability checking
- Contact management
- Appointment scheduling
- Secure API key authentication
- Rate limiting
- CORS support

## Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your credentials:
   ```
   GHL_API_KEY=your_ghl_api_key
   API_KEY=your_middleware_api_key
   ```
3. Install dependencies: `npm install`
4. Run locally: `npm run dev`

## API Endpoints

All endpoints require `X-API-Key` header for authentication.

### Calendar Endpoints
- `GET /api/ghl/calendars` - List all calendars
- `GET /api/ghl/calendars/:calendarId/availability?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD` - Get calendar availability

### Contact Endpoints
- `GET /api/ghl/contacts` - List contacts
- `GET /api/ghl/contacts/:contactId` - Get specific contact

### Appointment Endpoints
- `POST /api/ghl/appointments` - Create appointment
- `GET /api/ghl/appointments` - List appointments

## Deployment to Railway

1. Push code to GitHub
2. Connect Railway to your GitHub repo
3. Add environment variables in Railway dashboard
4. Deploy!

## Usage Example

```javascript
// AI tool making request to your middleware
const response = await fetch('https://your-app.railway.app/api/ghl/calendars/abc123/availability?startDate=2024-01-01&endDate=2024-01-07', {
  headers: {
    'X-API-Key': 'your_middleware_api_key'
  }
});

const availability = await response.json();
```