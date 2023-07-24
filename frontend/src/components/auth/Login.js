import {
  Form,
  useActionData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import classes from "./Login.module.css";
import loginImage from "../auth/images/login2.png";
import { useContext, useState } from "react";
import AuthContext from "../../context-api/auth-context";
import Loader from "../Loader";

function Login() {
  const data = useActionData();
  const navigate = useNavigation();
  const ctx = useContext(AuthContext);
  const submit = useSubmit();

  const isLoggingIn = navigate.state === "submitting";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const onSubmitHandler = (event) => {
    // console.log(username, " ", password);
    // console.log(email);
    submit({ email, password }, { method: "POST" });
    setIsSubmit(true);
    if (isSubmit && data && data.errors) {
    } else {
      ctx.setEmailHandler(email);
    }
  };

  return (
    <>
      {isLoggingIn ? (
        <Loader />
      ) : (
        <div className="content mt-4">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <img
                  src={loginImage}
                  alt="login one"
                  className="img-fluid"
                  style={{ width: "100%", marginLeft: "8px" }}
                />
              </div>

              <div className="col-md-6 contents order-md-2">
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <div className="mb-4">
                      <h3>
                        Log in <strong></strong>
                      </h3>
                      <p className="mb-4" style={{ fontWeight: "400" }}>
                        Please Login to see all the <strong>posts.</strong>
                      </p>
                    </div>
                    <Form method="POST">
                      {isSubmit && data && data.errors && (
                        <ul style={{ paddingLeft: "0px", color: "red" }}>
                          {Object.values(data.errors).map((err) => (
                            <li key={err}>{err}</li>
                          ))}
                        </ul>
                      )}
                      <div className={`first ${classes.formGroup}`}>
                        <label htmlFor="email">E-mail</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          onChange={(event) => {
                            setEmail(event.target.value);
                            setIsSubmit(false);
                          }}
                          value={email}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div className={`last mb-4 ${classes.formGroup}`}>
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          onChange={(event) => {
                            setPassword(event.target.value);
                            setIsSubmit(false);
                          }}
                          value={password}
                          placeholder="Enter your password"
                          required
                        />
                      </div>

                      <button
                        onClick={onSubmitHandler}
                        type="button"
                        className="btn text-white btn-block btn-primary"
                      >
                        {isLoggingIn ? "Submitting..." : "Log In"}
                      </button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
