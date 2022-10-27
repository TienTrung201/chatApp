import styles from "./ControlMessage.module.scss";
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmileBeam } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisVertical, faShare } from "@fortawesome/free-solid-svg-icons";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "@/firebase/config";
import { useSelector } from "react-redux";
import { userChat } from "@/components/redux/selector";
import { deleteObject, ref } from "firebase/storage";
const cx = classNames.bind(styles);

function ControlMessage({
  allMess,
  friendChat,
  currentMessage,
  userLogin,
  myNickName,
}) {
  const roomChatInfo = useSelector(userChat);

  const handleRemoveMessage = async (message) => {
    const currentMessage = allMess.find((messageData) => {
      return messageData.id === message.id;
    });
    const allmessageRoom = allMess.map((message) => {
      if (message.id === currentMessage.id) {
        if (message.image) {
          const desertRef = ref(storage, message.image.fullPath);
          deleteObject(desertRef)
            .then(() => {
              // File deleted successfully
            })
            .catch((error) => {
              // Uh-oh, an error occurred!
            });
        }

        return {
          ...currentMessage,
          text: "",
          type: "remove",
        };
      }
      return message;
    });

    try {
      updateDoc(doc(db, "chats", roomChatInfo.chatId), {
        messages: allmessageRoom,
      });
    } catch (e) {
      console.log(e);
    }
    try {
      await updateDoc(doc(db, "userChats", roomChatInfo.user.uid), {
        [roomChatInfo.chatId + ".lastMessage"]: {
          text: "Đã thu hồi tin nhắn",
          sender: myNickName,
        },
        [roomChatInfo.chatId + ".createdAt"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", userLogin.uid), {
        [roomChatInfo.chatId + ".lastMessage"]: {
          text: "Đã thu hồi tin nhắn",
          sender: myNickName,
        },
        [roomChatInfo.chatId + ".createdAt"]: serverTimestamp(),
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div
        style={{ display: friendChat === true ? "none" : "" }}
        className={cx("wrapperTippy")}
      >
        <Tippy
          trigger="click"
          placement="right"
          interactive="true" // cho phep hanh dong tren ket qua
          content={
            <div
              onClick={() => {
                handleRemoveMessage(currentMessage);
              }}
              className={cx("boxRemove")}
            >
              <div className={cx("removeMessage", "autoCenter")}>
                <span className={cx("autoCenter")}>Gỡ tin nhắn</span>
              </div>
            </div>
          }
        >
          <button className={cx("buttonControlText", "autoCenter")}>
            <FontAwesomeIcon className={cx("icon")} icon={faEllipsisVertical} />
          </button>
        </Tippy>
      </div>

      <button className={cx("buttonControlText", "autoCenter")}>
        <FontAwesomeIcon className={cx("icon")} icon={faShare} />
      </button>
      <div className={cx("wrapperTippy")}>
        <Tippy
          trigger="click"
          placement="top"
          interactive // cho phep hanh dong tren ket qua
          content={
            <div className={cx("boxListIcon")}>
              <div className={cx("listIcon")}>
                <button className={cx("icon")}>
                  <img src={require("@/assets/images/tym.png")} alt="" />
                </button>
                <button className={cx("icon")}>
                  <img src={require("@/assets/images/haha.png")} alt="" />
                </button>
                <button className={cx("icon")}>
                  <img src={require("@/assets/images/wow.png")} alt="" />
                </button>
                <button className={cx("icon")}>
                  <img src={require("@/assets/images/sad.png")} alt="" />
                </button>
                <button className={cx("icon")}>
                  <img src={require("@/assets/images/angry.png")} alt="" />
                </button>
                <button className={cx("icon")}>
                  <img src={require("@/assets/images/like.png")} alt="" />
                </button>
              </div>
            </div>
          }
        >
          <button className={cx("buttonControlText", "autoCenter")}>
            <FontAwesomeIcon className={cx("icon")} icon={faFaceSmileBeam} />
          </button>
        </Tippy>
      </div>
    </>
  );
}

export default ControlMessage;
