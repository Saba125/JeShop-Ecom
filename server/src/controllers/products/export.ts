import deleteProduct from "./delete_";
import getProducts from "./get_";
import getProductsPaginated from "./get_paginated";
import addProduct from "./post_";
import updateProduct from "./put_";

const ProductRes = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductsPaginated
};
export default ProductRes;
