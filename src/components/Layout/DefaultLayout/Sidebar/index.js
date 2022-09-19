import styles from "./Sidebar.module.scss";

import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import // faMessage,
// faCirclePlay,
"@fortawesome/free-solid-svg-icons";
import { faCirclePlay, faMessage } from "@fortawesome/free-regular-svg-icons";
// import {  } from "@fortawesome/free-brands-svg-icons";
import { faEarthAsia } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
// import {} from "@fortawesome/free-solid-svg-icons";
//npm i classnames ...........cssBY

const cx = classNames.bind(styles);
function Sidebar() {
  const activeNav = useRef();
  const [styleLine, setStyleLine] = useState({
    top: 0,
  });
  const handleActiveNav = (e) => {
    if (e.target.tagName === "A") {
      setStyleLine({ top: e.target.offsetTop });
    } else {
      setStyleLine({ top: e.target.parentElement.parentElement.offsetTop });
    }
  };
  return (
    <aside className={cx("wrapper")}>
      <div className={cx("logoApp", "autoCenter")}>
        {/* <img
          src={require("../../../../assets/images/logoApp.png")}
          alt="Logo"
        /> */}
        {/* <div className={cx("emoji")}>
          <div className={cx("face")}>
            <div className={cx("eyes")}>
              <div className={cx("eye")}></div>
              <div className={cx("eye")}></div>
            </div>
            <div className={cx("mouth")}></div>
          </div>
        </div> */}
        <section className={cx("wrapperEarth")}>
          <div className={cx("earth")}>
            <div className={cx("planet", "mars")}>
              <img
                alt="mars"
                src={require("../../../../assets/images/mars.png")}
              />
            </div>
            <div className={cx("planet", "jupiter")}>
              <img
                alt="mars"
                src={require("../../../../assets/images/jupiter.png")}
              />
            </div>
            <div className={cx("planet", "mercury")}>
              <img
                alt="mars"
                src={require("../../../../assets/images/mercury.png")}
              />
            </div>
          </div>
        </section>
      </div>
      <nav className={cx("navigation", "autoCenter")}>
        <ul className={cx("nav__list")}>
          <li className={cx("nav__listItem")}>
            <NavLink
              onClick={handleActiveNav}
              className={cx("listItem__Link", "autoCenter")}
              to={"/"}
            >
              <FontAwesomeIcon className={cx("iconNav")} icon={faEarthAsia} />
            </NavLink>
          </li>
          <li className={cx("nav__listItem")}>
            <NavLink
              onClick={handleActiveNav}
              className={cx("listItem__Link", "autoCenter")}
              to={"/Chat"}
            >
              <FontAwesomeIcon className={cx("iconNav")} icon={faMessage} />
            </NavLink>
          </li>
          <li className={cx("nav__listItem")}>
            <NavLink
              onClick={handleActiveNav}
              className={cx("listItem__Link", "autoCenter")}
              to={"/Music"}
            >
              <FontAwesomeIcon className={cx("iconNav")} icon={faCirclePlay} />
            </NavLink>
          </li>
        </ul>
        <div ref={activeNav} style={styleLine} className={cx("line")}></div>
      </nav>{" "}
    </aside>
  );
}

export default Sidebar;
