import type { JSX } from 'react';

export type Category = {
    uid: number;
    name: string;
    description: string;
    image?: string;
    created_at?: string;
    url: string;
};
export type TAddProduct = {
    uid?: number;
    name: string;
    weight: string;
    price: string;
    unit: string;
    image?: string | undefined;
    description?: string | undefined;
    stock?: string | undefined;
    category_uid?: string | null | undefined;
    category_name?: string;
};
export type TGetProducts = {
    uid: number;
    name: string;
    weight: string;
    price: string;
    image?: string | null;
    description?: string | null;
    stock?: number | undefined;
    category: {
        uid: number;
        name: string;
        image: string | null;
        description: string | null;
    };
    unit: {
        uid: number;
        name: string;
        description: string | null;
    };
    brand: {
        uid: number;
        name: string;
        image: string;
        description: string | null;
    };
    created_at: string;
};
export type TGetUnit = {
    uid: number;
    name: string;
    description?: string;
    created_at: string;
};

export type TGetBrand = {
    uid: number;
    name: string;
    description?: string;
    created_at: string;
    image?: string;
};
export type TGetSales = {
    uid: number;
    user_uid: number;
    product_uid: number;
    type: number;
    description: string;
    code: string;
    is_active: number;
    created_at: string;
};
export type User = {
    uid: number | null;
    username: string;
    email: string;
    phone: string;
    user_type: number;
    is_active: number;
    email_verified_date: string;
    create_date: string;
};

export type SaleItems = {
    amount: string;
    product_uid: number;
    product_image: string | null;
    product_name: string;
    user_uid: number | null;
    type: number;
    old_price: number;
    new_price: number;
    description: string;
    code: string;
    is_active: number;
};

export type SelectOptions = {
    label: string | JSX.Element;
    value: number | null;
};
