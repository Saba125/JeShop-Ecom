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
export type TSaleItem = {
    uid: number;
    type: 1 | 2; // 1 = percentage, 2 = GEL
    amount: number;
    sale_uid: number;
    user_uid: number;
    is_active: 0 | 1;
    created_at: string;
    product_uid: number;
};

export type TGetProducts = {
    uid: number;
    name: string;
    weight: string;
    price: string;
    image?: string | null;
    description?: string | null;
    stock: number;
    sale?: number;
    sale_type?: number;
    sales_items?: TSaleItem[];
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
export type TGetProductsPaginated = {
    data: TGetProducts[];
    pagination: Pagination;
};
export type TGetCategoriesPaginated = {
    data: Category[];
    pagination: Pagination;
};
export type TGetBrandsPaginated = {
    data: TGetBrand[];
    pagination: Pagination;
};
export type TGetSalesPaginated = {
    data: TGetSales[];
    pagination: Pagination;
};
export type TGetUnit = {
    uid: number;
    name: string;
    description?: string;
    created_at: string;
};
export type AddSales = {
    code: string;
    description: string | null;
    items: SaleItems[];
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
    code: string;
    description?: string;
    created_at: string;
    users: User[];
    products: TGetProducts[];
};
export type TGetPaginatedUsers = {
    data: User[];
    pagination: Pagination;
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
export type Cart = {
    products: CartItems[];
};
export type CartItems = {
    product_uid: number;
    product_name: string;
    product_image: string | null;
    quantity: number;
    old_price: number | null;
    new_price: number;
    has_sale: boolean;
    stock: number;
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
export type Pagination = {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
};

export type SelectOptions = {
    label: string | JSX.Element;
    value: number | null;
};
