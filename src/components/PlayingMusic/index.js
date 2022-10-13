import styles from "./PlayingMusic.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function PlayingMusic() {
  return (
    <div className={cx("wrapper", "autoCenter")}>
      <span className={cx("line")}></span>
      <span className={cx("line")}></span>
      <span className={cx("line")}></span>
      <span className={cx("line")}></span>
      <span className={cx("line")}></span>
    </div>
  );
}

export default PlayingMusic;
