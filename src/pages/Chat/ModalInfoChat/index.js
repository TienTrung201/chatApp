import styles from "./ModalInfoChat.module.scss";
import classNames from "classnames/bind";
import { motion, AnimatePresence } from "framer-motion";

const cx = classNames.bind(styles);

function ModalInfoChat({ modal }) {
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
        ></motion.div>
      )}
    </AnimatePresence>
  );
}

export default ModalInfoChat;
