import styles from "./Sidebar.module.scss";

import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SidebarSlide from "./SideBarSlice";
import { isNight, isRainy, isSelectedMusic } from "@/components/redux/selector";

const cx = classNames.bind(styles);

function Sidebar({ activeNav }) {
  const Dispatch = useDispatch();
  const isCheckedMusic = useSelector(isSelectedMusic);
  const isRain = useSelector(isRainy);
  const isNightApp = useSelector(isNight);
  const [option, setOption] = useState(1);
  const handleSelectMusic = (boolean) => {
    Dispatch(SidebarSlide.actions.setSelectedMusic(boolean));
  };
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
        {isCheckedMusic === true ? (
          <>
            {" "}
            {isNightApp === true ? (
              <div
                onClick={() => {
                  if (option % 2 === 0) {
                    Dispatch(SidebarSlide.actions.setIsNight(false));
                  }
                  setOption((prev) => prev + 1);
                  Dispatch(SidebarSlide.actions.setIsRain(!isRain));
                }}
                className={cx("wrapperCloud", "autoCenter")}
              >
                <img
                  alt="sun"
                  src={
                    isRain === true
                      ? require("../../../../assets/images/rainNight.png")
                      : require("../../../../assets/images/moon.png")
                  }
                />
              </div>
            ) : (
              <div
                onClick={() => {
                  if (option % 2 === 0) {
                    Dispatch(SidebarSlide.actions.setIsNight(true));
                  }
                  setOption((prev) => prev + 1);
                  Dispatch(SidebarSlide.actions.setIsRain(!isRain));
                }}
                className={cx("wrapperCloud", "autoCenter")}
              >
                <img
                  alt="sun"
                  src={
                    isRain === true
                      ? require("../../../../assets/images/rain.png")
                      : require("../../../../assets/images/sun.png")
                  }
                />
              </div>
            )}
          </>
        ) : (
          <section className={cx("wrapperEarth")}>
            <div className={cx("earth")}>
              <div className={cx("planet", "mars")}></div>
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
        )}
      </div>
      <nav className={cx("navigation", "autoCenter")}>
        <ul className={cx("nav__list")}>
          <li
            onClick={() => {
              handleSelectMusic(false);
            }}
            id={"getItem"}
            className={cx("nav__listItem")}
          >
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
          <li
            onClick={() => {
              handleSelectMusic(false);
            }}
            className={cx("nav__listItem")}
          >
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
          <li
            onClick={() => {
              handleSelectMusic(true);
            }}
            className={cx("nav__listItem", "mobileDisplay")}
          >
            <NavLink
              onClick={handleActiveNav}
              className={cx("listItem__Link", "autoCenter")}
              to={"/chat"}
            >
              <img
                src={require("../../../../assets/images/headphones.png")}
                alt="Facebook"
              />
            </NavLink>
          </li>
        </ul>
        <div style={styleLine} className={cx("line")}></div>
      </nav>{" "}
    </article>
  );
}

export default Sidebar;
