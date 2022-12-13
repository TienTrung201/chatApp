import styles from "./SigIn.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";

import images from "@/assets/images";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { formSignupValidate } from "../SignUp";

const cx = classNames.bind(styles);

function SigIn({
  handleLoginGoogle,
  setFormSignUp,
  setFormFogotPassword,
  earthSays,
  setEarthSays,
}) {
  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const type = "signIn";
    if (formSignupValidate(e.target, type) !== true) {
      setEarthSays(formSignupValidate(e.target, type), "signIn");
    } else {
      setEarthSays("Đăng nhập...");

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Login ", user);
          // ...
        })
        .catch((error) => {
          console.error(error);
          setEarthSays("Tài khoản hoặc mật khẩu không đúng");
        });
    }
  };

  return (
    <section className={cx("wrapper")}>
      <form
        onSubmit={(e) => {
          handleSignIn(e);
        }}
      >
        <div className={cx("signinButton", "autoCenter")}>
          <FontAwesomeIcon icon={faEnvelope} className={cx("icon")} />
          <input
            autoComplete="off"
            name="email"
            placeholder="Email"
            type="email"
          />
        </div>
        <div className={cx("signinButton", "autoCenter")}>
          <FontAwesomeIcon icon={faKey} className={cx("icon")} />
          <input
            autoComplete="off"
            name="password"
            type="password"
            placeholder="Mật khẩu"
          />
        </div>

        <div className={cx("account")}>
          <p onClick={setFormSignUp}>Tạo tài khoản</p>
          <p onClick={setFormFogotPassword}>Quên mật khẩu ?</p>
        </div>
        <div className={cx("logInApp")}>
          <div
            onClick={() => {
              handleLoginGoogle();
            }}
            className={cx("singInGoogle", "autoCenter")}
          >
            {" "}
            <img className={cx("icon")} src={images.google} alt="Facebook" />
          </div>
          <button className={cx("signinButton", "logIn", "autoCenter")}>
            <p>Đăng nhập</p>
          </button>
        </div>
      </form>
    </section>
  );
}

export default SigIn;
