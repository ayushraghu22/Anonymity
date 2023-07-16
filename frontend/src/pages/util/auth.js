import Cookies from "js-cookie";
import AuthContext from "../context-api/auth-context";

export function tokenLoader() {
  const ctx = useContext(AuthContext);
  // const cookie = Cookies.get("connect.sid") || null;
  const cookie = ctx.email.trim().length > 0;
  return cookie;
}
