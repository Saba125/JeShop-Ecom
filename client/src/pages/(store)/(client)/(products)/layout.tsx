import { useState } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { useGetBrands } from '@/api/brands/get_';

const ProductsFiltersSidebar = () => {
    const { data: brands } = useGetBrands();
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedPlugTypes, setSelectedPlugTypes] = useState<string[]>([]);
    const [inStock, setInStock] = useState(false);
    const [onSale, setOnSale] = useState(false);
    const locations = [location.pathname.split('/')];
    const categories = [
        { id: '1', name: 'ელექტრონიკა', count: 45 },
        { id: '2', name: 'ტანსაცმელი', count: 123 },
        { id: '3', name: 'საკვები პროდუქტები', count: 89 },
        { id: '4', name: 'სახლის ნივთები', count: 67 },
        { id: '5', name: 'სპორტი', count: 34 },
    ];
    const plugTypes = [
        {
            uid: '0',
            name: 'კაბელიანი',
        },
        {
            uid: '1',
            name: 'უკაბელო',
        },
    ];
    const mapName: any = {
        keyboards: 'კლავიატურები',
        mouses: 'მაუსები',
    };
    const handleCategoryToggle = (categoryId: string) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleBrandToggle = (brandId: string) => {
        setSelectedBrands((prev) =>
            prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId]
        );
    };
    const handlePlugToggle = (plugId: string) => {
        setSelectedPlugTypes((prev) =>
            prev.includes(plugId) ? prev.filter((id) => id !== plugId) : [...prev, plugId]
        );
    };

    const clearAllFilters = () => {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setPriceRange([0, 1000]);
        setInStock(false);
        setOnSale(false);
    };

    const activeFiltersCount =
        selectedCategories.length +
        selectedBrands.length +
        (inStock ? 1 : 0) +
        (onSale ? 1 : 0) +
        (priceRange[0] !== 0 || priceRange[1] !== 1000 ? 1 : 0);

    return (
        <div className="max-w-[300px]">
            <Card className="border-l-0 border-t-0">
                <CardContent className="">
                    {/* Header */}
                    <h3
                        className="text-2xl
                        mb-3
                        tracking-wide
                     font-bold"
                    >
                        {mapName[locations[0][2]]}
                    </h3>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <SlidersHorizontal className="w-5 h-5" />
                            ფილტრები
                        </h2>
                        {activeFiltersCount > 0 && (
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary">{activeFiltersCount}</Badge>
                                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        {/* Categories */}
                        {/* <div>
                            <h3 className="font-semibold text-sm mb-3 text-slate-700 dark:text-slate-300">
                                კატეგორიები
                            </h3>
                            <div className="space-y-3">
                                {categories.map((category) => (
                                    <div key={category.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`category-${category.id}`}
                                            checked={selectedCategories.includes(category.id)}
                                            onCheckedChange={() =>
                                                handleCategoryToggle(category.id)
                                            }
                                        />
                                        <label
                                            htmlFor={`category-${category.id}`}
                                            className="text-sm flex-1 flex items-center justify-between cursor-pointer hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                                        >
                                            <span>{category.name}</span>
                                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                                ({category.count})
                                            </span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div> */}
                        <div>
                            <h3 className="font-semibold text-sm mb-3 text-slate-700 dark:text-slate-300">
                                შეერთების ტიპები
                            </h3>
                            <div className="space-y-3">
                                {plugTypes.map((plugType) => (
                                    <div key={plugType.uid} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`plug-${plugType.uid}`}
                                            checked={selectedPlugTypes.includes(
                                                String(plugType.uid)
                                            )}
                                            onCheckedChange={() =>
                                                handlePlugToggle(String(plugType.uid))
                                            }
                                        />
                                        <label
                                            htmlFor={`brand-${plugType.uid}`}
                                            className="text-sm flex-1 flex items-center justify-between cursor-pointer hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                                        >
                                            <span>{plugType.name}</span>
                                            <span className="text-xs text-slate-500 dark:text-slate-400"></span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Separator />

                        {/* Brands */}
                        <div>
                            <h3 className="font-semibold text-sm mb-3 text-slate-700 dark:text-slate-300">
                                ბრენდები
                            </h3>
                            <div className="space-y-3">
                                {brands?.map((brand) => (
                                    <div key={brand.uid} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`brand-${brand.uid}`}
                                            checked={selectedBrands.includes(String(brand.uid))}
                                            onCheckedChange={() =>
                                                handleBrandToggle(String(brand.uid))
                                            }
                                        />
                                        <label
                                            htmlFor={`brand-${brand.uid}`}
                                            className="text-sm flex-1 flex items-center justify-between cursor-pointer hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                                        >
                                            <span>{brand.name}</span>
                                            <span className="text-xs text-slate-500 dark:text-slate-400"></span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Separator />

                        {/* Price Range */}
                        <div>
                            <h3 className="font-semibold text-sm mb-4 text-slate-700 dark:text-slate-300">
                                ფასის დიაპაზონი
                            </h3>
                            <div className="space-y-4">
                                <Slider
                                    min={0}
                                    max={1000}
                                    step={10}
                                    value={priceRange}
                                    onValueChange={setPriceRange}
                                    className="w-full"
                                />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-slate-500 dark:text-slate-400">
                                            მინ:
                                        </span>
                                        <Badge variant="outline" className="font-mono">
                                            {priceRange[0]}₾
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-slate-500 dark:text-slate-400">
                                            მაქს:
                                        </span>
                                        <Badge variant="outline" className="font-mono">
                                            {priceRange[1]}₾
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Additional Filters */}
                        <div>
                            <h3 className="font-semibold text-sm mb-3 text-slate-700 dark:text-slate-300">
                                დამატებითი ფილტრები
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                                    <Checkbox
                                        id="in-stock"
                                        checked={inStock}
                                        onCheckedChange={(checked) =>
                                            setInStock(checked as boolean)
                                        }
                                    />
                                    <label
                                        htmlFor="in-stock"
                                        className="text-sm cursor-pointer flex-1"
                                    >
                                        მხოლოდ მარაგში არსებული
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                                    <Checkbox
                                        id="on-sale"
                                        checked={onSale}
                                        onCheckedChange={(checked) => setOnSale(checked as boolean)}
                                    />
                                    <label
                                        htmlFor="on-sale"
                                        className="text-sm cursor-pointer flex-1"
                                    >
                                        მხოლოდ ფასდაკლებული პროდუქტები
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Clear All Button */}
                        {activeFiltersCount > 0 && (
                            <>
                                <Separator />
                                <Button variant="outline" className="" onClick={clearAllFilters}>
                                    <X className="w-4 h-4 " />
                                    ფილტრების გასუფთავება
                                </Button>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
                <Card className="mt-4">
                    <CardContent className="p-4">
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                აქტიური ფილტრები:
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {selectedCategories.map((catId) => {
                                    const category = categories.find((c) => c.id === catId);
                                    return (
                                        <Badge
                                            key={catId}
                                            variant="secondary"
                                            className="gap-1 pr-1"
                                        >
                                            {category?.name}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-4 w-4 hover:bg-slate-300 dark:hover:bg-slate-700"
                                                onClick={() => handleCategoryToggle(catId)}
                                            >
                                                <X className="w-3 h-3" />
                                            </Button>
                                        </Badge>
                                    );
                                })}
                                {selectedBrands.map((brandId) => {
                                    const brand = brands?.find((b) => String(b.uid) === brandId);
                                    return (
                                        <Badge
                                            key={brandId}
                                            variant="secondary"
                                            className="gap-1 pr-1"
                                        >
                                            {brand?.name}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-4 w-4 hover:bg-slate-300 dark:hover:bg-slate-700"
                                                onClick={() => handleBrandToggle(brandId)}
                                            >
                                                <X className="w-3 h-3" />
                                            </Button>
                                        </Badge>
                                    );
                                })}
                                {inStock && (
                                    <Badge variant="secondary" className="gap-1 pr-1">
                                        მარაგში
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-4 w-4 hover:bg-slate-300 dark:hover:bg-slate-700"
                                            onClick={() => setInStock(false)}
                                        >
                                            <X className="w-3 h-3" />
                                        </Button>
                                    </Badge>
                                )}
                                {onSale && (
                                    <Badge variant="secondary" className="gap-1 pr-1">
                                        ფასდაკლებული
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-4 w-4 hover:bg-slate-300 dark:hover:bg-slate-700"
                                            onClick={() => setOnSale(false)}
                                        >
                                            <X className="w-3 h-3" />
                                        </Button>
                                    </Badge>
                                )}
                                {(priceRange[0] !== 0 || priceRange[1] !== 1000) && (
                                    <Badge variant="secondary" className="gap-1 pr-1">
                                        ფასი: {priceRange[0]}₾ - {priceRange[1]}₾
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-4 w-4 hover:bg-slate-300 dark:hover:bg-slate-700"
                                            onClick={() => setPriceRange([0, 1000])}
                                        >
                                            <X className="w-3 h-3" />
                                        </Button>
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default ProductsFiltersSidebar;
