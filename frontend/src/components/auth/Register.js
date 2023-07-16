import { Form, useActionData, useNavigation } from "react-router-dom";
import classes from "./Register.module.css";
import loginImage from "../auth/images/register.png";
import { useEffect, useState } from "react";
import Loader from "../Loader";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";

function Register() {
  const data = useActionData();
  const navigation = useNavigation();

  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState();

  const [enteredEmail, setEnteredEmail] = useState("");
  const [isValidEmail, setIsEmailValid] = useState(true);

  const [enteredOtp, setEnteredOtp] = useState();

  const [otpContent, setOtpContent] = useState("Send OTP");
  const [emailPresentError, setEmailPresentError] = useState({});
  const [sentOtpSuccessfully, setSentOtpSuccessfully] = useState();
  // const [verifyContent, setVerifyContent] = useState("Verify");

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    const len = enteredPassword.trim().length;
    if (len <= 0) setPasswordValidation("");
    else if (len <= 3) setPasswordValidation("very weak password");
    else if (len < 6) setPasswordValidation("weak password");
    else if (len < 8) setPasswordValidation("strong password");
    else if (len < 18) setPasswordValidation("very strong password");
    else setPasswordValidation("Bas bhai!!");
  }, [enteredPassword]);

  const handleSendOtpClick = async () => {
    if (!enteredEmail.trim().includes("@ietdavv.edu.in")) {
      window.alert("Please enter correct e-mail");
      return;
    }

    const response = await fetch(
      "https://anonymity1.netlify.app/register/sendEmailOtp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: enteredEmail }),
        credentials: "include",
      }
    );

    if (response.status !== 200) {
      const data1 = await response.json();
      setEmailPresentError(data1.errors);
    } else {
      setOtpContent("Resend");
      setSentOtpSuccessfully("OTP sent successfully.");
      setTimeout(() => {
        setSentOtpSuccessfully(null);
      }, 3500);
    }
  };

  // const handleVerifyClick = () => {
  //   if (gotOtp === enteredOtp) {
  //     window.alert("E-mail verified");
  //     setVerifyContent("Verified");
  //   } else window.alert("Incorrect OTP");
  // };

  return (
    <>
      {isSubmitting ? (
        <Loader />
      ) : (
        <div className="content mt-4" style={{ margin: "3rem 0" }}>
          <div className="container">
            <div className="row">
              <div className="col-md-6 ">
                <img src={loginImage} alt="login one" className="img-fluid" />
              </div>

              <div className="col-md-6 contents order-md-2">
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <div className="mb-4">
                      <h3>
                        Sign Up to <strong>Anonymity</strong>
                      </h3>
                      <p className="mb-4" style={{fontWeight:"400"}}>
                        Hello there! Please register to enter into an{" "}
                        <strong>unknown</strong> world.
                      </p>
                    </div>
                    <Form method="POST">
                      {data && data.errors && (
                        <ul style={{ paddingLeft: "0px", color: "red" }}>
                          {Object.values(data.errors).map((err) => (
                            <li key={err}>{err}</li>
                          ))}
                        </ul>
                      )}
                      {/* {data && data.message && <p style={{color:"red"}}>{data.message}</p>} */}

                      {emailPresentError && (
                        <ul style={{ paddingLeft: "0px", color: "red" }}>
                          {Object.values(emailPresentError).map((err) => (
                            <li key={err}>{err}</li>
                          ))}
                        </ul>
                      )}

                      {sentOtpSuccessfully && (
                        <p style={{ color: "blue" }}>{sentOtpSuccessfully}</p>
                      )}

                      <div className={`first ${classes.formGroup}`}>
                        <label htmlFor="email">
                          Email{" "}
                          <small style={{ fontSize: "0.8rem" }}>
                            (Only college email accepted.)
                          </small>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="username"
                          name="email"
                          value={enteredEmail}
                          placeholder="Enter Email Address"
                          onChange={(ev) => {
                            setEnteredEmail(ev.target.value);
                            setIsEmailValid(true);
                          }}
                          onBlur={() =>
                            !enteredEmail.trim().includes("@ietdavv.edu.in")
                              ? setIsEmailValid(false)
                              : null
                          }
                          required
                        />
                        {!isValidEmail && (
                          <p style={{ color: "red" }}>
                            Email must include @ietdavv.edu.in
                          </p>
                        )}
                      </div>
                      <div className={classes.sideButtons}>
                        <button
                          type="button"
                          onClick={handleSendOtpClick}
                          value={otpContent}
                        >
                          {otpContent}
                        </button>
                      </div>

                      <div className={`first ${classes.formGroup}`}>
                        <label htmlFor="otp">Enter OTP</label>
                        <input
                          type="number"
                          className="form-control"
                          id="otp"
                          name="otp"
                          value={enteredOtp}
                          placeholder="Enter OTP"
                          onChange={(ev) => setEnteredOtp(ev.target.value)}
                          required
                        />
                      </div>

                      {/* <div className="sideButtons">
                    <button
                      type="button"
                      onClick={handleVerifyClick}
                      value={verifyContent}
                    >
                      Verify
                    </button>
                  </div> */}

                      <div className={`first ${classes.formGroup}`}>
                        <label htmlFor="username">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          id="text"
                          name="username"
                          placeholder="Enter your username"
                          required
                        />
                      </div>
                      <div className={`${classes.formGroup} last mb-4`}>
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          value={enteredPassword}
                          placeholder="Enter password"
                          onChange={(ev) => setEnteredPassword(ev.target.value)}
                          required
                        />
                        {passwordValidation !== "" && (
                          <p
                            style={{
                              color:
                                enteredPassword.trim().length >= 6
                                  ? "blue"
                                  : "red",
                            }}
                          >
                            {passwordValidation}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        style={{marginBottom:"2.5rem",marginTop:"-0.7rem"}}
                        className="btn text-white btn-block btn-primary"
                        // disabled={verifyContent !== "Verified"}
                      >
                        {isSubmitting ? "Submitting..." : "Sign up"}
                      </button>

                      {/* <span className="d-block text-left mt-3 mb-2 text-muted">
                    {" "}
                    or sign up with
                  </span>

                  <div className="login-icons">
                    <div className="facebook">
                      <Link
                        to="http://localhost:5000/auth/facebook"
                        className="facebook"
                      >
                        <FontAwesomeIcon icon={faFacebook} />
                      </Link>
                    </div>
                    <div className="google">
                      <Link
                        to="http://localhost:5000/auth/google"
                        className="twitter"
                      >
                        <FontAwesomeIcon icon={faGoogle} />
                      </Link>
                    </div>
                  </div> */}
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

export default Register;
