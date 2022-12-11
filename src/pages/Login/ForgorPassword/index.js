import styles from "./ForgorPassword.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function ForgorPassword({ setFormSignUp, setFormSignIn }) {
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
    </section>
  );
}

export default ForgorPassword;
