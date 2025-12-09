import { validateRefreshToken } from "../tokens/refresh_token";
import deleteUser from "./delete_";
import editUser from "./edit";
import getAllUsersPaginated from "./get_all";
import getUsers from "./get_for_select";
import { checkUserInfo } from "./info";
import handleLogOut from "./log_out";
import { login } from "./login";
import { registerUser } from "./register";

const UsersRes = {
  deleteUser,
  registerUser,
  login,
  validateRefreshToken,
  checkUserInfo,
  handleLogOut,
  getUsers,
  getAllUsersPaginated,
  editUser
};
export default UsersRes;
