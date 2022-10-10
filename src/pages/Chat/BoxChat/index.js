import styles from "./BoxChat.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { userChat } from "@/components/redux/selector";
import Message from "./Message";
import InputChat from "./InputChat";
import { doc, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/config";
import LoadingListUser from "@/components/Loaddings/LoadingListUser";
import NoMessage from "@/components/NoMessage";
import { useFireStoreGetFields } from "@/hooks/useFirestor";

const cx = classNames.bind(styles);

function BoxChat({ modal, setModal }) {
  const displayUserChat = useSelector(userChat);
  const boxMessage = useRef();
  const [messages, setMessage] = useState(undefined);
  useEffect(() => {
    boxMessage.current.scrollTop = boxMessage.current.scrollHeight;
  }, [messages]);
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

  const userChatActive = useFireStoreGetFields(
    "users",
    displayUserChat.user.uid
  );

  let activeConvert;
  let active;
  if (
    displayUserChat.chatId !== "" &&
    userChatActive.lastActive !== undefined &&
    userChatActive.lastActive !== null
  ) {
    activeConvert = userChatActive.lastActive.toDate();
    active = `${activeConvert.getDate()}/${activeConvert.getMonth()}/${activeConvert.getFullYear()} and ${activeConvert.getHours()}:${activeConvert.getMinutes()}:${activeConvert.getSeconds()}`;
  }

  // console.log(userChatActive);
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
              <p className={cx("user__active")}>{checkActiveUser(active)}</p>
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
        {displayUserChat.chatId === "" ? (
          <NoMessage />
        ) : messages === undefined ? (
          false
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

export function checkActiveUser(timeActive) {
  if (timeActive === null) {
    return "";
  }
  if (timeActive === undefined) {
    return "";
  }

  const timeNow = Timestamp.now();
  const timeNowConvert = timeNow.toDate();

  const dateNow = `${timeNowConvert.getDate()}/${timeNowConvert.getMonth()}/${timeNowConvert.getFullYear()} and ${timeNowConvert.getHours()}:${timeNowConvert.getMinutes()}:${timeNowConvert.getSeconds()}`;

  const activeSeconds = timeActive.split("and")[1].split(":")[2];
  const dateNowSeconds = dateNow.split("and")[1].split(":")[2];

  const activeMinutes = timeActive.split("and")[1].split(":")[1];
  const dateNowMinutes = dateNow.split("and")[1].split(":")[1];

  const activeHours = timeActive.split("and")[1].split(":")[0];
  const dateNowHours = dateNow.split("and")[1].split(":")[0];

  const activeDay = timeActive.split("and")[0].split("/")[0];
  const dateNowDay = dateNow.split("and")[0].split("/")[0];

  const activeMonth = timeActive.split("and")[0].split("/")[1];
  const dateNowMonth = dateNow.split("and")[0].split("/")[1];

  const activeYear = timeActive.split("and")[0].split("/")[2];
  const dateNowYear = dateNow.split("and")[0].split("/")[2];

  const secondsSend =
    Number(activeSeconds) +
    Number(activeMinutes) * 60 +
    Number(activeHours) * 3600 +
    Number(activeDay) * 86400 +
    Number(activeMonth) * 2592000 +
    Number(activeYear) * 3110400;
  const secondsNow =
    Number(dateNowSeconds) +
    Number(dateNowMinutes) * 60 +
    Number(dateNowHours) * 3600 +
    Number(dateNowDay) * 86400 +
    Number(dateNowMonth) * 2592000 +
    Number(dateNowYear) * 3110400;

  const result = secondsNow - secondsSend;
  if (result / 3110400 >= 1) {
    return "Hoạt động " + parseInt(result / 3110400) + " năm trước";
  } else if (result / 2592000 >= 1) {
    return "Hoạt động " + parseInt(result / 2592000) + " tháng trước";
  } else if (result / 86400 >= 1) {
    return "Hoạt động " + parseInt(result / 86400) + " ngày trước";
  } else if (result / 3600 >= 1) {
    return "Hoạt động " + parseInt(result / 3600) + " giờ trước";
  } else if (result / 60 >= 1) {
    return "Hoạt động " + parseInt(result / 60) + " phút trước";
  } else if (result / 60 < 1) {
    return "Đang hoạt động";
  }

  return "";
}
