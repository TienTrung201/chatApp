import { userChat, userLogin } from "@/components/redux/selector";

import classNames from "classnames/bind";

import { useSelector } from "react-redux";
import ControlMessage from "./ControlMessage";
import styles from "./Message.module.scss";

const cx = classNames.bind(styles);

function Message({ data, allMessage }) {
  const heightImageScroll = window.innerWidth > 739 ? "200px" : "100px";
  const userLoginChat = useSelector(userLogin);
  const roomChatInfo = useSelector(userChat);

  //image scroll top bug
  const styleImage = {
    minHeight:
      data.image !== undefined
        ? window.innerHeight < 420
          ? "80px"
          : data.image.height > 200
          ? heightImageScroll
          : `${data.image.height}px`
        : heightImageScroll,
    maxHeight: window.innerHeight < 420 ? "80px" : heightImageScroll,
  };
  //image scroll top bug

  //last send message
  const getHours =
    data.createdAt.toDate().getHours() < 10
      ? `0${data.createdAt.toDate().getHours()}`
      : data.createdAt.toDate().getHours();
  const getMinutes =
    data.createdAt.toDate().getMinutes() < 10
      ? `0${data.createdAt.toDate().getMinutes()}`
      : data.createdAt.toDate().getMinutes();
  //last send message
  console.log(data.type);
  return (
    <>
      {userLoginChat.uid === data.senderId ? (
        <div className={cx("message__chat", "user")}>
          {data.image ? (
            <img style={styleImage} src={data.image.url} alt="" />
          ) : (
            false
          )}
          {data.text.trim(" ") === "" ? (
            false
          ) : (
            <>
              {data.type === "remove" ? (
                <div className={cx("boxTextDeletedMessage")}>
                  <div className={cx("deletedMessage")}>
                    <span>tin nhắn đã bị thu hồi</span>
                  </div>
                </div>
              ) : (
                <div className={cx("boxText")}>
                  <div className={cx("optionTextMessage")}>
                    <ControlMessage
                      allMess={allMessage}
                      currentMessage={data}
                    />
                  </div>

                  <p className={cx("textMessage")}>{data.text}</p>
                  <p
                    className={cx("textTime")}
                  >{`${getHours}:${getMinutes}`}</p>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className={cx("message__chat", "friend")}>
          <div className={cx("avatar")}>
            <img
              src={
                roomChatInfo.user.photoURL !== null
                  ? roomChatInfo.user.photoURL
                  : require("../../../../assets/images/photoUser.png")
              }
              alt=""
            />
          </div>
          <div className={cx("messageChat")}>
            {data.text.trim(" ") === "" ? (
              false
            ) : (
              <>
                {data.type === "remove" ? (
                  <div className={cx("boxTextDeletedMessage")}>
                    <div className={cx("deletedMessage")}>
                      <span>tin nhắn đã bị thu hồi</span>
                    </div>
                  </div>
                ) : (
                  <div className={cx("boxText")}>
                    <div className={cx("optionTextMessage")}>
                      <ControlMessage
                        allMess={allMessage}
                        currentMessage={data}
                      />
                    </div>
                    <p className={cx("textMessage")}>{data.text}</p>
                    <p
                      className={cx("textTime")}
                    >{`${getHours}:${getMinutes}`}</p>
                  </div>
                )}
              </>
            )}
            {data.image ? (
              <img style={styleImage} src={data.image.url} alt="" />
            ) : (
              false
            )}
          </div>
        </div>
      )}

      {/*  */}
    </>
  );
}

export default Message;
