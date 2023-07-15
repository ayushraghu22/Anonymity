import Cookies from "js-cookie";
import { redirect } from "react-router-dom";

export async function action() {
  console.log("inside logOut")
  try {
    fetch("http://localhost:5000/logout");
    Cookies.remove("connect.sid");
  } catch (e) {
    console.log(e);
  }
  return redirect("/");
}
