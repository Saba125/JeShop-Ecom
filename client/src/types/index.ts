export type Category = {
    uid: number;
    name: string;
    description: string;
    image?: string;
    created_at?:string
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
    uid: number
    name: string;
    weight: string;
    price: string;
    image?: string | null;
    description?: string | null
    stock?: number | undefined;
    category: {
        uid: number;
        name: string;
        image: string | null;
        description: string | null
    }
    unit: {
        uid: number;
        name: string;
        description: string | null
    }
    created_at: string;
};
export type TGetUnit = {
    uid: number;
    name: string;
    description?: string;
    created_at:string;
}


export type SelectOptions = {
    label: string;
    value: number;
};
