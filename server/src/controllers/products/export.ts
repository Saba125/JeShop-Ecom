import deleteProduct from "./delete_";
import getProducts from "./get_";
import getProductByBrandAndCategory from "./get_by_brand_and_category";
import getProductsPaginated from "./get_paginated";
import getSingleProduct from "./get_single";
import addProduct from "./post_";
import updateProduct from "./put_";

const ProductRes = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductsPaginated,
  getSingleProduct,
  getProductByBrandAndCategory
};
export default ProductRes;
