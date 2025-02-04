import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import {router} from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4500;

app.use(express.json());
app.use("/api/v1/products", router);

app.get('/', (req, res) => {
    res.send("API is running...");
});

app.listen(PORT, () => {
    connectDB();
    console.log('Server is listening on port ' + PORT + ' http://localhost:' + PORT);
});