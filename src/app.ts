import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import meetingRoutes from './routes/meetingRoutes';
import { errorHandler, notFoundHandler } from './middlewares/errormiddleware';
import { config } from './config';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logger
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Routes
app.use('/api', meetingRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;