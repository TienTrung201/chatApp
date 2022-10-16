import styles from "./Sidebar.module.scss";

import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SidebarSlide from "./SideBarSlice";
import {
  isNight,
  isRainy,
  isSelectedMusic,
  volumeRain,
} from "@/components/redux/selector";
import rain from "@/assets/audio/rain.mp3";
import MusicPlayer from "./MusicPlayer";

const cx = classNames.bind(styles);

function Sidebar({ activeNav }) {
  const Dispatch = useDispatch();
  const isCheckedMusic = useSelector(isSelectedMusic);
  const volumeRainApp = useSelector(volumeRain);
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
  const rainAudio = useRef();
  const handleActiveNav = (e) => {
    if (e.target.tagName === "A") {
      setStyleLine({ top: e.target.offsetTop });
    } else {
      setStyleLine({ top: e.target.parentElement.parentElement.offsetTop });
    }
  };
  useEffect(() => {
    if (isRain === true && isCheckedMusic) {
      rainAudio.current.volume = volumeRainApp / 100;
    }
  }, [isRain, volumeRainApp, isCheckedMusic]);
  const handleChaneVolumeRain = (e) => {
    rainAudio.current.volume = e.target.value / 100;
    Dispatch(SidebarSlide.actions.setVolumeRain(e.target.value));
  };
  return (
    <article className={cx("wrapper")}>
      {isCheckedMusic === true ? <MusicPlayer /> : false}
      <div className={cx("logoApp", "autoCenter")}>
        {isRain === true && isCheckedMusic === true ? (
          <div className={cx("rainy")}>
            <audio
              style={{ display: "none" }}
              ref={rainAudio}
              src={rain}
              autoPlay
              controls
              loop
            />
            {/* bugg unmount thì âm thanh gốc bị mất */}
            <input
              onChange={(e) => {
                handleChaneVolumeRain(e);
              }}
              type="range"
              max={40}
              value={volumeRainApp}
              step={1}
              className={cx("volume-rain")}
            />
          </div>
        ) : (
          false
        )}

        {isCheckedMusic === true ? (
          <>
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
                      ? require("../../../../assets/images/cloudRainSun.png")
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
              <div className={cx("planet", "mars")}>
                <img
                  alt="mars"
                  src={require("../../../../assets/images/mars.png")}
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
              Dispatch(SidebarSlide.actions.setIsPlayingMusic(false));
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
              Dispatch(SidebarSlide.actions.setIsPlayingMusic(false));
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
              to={"/music"}
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
