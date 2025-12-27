import { useGetProductsByCategory } from '@/api/products/get_by_category';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const Category = () => {
    const params = useParams();
    const { data: products, isLoading } = useGetProductsByCategory(params.name!);

    if (isLoading) {
        return (
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="border rounded-lg p-4 animate-pulse">
                            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4" />
                            <div className="h-4 bg-gray-200 rounded mb-2" />
                            <div className="h-4 bg-gray-200 rounded w-2/3" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="p-6">
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">ამ კატეგორიაში პროდუქტები არ მოიძებნა</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">{params.name}</h1>
                <p className="text-gray-500">{products.length} პროდუქტი</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div
                        key={product.uid}
                        className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    >
                        <div className="relative">
                            {product.image ? (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                            ) : (
                                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-400">No Image</span>
                                </div>
                            )}
                            {product.sale && (
                                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                                    -{product.sale}%
                                </div>
                            )}
                        </div>

                        <div className="p-4">
                            <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                                {product.name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-2">
                                {product.category.name}
                            </p>
                            <p className="text-xs text-gray-400 mb-3">
                                {product.weight} {product.unit.name}
                            </p>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xl font-bold text-blue-600">
                                        {product.price}₾
                                    </p>
                                    {product.stock > 0 ? (
                                        <p className="text-xs text-green-600">მარაგშია</p>
                                    ) : (
                                        <p className="text-xs text-red-600">არ არის მარაგში</p>
                                    )}
                                </div>
                                <button
                                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    disabled={product.stock === 0}
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;