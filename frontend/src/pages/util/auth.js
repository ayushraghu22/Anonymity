import Cookies from "js-cookie";

export function tokenLoader(){
    const cookie = Cookies.get("MyCoolWebAppCookie") || null;
    return cookie;
}