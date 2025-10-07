import User from "../models/User.js";
import { createClerkClient } from '@clerk/clerk-sdk-node';
import mongoose from 'mongoose';

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

// Middleware to check if user is authenticated
export const protect = async (req, res, next) => {
    // Check database connection state
    const dbState = mongoose.connection.readyState;
    
    if (dbState === 0) {
        return res.status(503).json({
            success: false,
            message: 'Database connection unavailable'
        });
    }
    
    if (dbState === 2) {
        // Wait a short time for connection to complete
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const newDbState = mongoose.connection.readyState;
        if (newDbState !== 1) {
            return res.status(503).json({
                success: false,
                message: 'Database connection timeout'
            });
        }
    }

    const userId = req.auth?.userId;

    if (!userId) {
        return res.status(401).json({success: false, message: 'Not authenticated'});
    }
    
    try {
        const user = await User.findById(userId).maxTimeMS(5000);
        
        if (!user) {
            try {
                const clerkUser = await clerkClient.users.getUser(userId);
                const userData = {
                    _id: clerkUser.id,
                    email: clerkUser.emailAddresses[0]?.emailAddress,
                    username: clerkUser.firstName + ' ' + clerkUser.lastName,
                    image: clerkUser.imageUrl,
                };
                
                const newUser = await User.create(userData);
                req.user = newUser;
            } catch (clerkError) {
                return res.status(401).json({
                    success: false,
                    message: 'Failed to authenticate user'
                });
            }
        } else {
            req.user = user;
        }

        next();
        
    } catch (dbError) {
        if (dbError.name === 'MongooseError' && dbError.message.includes('buffering timed out')) {
            return res.status(503).json({
                success: false,
                message: 'Database connection timeout'
            });
        }
        
        return res.status(500).json({
            success: false,
            message: 'Database error during authentication'
        });
    }
};