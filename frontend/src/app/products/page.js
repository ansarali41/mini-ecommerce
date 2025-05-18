'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { productsApi, categoriesApi } from '../../utils/api';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filters
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [searchQuery, setSearchQuery] = useState('');
    const [minRating, setMinRating] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch products with filters
                const queryParams = new URLSearchParams();

                if (selectedCategory) {
                    queryParams.append('categoryId', selectedCategory);
                }

                if (priceRange.min > 0 || priceRange.max < 1000) {
                    queryParams.append('minPrice', priceRange.min);
                    queryParams.append('maxPrice', priceRange.max);
                }

                if (searchQuery) {
                    queryParams.append('search', searchQuery);
                }

                if (minRating > 0) {
                    queryParams.append('minRating', minRating);
                }

                const productsResponse = await productsApi.getAll();
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
        return <div className="text-center py-10">Loading products...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-600">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">All Products</h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Filters Sidebar */}
                <div className="w-full md:w-1/4 bg-gray-50 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Filters</h2>

                    {/* Search */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Search</label>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Search products..."
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select value={selectedCategory} onChange={handleCategoryChange} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                        <label className="block text-sm font-medium mb-2">Price Range</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                value={priceRange.min}
                                onChange={e => handlePriceChange(e, 'min')}
                                className="w-1/2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="0"
                                placeholder="Min"
                            />
                            <span>-</span>
                            <input
                                type="number"
                                value={priceRange.max}
                                onChange={e => handlePriceChange(e, 'max')}
                                className="w-1/2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="0"
                                placeholder="Max"
                            />
                        </div>
                    </div>

                    {/* Rating Filter */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Minimum Rating: {minRating}</label>
                        <input type="range" min="0" max="5" step="0.5" value={minRating} onChange={handleRatingChange} className="w-full" />
                    </div>

                    {/* Reset Filters */}
                    <button onClick={resetFilters} className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition duration-200">
                        Reset Filters
                    </button>
                </div>

                {/* Products Grid */}
                <div className="w-full md:w-3/4">
                    {products.length === 0 ? (
                        <div className="text-center py-10 bg-gray-50 rounded-lg">
                            <p className="text-gray-500">No products found matching your criteria.</p>
                            <button onClick={resetFilters} className="mt-4 text-blue-600 hover:underline">
                                Clear filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.isArray(products) &&
                                products.map(product => (
                                    <div key={product?.id || Math.random()} className="border rounded-lg overflow-hidden hover:shadow-lg transition duration-300">
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
                                                <button className="bg-green-600 text-white py-1 px-3 rounded text-sm">Add to Cart</button>
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
