import deleteCategory from "./delete_";
import getCategories from "./get_";
import createCategory from "./post_";
import editCategory from "./put_";

const CategoryRes = {
  createCategory,
  getCategories,
  editCategory,
  deleteCategory
};
export default CategoryRes;
