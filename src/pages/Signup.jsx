import React from "react";
import Header from "../components/Common Components/Header";
import SignupSigninComponent from "../components/SignupSignin";

function Signup() {
  return (
    <div>
      <Header />
      <div className="wrapper">
        <SignupSigninComponent />
      </div>
    </div>
  );
}

export default Signup;
