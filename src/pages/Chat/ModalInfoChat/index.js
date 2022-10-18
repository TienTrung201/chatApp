import styles from "./ModalInfoChat.module.scss";
import classNames from "classnames/bind";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faChevronDown,
  faGear,
  faImage,
  faSignature,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import {
  isSelectedMusic,
  userChat,
  userLogin,
  users,
} from "@/components/redux/selector";
import Modal from "@/components/Modal";
import EditUser from "./EditUser";

const cx = classNames.bind(styles);

function ModalInfoChat({ modal, setModal, listUserChats }) {
  let user = useSelector(userLogin);
  const listUsers = useSelector(users);
  user = listUsers.find((userChat) => {
    return userChat.uid === user.uid;
  });
  const roomChatInfo = useSelector(userChat);
  const isCheckedMusic = useSelector(isSelectedMusic);
  const [isSetting, setIsSetting] = useState(false);

  const [visibleModal, setVisibleModal] = useState(false);
  const screenWidth = window.innerWidth;
  const widthProfileChatRoom =
    screenWidth > 739 && screenWidth < 1023
      ? 200
      : screenWidth > 1023
      ? 250
      : "calc(100% - 1px)";

  const findCurrentRoom = listUserChats.find(
    (roomList) => roomChatInfo.chatId === roomList[0]
  );
  let roomChat;
  if (findCurrentRoom) {
    if (findCurrentRoom[1].listUsers !== undefined)
      roomChat = findCurrentRoom[1].listUsers.find((user) => {
        return user.uid === roomChatInfo.user.uid;
      });
  }

  const nickName = useCallback(() => {
    if (roomChat === undefined) {
      return roomChatInfo.user.displayName;
    } else if (roomChat.nickName.trim(" ") === "") {
      return roomChatInfo.user.displayName;
    } else {
      return roomChat.nickName;
    }
  }, [roomChat, roomChatInfo.user.displayName]);
  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          initial={{ width: 0, opacity: 0.5 }}
          animate={{
            transition: { stiffness: 300 },
            // width: "calc(100% - 16px)",
            width: widthProfileChatRoom,
            opacity: 1,
          }}
          exit={{
            width: 0,
            transition: { duration: 0.2 },
            opacity: 0,
          }}
          className={cx(
            "wrapper",
            isCheckedMusic === true ? "backgroundTransparentNoHover" : ""
          )}
        >
          <div
            onClick={() => {
              setModal(!modal);
            }}
            className={cx("closeModal", "autoCenter")}
          >
            <FontAwesomeIcon
              icon={faAngleLeft}
              className={cx("closeModal--icon")}
            />
          </div>

          <Modal
            visible={visibleModal}
            seiVisible={setVisibleModal}
            title={"Biệt danh"}
          >
            <div className={cx("editNickName")}>
              <EditUser
                listUserRoom={listUserChats}
                remainUser={user}
                roomId={roomChatInfo.chatId}
                userEdit={roomChatInfo.user}
              />
              <EditUser
                remainUser={roomChatInfo.user}
                roomId={roomChatInfo.chatId}
                userEdit={user}
                listUserRoom={listUserChats}
              />
            </div>
          </Modal>
          <div className={cx("infoUser")}>
            <div className={cx("avatar")}>
              <img
                src={
                  roomChatInfo.user.photoURL !== null
                    ? roomChatInfo.user.photoURL
                    : require("../../../assets/images/photoUser.png")
                }
                alt=""
              />
            </div>
            <h1 className={cx("nameUser")}>{nickName()}</h1>
          </div>
          <div className={cx("controlRoom")}>
            <ul className={cx("controlList")}>
              <li
                className={cx(
                  "controlItem",
                  "setting",
                  isCheckedMusic === true ? "backgroundTransparent" : ""
                )}
              >
                <div
                  onClick={() => {
                    setIsSetting(!isSetting);
                  }}
                  className={cx("boxBug")}
                >
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
                  <p className={cx("content", "settingHover")}>
                    Setting message
                  </p>
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
                      <li
                        onClick={() => {
                          setVisibleModal(true);
                        }}
                        className={cx(
                          "childrentControl",
                          "nickName",
                          isCheckedMusic === true ? "backgroundTransparent" : ""
                        )}
                      >
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
              <li
                className={cx(
                  "controlItem",
                  "image",
                  isCheckedMusic === true ? "backgroundTransparent" : ""
                )}
              >
                <div className={cx("boxBug")}>
                  <div className={cx("wrappIcon", "autoCenter")}>
                    <FontAwesomeIcon className={cx("icon")} icon={faImage} />
                  </div>
                  <FontAwesomeIcon
                    className={cx("iconOpen")}
                    icon={faChevronDown}
                  />
                  <p className={cx("content", "imageHover")}>Media</p>
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
