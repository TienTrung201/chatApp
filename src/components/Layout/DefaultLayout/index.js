import classNames from "classnames/bind";
//npm i classnames ...........cssBY

import Sidebar from "./Sidebar";
import styles from "./DefaultLayout.module.scss";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  isNight,
  //  isRainy,
  isSelectedMusic,
} from "@/components/redux/selector";

// import CafeDay from "../../../assets/video/CafeDay.mp4";
// import CafeRainyDay from "../../../assets/video/CafeRainyDay.mp4";
// import CafeNight from "../../../assets/video/CafeNight.mp4";
// import CafeRainyNight from "../../../assets/video/CafeRainyNight.mp4";
import CafeDayChill from "./CafeDay";
const cx = classNames.bind(styles);

function DefaultLayout({ children, active }) {
  const scrollBottom = useRef();
  const isCheckedMusic = useSelector(isSelectedMusic);
  const isCheckNight = useSelector(isNight);
  // const isRain = useSelector(isRainy);
  useEffect(() => {
    scrollBottom.current.scrollTop = scrollBottom.current.scrollHeight;
  });
  return (
    <section ref={scrollBottom} className={cx("wrapper")}>
      <Sidebar activeNav={active} />
      <article className={cx("container")}>
        <div className={cx("content")}>{children}</div>
      </article>
      {/* {isCheckedMusic && (
        <>
          <div
            className={cx(
              "backGroundVideo",
              isCheckNight === true && isRain === false
                ? "opacity0"
                : "opacity1"
            )}
          >
            <video loop autoPlay>
              <source src={CafeDay} type="video/mp4" />
            </video>
          </div>

          <div
            className={cx(
              "backGroundVideo",
              isRain === true && isCheckNight === false
                ? "opacity1"
                : "opacity0"
            )}
          >
            <video loop autoPlay>
              <source src={CafeRainyDay} type="video/mp4" />
            </video>
          </div>

          <div
            className={cx(
              "backGroundVideo",
              isCheckNight === true && isRain === false
                ? "opacity1"
                : "opacity0"
            )}
          >
            <video loop autoPlay>
              <source src={CafeNight} type="video/mp4" />
            </video>
          </div>

          <div
            className={cx(
              "backGroundVideo",
              isRain === true && isCheckNight === true ? "opacity1" : "opacity0"
            )}
          >
            <video loop autoPlay>
              <source src={CafeRainyNight} type="video/mp4" />
            </video>
          </div>
        </>
      )} */}
      {isCheckedMusic && <CafeDayChill />}
    </section>
  );
}

export default DefaultLayout;
