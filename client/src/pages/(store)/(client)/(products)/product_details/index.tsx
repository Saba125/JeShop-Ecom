import { useGetSingleProduct } from '@/api/products/get_single';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    ShoppingCart,
    Heart,
    Share2,
    Plus,
    Minus,
    Package,
    Shield,
    MapPin,
    Clock,
    Star,
    Sparkles,
    Zap,
    Search,
    StarIcon,
} from 'lucide-react';
import { API_URL } from '@/constants';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import type { TGetProducts } from '@/types';
import { useGetSimilarProducts } from '@/api/products/get_similar';
import { addItemToCart } from '@/store/cartSlice';
import { CButton } from '@/components/common/custom-button';
import ReviewsModal from '@/components/common/review-modal';
import { useGetReviews } from '@/api/reviews/get';

const ProductDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: product, isLoading } = useGetSingleProduct(Number(params.uid));
    const { data: similarProducts, isLoading: isSimilarLoading } = useGetSimilarProducts(
        Number(params.uid)
    );
    const { data: reviews, isLoading: isReviewsLoading } = useGetReviews(Number(params.uid));
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [addReviewModal, setAddReviewModal] = useState(false);
    const getActiveSale = (product: TGetProducts) => {
        return product.sales_items?.find((sale) => sale.is_active === 1);
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [params.uid]);

    const calculateDiscountedPrice = (product: TGetProducts) => {
        const activeSale = getActiveSale(product);
        if (!activeSale) return null;

        const price = parseFloat(product.price);
        if (activeSale.type === 1) {
            return price - (price * activeSale.amount) / 100;
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

            dispatch(
                addItemToCart({
                    product_uid: product.uid,
                    product_image: product.image || '',
                    has_sale: !!activeSale,
                    new_price: discountedPrice || originalPrice,
                    old_price: discountedPrice ? originalPrice : null,
                    product_name: product.name,
                    quantity: quantity,
                    stock: product.stock,
                })
            );
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
                    <Button onClick={() => navigate('/')}>მთავარ გვერდზე დაბრუნება</Button>
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
    const discountPercent = discountedPrice
        ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100)
        : 0;

    // NOW it's safe to create thumbnails array
    const thumbnails = [product.image, product.image, product.image, product.image];
    return (
        <>
            <div className=" min-h-screen py-6">
                <div className="container mx-auto ">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-5">
                            <div className="bg-white dark:bg-slate-900 rounded-lg overflow-hidden">
                                <div className="relative bg-white dark:bg-slate-900 p-8">
                                    {/* Badges */}
                                    {(isNew || activeSale) && (
                                        <div className="absolute top-4 left-4 z-10 flex gap-2">
                                            {discountPercent > 0 && (
                                                <Badge className="bg-red-500 text-white text-sm px-3 py-1">
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
                                                    ? 'border-[#006FEAFF]'
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
                                <div className="bg-[#006FEAFF] text-white px-6 py-4">
                                    <h2 className="text-xl font-semibold">პროდუქტის დეტალები</h2>
                                </div>
                                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                    <div className="grid grid-cols-3 px-6 py-4 hover:bg-gray-50 dark:hover:bg-slate-800">
                                        <div className="col-span-1 font-medium text-gray-700 dark:text-gray-300">
                                            კატეგორია
                                        </div>
                                        <div className="col-span-2 text-gray-900 dark:text-white">
                                            {product?.category?.name}
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
                                            {product.weight} {product?.unit?.name}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 px-6 py-4 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700">
                                        <div className="col-span-1 font-medium text-gray-700 dark:text-gray-300">
                                            მარაგი
                                        </div>
                                        <div className="col-span-2">
                                            <span
                                                className={`font-semibold ${inStock ? 'text-green-600' : 'text-red-600'}`}
                                            >
                                                {inStock
                                                    ? `${product.stock} ცალი მარაგშია`
                                                    : 'ამოიწურა'}
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
                        <div className="lg:col-span-7">
                            <div className="bg-white dark:bg-slate-900 rounded-lg p-6 sticky top-6">
                                {/* Title */}
                                <h1 className="text-2xl font-bold mb-3">{product.name}</h1>

                                {/* Brand */}
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        ბრენდი:
                                    </span>
                                    <span className="text-sm font-semibold text-[#006FEAFF]">
                                        {product.brand?.name || 'N/A'}
                                    </span>
                                </div>

                                {/* Category & Tags */}
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        კატეგორია:
                                    </span>
                                    <Badge variant="outline" className="text-sm">
                                        {product.category?.name}
                                    </Badge>
                                </div>

                                {/* Product ID */}
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                    კოდი: {product.uid} | პროდუქტის ID: #{product.uid}
                                </div>

                                <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6" />

                                {/* Availability Notice */}
                                <div className="bg-blue-50 dark:bg-blue-950 border-l-4 border-[#006FEAFF] p-4 mb-4">
                                    <div className="flex items-start gap-2">
                                        <Zap className="w-5 h-5 text-[#006FEAFF] flex-shrink-0 mt-0.5" />
                                        <div className="text-sm">
                                            <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">
                                                სწრაფი მიწოდება ყველა კომპონენტის შეძენა.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Delivery Info */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-[#006FEAFF] flex-shrink-0 mt-0.5" />
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
                                            <span className="font-semibold text-green-600">
                                                გარანტია: 1 წელი
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            სამუშაო საათები: ყოველდღე (კვირის გარდა) 11:00-დან 20:00
                                            საათამდე
                                        </p>
                                    </div>
                                </div>

                                {/* Delivery Tags */}
                                <div className="flex gap-2 mb-6">
                                    <Badge variant="outline" className="text-xs">
                                        საქართველო
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                        ტექნოლოგია
                                    </Badge>
                                </div>

                                <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6" />

                                {/* Price */}
                                <div className="mb-6">
                                    <div className="flex items-baseline gap-3 mb-2">
                                        <span className="text-4xl font-bold text-[#006FEAFF]">
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
                                                onClick={() =>
                                                    setQuantity(Math.max(1, quantity - 1))
                                                }
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
                                                onClick={() =>
                                                    setQuantity(
                                                        Math.min(product.stock, quantity + 1)
                                                    )
                                                }
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
                                        className="flex-1 h-14 bg-[#006FEAFF] hover:bg-[#0056cc] text-white text-base font-semibold"
                                        disabled={!inStock}
                                        onClick={handleAddToCart}
                                    >
                                        კალათაში დამატება
                                    </Button>
                                    <Button
                                        className="flex-1 h-14 bg-[#0056cc] hover:bg-[#004099] text-white text-base font-semibold"
                                        disabled={!inStock}
                                    >
                                        ყიდვა
                                    </Button>
                                </div>

                                {/* Wishlist & Share */}
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        className={`flex-1 h-12 ${isFavorite ? 'border-[#006FEAFF] text-[#006FEAFF]' : ''}`}
                                        onClick={() => setIsFavorite(!isFavorite)}
                                    >
                                        <Heart
                                            className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-current' : ''}`}
                                        />
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

                    <div className="mt-8">
                        <div className="bg-white dark:bg-slate-900 rounded-lg p-6">
                            {/* Reviews Header */}
                            <div className="flex items-center justify-between mb-6 pb-4 border-b">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-2xl font-semibold">
                                        {reviews?.length || 0} მიმოხილვა
                                    </h2>
                                    {reviews && reviews.length > 0 && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-semibold">
                                                {(
                                                    reviews.reduce((sum, r) => sum + r.rating, 0) /
                                                    reviews.length
                                                ).toFixed(1)}
                                            </span>
                                            <div className="flex">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        className={`w-5 h-5 ${
                                                            star <=
                                                            Math.round(
                                                                reviews.reduce(
                                                                    (sum, r) => sum + r.rating,
                                                                    0
                                                                ) / reviews.length
                                                            )
                                                                ? 'fill-yellow-400 text-yellow-400'
                                                                : 'text-gray-300'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950 px-4 py-2 rounded-lg">
                                    <Shield className="w-5 h-5 text-green-600" />
                                    <span className="text-sm text-green-600 font-medium">
                                        ყველა მიმოხილვა დადასტურებული შესყიდვებიდან
                                    </span>
                                </div>
                            </div>

                            {/* Filter Tags */}
                            <div className="flex gap-2 mb-6">
                                <Badge variant="outline" className="rounded-full px-4 py-1">
                                    შესანიშნავი ხარისხი(1)
                                </Badge>
                                <Badge variant="outline" className="rounded-full px-4 py-1">
                                    სწრაფი მიწოდება(1)
                                </Badge>
                                <Badge variant="outline" className="rounded-full px-4 py-1">
                                    საჩუქრად შესაფერისი(1)
                                </Badge>
                            </div>

                            {/* Reviews List */}
                            <div className="space-y-6">
                                {isReviewsLoading ? (
                                    <div className="text-center py-12">
                                        <div className="text-muted-foreground">იტვირთება...</div>
                                    </div>
                                ) : !reviews || reviews.length === 0 ? (
                                    /* Empty State */
                                    <div className="text-center py-12">
                                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-500">ჯერ არ არის შეფასებები</p>
                                        <p className="text-sm mb-4 text-gray-400 mt-2">
                                            იყავი პირველი, ვინც შეაფასებს ამ პროდუქტს
                                        </p>
                                        <CButton
                                            icon={StarIcon}
                                            text="შეფასების გაკეთება"
                                            onClick={() => {
                                                setAddReviewModal(true);
                                            }}
                                        />
                                    </div>
                                ) : (
                                    /* Actual Reviews */
                                    <>
                                        {reviews.map((review) => {
                                            const getAvatarColor = (username: string) => {
                                                const colors = [
                                                    'bg-teal-600',
                                                    'bg-blue-600',
                                                    'bg-purple-600',
                                                    'bg-pink-600',
                                                    'bg-indigo-600',
                                                    'bg-green-600',
                                                    'bg-orange-600',
                                                    'bg-red-600',
                                                ];
                                                const index =
                                                    username.charCodeAt(0) % colors.length;
                                                return colors[index];
                                            };

                                            const displayName = review.user?.username || review.username || 'Anonymous';
                                            const avatarLetter = displayName.charAt(0).toUpperCase();
                                            const avatarColor = getAvatarColor(displayName);
                                            const formattedDate = dayjs(review.create_date).format(
                                                'MMM DD, YYYY'
                                            );

                                            return (
                                                <div
                                                    key={review.uid}
                                                    className="border-b pb-6 last:border-b-0"
                                                >
                                                    <div className="flex gap-4">
                                                        {/* Avatar */}
                                                        <div
                                                            className={`w-10 h-10 rounded-full ${avatarColor} text-white flex items-center justify-center font-semibold flex-shrink-0`}
                                                        >
                                                            {avatarLetter}
                                                        </div>

                                                        <div className="flex-1">
                                                            {/* User Info */}
                                                            <div className="mb-2">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <h4 className="font-semibold">
                                                                        {displayName}
                                                                    </h4>
                                                                    <span className="text-sm text-gray-500">
                                                                        on {formattedDate}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <div className="flex">
                                                                        {[1, 2, 3, 4, 5].map(
                                                                            (star) => (
                                                                                <Star
                                                                                    key={star}
                                                                                    className={`w-4 h-4 ${
                                                                                        star <=
                                                                                        review.rating
                                                                                            ? 'fill-yellow-400 text-yellow-400'
                                                                                            : 'text-gray-300'
                                                                                    }`}
                                                                                />
                                                                            )
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Review Text */}
                                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                                                {review.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        
                                        {/* Add Review Button at bottom */}
                                        <div className="pt-4 border-t">
                                            <CButton
                                                icon={StarIcon}
                                                text="შეფასების დამატება"
                                                onClick={() => {
                                                    setAddReviewModal(true);
                                                }}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>


                    {/* Similar Products Section */}
                    <div className="mt-8">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-2">მსგავსი პროდუქტები</h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                იხილეთ სხვა პროდუქტები იმავე კატეგორიიდან
                            </p>
                        </div>

                        {isSimilarLoading ? (
                            <div className="flex items-center justify-center h-64">
                                <div className="text-muted-foreground">იტვირთება...</div>
                            </div>
                        ) : similarProducts && similarProducts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {similarProducts.map((similarProduct) => {
                                    const simActiveSale = getActiveSale(similarProduct);
                                    const simDiscountedPrice =
                                        calculateDiscountedPrice(similarProduct);
                                    const simDiscountDisplay = getDiscountDisplay(similarProduct);
                                    const simOriginalPrice = parseFloat(similarProduct.price);
                                    const simInStock = similarProduct.stock > 0;
                                    const simIsNew = isNewProduct(similarProduct);
                                    const simFinalPrice = simDiscountedPrice || simOriginalPrice;
                                    const pLink = similarProduct.name
                                        .toLowerCase()
                                        .trim()
                                        .replace(/\s+/g, '-');
                                    return (
                                        <div
                                            key={similarProduct.uid}
                                            className="group bg-white dark:bg-slate-900 rounded-lg overflow-hidden border-2 hover:border-[#006FEAFF] transition-all duration-300 hover:shadow-xl cursor-pointer"
                                            onClick={() =>
                                                navigate(`/product/${pLink}/${similarProduct.uid}`)
                                            }
                                        >
                                            {/* Image */}
                                            <div className="relative h-64 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 overflow-hidden">
                                                {/* Badges */}
                                                <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                                                    {simIsNew && (
                                                        <Badge className="bg-blue-500 text-white shadow-lg text-xs">
                                                            <Sparkles className="w-3 h-3 mr-1" />
                                                            ახალი
                                                        </Badge>
                                                    )}
                                                    {simActiveSale && simDiscountDisplay && (
                                                        <Badge className="bg-red-500 text-white shadow-lg text-xs">
                                                            <Zap className="w-3 h-3 mr-1" />-
                                                            {simDiscountDisplay}
                                                        </Badge>
                                                    )}
                                                </div>

                                                {/* Product Image */}
                                                <div className="absolute inset-0 flex items-center justify-center p-4">
                                                    {similarProduct.image ? (
                                                        <img
                                                            src={`${API_URL}${similarProduct.image}`}
                                                            alt={similarProduct.name}
                                                            className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                                        />
                                                    ) : (
                                                        <Package className="w-20 h-20 text-slate-300" />
                                                    )}
                                                </div>

                                                {/* Gradient Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                                {/* Out of Stock */}
                                                {!simInStock && (
                                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                        <Badge
                                                            variant="secondary"
                                                            className="text-lg px-4 py-2"
                                                        >
                                                            არ არის მარაგში
                                                        </Badge>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="p-4">
                                                {/* Category and Brand */}
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Badge variant="outline" className="text-xs">
                                                        {similarProduct?.category?.name}
                                                    </Badge>
                                                    {similarProduct.brand && (
                                                        <Badge
                                                            variant="outline"
                                                            className="text-xs"
                                                        >
                                                            {similarProduct.brand.name}
                                                        </Badge>
                                                    )}
                                                </div>

                                                {/* Product Name */}
                                                <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-[#006FEAFF] transition-colors">
                                                    {similarProduct.name}
                                                </h3>

                                                {/* Weight/Unit */}
                                                <p className="text-xs text-muted-foreground mb-3">
                                                    {similarProduct.weight}{' '}
                                                    {similarProduct?.unit?.name}
                                                </p>

                                                {/* Price */}
                                                <div className="flex items-center gap-2 mb-3">
                                                    {simDiscountedPrice ? (
                                                        <>
                                                            <span className="text-2xl font-bold text-[#006FEAFF]">
                                                                {simFinalPrice.toFixed(2)}₾
                                                            </span>
                                                            <span className="text-sm text-muted-foreground line-through">
                                                                {simOriginalPrice.toFixed(2)}₾
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className="text-2xl font-bold text-[#006FEAFF]">
                                                            {simOriginalPrice.toFixed(2)}₾
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Add to Cart Button */}
                                                <Button
                                                    className="w-full group/btn relative overflow-hidden bg-[#006FEAFF] hover:bg-[#0056cc]"
                                                    size="sm"
                                                    disabled={!simInStock}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        // if (simInStock) {
                                                        //     dispatch(
                                                        //         addItemToCart({
                                                        //             product_uid: similarProduct.uid,
                                                        //             product_image: similarProduct.image || '',
                                                        //             has_sale: !!simActiveSale,
                                                        //             new_price: simFinalPrice,
                                                        //             old_price: simDiscountedPrice ? simOriginalPrice : null,
                                                        //             product_name: similarProduct.name,
                                                        //             quantity: 1,
                                                        //         })
                                                        //     );
                                                        // }
                                                    }}
                                                >
                                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                                        <ShoppingCart className="w-4 h-4" />
                                                        {simInStock
                                                            ? 'კალათაში დამატება'
                                                            : 'არ არის მარაგში'}
                                                    </span>
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-lg">
                                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500">მსგავსი პროდუქტები არ მოიძებნა</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {addReviewModal && (
                <ReviewsModal
                    isOpen={addReviewModal}
                    setIsOpen={setAddReviewModal}
                    product_uid={Number(params.uid)}
                />
            )}
        </>
    );
};

export default ProductDetails;
