import styles from "./NoMessage.module.scss";
import classNames from "classnames/bind";
import { isSelectedMusic } from "../redux/selector";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);
function NoMessage() {
  const isCheckedMusic = useSelector(isSelectedMusic);

  return (
    <div className={cx("wrapper", "autoCenter")}>
      {isCheckedMusic === false ? (
        <img src={require("../../assets/images/nomessage.png")} alt="" />
      ) : (
        false
      )}
    </div>
  );
}

export default NoMessage;
