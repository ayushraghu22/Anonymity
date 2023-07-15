import React, { useState } from "react";

const AuthContext = React.createContext({
  email: "",
  setEmailHandler: () => {},
});

export default AuthContext;

export const AuthContextProvider = (props) => {
  const [email, setEmail] = useState("");

  const setEmailHandler = (enteredEmail) => {
    // console.log("hello form authcontext"); 
    // console.log(enteredEmail);
    setEmail(enteredEmail);
  };
  return (
    <AuthContext.Provider value={{ email, setEmailHandler }}>
      {props.children}
    </AuthContext.Provider>
  );
};
