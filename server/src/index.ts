import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import path from 'path';
import { errorHandler } from './middleware/error';
import routes from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } })); // Allow cross-origin for uploaded images
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Routes
app.use('/api', routes);

// Base route for health check
app.get('/ping', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Aarohi API is running' });
});

// Global Error Handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
