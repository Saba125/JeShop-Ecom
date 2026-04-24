import React from 'react'
import { Card } from '../ui/card';
import type { TGetProducts, TGetProductsPaginatedSingle } from '@/types';
import { useNavigate } from 'react-router-dom';
interface CCardProps {
    product: TGetProductsPaginatedSingle;
    hoveredId?: number | null;
    setHoveredId?: React.Dispatch<React.SetStateAction<number | null>>
}
const CCard = ({product, hoveredId, setHoveredId} : CCardProps) => {
    const navigate = useNavigate();
     const getActiveSale = () => {
            return product.data.sales_items?.find((sale) => sale.is_active === 1);
        };
    const activeSale = getActiveSale()    
  return (
      <Card
                                        data-card
                                        key={product.data.uid}
                                        onClick={() => {
                                            const pLink = String(product.data.uid)
                                                .toLowerCase()
                                                .trim()
                                                .replace(/\s+/g, '-');
                                            navigate(`/product/${pLink}/${product.data.uid}`);
                                        }}
                                        style={{
                                            flex: '0 0 calc(25% - 12px)',
                                            minWidth: '0',
                                            scrollSnapAlign: 'start',
                                        }}
                                        className="cursor-pointer relative overflow-hidden border-2 hover:border-primary/60 transition-all duration-300 hover:shadow-2xl group rounded-2xl"
                                        onMouseEnter={() => setHoveredId && setHoveredId(product.data.uid)}
                                        onMouseLeave={() => setHoveredId &&  setHoveredId(null)}
                                    >
                                        {/* Image */}
                                        <div className="relative h-52 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 overflow-hidden">
                                            {/* Discount ribbon */}
                                            {activeSale && discountPercent > 0 && (
                                                <div className="absolute top-0 left-0 z-10">
                                                    <div className="bg-primary text-white px-3.5 py-2 rounded-br-2xl shadow-md flex flex-col items-center leading-none">
                                                        <span className="text-base font-black">
                                                            -{discountPercent}%
                                                        </span>
                                                        <span className="text-[10px] font-semibold uppercase tracking-widest mt-0.5 opacity-80">
                                                            sale
                                                        </span>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Sale sparkle badge */}
                                            {activeSale && (
                                                <div className="absolute bottom-2.5 left-2.5 z-10">
                                                    <Badge className="bg-primary/90 text-white shadow text-[11px] px-2 py-0.5 gap-1">
                                                        <Sparkles className="w-3 h-3" />
                                                        ფასდაკლება
                                                    </Badge>
                                                </div>
                                            )}

                                            {/* Action Buttons */}
                                            <div
                                                className={`absolute top-2.5 right-2.5 z-10 flex flex-col gap-2 transition-all duration-300 ${
                                                    isHovered
                                                        ? 'opacity-100 translate-x-0'
                                                        : 'opacity-0 translate-x-4'
                                                }`}
                                            >
                                                <Button
                                                    size="icon"
                                                    variant="secondary"
                                                    className={`w-9 h-9 rounded-full shadow-md bg-white/90 dark:bg-slate-800/90 border-0 ${
                                                        isFavorite
                                                            ? 'text-red-500 hover:bg-red-50'
                                                            : 'text-slate-500 hover:text-red-500'
                                                    }`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleFavorite(product);
                                                    }}
                                                >
                                                    <Heart
                                                        className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`}
                                                    />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="secondary"
                                                    className="w-9 h-9 rounded-full shadow-md bg-white/90 dark:bg-slate-800/90 border-0 text-slate-500 hover:text-primary"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                            </div>

                                            {/* Product Image */}
                                            <div className="absolute inset-0 flex items-center justify-center p-4">
                                                {product.image ? (
                                                    <img
                                                        src={`${API_URL}${product.image}`}
                                                        alt={product.name}
                                                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <ShoppingCart className="w-16 h-16 text-slate-300 dark:text-slate-700" />
                                                )}
                                            </div>

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                            {/* Out of Stock Overlay */}
                                            {!inStock && (
                                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                                                    <span className="bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-100 text-sm font-semibold px-5 py-2 rounded-full shadow-lg">
                                                        არ არის მარაგში
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <CardContent className="p-4">
                                            {/* Category and Brand */}
                                            <div className="flex items-center gap-1.5 mb-2.5 flex-wrap">
                                                <Badge
                                                    variant="outline"
                                                    className="text-xs px-2.5 py-0.5 rounded-full font-normal"
                                                >
                                                    {product?.category.name}
                                                </Badge>
                                                {product.brand && (
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs px-2.5 py-0.5 rounded-full font-normal"
                                                    >
                                                        {product.brand.name}
                                                    </Badge>
                                                )}
                                            </div>

                                            {/* Product Name */}
                                            <h3 className="font-semibold text-base mb-1.5 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                                                {product.name}
                                            </h3>

                                            {/* Weight */}
                                            <p className="text-xs text-muted-foreground mb-3">
                                                {product.weight} {product.unit.name}
                                            </p>

                                            {/* Price */}
                                            <div className="flex items-baseline gap-2 mb-3">
                                                <span className="text-2xl font-black text-primary">
                                                    {(discountedPrice || originalPrice).toFixed(2)}₾
                                                </span>
                                                {discountedPrice && (
                                                    <span className="text-sm text-muted-foreground line-through">
                                                        {originalPrice.toFixed(2)}₾
                                                    </span>
                                                )}
                                            </div>

                                            {/* Add to Cart */}
                                            <Button
                                                className="w-full h-10 text-sm font-semibold group/btn relative overflow-hidden rounded-xl"
                                                disabled={!inStock}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (inStock) {
                                                        dispatch(
                                                            addItemToCart({
                                                                product_uid: product.uid,
                                                                product_image: product.image || '',
                                                                has_sale: !!activeSale,
                                                                new_price:
                                                                    discountedPrice ||
                                                                    originalPrice,
                                                                old_price: discountedPrice
                                                                    ? originalPrice
                                                                    : null,
                                                                product_name: product.name,
                                                                quantity: 1,
                                                                stock: product.stock,
                                                            })
                                                        );
                                                    }
                                                }}
                                            >
                                                <span className="relative z-10 flex items-center justify-center gap-2">
                                                    <ShoppingCart className="w-4 h-4" />
                                                    {inStock ? (
                                                        <span>კალათაში დამატება</span>
                                                    ) : (
                                                        <span>არ არის მარაგში</span>
                                                    )}
                                                </span>
                                                <div className="absolute inset-0 bg-white/15 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                                            </Button>

                                            {/* Hover Info */}
                                            <div
                                                className={`mt-3 pt-3 border-t border-dashed transition-all duration-300 overflow-hidden ${
                                                    isHovered
                                                        ? 'max-h-10 opacity-100'
                                                        : 'max-h-0 opacity-0'
                                                }`}
                                            >
                                                <p className="text-xs text-muted-foreground">
                                                    ✓ უფასო მიწოდება &nbsp;•&nbsp; ✓ სწრაფი
                                                    გაფორმება
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
  )
}

export default CCard
