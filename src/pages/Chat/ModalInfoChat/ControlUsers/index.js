import styles from "./ControlUsers.module.scss";
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faUserShield,
  faUserXmark,
} from "@fortawesome/free-solid-svg-icons";
import { deleteField, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

const cx = classNames.bind(styles);

function ControlUsers({ currentUsersRoom, userId, idRoom }) {
  const handleDeleteUserGroup = () => {
    const newUserRoom = [];
    currentUsersRoom.forEach((user) => {
      if (user.uid !== userId) {
        newUserRoom.push(user);
      }
    });
    try {
      currentUsersRoom.forEach(async (user) => {
        if (user.uid !== userId) {
          await updateDoc(doc(db, "userChats", user.uid), {
            [idRoom + ".listUsers"]: newUserRoom,
          });
        } else {
          await updateDoc(doc(db, "userChats", user.uid), {
            [idRoom]: deleteField(),
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={cx("wrapperTippy")}>
      <Tippy
        trigger="click"
        placement="top"
        interactive="true"
        // visible={true}
        content={
          <ul onClick={() => {}} className={cx("controlList")}>
            <li
              onClick={() => {
                handleDeleteUserGroup();
              }}
              className={cx("control")}
            >
              <FontAwesomeIcon className={cx("icon")} icon={faUserXmark} />
              <span className={cx("nameControl")}>Xóa thành viên</span>
            </li>
            <li className={cx("control")}>
              <FontAwesomeIcon className={cx("icon")} icon={faUserShield} />
              <span className={cx("nameControl")}>
                Chỉ định làm quản trị viên
              </span>
            </li>
          </ul>
        }
      >
        <button className={cx("controlerAdmin", "autoCenter")}>
          <FontAwesomeIcon className={cx("icon")} icon={faEllipsis} />
        </button>
      </Tippy>
    </div>
  );
}

export default ControlUsers;
