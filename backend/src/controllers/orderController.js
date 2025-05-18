// Order controller

const { Order, OrderItem, Product, Customer } = require('../models');
const sequelize = require('../config/database');

// Create new order
const createOrder = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const userId = req.user.id;
        const { items, paymentMethod, customerId } = req.body;

        // Validate customerId
        const customer = await Customer.findOne({
            where: { id: customerId, userId },
        });

        if (!customer) {
            await transaction.rollback();
            return res.status(404).json({
                success: false,
                message: 'Customer not found or does not belong to the current user',
            });
        }

        // Validate items
        if (!items || !Array.isArray(items) || items.length === 0) {
            await transaction.rollback();
            return res.status(400).json({
                success: false,
                message: 'Order must contain at least one item',
            });
        }

        // Calculate total amount and validate stock
        let totalAmount = 0;
        const orderItems = [];

        for (const item of items) {
            const { productId, quantity } = item;

            // Get product details
            const product = await Product.findByPk(productId);
            if (!product) {
                await transaction.rollback();
                return res.status(404).json({
                    success: false,
                    message: `Product with ID ${productId} not found`,
                });
            }

            // Check stock availability
            if (product.stock < quantity) {
                await transaction.rollback();
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for product: ${product.name}. Available: ${product.stock}, Requested: ${quantity}`,
                });
            }

            // Calculate subtotal
            const subtotal = product.price * quantity;
            totalAmount += subtotal;

            // Add to order items
            orderItems.push({
                productId,
                quantity,
                price: product.price,
                subtotal,
            });

            // Update product stock
            await product.update({ stock: product.stock - quantity }, { transaction });
        }

        // Create order
        const order = await Order.create(
            {
                userId,
                customerId,
                totalAmount,
                status: 'pending',
                paymentMethod,
                paymentStatus: 'pending',
            },
            { transaction },
        );

        // Create order items
        for (const item of orderItems) {
            await OrderItem.create(
                {
                    orderId: order.id,
                    ...item,
                },
                { transaction },
            );
        }

        await transaction.commit();

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            order: {
                ...order.toJSON(),
                items: orderItems,
            },
        });
    } catch (error) {
        await transaction.rollback();
        console.log('Error creating order:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create order',
            error: error.message,
        });
    }
};

// Get all orders for current user
const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        const orders = await Order.findAll({
            where: { userId },
            include: [
                {
                    model: OrderItem,
                    as: 'items',
                    include: [
                        {
                            model: Product,
                            as: 'product',
                        },
                    ],
                },
            ],
            order: [['createdAt', 'DESC']],
        });

        res.status(200).json({
            success: true,
            count: orders.length,
            orders,
        });
    } catch (error) {
        console.log('Error getting user orders:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get orders',
            error: error.message,
        });
    }
};

// Get order by ID
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const order = await Order.findOne({
            where: { id, userId },
            include: [
                {
                    model: OrderItem,
                    as: 'items',
                    include: [
                        {
                            model: Product,
                            as: 'product',
                        },
                    ],
                },
                {
                    model: Customer,
                    as: 'customer',
                },
            ],
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.log('Error getting order:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get order',
            error: error.message,
        });
    }
};

// Cancel order
const cancelOrder = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Find the order
        const order = await Order.findOne({
            where: { id, userId },
            include: [
                {
                    model: OrderItem,
                    as: 'items',
                },
            ],
        });

        if (!order) {
            await transaction.rollback();
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }

        // Check if order can be cancelled
        if (order.status !== 'pending' && order.status !== 'processing') {
            await transaction.rollback();
            return res.status(400).json({
                success: false,
                message: `Cannot cancel order with status: ${order.status}`,
            });
        }

        // Update order status
        await order.update(
            {
                status: 'cancelled',
                paymentStatus: order.paymentStatus === 'completed' ? 'refunded' : 'cancelled',
            },
            { transaction },
        );

        // Restore product stock
        for (const item of order.items) {
            const product = await Product.findByPk(item.productId);
            if (product) {
                await product.update({ stock: product.stock + item.quantity }, { transaction });
            }
        }

        await transaction.commit();

        res.status(200).json({
            success: true,
            message: 'Order cancelled successfully',
            order,
        });
    } catch (error) {
        await transaction.rollback();
        console.log('Error cancelling order:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to cancel order',
            error: error.message,
        });
    }
};

module.exports = {
    createOrder,
    getUserOrders,
    getOrderById,
    cancelOrder,
};
