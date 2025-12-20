import { useGetSingleProduct } from '@/api/products/get_single';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    ShoppingCart,
    Heart,
    Share2,
    Plus,
    Minus,
    Package,
    Truck,
    Shield,
    MapPin,
    Clock,
    Star,
    Sparkles,
    Zap,
    Search,
} from 'lucide-react';
import { API_URL } from '@/constants';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '@/store/cartSlice';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import type { TGetProducts } from '@/types';

const ProductDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: product, isLoading } = useGetSingleProduct(Number(params.uid));
    
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);

    const getActiveSale = (product: TGetProducts) => {
        return product.sales_items?.find(sale => sale.is_active === 1);
    };

    const calculateDiscountedPrice = (product: TGetProducts) => {
        const activeSale = getActiveSale(product);
        if (!activeSale) return null;

        const price = parseFloat(product.price);
        if (activeSale.type === 1) {
            return price - (price * activeSale.amount / 100);
        } else if (activeSale.type === 2) {
            return price - activeSale.amount;
        }
        return null;
    };

    const getDiscountDisplay = (product: TGetProducts) => {
        const activeSale = getActiveSale(product);
        if (!activeSale) return null;

        if (activeSale.type === 1) {
            return `${activeSale.amount}%`;
        } else if (activeSale.type === 2) {
            return `${activeSale.amount}₾`;
        }
        return null;
    };

    const isNewProduct = (product: TGetProducts) => {
        const now = dayjs();
        const createdAt = dayjs(product.created_at);
        const hoursDiff = now.diff(createdAt, 'hour');
        return hoursDiff <= 10;
    };

    const handleAddToCart = () => {
        if (product) {
            const activeSale = getActiveSale(product);
            const discountedPrice = calculateDiscountedPrice(product);
            const originalPrice = parseFloat(product.price);

            // dispatch(
            //     addItemToCart({
            //         product_uid: product.uid,
            //         product_image: product.image || '',
            //         has_sale: !!activeSale,
            //         new_price: discountedPrice || originalPrice,
            //         old_price: discountedPrice ? originalPrice : null,
            //         product_name: product.name,
            //         quantity: quantity,
            //     })
            // );
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center h-64">
                    <div className="text-muted-foreground">იტვირთება...</div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-center h-64">
                    <p className="text-xl font-semibold mb-3">პროდუქტი არ მოიძებნა</p>
                    <Button onClick={() => navigate('/')}>
                        მთავარ გვერდზე დაბრუნება
                    </Button>
                </div>
            </div>
        );
    }

    const activeSale = getActiveSale(product);
    const discountedPrice = calculateDiscountedPrice(product);
    const discountDisplay = getDiscountDisplay(product);
    const originalPrice = parseFloat(product.price);
    const inStock = product.stock > 0;
    const isNew = isNewProduct(product);
    const finalPrice = discountedPrice || originalPrice;
    const discountPercent = discountedPrice ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100) : 0;

    // Mock thumbnails (in real app, you'd have multiple images)
    const thumbnails = [product.image, product.image, product.image, product.image];

    return (
        <div className="bg-gray-50 dark:bg-slate-950 min-h-screen py-6">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left - Image Gallery */}
                    <div className="lg:col-span-7">
                        <div className="bg-white dark:bg-slate-900 rounded-lg overflow-hidden">
                            {/* Main Image */}
                            <div className="relative bg-white dark:bg-slate-900 p-8">
                                {/* Badges */}
                                {(isNew || activeSale) && (
                                    <div className="absolute top-4 left-4 z-10 flex gap-2">
                                        {discountPercent > 0 && (
                                            <Badge className="bg-pink-500 text-white text-sm px-3 py-1">
                                                -{discountPercent}%
                                            </Badge>
                                        )}
                                        {isNew && (
                                            <Badge className="bg-blue-500 text-white text-sm px-3 py-1">
                                                <Sparkles className="w-3 h-3 mr-1" />
                                                ახალი
                                            </Badge>
                                        )}
                                    </div>
                                )}

                                {/* Search Icon */}
                                <button className="absolute top-4 right-4 p-2 bg-white dark:bg-slate-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-slate-700">
                                    <Search className="w-5 h-5" />
                                </button>

                                <div className="aspect-square flex items-center justify-center">
                                    {product.image ? (
                                        <img
                                            src={`${API_URL}${product.image}`}
                                            alt={product.name}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    ) : (
                                        <Package className="w-32 h-32 text-slate-300" />
                                    )}
                                </div>
                            </div>

                            {/* Thumbnails */}
                            <div className="flex gap-2 p-4 bg-gray-50 dark:bg-slate-800">
                                {thumbnails.map((thumb, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`w-20 h-20 border-2 rounded-lg overflow-hidden flex-shrink-0 ${
                                            selectedImage === idx
                                                ? 'border-pink-500'
                                                : 'border-gray-200 dark:border-gray-700'
                                        }`}
                                    >
                                        {thumb ? (
                                            <img
                                                src={`${API_URL}${thumb}`}
                                                alt=""
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
                                                <Package className="w-8 h-8 text-gray-300" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Specifications Table */}
                        <div className="bg-white dark:bg-slate-900 rounded-lg overflow-hidden mt-6">
                            <div className="bg-pink-500 text-white px-6 py-4">
                                <h2 className="text-xl font-semibold">პროდუქტის დეტალები</h2>
                            </div>
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                <div className="grid grid-cols-3 px-6 py-4 hover:bg-gray-50 dark:hover:bg-slate-800">
                                    <div className="col-span-1 font-medium text-gray-700 dark:text-gray-300">
                                        კატეგორია
                                    </div>
                                    <div className="col-span-2 text-gray-900 dark:text-white">
                                        {product.category.name}
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 px-6 py-4 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700">
                                    <div className="col-span-1 font-medium text-gray-700 dark:text-gray-300">
                                        ბრენდი
                                    </div>
                                    <div className="col-span-2 text-gray-900 dark:text-white">
                                        {product.brand?.name || 'N/A'}
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 px-6 py-4 hover:bg-gray-50 dark:hover:bg-slate-800">
                                    <div className="col-span-1 font-medium text-gray-700 dark:text-gray-300">
                                        წონა
                                    </div>
                                    <div className="col-span-2 text-gray-900 dark:text-white">
                                        {product.weight} {product.unit.name}
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 px-6 py-4 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700">
                                    <div className="col-span-1 font-medium text-gray-700 dark:text-gray-300">
                                        მარაგი
                                    </div>
                                    <div className="col-span-2">
                                        <span className={`font-semibold ${inStock ? 'text-green-600' : 'text-red-600'}`}>
                                            {inStock ? `${product.stock} ცალი მარაგშია` : 'ამოიწურა'}
                                        </span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 px-6 py-4 hover:bg-gray-50 dark:hover:bg-slate-800">
                                    <div className="col-span-1 font-medium text-gray-700 dark:text-gray-300">
                                        პროდუქტის ID
                                    </div>
                                    <div className="col-span-2 text-gray-900 dark:text-white">
                                        #{product.uid}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Product Info */}
                    <div className="lg:col-span-5">
                        <div className="bg-white dark:bg-slate-900 rounded-lg p-6 sticky top-6">
                            {/* Title */}
                            <h1 className="text-2xl font-bold mb-3">{product.name}</h1>

                            {/* Brand */}
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-sm text-gray-600 dark:text-gray-400">ბრენდი:</span>
                                <span className="text-sm font-semibold text-[#006FEAFF]">
                                    {product.brand?.name || 'N/A'}
                                </span>
                            </div>

                            {/* Category & Tags */}
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-sm text-gray-600 dark:text-gray-400">კატეგორია:</span>
                                <Badge variant="outline" className="text-sm">
                                    {product.category.name}
                                </Badge>
                            </div>

                            {/* Product ID */}
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                კოდი: {product.uid} | პროდუქტის ID: #{product.uid}
                            </div>

                            <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6" />

                            {/* Availability Notice */}
                            <div className="bg-pink-50 dark:bg-pink-950 border-l-4 border-pink-500 p-4 mb-4">
                                <div className="flex items-start gap-2">
                                    <Zap className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                                    <div className="text-sm">
                                        <p className="font-semibold text-pink-700 dark:text-pink-300 mb-1">
                                            სწრაფი მიწოდება ყველა კომპონენტის შეძენა.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Info */}
                            <div className="space-y-3 mb-6">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                                    <div className="text-sm">
                                        <p className="font-semibold">მისამართი:</p>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            ა.კაზბეგის 115
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            მერაბ კოსტავას 73 (სამედიცინო სასახლის მიმდებარედ)
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="font-semibold text-green-600">გარანტია: 1 წელი</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        სამუშაო საათები: ყოველდღე (კვირის გარდა) 11:00-დან 20:00 საათამდე
                                    </p>
                                </div>
                            </div>

                            {/* Delivery Tags */}
                            <div className="flex gap-2 mb-6">
                                <Badge variant="outline" className="text-xs">საქართველო</Badge>
                                <Badge variant="outline" className="text-xs">ტექნოლოგია</Badge>
                            </div>

                            <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6" />

                            {/* Price */}
                            <div className="mb-6">
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-4xl font-bold text-pink-600">
                                        {finalPrice.toFixed(2)}₾
                                    </span>
                                    {discountedPrice && (
                                        <span className="text-xl text-gray-400 line-through">
                                            {originalPrice.toFixed(2)}₾
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border-2 rounded-lg overflow-hidden">
                                        <Button
                                            variant="ghost"
                                            className="h-12 px-4 rounded-none hover:bg-gray-100 dark:hover:bg-slate-800"
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            disabled={quantity <= 1}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </Button>
                                        <input
                                            type="text"
                                            value={quantity}
                                            readOnly
                                            className="w-16 h-12 text-center font-semibold bg-transparent border-x-2"
                                        />
                                        <Button
                                            variant="ghost"
                                            className="h-12 px-4 rounded-none hover:bg-gray-100 dark:hover:bg-slate-800"
                                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                            disabled={quantity >= product.stock}
                                        >
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 mb-4">
                                <Button
                                    className="flex-1 h-14 bg-pink-500 hover:bg-pink-600 text-white text-base font-semibold"
                                    disabled={!inStock}
                                    onClick={handleAddToCart}
                                >
                                    კალათაში დამატება
                                </Button>
                                <Button
                                    className="flex-1 h-14 bg-pink-600 hover:bg-pink-700 text-white text-base font-semibold"
                                    disabled={!inStock}
                                >
                                    ყიდვა
                                </Button>
                            </div>

                            {/* Wishlist & Share */}
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    className={`flex-1 h-12 ${isFavorite ? 'border-pink-500 text-pink-500' : ''}`}
                                    onClick={() => setIsFavorite(!isFavorite)}
                                >
                                    <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                                    რჩეულებში
                                </Button>
                                <Button variant="outline" className="flex-1 h-12">
                                    <Share2 className="w-4 h-4 mr-2" />
                                    გაზიარება
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;