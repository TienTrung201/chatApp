import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import images from "@/assets/images";
import {
  // FacebookAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/firebase/config";
import { useSelector } from "react-redux";
import { userLogin } from "@/components/redux/selector";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
  useEffect(() => {
    setTimeout(() => {
      if (user.displayName) {
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
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
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
              setFormSignUp={setFormSignUp}
              setFormFogotPassword={setFormFogotPassword}
            />
          ) : (
            false
          )}
          {form === "forgotPassword" ? (
            <ForgorPassword
              setFormSignUp={setFormSignUp}
              setFormSignIn={setFormSignIn}
            />
          ) : (
            false
          )}
          {form === "signUp" ? <SignUp setFormSignIn={setFormSignIn} /> : false}

          <div className={cx("logInApp")}>
            <div
              onClick={handleLoginGoogle}
              className={cx("singInGoogle", "autoCenter")}
            >
              {" "}
              <img className={cx("icon")} src={images.google} alt="Facebook" />
            </div>
            <div className={cx("signinButton", "logIn", "autoCenter")}>
              {form === "signIn" ? <p>Đăng nhập</p> : false}
              {form === "signUp" ? <p>Đăng Ký</p> : false}
              {form === "forgotPassword" ? <p>Xác nhận</p> : false}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

export default Login;
