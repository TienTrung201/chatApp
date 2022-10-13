import styles from "./FriendsActive.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function FriendsActive() {
  return (
    <section className={cx("wrapper")}>
      <h2 className={cx("title")}>Friends Activity</h2>
      <ul className={cx("listUsers")}>
        <li className={cx("userActivity")}>
          <Link to="#" className={cx("selectedUserChat")}>
            <div className={cx("avatar", "autoCenter")}>
              <img
                width={50}
                src={require("../../../assets/images/avata.jpg")}
                alt=""
              />
            </div>
            <div className={cx("infoUser")}>
              <h4 className={cx("userName")}>User</h4>
              <p className={cx("status")}>Listerning 3h ago</p>
            </div>
          </Link>
        </li>
        <li className={cx("userActivity")}>
          <Link to="#" className={cx("selectedUserChat")}>
            <div className={cx("avatar", "autoCenter")}>
              <img
                width={50}
                src={require("../../../assets/images/avata.jpg")}
                alt=""
              />
            </div>
            <div className={cx("infoUser")}>
              <h4 className={cx("userName")}>User</h4>
              <p className={cx("status")}>Listerning 3h ago</p>
            </div>
          </Link>
        </li>
        <li className={cx("userActivity")}>
          <Link to="#" className={cx("selectedUserChat")}>
            <div className={cx("avatar", "autoCenter")}>
              <img
                width={50}
                src={require("../../../assets/images/avata.jpg")}
                alt=""
              />
            </div>
            <div className={cx("infoUser")}>
              <h4 className={cx("userName")}>User</h4>
              <p className={cx("status")}>Listerning 3h ago</p>
            </div>
          </Link>
        </li>
        <li className={cx("userActivity")}>
          <Link to="#" className={cx("selectedUserChat")}>
            <div className={cx("avatar", "autoCenter")}>
              <img
                width={50}
                src={require("../../../assets/images/avata.jpg")}
                alt=""
              />
            </div>
            <div className={cx("infoUser")}>
              <h4 className={cx("userName")}>User</h4>
              <p className={cx("status")}>Listerning 3h ago</p>
            </div>
          </Link>
        </li>
        <li className={cx("userActivity")}>
          <Link to="#" className={cx("selectedUserChat")}>
            <div className={cx("avatar", "autoCenter")}>
              <img
                width={50}
                src={require("../../../assets/images/avata.jpg")}
                alt=""
              />
            </div>
            <div className={cx("infoUser")}>
              <h4 className={cx("userName")}>User</h4>
              <p className={cx("status")}>Listerning 3h ago</p>
            </div>
          </Link>
        </li>
        <li className={cx("userActivity")}>
          <Link to="#" className={cx("selectedUserChat")}>
            <div className={cx("avatar", "autoCenter")}>
              <img
                width={50}
                src={require("../../../assets/images/avata.jpg")}
                alt=""
              />
            </div>
            <div className={cx("infoUser")}>
              <h4 className={cx("userName")}>User</h4>
              <p className={cx("status")}>Listerning 3h ago</p>
            </div>
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default FriendsActive;
