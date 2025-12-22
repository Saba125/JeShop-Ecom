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
