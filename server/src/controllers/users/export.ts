import { validateRefreshToken } from "../tokens/refresh_token";
import getUsers from "./get_all";
import { checkUserInfo } from "./info";
import handleLogOut from "./log_out";
import { login } from "./login";
import { registerUser } from "./register";

const UsersRes = {
  registerUser,
  login,
  validateRefreshToken,
  checkUserInfo,
  handleLogOut,
  getUsers
};
export default UsersRes;
