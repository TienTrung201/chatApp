import styles from "./EditProfile.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function EditProfile() {
  return <h1 className={cx("a")}>EditProfile</h1>;
}

export default EditProfile;
