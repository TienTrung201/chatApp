import styles from "./Music.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Music() {
  console.log("Music");
  return <section className={cx("wrapper")}></section>;
}

export default Music;
