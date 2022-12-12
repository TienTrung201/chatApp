import styles from "./ForgorPassword.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import images from "@/assets/images";

const cx = classNames.bind(styles);

function ForgorPassword({ handleLoginGoogle, setFormSignUp, setFormSignIn }) {
  return (
    <section className={cx("wrapper")}>
      <h5 className={cx("title")}>Nhập số điện thoại và email đăng ký</h5>
      <div className={cx("signinButton", "autoCenter")}>
        <FontAwesomeIcon icon={faPhone} className={cx("icon")} />
        <input placeholder="Số điện thoại" type="text" />
      </div>
      <div className={cx("signinButton", "autoCenter")}>
        <FontAwesomeIcon icon={faEnvelope} className={cx("icon")} />
        <input placeholder="email" type="Email" />
      </div>

      <div className={cx("account")}>
        <p onClick={setFormSignUp}>Tạo tài khoản</p>
        <p onClick={setFormSignIn}>Đăng nhập</p>
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
          <p>Xác nhận</p>
        </button>
      </div>
    </section>
  );
}

export default ForgorPassword;
