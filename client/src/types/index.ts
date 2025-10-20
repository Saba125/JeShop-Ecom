export type Category = {
  uid: number;
  name: string;
  description: string;
  image?: string;
};
export type Product = {
    uid: number;
    name: string;
    description?:string;
    image?:string;
    stock: number;
    category_uid: number;
    weight: number;
    created_at:string
}
export type SelectOptions = {
    label:string;
    value:number
}