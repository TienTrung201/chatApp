import styles from "./MyMusic.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function MyMusic() {
  return (
    <section className={cx("wrapper")}>
      <h1>MyMusic</h1>
    </section>
  );
}

export default MyMusic;
