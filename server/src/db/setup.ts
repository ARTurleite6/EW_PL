import mongoose from "mongoose";

export const URL = 'mongodb://127.0.0.1:27017/genere_db';

export function getConnection(): mongoose.Connection {
    mongoose.connect(URL);

    const db = mongoose.connection;

    db.on('error', err => {
        console.log('Error connection to mongoDB, error: ', err);
    });

    db.on('open', () => {
        console.log('Connection established');
    });

    return db;
}
