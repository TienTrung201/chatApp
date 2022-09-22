import classNames from "classnames/bind";
//npm i classnames ...........cssBY

import Sidebar from "./Sidebar";
import styles from "./DefaultLayout.module.scss";

const cx = classNames.bind(styles);

function DefaultLayout({ children, active }) {
  return (
    <section className={cx("wrapper")}>
      <Sidebar activeNav={active} />
      <article className={cx("container")}>
        <div className={cx("content")}>{children}</div>
      </article>
    </section>
  );
}

export default DefaultLayout;
