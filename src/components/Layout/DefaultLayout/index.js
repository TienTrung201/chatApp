import classNames from "classnames/bind";
//npm i classnames ...........cssBY

import Sidebar from "./Sidebar";
import styles from "./DefaultLayout.module.scss";

const cx = classNames.bind(styles);

function DefaultLayout({ children, active }) {
  return (
    <div className={cx("wrapper")}>
      <Sidebar activeNav={active} />
      <div className={cx("container")}>
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
