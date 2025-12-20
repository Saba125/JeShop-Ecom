import deleteProduct from "./delete_";
import getProducts from "./get_";
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
  getSingleProduct
};
export default ProductRes;
