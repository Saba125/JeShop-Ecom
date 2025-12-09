import deleteBrand from "./delete_";
import getBrands from "./get_";
import getPaginatedBrands from "./get_paginated";
import addBrand from "./post_";
import updateBrand from "./put_";

const BrandRes = {
  getBrands,
  addBrand,
  updateBrand,
  deleteBrand,
  getPaginatedBrands
};
export default BrandRes;
