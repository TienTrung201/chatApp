import styles from "./ForgorPassword.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

import { auth } from "@/firebase/config";
import { useMemo } from "react";
import { useFireStore } from "@/hooks/useFirestor";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { useState } from "react";

// import { useGetAccount } from "@/hooks/useFirestor";
const cx = classNames.bind(styles);

function ForgorPassword({
  setEarthSays,
  handleLoginGoogle,
  setFormSignUp,
  setFormSignIn,
}) {
  const conditionUser = useMemo(() => {
    return {
      fieldName: "displayName",
      operator: "!=",
      compareValue: "getAll",
    };
  }, []);

  const users = useFireStore("users", conditionUser);

  const handleCheckAccount = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const number = e.target.number.value;
    const accountForgotPassword = users.find((user) => user.email === email);
    if (accountForgotPassword) {
      if (accountForgotPassword.contact === number) {
        setEarthSays("Đăng nhập...");
        signInWithEmailAndPassword(auth, email, accountForgotPassword.password)
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
      } else {
        setEarthSays("Số điện thoại không đúng");
        e.target.number.value = "";
        e.target.number.focus();
      }
    } else {
      setEarthSays("Email không hợp lệ");
    }
  };

  return (
    <section className={cx("wrapper")}>
      <form
        onSubmit={(e) => {
          handleCheckAccount(e);
        }}
      >
        <h5 className={cx("title")}>Nhập số điện thoại và email đăng ký</h5>

        <div className={cx("signinButton", "autoCenter")}>
          <FontAwesomeIcon icon={faEnvelope} className={cx("icon")} />
          <input
            autoComplete="off"
            name="email"
            placeholder="email"
            type="Email"
          />
        </div>
        <div className={cx("signinButton", "autoCenter")}>
          <FontAwesomeIcon icon={faPhone} className={cx("icon")} />
          <input
            autoComplete="off"
            name="number"
            placeholder="Số điện thoại"
            type="text"
          />
        </div>
        <div className={cx("account")}>
          <p onClick={setFormSignUp}>Tạo tài khoản</p>
          <p onClick={setFormSignIn}>Đăng nhập</p>
        </div>

        <div className={cx("logInApp")}>
          <button className={cx("signinButton", "logIn", "autoCenter")}>
            <p>Xác nhận</p>
          </button>
        </div>
      </form>
    </section>
  );
}

export default ForgorPassword;
