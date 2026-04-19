require('dotenv').config();
const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chat');
const imageRoutes = require('./routes/image');

const app = express();
const PORT = process.env.PORT || 5000;

// Increase request timeout and handle client disconnects
app.use(cors());
app.use(express.json({ limit: '10mb', extended: true }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'AI Nova Chat Server Running', status: 'ok' });
});

// API routes with timeout handling
app.use('/api/chat', chatRoutes);
app.use('/api/image', imageRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  if (!res.headersSent) {
    res.status(500).json({ error: 'Internal server error' });
  } else {
    res.end();
  }
});

// Create HTTP server with timeout settings
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Set server timeouts to prevent socket hang up
server.timeout = 30000; // 30 seconds
server.keepAliveTimeout = 65000; // 65 seconds
server.headersTimeout = 66000; // 66 seconds

// Handle client disconnects gracefully
server.on('connection', (socket) => {
  socket.setTimeout(30000); // 30 second socket timeout
  socket.on('error', (err) => {
    console.error('Socket error:', err.message);
  });
  socket.on('close', (hadError) => {
    if (hadError) {
      console.log('Socket closed with error');
    } else {
      console.log('Socket closed normally');
    }
  });
});

// Handle server errors
server.on('error', (err) => {
  console.error('Server error:', err);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
