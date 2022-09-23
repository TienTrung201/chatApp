import styles from "./Profile.module.scss";
import classNames from "classnames/bind";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faMusic, faUser } from "@fortawesome/free-solid-svg-icons";
import { memo, useEffect, useRef, useState } from "react";
// import MyProfile from "./MyProfile";
import { useSelector } from "react-redux";
import { userLogin } from "@/components/redux/selector";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Profile() {
  const user = useSelector(userLogin);
  const navigate = useNavigate();
  const [navProfile, setNavProfile] = useState("/");
  useEffect(() => {
    if (user.displayName) {
      navigate(navProfile);
    } else {
      navigate("/login");
    }
  }, [user, navigate, navProfile]);
  const headerProfile = useRef();
  const [styleLine, setStyleLine] = useState({});
  useEffect(() => {
    const widthLine = headerProfile.current.offsetWidth;
    setStyleLine({ left: 0, width: widthLine });
  }, []);
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
            <li
              ref={headerProfile}
              onClick={(e) => {
                handleActiveLine(e);
                setNavProfile("/");
              }}
              className={cx("navigate__item")}
            >
              <Link
                to="myprofile"
                className={cx("navigate__item-link", "autoCenter")}
              >
                <FontAwesomeIcon className={cx("iconUser")} icon={faUser} />
                Profile
              </Link>
            </li>
            <li
              onClick={(e) => {
                handleActiveLine(e);
                setNavProfile("/editprofile");
              }}
              className={cx("navigate__item")}
            >
              <Link
                to="editprofile"
                className={cx("navigate__item-link", "autoCenter")}
              >
                <FontAwesomeIcon
                  className={cx("iconUserEdit")}
                  icon={faIdCard}
                />
                Edit Profile
              </Link>
            </li>
            <li
              onClick={(e) => {
                handleActiveLine(e);
                setNavProfile("/mymusic");
              }}
              className={cx("navigate__item")}
            >
              <Link
                to="mymusic"
                className={cx("navigate__item-link", "autoCenter")}
              >
                <FontAwesomeIcon className={cx("iconMyMusic")} icon={faMusic} />
                My Music
              </Link>
            </li>
            <div style={styleLine} className={cx("line")}></div>
          </ul>
        </div>
      </article>
      {/* <MyProfile /> */}
      <Outlet />
    </section>
  );
}

export default memo(Profile);
