import styles from "./Music.module.scss";
import classNames from "classnames/bind";
// import MainMusic from "./MainMusic";
// import FriendsActive from "./FriendsActive";

const cx = classNames.bind(styles);

function Music() {
  console.log("Music");
  return (
    <section className={cx("wrapper")}>
      {/* <MainMusic />
      <FriendsActive /> */}
    </section>
  );
}

export default Music;
