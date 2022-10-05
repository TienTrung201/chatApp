import classNames from "classnames/bind";
//npm i classnames ...........cssBY

import Sidebar from "./Sidebar";
import styles from "./DefaultLayout.module.scss";
import { useEffect, useRef } from "react";

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
    </section>
  );
}

export default DefaultLayout;
