import styles from "./FriendsActive.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function FriendsActive() {
  return <section className={cx("wrapper")}></section>;
}

export default FriendsActive;
