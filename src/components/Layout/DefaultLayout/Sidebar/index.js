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
import { useEffect, useRef, useState } from "react";
// import {} from "@fortawesome/free-solid-svg-icons";
//npm i classnames ...........cssBY

const cx = classNames.bind(styles);
function Sidebar({ activeNav }) {
  const navItem = useRef();
  // const heightNavItem = navItem.current.offsetHeight;
  // const getItem = Document.querySelectorById("getItem");
  useEffect(() => {
    const heightNavItem = navItem.current.offsetHeight;
    if (activeNav === "Chat") {
      setStyleLine({ top: heightNavItem, height: heightNavItem });
    }
    if (activeNav === "Music") {
      setStyleLine({ top: heightNavItem * 2 });
    }
    if (activeNav === "Home") {
      setStyleLine({ top: 0 });
    }
  }, []);
  const [styleLine, setStyleLine] = useState({
    top: 0,
  });
  // if (activeNav === "Chat") {
  //   setStyleLine({ top: heightNavItem });
  // }
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
          <li id={"getItem"} className={cx("nav__listItem")}>
            <NavLink
              ref={navItem}
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
        <div style={styleLine} className={cx("line")}></div>
      </nav>{" "}
    </aside>
  );
}

export default Sidebar;
