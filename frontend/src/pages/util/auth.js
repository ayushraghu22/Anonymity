import Cookies from "js-cookie";

export function tokenLoader(){
    const cookie = Cookies.get("connect.sid") || null;
    return cookie;
}