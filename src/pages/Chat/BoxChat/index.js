import styles from "./BoxChat.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { userChat } from "@/components/redux/selector";
import Message from "./Message";
import InputChat from "./InputChat";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";
import LoadingListUser from "@/components/Loaddings/LoadingListUser";
import NoMessage from "@/components/NoMessage";

const cx = classNames.bind(styles);

function BoxChat({ modal, setModal }) {
  const displayUserChat = useSelector(userChat);
  const boxMessage = useRef();
  const [messages, setMessage] = useState(undefined);
  useEffect(() => {
    boxMessage.current.scrollTop = boxMessage.current.scrollHeight;
  });
  useEffect(() => {
    if (displayUserChat.chatId === "") {
      setMessage(undefined);
    } else {
      const ubsub = onSnapshot(
        doc(db, "chats", displayUserChat.chatId),
        (doc) => {
          doc.exists() && setMessage(doc.data());
        }
      );
      return () => {
        ubsub();
        setMessage(false);
      };
    }
  }, [displayUserChat.chatId]);

  return (
    <div className={cx("wrapper")}>
      <div
        onClick={() => {
          if (window.innerWidth < 739) {
            setModal(!modal);
          }
        }}
        className={cx("headerBox")}
      >
        <div className={cx("infoUser")}>
          <div className={cx("user")}>
            <div className={cx("avata")}>
              {messages === undefined ? (
                false
              ) : (
                <img
                  src={
                    displayUserChat.user.photoURL !== null
                      ? displayUserChat.user.photoURL
                      : require("../../../assets/images/photoUser.png")
                  }
                  alt=""
                />
              )}
            </div>
            <div className={cx("user__display")}>
              <h5 className={cx("user__name")}>
                {messages === undefined
                  ? false
                  : displayUserChat.user.displayName}
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
          <NoMessage />
        ) : messages === false ? (
          <LoadingListUser />
        ) : (
          <>
            {messages.messages.map((message, i) => {
              return <Message data={message} key={i} />;
            })}
          </>
        )}
      </div>
      {messages === undefined ? (
        false
      ) : (
        <div className={cx("controlMessage")}>
          <InputChat />
        </div>
      )}
    </div>
  );
}

export default BoxChat;
