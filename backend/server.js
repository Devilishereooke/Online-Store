import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {connectDB} from './config/db.js';
import Product from './models/product.model.js';
import { error } from 'console';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("API is running...");
});

app.get('/api/v1/products', async (req, res) => {
    try{
        const products = await Product.find();
        res.status(201).json(products);
    }catch(error) {
        return res.status(500).send({messege : error.messege});
    }
});

app.post('/api/v1/products', async (req, res) => {
    const product = req.body;

    if(!product.name || !product.price || !product.imageUrl) {
        return res.status(400).send("Please provide all required fields");
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save();
    }catch(error) {
        return res.status(500).send({messege : error.messege});
    };

    res.status(201).send({messege : "Product created successfully", product: newProduct});
});

app.delete('/api/v1/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findByIdAndDelete(productId);
        if(!product) {
            return res.status(404).send({messege : "Product not found"});
        }
        res.status(200).send({messege : "Product deleted successfully"});
    } catch (error) {
        return res.status(500).send({messege : error.messege});
    }
})

app.patch('/api/v1/products/:id', async (req,res) => {
    const productId = req.params.id;
    const product = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, product, {new: true});
        if(!updatedProduct) {
            return res.status(404).send({messege : "Product not found"});
        }
        res.status(200).send({messege : "Product updated successfully", product: updatedProduct});
    } catch (error) {
        res.status(500).send({messege : error.messege});
    }
})

app.listen(4500, () => {
    connectDB();
    console.log('Server is listening on port 4500 http://localhost:4500');
});