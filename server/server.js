import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks, { deleteUserAccount } from './controllers/clerckWebHooks.js';
import useRouter from './routes/userRoutes.js';
import hotelRouter from './routes/hotelRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import roomRouter from './routes/roomRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';

connectDB();
connectCloudinary();

const app = express();
app.use(cors());

// Clerk middleware
app.use(express.json());
app.use(clerkMiddleware());

// API to listen to clerk webhooks
app.use('/api/clerk', clerkWebhooks);

// API to delete user account
app.post('/api/delete-user', deleteUserAccount);

app.get('/', (req, res) => res.send('API is working'));
app.use('/api/user', useRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/bookings', bookingRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));