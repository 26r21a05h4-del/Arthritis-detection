import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health Check API endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'AI-Based Early Osteoarthritis Screening System',
    timestamp: new Date().toISOString(),
    cvEngine: 'MediaPipe Tasks Vision Client GPU',
    disclaimer: "It's just an AI based report care must be taken and consult a doctor",
  });
});

// Production Static Serving
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// In dev, Vite is launched directly via `vite --port=3000`
if (process.env.NODE_ENV === 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
