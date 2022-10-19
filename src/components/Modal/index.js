import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { isSelectedMusic } from "../redux/selector";
// import { useState } from "react";
//npm i classnames ...........cssBY

import styles from "./Modal.module.scss";

const cx = classNames.bind(styles);
function Modal({ children, title, save, visible, seiVisible }) {
  const isCheckedMusic = useSelector(isSelectedMusic);
  return (
    <AnimatePresence>
      {visible && (
        <section className={cx("wrapper", "autoCenter")}>
          <div
            onClick={() => {
              seiVisible(false);
            }}
            className={cx("overlay")}
          ></div>
          <motion.div
            initial={{ y: -700 }}
            animate={{
              y: 0,
              transition: { duration: 0.3 },
            }}
            exit={{
              y: -700,
              transition: { duration: 0.2 },
            }}
            className={cx("container")}
          >
            <div
              className={cx(
                "wrapperModal",
                isCheckedMusic === true
                  ? "backgroundTransparentBlackBorder"
                  : ""
              )}
            >
              <div className={cx("header", "autoCenter")}>
                <h2> {title}</h2>
                <button
                  onClick={() => {
                    seiVisible(false);
                  }}
                >
                  <FontAwesomeIcon className={cx("iconClose")} icon={faClose} />
                </button>
              </div>
              <article className={cx("content")}>{children}</article>
              <div className={cx("footer", "autoCenter")}>
                {save === true ? <button>Lưu</button> : false}
              </div>
            </div>
          </motion.div>
        </section>
      )}
    </AnimatePresence>
  );
}

export default Modal;
