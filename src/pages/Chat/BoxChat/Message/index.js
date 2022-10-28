import { userChat, userLogin } from "@/components/redux/selector";

import classNames from "classnames/bind";
import { useState } from "react";

import { useSelector } from "react-redux";
import ControlMessage from "./ControlMessage";
import styles from "./Message.module.scss";

const cx = classNames.bind(styles);

function Message({
  data,
  allMessage,
  myNickNameChat,
  centerMessageSend,
  firstMessageSend,
  endSendMessage,
  firstMessage,
}) {
  let displayAvata = true;
  if (centerMessageSend === true) {
    displayAvata = false;
  } else if (firstMessage === true) {
    displayAvata = false;
  }
  if (firstMessageSend === true) {
    displayAvata = false;
  }
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

  // //last send message
  // const getHours =
  //   data.createdAt.toDate().getHours() < 10
  //     ? `0${data.createdAt.toDate().getHours()}`
  //     : data.createdAt.toDate().getHours();
  // const getMinutes =
  //   data.createdAt.toDate().getMinutes() < 10
  //     ? `0${data.createdAt.toDate().getMinutes()}`
  //     : data.createdAt.toDate().getMinutes();
  // //last send message
  const [isFocusMessage, setIsFocusMessage] = useState();
  return (
    <>
      {userLoginChat.uid === data.senderId ? (
        <div
          className={cx(
            "message__chat",
            "user",
            firstMessageSend === true ? "mgtop_20px" : ""
          )}
        >
          {data.image ? (
            <>
              {data.type === "remove" ? (
                <div className={cx("boxTextDeletedMessage")}>
                  <div className={cx("deletedMessage")}>
                    <span>tin nhắn đã bị thu hồi</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className={cx("imgMessage")}>
                    {data.text.trim(" ") === "" ? (
                      <div
                        onClick={() => {
                          setIsFocusMessage(!isFocusMessage);
                        }}
                        onBlur={() => {
                          setIsFocusMessage(false);
                        }}
                        className={cx(
                          "optionTextMessage",
                          "imgMessageOptions",
                          isFocusMessage === true ? "focus" : ""
                        )}
                      >
                        <ControlMessage
                          myNickName={myNickNameChat}
                          userLogin={userLoginChat}
                          allMess={allMessage}
                          currentMessage={data}
                        />
                      </div>
                    ) : (
                      false
                    )}

                    <img style={styleImage} src={data.image.url} alt="" />
                  </div>
                  {data.text.trim(" ") === "" ? (
                    false
                  ) : (
                    <>
                      <div
                        className={cx(
                          "boxText",
                          centerMessageSend ? "borderRadiusRight-8" : "",
                          firstMessageSend ? "borderRadius_rightBt-8" : "",
                          endSendMessage ? "borderRadius_rightTop-8" : "",
                          firstMessage ? "borderRadius_rightTop-8" : ""
                        )}
                      >
                        <div
                          onClick={() => {
                            setIsFocusMessage(!isFocusMessage);
                          }}
                          onBlur={() => {
                            setIsFocusMessage(false);
                          }}
                          className={cx(
                            "optionTextMessage",
                            isFocusMessage === true ? "focus" : ""
                          )}
                        >
                          <ControlMessage
                            myNickName={myNickNameChat}
                            userLogin={userLoginChat}
                            allMess={allMessage}
                            currentMessage={data}
                          />
                        </div>

                        <p className={cx("textMessage")}>{data.text}</p>
                        {/* <p
                          className={cx("textTime")}
                        >{`${getHours}:${getMinutes}`}</p> */}
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {data.type === "remove" ? (
                <div className={cx("boxTextDeletedMessage")}>
                  <div className={cx("deletedMessage")}>
                    <span>tin nhắn đã bị thu hồi</span>
                  </div>
                </div>
              ) : (
                <div
                  className={cx(
                    "boxText",
                    centerMessageSend ? "borderRadiusRight-8" : "",
                    firstMessageSend ? "borderRadius_rightBt-8" : "",
                    endSendMessage ? "borderRadius_rightTop-8" : "",
                    firstMessage ? "borderRadius_rightTop-8" : ""
                  )}
                >
                  <div
                    onClick={() => {
                      setIsFocusMessage(!isFocusMessage);
                    }}
                    onBlur={() => {
                      setIsFocusMessage(false);
                    }}
                    className={cx(
                      "optionTextMessage",
                      isFocusMessage === true ? "focus" : ""
                    )}
                  >
                    <ControlMessage
                      myNickName={myNickNameChat}
                      userLogin={userLoginChat}
                      allMess={allMessage}
                      currentMessage={data}
                    />
                  </div>

                  <p className={cx("textMessage")}>{data.text}</p>
                  {/* <p
                    className={cx("textTime")}
                  >{`${getHours}:${getMinutes}`}</p> */}
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div
          className={cx(
            "message__chat",
            "friend",
            firstMessageSend === true ? "mgtop_20px" : ""
          )}
        >
          <div className={cx("avatar")}>
            {displayAvata === true ? (
              <img
                src={
                  roomChatInfo.user.photoURL !== null
                    ? roomChatInfo.user.photoURL
                    : require("../../../../assets/images/photoUser.png")
                }
                alt=""
              />
            ) : (
              false
            )}
          </div>
          <div className={cx("messageChat")}>
            {data.image ? (
              <>
                {data.type === "remove" ? (
                  <div className={cx("boxTextDeletedMessage")}>
                    <div className={cx("deletedMessage")}>
                      <span>tin nhắn đã bị thu hồi</span>
                    </div>
                  </div>
                ) : (
                  <>
                    {data.text.trim(" ") === "" ? (
                      false
                    ) : (
                      <>
                        <div
                          className={cx(
                            "boxText",
                            centerMessageSend ? "borderRadiusLeft-8" : "",
                            firstMessageSend ? "borderRadius_leftBt-8" : "",
                            endSendMessage ? "borderRadius_leftTop-8" : "",
                            firstMessage ? "borderRadius_leftTop-8" : ""
                          )}
                        >
                          <div
                            onClick={() => {
                              setIsFocusMessage(!isFocusMessage);
                            }}
                            onBlur={() => {
                              setIsFocusMessage(false);
                            }}
                            className={cx(
                              "optionTextMessage",
                              isFocusMessage === true ? "focus" : ""
                            )}
                          >
                            <ControlMessage
                              friendChat={true}
                              allMess={allMessage}
                              currentMessage={data}
                            />
                          </div>
                          <p className={cx("textMessage")}>{data.text}</p>
                          {/* <p
                            className={cx("textTime")}
                          >{`${getHours}:${getMinutes}`}</p> */}
                        </div>
                      </>
                    )}
                    <div className={cx("imgMessage")}>
                      {data.text.trim(" ") === "" ? (
                        <div
                          onClick={() => {
                            setIsFocusMessage(!isFocusMessage);
                          }}
                          onBlur={() => {
                            setIsFocusMessage(false);
                          }}
                          className={cx(
                            "optionTextMessage",
                            "imgMessageOptions",
                            isFocusMessage === true ? "focus" : ""
                          )}
                        >
                          <ControlMessage
                            friendChat={true}
                            myNickName={myNickNameChat}
                            userLogin={userLoginChat}
                            allMess={allMessage}
                            currentMessage={data}
                          />
                        </div>
                      ) : (
                        false
                      )}
                      <img
                        className={cx("imgMessageSending")}
                        style={styleImage}
                        src={data.image.url}
                        alt=""
                      />
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                {data.type === "remove" ? (
                  <div className={cx("boxTextDeletedMessage")}>
                    <div className={cx("deletedMessage")}>
                      <span>tin nhắn đã bị thu hồi</span>
                    </div>
                  </div>
                ) : (
                  <div
                    className={cx(
                      "boxText",
                      centerMessageSend ? "borderRadiusLeft-8" : "",
                      firstMessageSend ? "borderRadius_leftBt-8" : "",
                      endSendMessage ? "borderRadius_leftTop-8" : "",
                      firstMessage ? "borderRadius_leftTop-8" : ""
                    )}
                  >
                    <div
                      onClick={() => {
                        setIsFocusMessage(!isFocusMessage);
                      }}
                      onBlur={() => {
                        setIsFocusMessage(false);
                      }}
                      className={cx(
                        "optionTextMessage",
                        isFocusMessage === true ? "focus" : ""
                      )}
                    >
                      <ControlMessage
                        friendChat={true}
                        allMess={allMessage}
                        currentMessage={data}
                      />
                    </div>
                    <p className={cx("textMessage")}>{data.text}</p>
                    {/* <p
                      className={cx("textTime")}
                    >{`${getHours}:${getMinutes}`}</p> */}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/*  */}
    </>
  );
}

export default Message;
