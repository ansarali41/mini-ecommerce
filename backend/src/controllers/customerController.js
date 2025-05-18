// Customer controller

const { Customer, User } = require('../models');

// Get customer profile
const getCustomerProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const customer = await Customer.findOne({
            where: { userId },
            include: [{ model: User, as: 'User', attributes: ['id', 'username', 'email'] }],
        });

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: 'Customer profile not found',
            });
        }

        res.status(200).json({
            success: true,
            customer,
        });
    } catch (error) {
        console.log('Error getting customer profile:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get customer profile',
            error: error.message,
        });
    }
};

// Create or update customer profile
const createUpdateCustomerProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { firstName, lastName, address, city, state, zipCode, country, phone } = req.body;

        // Check if customer profile already exists
        let customer = await Customer.findOne({ where: { userId } });

        if (customer) {
            // Update existing customer profile
            customer = await customer.update({
                firstName,
                lastName,
                address,
                city,
                state,
                zipCode,
                country,
                phone,
            });

            return res.status(200).json({
                success: true,
                message: 'Customer profile updated successfully',
                customer,
            });
        } else {
            // Create new customer profile
            customer = await Customer.create({
                userId,
                firstName,
                lastName,
                address,
                city,
                state,
                zipCode,
                country,
                phone,
            });

            return res.status(201).json({
                success: true,
                message: 'Customer profile created successfully',
                customer,
            });
        }
    } catch (error) {
        console.log('Error creating/updating customer profile:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create/update customer profile',
            error: error.message,
        });
    }
};

module.exports = {
    getCustomerProfile,
    createUpdateCustomerProfile,
};
