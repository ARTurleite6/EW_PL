import mongoose from 'mongoose'

const MONGODB_URI = 'mongodb://mongo:27017/geneses'; // Replace with your MongoDB connection string

mongoose.connect(MONGODB_URI);

export const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB!');
    // Your code here
});
