'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    // If product is not provided, show a placeholder
    if (!product) {
        return (
            <div className="border rounded-lg overflow-hidden">
                <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400">No Product Data</div>
                <div className="p-4">
                    <h3 className="font-semibold">Product Unavailable</h3>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, 1);
    };

    return (
        <div className="border rounded-lg overflow-hidden hover:shadow-lg transition duration-300">
            <div className="h-48 bg-gray-200 relative">
                {product?.image ? (
                    <img src={product.image} alt={product?.name || 'Product'} className="h-full w-full object-cover" />
                ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
                )}
            </div>
            <div className="p-4">
                <h3 className="font-semibold">{product?.name || 'Unnamed Product'}</h3>
                <p className="text-gray-500 text-sm mb-2">{product?.categoryName || 'Uncategorized'}</p>
                <div className="flex justify-between items-center">
                    <span className="font-bold">${parseFloat(product?.price || 0).toFixed(2)}</span>
                    <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1">{product?.rating ? parseFloat(product.rating).toFixed(1) : '0.0'}</span>
                    </div>
                </div>
                <div className="mt-4 flex space-x-2">
                    <Link href={`/product/${product?.id || ''}`} className="bg-blue-600 text-white py-1 px-3 rounded text-sm flex-1 text-center">
                        View Details
                    </Link>
                    <button onClick={handleAddToCart} className="bg-green-600 text-white py-1 px-3 rounded text-sm">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
