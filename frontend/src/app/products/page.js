'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { productsApi, categoriesApi } from '../../utils/api';
import { useCart } from '../../contexts/CartContext'; // Updated import path

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart(); // Get addToCart function from cart context

    // Log cart context on mount for debugging
    useEffect(() => {
        console.log('Cart context loaded:', { addToCartExists: typeof addToCart === 'function' });
    }, [addToCart]);

    // Filters
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [searchQuery, setSearchQuery] = useState('');
    const [minRating, setMinRating] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Prepare filter params
                const params = {};

                if (selectedCategory) {
                    params.categoryId = selectedCategory;
                }

                if (priceRange.min > 0) {
                    params.minPrice = priceRange.min;
                }

                if (priceRange.max < 1000) {
                    params.maxPrice = priceRange.max;
                }

                if (searchQuery) {
                    params.search = searchQuery;
                }

                if (minRating > 0) {
                    params.minRating = minRating;
                }

                console.log('Applying filters:', params);

                // Fetch products with filters
                const productsResponse = await productsApi.getAll(params);
                console.log('Products API Response:', productsResponse);

                // Ensure products is always an array
                setProducts(productsApi.processResponse(productsResponse));

                // Fetch categories
                const categoriesResponse = await categoriesApi.getAll();

                // Ensure categories is always an array
                setCategories(categoriesApi.processResponse(categoriesResponse));

                setLoading(false);
            } catch (err) {
                console.log('Error fetching data:', err);
                setError('Failed to fetch products. Please try again later.');
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedCategory, priceRange, searchQuery, minRating]);

    // Handler for adding items to cart
    const handleAddToCart = product => {
        // Check if product data is valid
        if (!product || !product.id) {
            console.error('Invalid product data:', product);
            return;
        }

        try {
            // Check if addToCart is available
            if (typeof addToCart !== 'function') {
                console.log('addToCart is not a function:', addToCart);
                return;
            }

            // Add the item to the cart
            addToCart(product, 1);

            console.log(`Product added to cart: ${product.name}`);
        } catch (err) {
            console.error('Error adding to cart:', err);
        }
    };

    const handleCategoryChange = e => {
        setSelectedCategory(e.target.value);
    };

    const handlePriceChange = (e, type) => {
        setPriceRange({
            ...priceRange,
            [type]: Number(e.target.value),
        });
    };

    const handleRatingChange = e => {
        setMinRating(Number(e.target.value));
    };

    const handleSearchChange = e => {
        setSearchQuery(e.target.value);
    };

    const resetFilters = () => {
        setSelectedCategory('');
        setPriceRange({ min: 0, max: 1000 });
        setSearchQuery('');
        setMinRating(0);
    };

    if (loading) {
        return <div className="text-center py-10 text-gray-800 font-medium bg-gray-50 border border-gray-200 rounded-lg shadow-sm">Loading products...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-700 font-medium bg-red-50 rounded-lg border border-red-200 mx-auto max-w-2xl p-4 shadow-sm">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">All Products</h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Filters Sidebar */}
                <div className="w-full md:w-1/4 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Filters</h2>

                    {/* Search */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2 text-gray-700">Search</label>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 placeholder-gray-500"
                            placeholder="Search products..."
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2 text-gray-700">Category</label>
                        <select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                        >
                            <option value="">All Categories</option>
                            {Array.isArray(categories) &&
                                categories.map(category => (
                                    <option key={category?.id || Math.random()} value={category?.id || ''}>
                                        {category?.name || 'Unnamed Category'}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* Price Range */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2 text-gray-700">Price Range</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                value={priceRange.min}
                                onChange={e => handlePriceChange(e, 'min')}
                                className="w-1/2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                                min="0"
                                placeholder="Min"
                            />
                            <span className="text-gray-700">-</span>
                            <input
                                type="number"
                                value={priceRange.max}
                                onChange={e => handlePriceChange(e, 'max')}
                                className="w-1/2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                                min="0"
                                placeholder="Max"
                            />
                        </div>
                    </div>

                    {/* Rating Filter */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                            Minimum Rating: <span className="font-semibold text-blue-600">{minRating}</span>
                        </label>
                        <input type="range" min="0" max="5" step="0.5" value={minRating} onChange={handleRatingChange} className="w-full accent-blue-600" />
                    </div>

                    {/* Reset Filters */}
                    <button
                        onClick={resetFilters}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 font-medium shadow-sm border border-blue-700"
                    >
                        Reset Filters
                    </button>
                </div>

                {/* Products Grid */}
                <div className="w-full md:w-3/4">
                    {products.length === 0 ? (
                        <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                            <p className="text-gray-700 font-medium">No products found matching your criteria.</p>
                            <button onClick={resetFilters} className="mt-4 text-blue-600 hover:text-blue-800 hover:underline font-medium">
                                Clear filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.isArray(products) &&
                                products.map(product => (
                                    <div key={product?.id || Math.random()} className="border rounded-lg overflow-hidden hover:shadow-lg transition duration-300 bg-white">
                                        <div className="h-48 bg-gray-200 relative">
                                            {product?.image ? (
                                                <img src={product.image} alt={product?.name || 'Product'} className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-800">{product?.name || 'Unnamed Product'}</h3>
                                            <p className="text-gray-600 text-sm mb-2">{product?.categoryName || 'Uncategorized'}</p>
                                            <div className="flex justify-between items-center">
                                                <span className="font-bold text-blue-600">${parseFloat(product?.price || 0).toFixed(2)}</span>
                                                <div className="flex items-center">
                                                    <span className="text-yellow-500">★</span>
                                                    <span className="ml-1 text-gray-700">{product?.rating ? parseFloat(product.rating).toFixed(1) : '0.0'}</span>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex space-x-2">
                                                <Link
                                                    href={`/product/${product?.id || ''}`}
                                                    className="bg-blue-600 text-white py-1 px-3 rounded text-sm flex-1 text-center hover:bg-blue-700 shadow-sm"
                                                >
                                                    View Details
                                                </Link>
                                                <button
                                                    onClick={() => handleAddToCart(product)}
                                                    className="bg-green-600 text-white py-1 px-3 rounded text-sm hover:bg-green-700 shadow-sm"
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
