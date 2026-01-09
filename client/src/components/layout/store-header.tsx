import { useState } from 'react';
import CFlex from '../ui/flex';
import { CButton } from '../common/custom-button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSidebar } from '../ui/sidebar';
import { Menu, Headphones, Search, X } from 'lucide-react';
import { useTheme } from '@/providers/theme-provider';
import Cart from '../cart/cart';
import ProfileSection from '../common/profile-section';
import { useGetProducts } from '@/api/products/get';
import type { TGetProducts } from '@/types';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '@/constants';

const StoreHeader = () => {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const { toggleSidebar } = useSidebar();
    const { theme } = useTheme();
    const [searchValue, setSearchValue] = useState('');
    const [showResults, setShowResults] = useState(false);
    const { data: products, isLoading } = useGetProducts();

    const filteredProducts =
        searchValue && products
            ? products.filter((product) =>
                  product.name.toLowerCase().includes(searchValue.toLowerCase())
              )
            : [];

    const handleClearSearch = () => {
        setSearchValue('');
        setShowResults(false);
    };

    const handleProductClick = (product: TGetProducts) => {
        const pLink = product.name.toLowerCase().trim().replace(/\s+/g, '-');
        navigate(`/product/${pLink}/${product.uid}`);
        setSearchValue('');
        setShowResults(false);
    };

    return (
        <div
            className="fixed right-0 top-0 w-full z-50 pl-[275px] px-5 h-[73.5px] border-b flex items-center justify-between"
            style={{ backgroundColor: theme === 'dark' ? '#121212' : '#ffffff' }}
        >
            <div className="relative flex-1 max-w-2xl">
                <div
                    className="relative flex items-center border rounded-lg"
                    style={{
                        backgroundColor: theme === 'dark' ? '#1e1e1e' : '#f8f9fa',
                    }}
                >
                    <Search className="absolute left-3 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                            setShowResults(e.target.value.length > 0);
                        }}
                        onFocus={() => searchValue && setShowResults(true)}
                        onBlur={() => setTimeout(() => setShowResults(false), 200)}
                        placeholder="პროდუქტების ძებნა..."
                        className="w-full pl-10 pr-10 py-2.5 bg-transparent outline-none text-sm"
                        style={{
                            color: theme === 'dark' ? '#ffffff' : '#1f2937',
                        }}
                    />
                    {searchValue && (
                        <button
                            onClick={handleClearSearch}
                            className="absolute right-3 p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                        >
                            <X className="w-4 h-4 text-gray-400" />
                        </button>
                    )}
                </div>

                {/* Search Results Dropdown */}
                {showResults && searchValue && (
                    <div
                        className="absolute top-full left-0 right-0 mt-2 border rounded-lg shadow-lg overflow-hidden z-50"
                        style={{
                            backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff',
                        }}
                    >
                        {isLoading ? (
                            <div className="px-4 py-6 text-center text-sm text-gray-500">
                                იტვირთება...
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <div className="max-h-96 ">
                                {filteredProducts.map((product) => (
                                    <div
                                        key={product.uid}
                                        onMouseDown={() => handleProductClick(product)}
                                        className="px-4 py-3 w-full hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex items-center gap-3 border-b last:border-b-0"
                                    >
                                        {product.image ? (
                                            <img
                                                src={`${API_URL}${product.image}`}
                                                alt={product.name}
                                                className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0" />
                                        )}
                                        <div className="flex-1">
                                            <div className="text-sm font-medium">
                                                {product.name}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {product.category.name}
                                            </div>
                                        </div>
                                        <div className="text-sm font-semibold text-blue-600">
                                            {product.price}₾
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="px-4 py-6 text-center text-sm text-gray-500">
                                პროდუქტი ვერ მოიძებნა
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div>
                {isMobile ? (
                    <CButton onClick={() => toggleSidebar()} variant="outline" icon={Menu} />
                ) : null}
            </div>

            <CFlex align="center" gap="15px">
                <CFlex align="center" gap="10px">
                    <Headphones className="w-7 h-7" strokeWidth={1.5} />
                    <div className="flex flex-col gap-y-1">
                        <span className="text-xs text-gray-500">მხარდაჭერა</span>
                        <a
                            href="tel:599093209"
                            className="text-sm font-semibold text-[#006FEAFF] hover:underline leading-tight"
                        >
                            571 13 48 44
                        </a>
                    </div>
                </CFlex>

                {/* Profile Section */}
                <ProfileSection />

                {/* Cart Section */}
                <Cart />
            </CFlex>
        </div>
    );
};

export default StoreHeader;
