
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// JWT Authentication middleware
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Routes that don't need authentication
app.use('/api/auth', createProxyMiddleware({ 
  target: 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/api/auth': '', 
  },
}));

// Routes that need authentication
app.use('/api/tenants', authenticateJWT, createProxyMiddleware({ 
  target: 'http://localhost:3002',
  changeOrigin: true,
  pathRewrite: {
    '^/api/tenants': '', 
  },
}));

app.use('/api/employees', authenticateJWT, createProxyMiddleware({ 
  target: 'http://localhost:3003',
  changeOrigin: true,
  pathRewrite: {
    '^/api/employees': '', 
  },
}));

app.use('/api/attendance', authenticateJWT, createProxyMiddleware({ 
  target: 'http://localhost:3004',
  changeOrigin: true,
  pathRewrite: {
    '^/api/attendance': '', 
  },
}));

app.use('/api/payroll', authenticateJWT, createProxyMiddleware({ 
  target: 'http://localhost:3005',
  changeOrigin: true,
  pathRewrite: {
    '^/api/payroll': '', 
  },
}));

app.use('/api/leave', authenticateJWT, createProxyMiddleware({ 
  target: 'http://localhost:3006',
  changeOrigin: true,
  pathRewrite: {
    '^/api/leave': '', 
  },
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API Gateway is running' });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
