import styles from "./BoxChat.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faImages, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { allMessage, userChat } from "@/components/redux/selector";
import Message from "./Message";

const cx = classNames.bind(styles);

function BoxChat({ modal, setModal }) {
  const displayUserChat = useSelector(userChat);
  const boxMessage = useRef();
  const allMessageChat = useSelector(allMessage);
  const messages = allMessageChat.find((idMessage) => {
    return idMessage.id === displayUserChat.chatId;
  });
  // console.log(messages);
  useEffect(() => {
    boxMessage.current.scrollTop = boxMessage.current.scrollHeight;
  });
  return (
    <div className={cx("wrapper")}>
      <div className={cx("headerBox")}>
        <div className={cx("infoUser")}>
          <div className={cx("user")}>
            <div className={cx("avata")}>
              <img
                src={
                  displayUserChat.user.photoURL !== null
                    ? displayUserChat.user.photoURL
                    : require("../../../assets/images/photoUser.png")
                }
                alt=""
              />
            </div>
            <div className={cx("user__display")}>
              <h5 className={cx("user__name")}>
                {displayUserChat.user.displayName}
              </h5>
              {/* <p className={cx("user__active")}>online</p> */}
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            setModal(!modal);
          }}
          className={cx("infoRoom-Bar", "autoCenter")}
        >
          <FontAwesomeIcon className={cx("iconMenu")} icon={faEllipsis} />
        </div>
      </div>
      <div ref={boxMessage} className={cx("boxMessage")}>
        {messages === undefined ? (
          <h1>Chọn Phòng chat</h1>
        ) : (
          <Message data={displayUserChat} />
        )}
      </div>
      <div className={cx("controlMessage")}>
        <input
          style={{ display: "none" }}
          accept="image/*"
          type="file"
          name="file"
        />
        <button className={cx("chooseButton")}>
          <FontAwesomeIcon className={cx("addFile-icon")} icon={faImages} />
        </button>
        {/* <input
          autoComplete="off"
          type="text"
          placeholder="Hello:)))))"
          name="message"
        /> */}
        <div className={cx("wrapperTextMessage", "autoCenter")}>
          <div contentEditable="true" className={cx("inputMessage")}></div>
        </div>
        {/* icon message */}
        <button className={cx("sendMessage")}>
          <FontAwesomeIcon className={cx("send--icon")} icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
}

export default BoxChat;
