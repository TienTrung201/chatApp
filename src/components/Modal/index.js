import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
//npm i classnames ...........cssBY

import styles from "./Modal.module.scss";

const cx = classNames.bind(styles);

function Modal({ children, title }) {
  return (
    <section className={cx("wrapper", "autoCenter")}>
      <div className={cx("container")}>
        <div className={cx("header", "autoCenter")}>
          {title}
          <h3>Hello</h3>
          <button>
            <FontAwesomeIcon className={cx("iconClose")} icon={faClose} />
          </button>
        </div>
        <article className={cx("content")}>{children}</article>
        <div className={cx("footer", "autoCenter")}>
          <button>Lưu</button>
        </div>
      </div>
    </section>
  );
}

export default Modal;
