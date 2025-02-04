import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {
    try{
        const products = await Product.find();
        res.status(201).json(products);
    }catch(error) {
        return res.status(500).send({messege : error.messege});
    }
};

export const createProduct = async (req, res) => {
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
}

export const deleteProduct = async (req, res) => {
    const productId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).send({messege : "Invalid Product Id"});
    }

    try {
        const product = await Product.findByIdAndDelete(productId);
        if(!product) {
            return res.status(404).send({messege : "Product not found"});
        }
        res.status(200).send({messege : "Product deleted successfully"});
    } catch (error) {
        return res.status(500).send({messege : error.messege});
    }
}

export const updateProduct = async (req,res) => {
    const productId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).send({messege : "Invalid Product Id"});
    }
    
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
}