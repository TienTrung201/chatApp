import styles from "./BoxChat.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { allMessage, userChat } from "@/components/redux/selector";
import Message from "./Message";
import InputChat from "./InputChat";

const cx = classNames.bind(styles);

function BoxChat({ modal, setModal }) {
  const displayUserChat = useSelector(userChat);
  console.log(displayUserChat);
  const boxMessage = useRef();
  const allMessageChat = useSelector(allMessage);
  console.log(allMessageChat);
  const messages = allMessageChat.find((idMessage) => {
    return idMessage.id === displayUserChat.chatId;
  });
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
          {messages === undefined ? (
            false
          ) : (
            <FontAwesomeIcon className={cx("iconMenu")} icon={faEllipsis} />
          )}
        </div>
      </div>
      <div ref={boxMessage} className={cx("boxMessage")}>
        {messages === undefined ? (
          <h1>Chọn Phòng chat</h1>
        ) : (
          <>
            {messages.messages.map((message, i) => {
              return <Message key={i} data={displayUserChat} />;
            })}
          </>
        )}
      </div>
      <div className={cx("controlMessage")}>
        {messages === undefined ? false : <InputChat />}
      </div>
    </div>
  );
}

export default BoxChat;
