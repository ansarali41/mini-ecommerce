'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    // Load cart from localStorage on initial render
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                setCart(JSON.parse(savedCart));
            }
        } catch (error) {
            console.log('Error loading cart from localStorage:', error);
        }
    }, []);

    // Update totalItems and totalPrice whenever cart changes
    useEffect(() => {
        const itemCount = cart.reduce((total, item) => total + (parseInt(item.quantity) || 0), 0);
        const price = cart.reduce((total, item) => total + (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 0), 0);

        setTotalItems(itemCount);
        setTotalPrice(price);

        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Add item to cart
    const addToCart = (product, quantity = 1) => {
        const parsedQuantity = parseInt(quantity || 1);

        setCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(item => item.id === product.id);

            if (existingItemIndex >= 0) {
                // Item already exists, update quantity
                const updatedCart = [...prevCart];
                const newQuantity = updatedCart[existingItemIndex].quantity + parsedQuantity;
                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    quantity: newQuantity,
                };
                return updatedCart;
            } else {
                // Add new item
                return [
                    ...prevCart,
                    {
                        id: product.id,
                        name: product.name,
                        price: parseFloat(product.price || 0),
                        image: product.image,
                        quantity: parsedQuantity,
                    },
                ];
            }
        });
    };

    // Update item quantity
    const updateQuantity = (productId, quantity) => {
        const parsedQuantity = parseInt(quantity || 0);

        if (parsedQuantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCart(prevCart => {
            return prevCart.map(item => (item.id === productId ? { ...item, quantity: parsedQuantity } : item));
        });
    };

    // Remove item from cart
    const removeFromCart = productId => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    // Clear cart
    const clearCart = () => {
        setCart([]);
    };

    const value = {
        cart,
        totalItems,
        totalPrice,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    return useContext(CartContext);
}
