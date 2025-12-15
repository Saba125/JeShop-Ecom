import deleteCategory from "./delete_";
import getCategories from "./get_";
import getPaginatedCategories from "./get_paginated";
import createCategory from "./post_";
import editCategory from "./put_";

const CategoryRes = {
  createCategory,
  getCategories,
  editCategory,
  deleteCategory,
  getPaginatedCategories
};
export default CategoryRes;
