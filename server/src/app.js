import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/error.middleware.js';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import taskRoutes from './routes/task.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/tasks', taskRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error Handler
app.use(errorHandler);

export default app;
