import styles from "./BoxChat.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { isSelectedMusic, userChat, users } from "@/components/redux/selector";
import Message from "./Message";
import InputChat from "./InputChat";
import { doc, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/config";
import LoadingListUser from "@/components/Loaddings/LoadingListUser";
import NoMessage from "@/components/NoMessage";
const cx = classNames.bind(styles);

function BoxChat({ modal, setModal, listUserChats }) {
  const roomChatInfo = useSelector(userChat);
  const allUser = useSelector(users);
  const isCheckedMusic = useSelector(isSelectedMusic);
  const boxMessage = useRef();
  const [messages, setMessage] = useState(undefined);
  useEffect(() => {
    boxMessage.current.scrollTop = boxMessage.current.scrollHeight;
  }, [messages]);
  //get message
  useEffect(() => {
    if (roomChatInfo.chatId === "") {
      setMessage(undefined);
    } else {
      const ubsub = onSnapshot(doc(db, "chats", roomChatInfo.chatId), (doc) => {
        doc.exists() && setMessage(doc.data());
      });
      return () => {
        ubsub();
        setMessage(false);
      };
    }
  }, [roomChatInfo.chatId]);
  const userActive = allUser.find((userChat) => {
    return userChat.uid === roomChatInfo.user.uid;
  });
  //get message

  // trạng thái hoạt động
  let active;
  if (userActive === undefined) {
    active = undefined;
  } else {
    active = userActive.lastActive;
  }
  // trạng thái hoạt động
  //lấy biệt danh
  const findCurrentRoom = listUserChats.find(
    (roomList) => roomChatInfo.chatId === roomList[0]
  );
  let roomChat;

  if (findCurrentRoom !== undefined) {
    if (findCurrentRoom[1].listUsers) {
      roomChat = findCurrentRoom[1].listUsers.find((user) => {
        return user.uid === roomChatInfo.user.uid;
      });
    }
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
  //lấy biệt danh
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
                    roomChatInfo.user.photoURL !== null
                      ? roomChatInfo.user.photoURL
                      : require("../../../assets/images/photoUser.png")
                  }
                  alt=""
                />
              )}
              {checkActiveUser(active) === "Đang hoạt động" ? (
                <span className={cx("active")}></span>
              ) : (
                false
              )}
            </div>
            <div className={cx("user__display")}>
              <h5 className={cx("user__name")}>
                {messages === undefined ? false : nickName()}
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
        {roomChatInfo.chatId === "" ? (
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
        <div
          className={cx(
            "controlMessage",
            isCheckedMusic === true ? "backgroundTransparent" : ""
          )}
        >
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

  const timeNowConvertToString = `${timeNowConvert.getDate()}/${timeNowConvert.getMonth()}/${timeNowConvert.getFullYear()} and ${timeNowConvert.getHours()}:${timeNowConvert.getMinutes()}:${timeNowConvert.getSeconds()}`;

  const activeSeconds = timeActive.split("and")[1].split(":")[2];
  const curentSeconds = timeNowConvertToString.split("and")[1].split(":")[2];

  const activeMinutes = timeActive.split("and")[1].split(":")[1];
  const curentMinutes = timeNowConvertToString.split("and")[1].split(":")[1];

  const activeHours = timeActive.split("and")[1].split(":")[0];
  const curentHours = timeNowConvertToString.split("and")[1].split(":")[0];

  const activeDay = timeActive.split("and")[0].split("/")[0];
  const curentDay = timeNowConvertToString.split("and")[0].split("/")[0];

  const activeMonth = timeActive.split("and")[0].split("/")[1];
  const curentMonth = timeNowConvertToString.split("and")[0].split("/")[1];

  const activeYear = timeActive.split("and")[0].split("/")[2];
  const curentYear = timeNowConvertToString.split("and")[0].split("/")[2];

  const sendingTime =
    Number(activeSeconds) +
    Number(activeMinutes) * 60 +
    Number(activeHours) * 3600 +
    Number(activeDay) * 86400 +
    Number(activeMonth) * 2592000 +
    Number(activeYear) * 3110400;
  const presentTime =
    Number(curentSeconds) +
    Number(curentMinutes) * 60 +
    Number(curentHours) * 3600 +
    Number(curentDay) * 86400 +
    Number(curentMonth) * 2592000 +
    Number(curentYear) * 3110400;

  const result = presentTime - sendingTime;
  if (result / 3110400 >= 1) {
    return "Hoạt động " + parseInt(result / 3110400) + " năm trước";
  } else if (result / 2592000 >= 1) {
    return "Hoạt động " + parseInt(result / 2592000) + " tháng trước";
  } else if (result / 86400 >= 1) {
    return "Hoạt động " + parseInt(result / 86400) + " ngày trước";
  } else if (result / 3600 >= 1) {
    return "Hoạt động " + parseInt(result / 3600) + " giờ trước";
  } else if (result / 60 >= 5) {
    return "Hoạt động " + parseInt(result / 60) + " phút trước";
  } else if (result / 60 < 5) {
    return "Đang hoạt động";
  }

  return "";
}
