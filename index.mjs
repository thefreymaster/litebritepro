import express from 'express';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Setup __dirname in ES module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Initialize Express
const app = express();

// Middleware for JSON body parsing
app.use(express.json());
app.use(cors());

// Serve static files from React's build directory
app.use(express.static(join(__dirname, 'build')));

// API routes under /api
app.use('/api', (req, res, next) => {
  console.log(`API request: ${req.method} ${req.url}`);
  next();
});

// Define your API endpoints
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

app.post('/api/cell', (req, res) => {
  const data = req.body;
  res.json({ received: true, data });
  print(data);
});

// Catch-all handler for React app
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`LiteBrightPro API is running on http://localhost:${PORT}/api`);
});
