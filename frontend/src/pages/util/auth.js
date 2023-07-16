// import Cookies from "js-cookie";
import { useContext } from "react";
import AuthContext from "../../context-api/auth-context";

function Auth(){
    const ctx = useContext(AuthContext);
    const cookie = ctx.email.trim().length > 0;
    return cookie;
}

export function tokenLoader(){
    // const cookie = Cookies.get("connect.sid") || null;
    const cookie = Auth();
    return cookie;
}