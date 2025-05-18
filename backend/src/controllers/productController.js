// Product controller

const { Product, Category } = require('../models');
const { Op } = require('sequelize');

// Get all products with filtering
const getAllProducts = async (req, res) => {
    try {
        const { category, minPrice, maxPrice, minRating, search, page = 1, limit = 10, sortBy = 'id', sortOrder = 'ASC' } = req.query;

        // Build query condition
        const whereCondition = {};
        const categoryCondition = {};

        // Filter by category
        if (category) {
            categoryCondition.name = category;
        }

        // Filter by price range
        if (minPrice || maxPrice) {
            whereCondition.price = {};
            if (minPrice) whereCondition.price[Op.gte] = parseFloat(minPrice);
            if (maxPrice) whereCondition.price[Op.lte] = parseFloat(maxPrice);
        }

        // Filter by rating
        if (minRating) {
            whereCondition.rating = { [Op.gte]: parseFloat(minRating) };
        }

        // Search by name or description
        if (search) {
            whereCondition[Op.or] = [{ name: { [Op.like]: `%${search}%` } }, { description: { [Op.like]: `%${search}%` } }];
        }

        // Calculate pagination parameters
        const offset = (parseInt(page) - 1) * parseInt(limit);
        const pageLimit = parseInt(limit);

        // Determine sort field and order
        const sortField = sortBy || 'id';
        const sortDirection = sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

        // Get products with filtering, sorting, and pagination
        const { count, rows: products } = await Product.findAndCountAll({
            where: whereCondition,
            include: [
                {
                    model: Category,
                    as: 'category',
                    where: Object.keys(categoryCondition).length ? categoryCondition : undefined,
                },
            ],
            order: [[sortField, sortDirection]],
            offset,
            limit: pageLimit,
        });

        // Calculate total pages
        const totalPages = Math.ceil(count / pageLimit);

        res.status(200).json({
            success: true,
            count,
            totalPages,
            currentPage: parseInt(page),
            products,
        });
    } catch (error) {
        console.log('Error getting products:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get products',
            error: error.message,
        });
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id, {
            include: [{ model: Category, as: 'category' }],
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        console.log('Error getting product:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get product',
            error: error.message,
        });
    }
};

// Create new product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, image, categoryId, rating } = req.body;

        // Check if category exists
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }

        // Create product
        const product = await Product.create({
            name,
            description,
            price,
            stock,
            image,
            categoryId,
            rating: rating || 0,
        });

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product,
        });
    } catch (error) {
        console.log('Error creating product:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create product',
            error: error.message,
        });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, image, categoryId, rating } = req.body;

        // Find the product
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        // Check if category exists if categoryId is provided
        if (categoryId) {
            const category = await Category.findByPk(categoryId);
            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found',
                });
            }
        }

        // Update product
        await product.update({
            name: name || product.name,
            description: description || product.description,
            price: price || product.price,
            stock: stock !== undefined ? stock : product.stock,
            image: image || product.image,
            categoryId: categoryId || product.categoryId,
            rating: rating !== undefined ? rating : product.rating,
        });

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product,
        });
    } catch (error) {
        console.log('Error updating product:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update product',
            error: error.message,
        });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the product
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        // Delete product
        await product.destroy();

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
        });
    } catch (error) {
        console.log('Error deleting product:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete product',
            error: error.message,
        });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
