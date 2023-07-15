import { redirect, json } from "react-router-dom";
import Login from "../components/auth/Login";

function LoginPage() {
  return <Login />
}

export default LoginPage;

export async function action({ request }) {
  console.log("hello from loginpage");
  const data = await request.formData();

  const registerData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("https://anonymity-backend.onrender.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
    credentials: "include",
  });

  if(response.status === 422)
    return response;

  // console.log(response);  
  if(response.status !== 200)
    throw json({message: "Wrong Credentials"}, {status: 401});
  else
    return redirect("/posts");
}
