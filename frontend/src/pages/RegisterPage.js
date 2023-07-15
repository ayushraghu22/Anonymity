import { json, redirect } from "react-router-dom";
import Register from "../components/auth/Register";

function RegisterPage() {
  return <Register />;
}

export default RegisterPage;

export async function action({ request }) {
  console.log("hello from registerpage");
  const data = await request.formData();

  const registerData = {
    email: data.get("email"),
    username: data.get("username"),
    password: data.get("password"),
    otp: data.get("otp")
  };

  const response = await fetch("https://anonymity-backend.onrender.com/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
    credentials: "include",
  });

  if (response.status === 422) return response;

  // console.log(response);
  if (response.status !== 200)
    throw json({ message: "Could not register." }, { status: 500 });
  else return redirect("/posts");
}
