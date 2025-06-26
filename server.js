const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.'
});

const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(limiter);

// Health check endpoint (no auth required)
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Load routes after basic middleware
try {
  const ghlRoutes = require('./routes/ghl');
  const { authenticate } = require('./middleware/auth');
  
  // Apply auth to API routes only
  app.use('/api/ghl', authenticate, ghlRoutes);
} catch (error) {
  console.error('Error loading routes:', error);
  app.get('/api/ghl/*', (req, res) => {
    res.status(503).json({ error: 'Service temporarily unavailable' });
  });
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'GHL Middleware API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api/ghl/*'
    }
  });
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`GHL Middleware running on port ${PORT}`);
  console.log(`Health check available at http://0.0.0.0:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});