import styles from "./Login.module.scss";
import classNames from "classnames/bind";

import {
  // FacebookAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/firebase/config";
import { useSelector } from "react-redux";
import { userLogin } from "@/components/redux/selector";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import LoadingLogin from "@/components/Loaddings/LoadingLogin";
import { setDocument } from "@/firebase/services";
import ForgorPassword from "./ForgorPassword";
import SigIn from "./SingIn";
import SignUp from "./SignUp";

// const fbLogin = new FacebookAuthProvider();
const googleLogin = new GoogleAuthProvider();
const cx = classNames.bind(styles);
function Login() {
  const user = useSelector(userLogin);
  const navigate = useNavigate();
  const [earthSays, setEarthSays] = useState("Hello");
  const timeRef = useRef();
  useEffect(() => {
    clearTimeout(timeRef.current);

    timeRef.current = setTimeout(() => {
      setEarthSays("");
    }, 10000);
  }, [earthSays]);
  useEffect(() => {
    setTimeout(() => {
      if (user.email) {
        navigate("/");
      }
    }, 1500);
  }, [user, navigate]);
  // const handleLoginFB = () => {
  //   signInWithPopup(auth, fbLogin)
  //     .then((result) => {
  //       // The signed-in user info.
  //       const { user, _tokenResponse } = result;
  //       console.log("Đăng nhập", { user });
  //       if (_tokenResponse.isNewUser) {
  //         setDocument("users", {
  //           displayName: user.displayName,
  //           email: user.email,
  //           photoURL: user.photoURL,
  //           uid: user.uid,
  //           providerId: _tokenResponse.providerId,
  //         });
  //         // setDocument("userChats", {});
  //       }
  //       // ...

  //       // const credential = FacebookAuthProvider.credentialFromResult(result);
  //       // const token = credential.accessToken;
  //       // console.log("Token", { token });
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = FacebookAuthProvider.credentialFromError(error);
  //       console.error({ errorCode, errorMessage, email, credential });
  //       // ...
  //     });
  // };
  const handleLoginGoogle = () => {
    signInWithPopup(auth, googleLogin)
      .then((result) => {
        setEarthSays("Đăng nhập...");
        const { user, _tokenResponse } = result;
        console.log("Đăng nhập", { user });
        if (_tokenResponse.isNewUser) {
          try {
            setDocument("users", {
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              uid: user.uid,
              providerId: _tokenResponse.providerId,
            });
          } catch (e) {
            console.log(e);
          }
        }

        // ...
      })
      .catch((error) => {
        console.error(error);
        setEarthSays("Email đã được sử dụng");
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // console.error({ errorCode, errorMessage, email, credential });

        // ...
      });
  };
  const [form, setForm] = useState("signIn");
  const setFormSignIn = () => {
    setForm("signIn");
  };
  const setFormSignUp = () => {
    setForm("signUp");
  };
  const setFormFogotPassword = () => {
    setForm("forgotPassword");
  };
  return (
    <section className={cx("wrapper")}>
      {user.displayName === undefined ? <></> : <LoadingLogin />}
      <article className={cx("continer")}>
        <div className={cx("LoginContent")}>
          <div className={cx("logoApp", "autoCenter")}>
            <section className={cx("wrapperEarth")}>
              <div className={cx("earth")}>
                {earthSays === "" ? (
                  false
                ) : (
                  <p
                    style={{ bottom: earthSays === "Hello" ? "10px" : "" }}
                    className={cx("earthSays")}
                  >
                    {"Earth ^-^:  " + earthSays}
                  </p>
                )}

                <div className={cx("planet", "mars")}>
                  <img
                    alt="mars"
                    src={require("../../assets/images/mars.png")}
                  />
                </div>
                <div className={cx("planet", "jupiter")}>
                  <img
                    alt="mars"
                    src={require("../../assets/images/jupiter.png")}
                  />
                </div>
                <div className={cx("planet", "mercury")}>
                  <img
                    alt="mars"
                    src={require("../../assets/images/mercury.png")}
                  />
                </div>
              </div>
            </section>
          </div>
          {form === "forgotPassword" ? (
            false
          ) : (
            <h1 className={cx("Title")}>Welcome to Earth</h1>
          )}
        </div>
        <div className={cx("body", "autoCenter")}>
          {form === "signIn" ? (
            <SigIn
              earthSays={earthSays}
              setEarthSays={setEarthSays}
              setFormSignUp={setFormSignUp}
              setFormFogotPassword={setFormFogotPassword}
              handleLoginGoogle={handleLoginGoogle}
            />
          ) : (
            false
          )}
          {form === "forgotPassword" ? (
            <ForgorPassword
              earthSays={earthSays}
              setEarthSays={setEarthSays}
              setFormSignUp={setFormSignUp}
              setFormSignIn={setFormSignIn}
              handleLoginGoogle={handleLoginGoogle}
            />
          ) : (
            false
          )}
          {form === "signUp" ? (
            <SignUp
              earthSays={earthSays}
              setEarthSays={setEarthSays}
              setFormSignIn={setFormSignIn}
              handleLoginGoogle={handleLoginGoogle}
            />
          ) : (
            false
          )}
        </div>
      </article>
    </section>
  );
}

export default Login;
