import styles from "./LoadingLogin.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function LoadingLogin() {
  return (
    <article className={cx("wrapper")}>
      <div className={cx("loader", "autoCenter")}>
        <div className={cx("ring", "autoCenter")}></div>
      </div>
    </article>
  );
}

export default LoadingLogin;
