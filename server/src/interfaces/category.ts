export interface ICategory {
  uid: number;
  name:string;
  description:string;
  image?:string
}
export interface IProduct {
  uid?: number;               // optional (since z.string().optional())
  name: string;               // required, 3–50 characters
  description?: string;       // optional
  stock?: number;             // optional
  category_uid?: number | null; // nullable and optional
  brand_uid: number
  weight: number;             // required
  price: number;              // required
  unit: number;               // required, must be at least 1 char
  image?: string;             // optional (you had it in the old IProduct)
}

export interface Product {
  uid: number;
  image: string;
  stock: number;
  name: string;
  price: string; // string because "25.00"
  created_at: Date;
  category: Category;
  sales_items: SalesItem[];
  unit: Unit;
  brand: Brand;
}

export interface Category {
  uid: number;
  name: string;
  image: string;
  description: string;
}

export interface SalesItem {
  uid: number;
  type: number;
  amount: number;
  sale_uid: number;
  user_uid: number;
  is_active: number; // could be boolean if backend allows
  created_at: string; // backend returns string datetime
  product_uid: number;
}

export interface Unit {
  uid: number;
  name: string;
}

export interface Brand {
  uid: number;
  name: string;
  image: string | null;
  description: string;
}
