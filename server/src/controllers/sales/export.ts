import deleteSale from "./delete_";
import getSales from "./get_";
import getPaginatedSales from "./get_paginated";
import addSale from "./post_";

const SalesRes = {
  addSale,
  getSales,
  deleteSale,
  getPaginatedSales
};
export default SalesRes;
