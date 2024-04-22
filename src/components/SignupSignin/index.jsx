import React, { useState } from "react";
import "./styles.css";
import Button from "../Common Components/Button";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from "../../firebase";

function SignupSigninComponent() {
  const [name, setName] = useState("");

  const [loginForm, setLoginForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function createDoc(user) {
    setLoading(true);
    if (!user) return;

    const useRef = doc(db, "users", user.uid);
    const userData = await getDoc(useRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          createdAt: new Date(),
        });
        toast.success("Doc Created");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }

  function googgleAuth() {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const user = result.user;
          createDoc(user);
          setLoading(false);
          navigate("/dashboard");
          toast.success("User authenticated");
        })
        .catch((error) => {
          setLoading(false);
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  }

  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 style={{ textAlign: "center", padding: "25px" }}>Login</h2>

          <form>
            <Button
              onClick={googgleAuth}
              text={loading ? "Loading..." : "Login with Google"}
              blue={false}
            />

            <p className="p-login" onClick={() => setLoginForm(!loginForm)}>
              Or Dont have an Account?{" "}
              <span style={{ color: "var(--theme)" }}>Click here</span>
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 style={{ textAlign: "center", padding: "25px" }}>Sign Up </h2>
          <form>
            <Button
              onClick={googgleAuth}
              text={loading ? "Loading..." : "Signup with Google"}
              blue={false}
            />
            <p className="p-login" onClick={() => setLoginForm(!loginForm)}>
              Or Have an Account Already?{" "}
              <span style={{ color: "var(--theme)" }}>Click here</span>
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default SignupSigninComponent;
