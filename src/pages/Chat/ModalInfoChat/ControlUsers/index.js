import styles from "./ControlUsers.module.scss";
import classNames from "classnames/bind";
import { v4 as uuid } from "uuid";

import Tippy from "@tippyjs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faUserShield,
  faUserXmark,
} from "@fortawesome/free-solid-svg-icons";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

const cx = classNames.bind(styles);

function ControlUsers({
  deleteUserGroup,
  userLoginGroup,
  designateAdmin,
  controlledUser,
  idRoom,
  currentUsersRoom,
  idUser,
}) {
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
                updateDoc(doc(db, "chats", idRoom), {
                  messages: arrayUnion({
                    id: uuid(),
                    // text: `${userLoginGroup.nickName} đã xóa ${controlledUser.nickName} khỏi nhóm`,
                    text: `đã xóa ${controlledUser.nickName} khỏi nhóm`,
                    senderId: userLoginGroup.uid,
                    senderName: userLoginGroup.nickName,

                    createdAt: Timestamp.now(),
                    type: "notification",
                  }),
                });
                deleteUserGroup(controlledUser.uid);
              }}
              className={cx("control")}
            >
              <FontAwesomeIcon className={cx("icon")} icon={faUserXmark} />
              <span className={cx("nameControl")}>Xóa thành viên</span>
            </li>
            <li
              onClick={() => {
                updateDoc(doc(db, "chats", idRoom), {
                  messages: arrayUnion({
                    id: uuid(),
                    // text: `${userLoginGroup.nickName} đã thêm ${controlledUser.nickName} làm quản trị viên`,
                    text: `đã chỉ định ${controlledUser.nickName} làm quản trị viên`,
                    senderId: userLoginGroup.uid,
                    senderName: userLoginGroup.nickName,
                    createdAt: Timestamp.now(),
                    type: "notification",
                  }),
                });
                //user control
                designateAdmin(controlledUser.uid);
              }}
              className={cx("control")}
            >
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
