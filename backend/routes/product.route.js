import express from 'express';

export const router = express.Router();

import {getProducts, createProduct, deleteProduct, updateProduct} from '../controllers/product.controller.js';

router.post('/', createProduct);

router.get('/', getProducts);

router.delete('/:id', deleteProduct);

router.patch('/:id', updateProduct)
router.put('/:id', updateProduct)