import styles from "./Profile.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faUser } from "@fortawesome/free-regular-svg-icons";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Profile() {
  const [styleLine, setStyleLine] = useState({
    left: 0,
  });
  const handleActiveLine = (e) => {
    if (e.target.tagName === "A") {
      setStyleLine({ left: e.target.offsetLeft, width: e.target.offsetWidth });
    } else {
      setStyleLine({
        left: e.target.parentElement.parentElement.offsetLeft,
        width: e.target.parentElement.parentElement.offsetWidth,
      });
    }
  };
  return (
    <section className={cx("wrapper")}>
      <article className={cx("profile")}>
        <div className={cx("profile__Navigate")}>
          <ul className={cx("navigate__List")}>
            <li onClick={handleActiveLine} className={cx("navigate__item")}>
              <Link to="#" className={cx("navigate__item-link", "autoCenter")}>
                <FontAwesomeIcon className={cx("iconUser")} icon={faUser} />
                Profile
              </Link>
            </li>
            <li onClick={handleActiveLine} className={cx("navigate__item")}>
              <Link to="#" className={cx("navigate__item-link", "autoCenter")}>
                <FontAwesomeIcon
                  className={cx("iconUserEdit")}
                  icon={faAddressCard}
                />
                Edit Profile
              </Link>
            </li>
            <div style={styleLine} className={cx("line")}></div>
          </ul>
        </div>
      </article>
    </section>
  );
}

export default Profile;
