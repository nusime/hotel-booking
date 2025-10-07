import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log('Database connected'));
        mongoose.connection.on('error', (err) => console.log('Database connection error:', err.message));
        
        const connectionOptions = {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 30000,
            connectTimeoutMS: 10000,
            maxPoolSize: 5,
            minPoolSize: 1,
            maxIdleTimeMS: 30000,
            retryWrites: true,
            w: 'majority',
            authSource: 'admin',
            ssl: true,
            family: 4
        };
        
        mongoose.set('bufferCommands', true);
        
        const connectWithTimeout = new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Connection timeout after 15 seconds'));
            }, 15000);
            
            mongoose.connect(process.env.MONGODB_URI, connectionOptions)
                .then(() => {
                    clearTimeout(timeout);
                    resolve();
                })
                .catch((err) => {
                    clearTimeout(timeout);
                    reject(err);
                });
        });
        
        await connectWithTimeout;
        await mongoose.connection.db.admin().ping();
        
    } catch (error) {
        console.error('Database connection failed:', error.message);
        
        if (!global.dbRetryCount) global.dbRetryCount = 0;
        global.dbRetryCount++;
        
        if (global.dbRetryCount < 3) {
            setTimeout(() => {
                console.log(`Retrying database connection (${global.dbRetryCount + 1}/3) in 10 seconds...`);
                connectDB();
            }, 10000);
        } else {
            console.error('Maximum retry attempts reached. Please check MongoDB Atlas configuration.');
        }
    }
}

export default connectDB;