import styles from "./AddUser.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function AddUser({ user }) {
  return (
    <div key={user.uid} className={cx("avata")}>
      <button onClick={() => {}} className={cx("close", "autoCenter")}>
        <FontAwesomeIcon icon={faClose} className={cx("iconClose")} />
      </button>
      <img
        src={
          user.photoURL !== null
            ? user.photoURL
            : require("../../../../assets/images/avata.jpg")
        }
        alt=""
      />
      <span className={cx("nameUser")}>{user.displayName}</span>
    </div>
  );
}

export default AddUser;
