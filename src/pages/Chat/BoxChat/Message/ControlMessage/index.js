import styles from "./ControlMessage.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import Tippy from "@tippyjs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmileBeam } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisVertical, faShare } from "@fortawesome/free-solid-svg-icons";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useSelector } from "react-redux";
import { userChat } from "@/components/redux/selector";

const cx = classNames.bind(styles);

function ControlMessage({ allMess, leftControl, currentMessage }) {
  const [visibleRemoveMessages, setVisibleRemoveMessages] = useState(false);
  const [visibleFeeling, setVisibleFeeling] = useState(false);
  const handleVisible = (set, curent) => {
    set(!curent);
  };
  const roomChatInfo = useSelector(userChat);
  const handleRemoveMessage = async (message) => {
    const currentMessage = allMess.find((messageData) => {
      return messageData.id === message.id;
    });

    const allmessageRoom = allMess.map((message) => {
      if (message.id === currentMessage.id) {
        return {
          ...currentMessage,
          type: "remove",
        };
      }
      return message;
    });

    //remove allmessageRoom
    try {
      updateDoc(doc(db, "chats", roomChatInfo.chatId), {
        messages: [],
      });
    } catch (e) {
      console.log("e");
    }

    //remove allmessageRoom
    try {
      updateDoc(doc(db, "chats", roomChatInfo.chatId), {
        messages: allmessageRoom,
      });
    } catch (e) {
      console.log("e");
    }
    //update type message

    // mất 1 lần xóa 1 lần thêm bao nhiêu tin nhắn tính bấy nhiêu lần
  };

  return (
    <>
      <div
        onClick={() => {
          handleVisible(setVisibleRemoveMessages, visibleRemoveMessages);
        }}
        onBlur={() => {
          setTimeout(() => {
            setVisibleRemoveMessages(false);
          }, 100);
        }}
        className={cx("wrapperTippy")}
      >
        <Tippy
          placement="top"
          interactive // cho phep hanh dong tren ket qua
          render={(attrs) => (
            <>
              {visibleRemoveMessages && (
                <div
                  onClick={() => {
                    handleRemoveMessage(currentMessage);
                  }}
                  className={cx("boxRemove")}
                  tabIndex="-1"
                  {...attrs}
                >
                  <div className={cx("removeMessage", "autoCenter")}>
                    <span className={cx("autoCenter")}>Gỡ tin nhắn</span>
                  </div>
                </div>
              )}
            </>
          )}
        >
          <button className={cx("buttonControlText", "autoCenter")}>
            <FontAwesomeIcon className={cx("icon")} icon={faEllipsisVertical} />
          </button>
        </Tippy>
      </div>

      <button className={cx("buttonControlText", "autoCenter")}>
        <FontAwesomeIcon className={cx("icon")} icon={faShare} />
      </button>
      <div
        onClick={() => {
          handleVisible(setVisibleFeeling, visibleFeeling);
        }}
        onBlur={() => {
          setTimeout(() => {
            setVisibleFeeling(false);
          }, 100);
        }}
        className={cx("wrapperTippy")}
      >
        <Tippy
          placement="top"
          interactive // cho phep hanh dong tren ket qua
          render={(attrs) => (
            <>
              {visibleFeeling && (
                <div className={cx("boxListIcon")} tabIndex="-1" {...attrs}>
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
              )}
            </>
          )}
        >
          <button
            onClick={() => {
              handleVisible(setVisibleFeeling, visibleFeeling);
            }}
            className={cx("buttonControlText", "autoCenter")}
          >
            <FontAwesomeIcon className={cx("icon")} icon={faFaceSmileBeam} />
          </button>
        </Tippy>
      </div>
    </>
  );
}

export default ControlMessage;
