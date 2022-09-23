import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import images from "@/assets/images";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/config";

const fbLogin = new FacebookAuthProvider();
const cx = classNames.bind(styles);
function Login() {
  const handleLoginFB = () => {
    signInWithPopup(auth, fbLogin)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log("Đăng nhập", { user });
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.error({ errorCode, errorMessage, email, credential });
        // ...
      });
  };
  return (
    <section className={cx("wrapper")}>
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
          <h1 className={cx("Title")}>Hello :))</h1>
        </div>
        <div className={cx("body", "autoCenter")}>
          <div
            onClick={handleLoginFB}
            className={cx("signinButton", "autoCenter")}
          >
            <img className={cx("icon")} src={images.facebook} alt="Facebook" />
            <span className={cx("conectTitle")}>Tiếp tục với Facebook</span>
          </div>
          <div className={cx("signinButton", "autoCenter")}>
            <img className={cx("icon")} src={images.google} alt="Facebook" />
            <span className={cx("conectTitle")}>Tiếp tục với google</span>
          </div>
        </div>
      </article>
    </section>
  );
}

export default Login;
