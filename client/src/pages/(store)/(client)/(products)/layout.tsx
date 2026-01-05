import { useState } from 'react';
import { X, SlidersHorizontal, ChevronDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Outlet, useParams, type Params } from 'react-router-dom';

const mockBrands = [
    { uid: '1', name: 'Logitech' },
    { uid: '2', name: 'Razer' },
    { uid: '3', name: 'Corsair' },
    { uid: '4', name: 'SteelSeries' },
    { uid: '5', name: 'HyperX' },
    { uid: '6', name: 'ASUS' },
    { uid: '7', name: 'Microsoft' },
];
const titleMap: any = {
    keyboards: "კლავიატურები",
    mouses: "მაუსები",
    headsets: "ყურსასმენები",
    mousepads: "მაუსპადები"
}


const ProductsHorizontalFilters = () => {
    const brands = mockBrands;
    const params: any = useParams();
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedPlugTypes, setSelectedPlugTypes] = useState<string[]>([]);
    const [inStock, setInStock] = useState(false);
    const [onSale, setOnSale] = useState(false);
    const [brandSearch, setBrandSearch] = useState('');
    const [sortBy, setSortBy] = useState('popular');

    const plugTypes = [
        { uid: '0', name: 'კაბელიანი' },
        { uid: '1', name: 'უკაბელო' },
    ];

    const sortOptions = [
        { value: 'popular', label: 'პოპულარული' },
        { value: 'price-low', label: 'ფასი: დაბლიდან მაღლამდე' },
        { value: 'price-high', label: 'ფასი: მაღლიდან დაბლამდე' },
        { value: 'newest', label: 'ახალი' },
    ];

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
        setSelectedBrands([]);
        setSelectedPlugTypes([]);
        setPriceRange([0, 1000]);
        setInStock(false);
        setOnSale(false);
    };

    const filteredBrands = brands?.filter((brand) =>
        brand.name.toLowerCase().includes(brandSearch.toLowerCase())
    );

    const activeFiltersCount =
        selectedBrands.length +
        selectedPlugTypes.length +
        (inStock ? 1 : 0) +
        (onSale ? 1 : 0) +
        (priceRange[0] !== 0 || priceRange[1] !== 1000 ? 1 : 0);

    return (
        <div className="w-full">
            {/* Sticky Filter Bar */}
            <div className="fixed top-[74px] w-[1590px] z-99 bg-background border-b shadow-sm">
                <div className="px-6 py-4">
                    {/* Main Filter Row */}
                    <div className="flex items-center gap-3 flex-wrap">
                        {/* Connection Type Dropdown */}
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant={selectedPlugTypes.length > 0 ? 'default' : 'outline'}
                                    className="h-9"
                                >
                                    შეერთება
                                    {selectedPlugTypes.length > 0 && (
                                        <Badge className="ml-2 h-5 px-1.5" variant="secondary">
                                            {selectedPlugTypes.length}
                                        </Badge>
                                    )}
                                    <ChevronDown className="ml-1 w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 mt-3 ml-[30px] p-3">
                                <div className="space-y-2">
                                    {plugTypes.map((plugType) => (
                                        <label
                                            key={plugType.uid}
                                            className="flex items-center space-x-2 py-1.5 px-2 rounded hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer"
                                        >
                                            <Checkbox
                                                checked={selectedPlugTypes.includes(
                                                    String(plugType.uid)
                                                )}
                                                onCheckedChange={() =>
                                                    handlePlugToggle(String(plugType.uid))
                                                }
                                            />
                                            <span className="text-sm">{plugType.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Brand Dropdown */}
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant={selectedBrands.length > 0 ? 'default' : 'outline'}
                                    className="h-9"
                                >
                                    ბრენდი
                                    {selectedBrands.length > 0 && (
                                        <Badge className="ml-2 h-5 px-1.5" variant="secondary">
                                            {selectedBrands.length}
                                        </Badge>
                                    )}
                                    <ChevronDown className="ml-1 w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-64 mt-4 p-3">
                                <div className="space-y-3">
                                    {brands && brands.length > 5 && (
                                        <div className="relative">
                                            <Search className="absolute left-2 top-2.5 w-3.5 h-3.5 text-muted-foreground" />
                                            <Input
                                                placeholder="ძიება..."
                                                value={brandSearch}
                                                onChange={(e) => setBrandSearch(e.target.value)}
                                                className="h-9 pl-8 text-sm"
                                            />
                                        </div>
                                    )}
                                    <div className="space-y-1 max-h-[300px] overflow-y-auto pr-1">
                                        {filteredBrands?.map((brand) => (
                                            <label
                                                key={brand.uid}
                                                className="flex items-center space-x-2 py-1.5 px-2 rounded hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer"
                                            >
                                                <Checkbox
                                                    checked={selectedBrands.includes(
                                                        String(brand.uid)
                                                    )}
                                                    onCheckedChange={() =>
                                                        handleBrandToggle(String(brand.uid))
                                                    }
                                                />
                                                <span className="text-sm">{brand.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Price Dropdown */}
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant={
                                        priceRange[0] !== 0 || priceRange[1] !== 1000
                                            ? 'default'
                                            : 'outline'
                                    }
                                    className="h-9"
                                >
                                    ფასი
                                    {(priceRange[0] !== 0 || priceRange[1] !== 1000) && (
                                        <span className="ml-2 text-xs">
                                            {priceRange[0]}-{priceRange[1]}₾
                                        </span>
                                    )}
                                    <ChevronDown className="ml-1 w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-72 mt-4  p-4">
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-sm font-medium mb-3">
                                            ფასის დიაპაზონი
                                        </div>
                                        <Slider
                                            min={0}
                                            max={1000}
                                            step={10}
                                            value={priceRange}
                                            onValueChange={setPriceRange}
                                            className="w-full"
                                        />
                                        <div className="flex items-center justify-between mt-3 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    value={priceRange[0]}
                                                    onChange={(e) =>
                                                        setPriceRange([
                                                            Number(e.target.value),
                                                            priceRange[1],
                                                        ])
                                                    }
                                                    className="w-20 h-8 text-xs"
                                                />
                                                <span>₾</span>
                                            </div>
                                            <span className="text-muted-foreground">-</span>
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    value={priceRange[1]}
                                                    onChange={(e) =>
                                                        setPriceRange([
                                                            priceRange[0],
                                                            Number(e.target.value),
                                                        ])
                                                    }
                                                    className="w-20 h-8 text-xs"
                                                />
                                                <span>₾</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Quick Filters */}
                        <Button
                            variant={inStock ? 'default' : 'outline'}
                            className="h-9"
                            onClick={() => setInStock(!inStock)}
                        >
                            მარაგში
                        </Button>

                        <Button
                            variant={onSale ? 'default' : 'outline'}
                            className="h-9"
                            onClick={() => setOnSale(!onSale)}
                        >
                            ფასდაკლებული
                        </Button>

                        <div className="flex-1" />

                        {/* Sort Dropdown */}
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-9">
                                    დალაგება
                                    <ChevronDown className="ml-1 w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 mt-4">
                                <div className="p-2 space-y-1">
                                    {sortOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-slate-100 dark:hover:bg-slate-800 ${
                                                sortBy === option.value
                                                    ? 'bg-slate-100 dark:bg-slate-800 font-medium'
                                                    : ''
                                            }`}
                                            onClick={() => setSortBy(option.value)}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Clear All */}
                        {activeFiltersCount > 0 && (
                            <Button
                                variant="ghost"
                                className="h-9 text-muted-foreground"
                                onClick={clearAllFilters}
                            >
                                <X className="w-4 h-4 mr-1" />
                                გასუფთავება ({activeFiltersCount})
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Products Area */}
            <div className="px-6 py-8 pt-[140px]">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold mb-2">{titleMap[params.name]}</h1>
                </div>
                <Outlet
                    context={{
                        priceRange,
                        selectedBrands,
                        selectedPlugTypes,
                        inStock,
                        onSale,
                        sortBy,
                    }}
                />
            </div>
        </div>
    );
};

export default ProductsHorizontalFilters;
