import styles from "./NoMessage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function NoMessage() {
  return (
    <div className={cx("wrapper", "autoCenter")}>
      <img src={require("../../assets/images/nomessage.png")} alt="" />
    </div>
  );
}

export default NoMessage;
