import styles from "./ControlMessage.module.scss";
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmileBeam } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisVertical, faShare } from "@fortawesome/free-solid-svg-icons";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "@/firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { userChat } from "@/components/redux/selector";
import { deleteObject, ref } from "firebase/storage";
import boxChatSlice from "../../BoxChatSlice";
const cx = classNames.bind(styles);

function ControlMessage({
  allMess,
  friendChat,
  currentMessage,
  userLogin,
  myNickName,
  currentUserRoom,
  isImage,
}) {
  const roomChatInfo = useSelector(userChat);
  const Dispatch = useDispatch();
  const handleRemoveMessage = async (message) => {
    const currentMessage = allMess.find((messageData) => {
      return messageData.id === message.id;
    });
    const allmessageRoom = allMess.map((message) => {
      if (message.id === currentMessage.id) {
        if (message.image) {
          if (message.image.fullPath) {
            console.log(1);
            const desertRef = ref(storage, message.image.fullPath);
            deleteObject(desertRef)
              .then(() => {
                // File deleted successfully
              })
              .catch((error) => {
                // Uh-oh, an error occurred!
              });
          }
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
        messages: allmessageRoom.reverse(),
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
  const nameSenderMessage = () => {
    if (userLogin) {
      if (currentMessage.senderId === userLogin.uid) {
        return "Chính bạn";
      }
    }

    if (currentUserRoom.length === 0) {
      if (currentMessage.senderId === roomChatInfo.user.uid) {
        return roomChatInfo.user.displayName;
      } else {
        return myNickName;
      }
    } else {
      let name = "";
      currentUserRoom.forEach((user) => {
        if (currentMessage.senderId === user.uid) {
          name = user.displayName;
        }
      });
      return name;
    }
  };

  return (
    <>
      {!friendChat && (
        <div className={cx("wrapperTippy")}>
          <Tippy
            trigger="click"
            placement="top"
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
              <FontAwesomeIcon
                className={cx("icon")}
                icon={faEllipsisVertical}
              />
            </button>
          </Tippy>
        </div>
      )}

      <button
        onClick={() => {
          Dispatch(boxChatSlice.actions.setIsReplyMessage(true));
          Dispatch(
            boxChatSlice.actions.setUserNameAnswered(nameSenderMessage())
          );
          if (isImage) {
            Dispatch(boxChatSlice.actions.setMessageAnswered("Hình ảnh"));
            Dispatch(
              boxChatSlice.actions.setUrlImageAnsered(currentMessage.image.url)
            );
          } else {
            Dispatch(
              boxChatSlice.actions.setMessageAnswered(currentMessage.text)
            );
          }
        }}
        className={cx("buttonControlText", "autoCenter")}
      >
        <FontAwesomeIcon className={cx("icon")} icon={faShare} />
      </button>
      <div className={cx("wrapperTippy")}>
        <Tippy
          trigger="click"
          placement={friendChat ? "top-start" : "top-end"}
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
