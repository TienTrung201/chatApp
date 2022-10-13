import classNames from "classnames/bind";
//npm i classnames ...........cssBY

import Sidebar from "./Sidebar";
import styles from "./DefaultLayout.module.scss";
import { useEffect, useRef } from "react";

import video from "../../../assets/video/CafeRainyDay.mp4";
const cx = classNames.bind(styles);

function DefaultLayout({ children, active }) {
  const scrollBottom = useRef();

  useEffect(() => {
    scrollBottom.current.scrollTop = scrollBottom.current.scrollHeight;
  });
  return (
    <section ref={scrollBottom} className={cx("wrapper")}>
      <Sidebar activeNav={active} />
      <article className={cx("container")}>
        <div className={cx("content")}>{children}</div>
      </article>
      {/* <div className={cx("backGroundVideo")}>
        <video loop controls autoplay>
          <source src={video} type="video/mp4" />
        </video>
      </div> */}
    </section>
  );
}

export default DefaultLayout;
