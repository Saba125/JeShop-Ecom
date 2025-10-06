import React from 'react';
import { HiOutlineShoppingBag } from 'react-icons/hi2';

const Cart = () => {
    return (
        <div className="relative cursor-pointer group">
            <HiOutlineShoppingBag className="w-8 h-8 text-gray-700 transition-colors group-hover:text-[#5C1CDA]" />
            <div className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-xs font-semibold text-white bg-gradient-to-br from-[#5C1CDA] to-[#7C3AED] rounded-full shadow-lg border-2 border-white transition-transform group-hover:scale-110">
                0
            </div>
        </div>
    );
};

export default Cart;