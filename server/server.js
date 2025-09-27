import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks, { deleteUserAccount } from './controllers/clerckWebHooks.js';

connectDB();

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));