import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';

dotenv.config();

const app = express();

app.listen(4500, () => {
    connectDB();
    console.log('Server is listening on port 4500...');
});