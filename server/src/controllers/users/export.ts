import { validateRefreshToken } from "../tokens/refresh_token";
import { login } from "./login";
import { registerUser } from "./register";

const UsersRes = {
  registerUser,
  login,
  validateRefreshToken
};
export default UsersRes;
