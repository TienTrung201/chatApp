import styles from "./Sidebar.module.scss";

import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";

import { useEffect, useRef, useState } from "react";

const cx = classNames.bind(styles);
function Sidebar({ activeNav }) {
  const navItem = useRef();
  useEffect(() => {
    const heightNavItem = navItem.current.offsetHeight;
    if (activeNav === "Chat") {
      setStyleLine({ top: heightNavItem, height: heightNavItem });
    }
    if (activeNav === "Music") {
      setStyleLine({ top: heightNavItem * 2 });
    }
    if (activeNav === "profile") {
      setStyleLine({ top: 0 });
    }
  }, [activeNav]);
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
    <article className={cx("wrapper")}>
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
              <img
                src={require("../../../../assets/images/man.png")}
                alt="Facebook"
              />
              {/* <FontAwesomeIcon className={cx("iconNav")} icon={faUser} /> */}
            </NavLink>
          </li>
          <li className={cx("nav__listItem")}>
            <NavLink
              onClick={handleActiveNav}
              className={cx("listItem__Link", "autoCenter")}
              to={"/chat"}
            >
              <img
                src={require("../../../../assets/images/message.png")}
                alt="Facebook"
              />
              {/* <FontAwesomeIcon className={cx("iconNav")} icon={faMessage} /> */}
            </NavLink>
          </li>
          <li className={cx("nav__listItem")}>
            <NavLink
              onClick={handleActiveNav}
              className={cx("listItem__Link", "autoCenter")}
              to={"/Music"}
            >
              <img
                src={require("../../../../assets/images/headphones.png")}
                alt="Facebook"
              />
              {/* <FontAwesomeIcon className={cx("iconNav")} icon={faCirclePlay} /> */}
            </NavLink>
          </li>
        </ul>
        <div style={styleLine} className={cx("line")}></div>
      </nav>{" "}
    </article>
  );
}

export default Sidebar;
