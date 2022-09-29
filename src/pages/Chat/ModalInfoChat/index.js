import styles from "./ModalInfoChat.module.scss";
import classNames from "classnames/bind";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faGear,
  faImage,
  faSignature,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const cx = classNames.bind(styles);

function ModalInfoChat({ modal }) {
  const [isSetting, setIsSetting] = useState(true);
  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          initial={{ width: 0 }}
          animate={{
            transition: { stiffness: 300 },
            width: 250,
          }}
          exit={{
            width: 0,
            transition: { duration: 0.3 },
          }}
          className={cx("wrapper")}
        >
          <div className={cx("infoUser")}>
            <div className={cx("avatar")}>
              <img
                width={40}
                src={require("../../../assets/images/avata.jpg")}
                alt=""
              />
            </div>
            <h1 className={cx("nameUser")}>Tiến trung</h1>
          </div>
          <div className={cx("controlRoom")}>
            <ul className={cx("controlList")}>
              <li
                onClick={() => {
                  setIsSetting(!isSetting);
                }}
                className={cx("controlItem", "setting")}
              >
                <div className={cx("boxBug")}>
                  <div className={cx("wrappIcon", "autoCenter")}>
                    <FontAwesomeIcon className={cx("icon")} icon={faGear} />
                  </div>
                  <FontAwesomeIcon
                    className={cx("iconOpen")}
                    icon={faChevronDown}
                    style={
                      isSetting === true
                        ? { rotate: "-90deg" }
                        : { rotate: "0deg" }
                    }
                  />
                  <p className={cx("content")}>Setting message</p>
                </div>
                <AnimatePresence>
                  {isSetting && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        transition: { stiffness: 300 },
                        opacity: 1,
                        height: "auto",
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        transition: { duration: 0.2 },
                      }}
                      className={cx("navBar")}
                    >
                      <li className={cx("childrentControl", "nickName")}>
                        <div className={cx("boxBug")}>
                          <div className={cx("wrappIcon", "autoCenter")}>
                            <FontAwesomeIcon
                              className={cx("icon")}
                              icon={faSignature}
                            />
                          </div>
                          <p className={cx("content")}>Edit Nickname</p>
                        </div>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
              <li className={cx("controlItem", "image")}>
                <div className={cx("boxBug")}>
                  <div className={cx("wrappIcon", "autoCenter")}>
                    <FontAwesomeIcon className={cx("icon")} icon={faImage} />
                  </div>
                  <FontAwesomeIcon
                    className={cx("iconOpen")}
                    icon={faChevronDown}
                  />
                  <p className={cx("content")}>Media</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ModalInfoChat;
