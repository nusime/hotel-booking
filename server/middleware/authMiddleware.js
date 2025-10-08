import User from "../models/User.js";
import { createClerkClient } from '@clerk/clerk-sdk-node';

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

// Middleware to check if user is authenticated

export const protect = async (req, res, next) => {
    console.log('Auth middleware - req.auth:', req.auth);
    console.log('Auth middleware - req.headers.authorization:', req.headers.authorization);
    const userId = req.auth.userId;

    if (!userId) {
        console.log('No userId found, returning 401');
        return res.status(401).json({success: false, message: 'Not authenticated'});
    }

    let user = await User.findById(userId);
    console.log('User lookup result:', user);
    if (!user) {
        console.log('User not found in DB, fetching from Clerk and creating...');
        try {
            const clerkUser = await clerkClient.users.getUser(userId);
            const userData = {
                _id: clerkUser.id,
                email: clerkUser.emailAddresses[0]?.emailAddress,
                username: clerkUser.firstName + ' ' + clerkUser.lastName,
                image: clerkUser.imageUrl,
            };
            user = await User.create(userData);
            console.log('User created in DB:', user);
        } catch (error) {
            console.log('Error creating user:', error);
            return res.status(401).json({ success: false, message: 'Failed to create user' });
        }
    }

    req.user = user;
    next();
};