import styles from "./ControlUsers.module.scss";
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faUserShield,
  faUserXmark,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function ControlUsers({ deleteUserGroup, designateAdmin, userId }) {
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
                deleteUserGroup(userId);
              }}
              className={cx("control")}
            >
              <FontAwesomeIcon className={cx("icon")} icon={faUserXmark} />
              <span className={cx("nameControl")}>Xóa thành viên</span>
            </li>
            <li
              onClick={() => {
                designateAdmin(userId);
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
