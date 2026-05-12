import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import CDialog from './custom-dialog';
import { useAddAddress } from '@/api/address/post_';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface LatLng {
    lat: number;
    lng: number;
}

interface SelectedAddress {
    formatted: string;
    latlng: LatLng;
}

interface SavedAddress {
    uid: number;
    address_lat: number;
    address_lng: number;
    address_text: string;
}

interface AddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: (address: SelectedAddress) => void;
}

const DEFAULT_CENTER: LatLng = { lat: 41.6938, lng: 44.8015 };

const reverseGeocode = async (latlng: LatLng): Promise<string> => {
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`,
            { headers: { 'Accept-Language': 'ka,en' } }
        );
        const data = await res.json();
        return data.display_name ?? `${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`;
    } catch {
        return `${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`;
    }
};

const searchAddress = async (query: string): Promise<{ label: string; latlng: LatLng }[]> => {
    if (!query.trim()) return [];
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&countrycodes=ge`,
            { headers: { 'Accept-Language': 'ka,en' } }
        );
        const data = await res.json();
        return data.map((item: any) => ({
            label: item.display_name,
            latlng: { lat: parseFloat(item.lat), lng: parseFloat(item.lon) },
        }));
    } catch {
        return [];
    }
};

function MapClickHandler({ onMapClick }: { onMapClick: (latlng: LatLng) => void }) {
    useMapEvents({
        click(e) {
            onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
        },
    });
    return null;
}

function FlyToPosition({ position }: { position: LatLng | null }) {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.flyTo([position.lat, position.lng], 16, { duration: 1 });
        }
    }, [position, map]);
    return null;
}

const AddressModal = ({ isOpen, onClose, onConfirm }: AddressModalProps) => {
    const user = useSelector((state: RootState) => state.user);
    const addresses: SavedAddress[] = user?.addresses ?? [];

    const { mutate: addAddress, isPending, isSuccess } = useAddAddress();
    const [selected, setSelected] = useState<SelectedAddress | null>(null);
    const [markerPos, setMarkerPos] = useState<LatLng | null>(null);
    const [flyTo, setFlyTo] = useState<LatLng | null>(null);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<{ label: string; latlng: LatLng }[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!isOpen) {
            setSelected(null);
            setMarkerPos(null);
            setFlyTo(null);
            setQuery('');
            setSuggestions([]);
        }
    }, [isOpen]);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }
        debounceRef.current = setTimeout(async () => {
            const results = await searchAddress(query);
            setSuggestions(results);
            setShowSuggestions(true);
        }, 400);
    }, [query]);

    const handleMapClick = async (latlng: LatLng) => {
        setMarkerPos(latlng);
        const label = await reverseGeocode(latlng);
        setSelected({ formatted: label, latlng });
        setQuery(label);
        setShowSuggestions(false);
    };

    const handleSuggestionSelect = (item: { label: string; latlng: LatLng }) => {
        setMarkerPos(item.latlng);
        setFlyTo(item.latlng);
        setSelected({ formatted: item.label, latlng: item.latlng });
        setQuery(item.label);
        setShowSuggestions(false);
        setSuggestions([]);
    };

    const handleConfirm = () => {
        if (!selected) return;
        addAddress({
            address_lat: selected.latlng.lat,
            address_lng: selected.latlng.lng,
            address_text: selected.formatted,
        });
    };

    if (!isOpen) return null;

    return (
        <CDialog
            title="მისამართის დამატება"
            open={isOpen}
            onOpenChange={onClose}
            width="1000px"
            height=""
            onSubmit={handleConfirm}
        >
            <div className="flex flex-col gap-3">

                {/* Search input with suggestions */}
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                        placeholder="მოძებნეთ მისამართი..."
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {showSuggestions && suggestions.length > 0 && (
                        <ul className="absolute z-[1000] top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto text-sm">
                            {suggestions.map((s, i) => (
                                <li
                                    key={i}
                                    onMouseDown={() => handleSuggestionSelect(s)}
                                    className="px-3 py-2 hover:bg-blue-50 cursor-pointer truncate"
                                >
                                    {s.label}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Saved addresses */}
                {addresses.length > 0 && (
                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-gray-500 font-medium">შენახული მისამართები</p>
                        <div className="flex flex-col gap-1 max-h-32 overflow-y-auto">
                            {addresses.map((addr) => (
                                <div
                                    key={addr.uid}
                                    onClick={() =>
                                        handleSuggestionSelect({
                                            label: addr.address_text,
                                            latlng: {
                                                lat: addr.address_lat,
                                                lng: addr.address_lng,
                                            },
                                        })
                                    }
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 truncate"
                                >
                                    📍 {addr.address_text}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Map */}
                <div className="relative w-full h-74 rounded-lg overflow-hidden border border-gray-200 z-0">
                    <MapContainer
                        center={[DEFAULT_CENTER.lat, DEFAULT_CENTER.lng]}
                        zoom={13}
                        style={{ width: '100%', height: '100%' }}
                        zoomControl={true}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapClickHandler onMapClick={handleMapClick} />
                        <FlyToPosition position={flyTo} />
                        {markerPos && <Marker position={[markerPos.lat, markerPos.lng]} />}
                    </MapContainer>
                </div>

                {/* Selected address display */}
                {selected && (
                    <p className="text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                        📍 {selected.formatted}
                    </p>
                )}

            </div>
        </CDialog>
    );
};

export default AddressModal;