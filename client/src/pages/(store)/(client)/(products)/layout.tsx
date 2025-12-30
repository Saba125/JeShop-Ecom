import { useState } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { useGetBrands } from '@/api/brands/get_';
import { Outlet } from 'react-router-dom';

const ProductsFiltersSidebar = () => {
    const { data: brands } = useGetBrands();
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedPlugTypes, setSelectedPlugTypes] = useState<string[]>([]);
    const [inStock, setInStock] = useState(false);
    const [onSale, setOnSale] = useState(false);
    const locations = [location.pathname.split('/')];
    
    const plugTypes = [
        { uid: '0', name: 'კაბელიანი' },
        { uid: '1', name: 'უკაბელო' },
    ];
    
    const mapName: any = {
        keyboards: 'კლავიატურები',
        mouses: 'მაუსები',
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
        setSelectedPlugTypes([]);
        setPriceRange([0, 1000]);
        setInStock(false);
        setOnSale(false);
    };

    const activeFiltersCount =
        selectedCategories.length +
        selectedBrands.length +
        selectedPlugTypes.length +
        (inStock ? 1 : 0) +
        (onSale ? 1 : 0) +
        (priceRange[0] !== 0 || priceRange[1] !== 1000 ? 1 : 0);

    return (
        <div className="flex gap-6">
            {/* Sidebar */}
            <div className="w-[300px] sticky top-[89.5px] h-fit">
                <Card className="border-2 shadow-lg">
                    <CardContent className="p-6">
                        {/* Header */}
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                {mapName[locations[0][2]]}
                            </h3>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <SlidersHorizontal className="w-5 h-5 text-primary" />
                                    <h2 className="text-lg font-semibold">ფილტრები</h2>
                                </div>
                                {activeFiltersCount > 0 && (
                                    <div className="flex items-center gap-2">
                                        <Badge variant="default" className="bg-primary">
                                            {activeFiltersCount}
                                        </Badge>
                                        <Button 
                                            variant="ghost" 
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={clearAllFilters}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Connection Types */}
                            <div>
                                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                                    შეერთების ტიპები
                                </h3>
                                <div className="space-y-2">
                                    {plugTypes.map((plugType) => (
                                        <div
                                            key={plugType.uid}
                                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                                        >
                                            <Checkbox
                                                id={`plug-${plugType.uid}`}
                                                checked={selectedPlugTypes.includes(String(plugType.uid))}
                                                onCheckedChange={() => handlePlugToggle(String(plugType.uid))}
                                                className="border-2"
                                            />
                                            <label
                                                htmlFor={`plug-${plugType.uid}`}
                                                className="text-sm flex-1 cursor-pointer"
                                            >
                                                {plugType.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            {/* Brands */}
                            <div>
                                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                                    ბრენდები
                                </h3>
                                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                                    {brands?.map((brand) => (
                                        <div
                                            key={brand.uid}
                                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                                        >
                                            <Checkbox
                                                id={`brand-${brand.uid}`}
                                                checked={selectedBrands.includes(String(brand.uid))}
                                                onCheckedChange={() => handleBrandToggle(String(brand.uid))}
                                                className="border-2"
                                            />
                                            <label
                                                htmlFor={`brand-${brand.uid}`}
                                                className="text-sm flex-1 cursor-pointer"
                                            >
                                                {brand.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            {/* Price Range */}
                            <div>
                                <h3 className="font-semibold text-sm mb-4">
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
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex-1">
                                            <div className="text-xs text-muted-foreground mb-1">მინ:</div>
                                            <Badge variant="outline" className="font-mono w-full justify-center">
                                                {priceRange[0]}₾
                                            </Badge>
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-xs text-muted-foreground mb-1">მაქს:</div>
                                            <Badge variant="outline" className="font-mono w-full justify-center">
                                                {priceRange[1]}₾
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Additional Filters */}
                            <div>
                                <h3 className="font-semibold text-sm mb-3">
                                    დამატებითი ფილტრები
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors border">
                                        <Checkbox
                                            id="in-stock"
                                            checked={inStock}
                                            onCheckedChange={(checked) => setInStock(checked as boolean)}
                                            className="border-2"
                                        />
                                        <label htmlFor="in-stock" className="text-sm cursor-pointer flex-1">
                                            მხოლოდ მარაგში არსებული
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors border">
                                        <Checkbox
                                            id="on-sale"
                                            checked={onSale}
                                            onCheckedChange={(checked) => setOnSale(checked as boolean)}
                                            className="border-2"
                                        />
                                        <label htmlFor="on-sale" className="text-sm cursor-pointer flex-1">
                                            მხოლოდ ფასდაკლებული
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Clear All Button */}
                            {activeFiltersCount > 0 && (
                                <>
                                    <Separator />
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={clearAllFilters}
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        ფილტრების გასუფთავება
                                    </Button>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Active Filters Display */}
                {activeFiltersCount > 0 && (
                    <Card className="mt-4 border-2">
                        <CardContent className="p-4">
                            <h3 className="text-sm font-semibold mb-3">
                                აქტიური ფილტრები:
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {selectedPlugTypes.map((plugId) => {
                                    const plug = plugTypes.find((p) => String(p.uid) === plugId);
                                    return (
                                        <Badge key={plugId} variant="secondary" className="gap-1 pr-1">
                                            {plug?.name}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-4 w-4 hover:bg-slate-300 dark:hover:bg-slate-700"
                                                onClick={() => handlePlugToggle(plugId)}
                                            >
                                                <X className="w-3 h-3" />
                                            </Button>
                                        </Badge>
                                    );
                                })}
                                {selectedBrands.map((brandId) => {
                                    const brand = brands?.find((b) => String(b.uid) === brandId);
                                    return (
                                        <Badge key={brandId} variant="secondary" className="gap-1 pr-1">
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
                                            className="h-4 w-4"
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
                                            className="h-4 w-4"
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
                                            className="h-4 w-4"
                                            onClick={() => setPriceRange([0, 1000])}
                                        >
                                            <X className="w-3 h-3" />
                                        </Button>
                                    </Badge>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Products Area */}
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
};

export default ProductsFiltersSidebar;