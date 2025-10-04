import { validateRefreshToken } from "../tokens/refresh_token";
import { checkUserInfo } from "./info";
import { login } from "./login";
import { registerUser } from "./register";

const UsersRes = {
  registerUser,
  login,
  validateRefreshToken,
  checkUserInfo
};
export default UsersRes;
