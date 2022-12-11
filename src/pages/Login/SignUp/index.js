import styles from "./SignUp.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faKey, faLock, faSignature } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function SignUp({ setFormSignIn }) {
  return (
    <section className={cx("wrapper")}>
      <div className={cx("signinButton", "autoCenter")}>
        <FontAwesomeIcon icon={faSignature} className={cx("icon")} />
        <input placeholder="Tên" type="text" />
      </div>
      <div className={cx("signinButton", "autoCenter")}>
        <FontAwesomeIcon icon={faUser} className={cx("icon")} />
        <input placeholder="Tên đăng nhập" type="text" />
      </div>
      <div className={cx("signinButton", "autoCenter")}>
        <FontAwesomeIcon icon={faKey} className={cx("icon")} />
        <input type="password" placeholder="Mật khẩu" />
      </div>
      <div className={cx("signinButton", "autoCenter")}>
        <FontAwesomeIcon icon={faLock} className={cx("icon")} />
        <input type="password" placeholder="Nhập lại mật khẩu" />
      </div>
      <div className={cx("account")}>
        <p onClick={setFormSignIn}>Đăng nhập</p>
      </div>
    </section>
  );
}

export default SignUp;
