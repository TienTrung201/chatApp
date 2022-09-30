import styles from "./LoadingListUser.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function LoadingListUser() {
  return (
    <article className={cx("wrapper")}>
      <div className={cx("loader")}>
        <div className={cx("ball")}></div>
        <div className={cx("ball")}></div>
        <div className={cx("ball")}></div>
      </div>
    </article>
  );
}

export default LoadingListUser;
