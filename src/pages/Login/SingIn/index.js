import styles from "./SigIn.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(styles);

function SigIn({ setFormSignUp, setFormFogotPassword }) {
  return (
    <section className={cx("wrapper")}>
      <div className={cx("signinButton", "autoCenter")}>
        <FontAwesomeIcon icon={faUser} className={cx("icon")} />
        <input placeholder="Tài khoản" type="text" />
      </div>
      <div className={cx("signinButton", "autoCenter")}>
        <FontAwesomeIcon icon={faKey} className={cx("icon")} />
        <input type="password" placeholder="Mật khẩu" />
      </div>

      <div className={cx("account")}>
        <p onClick={setFormSignUp}>Tạo tài khoản</p>
        <p onClick={setFormFogotPassword}>Quên mật khẩu ?</p>
      </div>
    </section>
  );
}

export default SigIn;
