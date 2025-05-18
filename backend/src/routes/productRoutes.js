// Product routes

const express = require('express');
const { body } = require('express-validator');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { authenticate, isAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all products - public
router.get('/', getAllProducts);

// Get product by ID - public
router.get('/:id', getProductById);

// Create product - admin only
router.post(
    '/',
    authenticate,
    isAdmin,
    [
        body('name').notEmpty().withMessage('Product name is required'),
        body('price').isNumeric().withMessage('Price must be a number'),
        body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
        body('categoryId').isInt().withMessage('Valid category ID is required'),
    ],
    createProduct,
);

// Update product - admin only
router.put('/:id', authenticate, isAdmin, updateProduct);

// Delete product - admin only
router.delete('/:id', authenticate, isAdmin, deleteProduct);

module.exports = router;
