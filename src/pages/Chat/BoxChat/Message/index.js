import { userChat, userLogin } from "@/components/redux/selector";

import classNames from "classnames/bind";
import { useMemo, useState } from "react";

import { useSelector } from "react-redux";
import ControlMessage from "./ControlMessage";
import styles from "./Message.module.scss";

const cx = classNames.bind(styles);

function Message({
  allUser,
  data,
  allMessage,
  myNickNameChat,
  centerMessageSend,
  firstMessageSend,
  endSendMessage,
  firstMessage,
  zIndex,
  currentUsersRoom,
}) {
  const userLoginChat = useSelector(userLogin);
  const roomChatInfo = useSelector(userChat);

  // const allUser = useFireStore("users", conditionUser);
  let userChatSender = useMemo(() => {
    let userSend;
    let userSend2;
    userSend = allUser.find((userChat) => {
      return userChat.uid === data.senderId;
    });
    userSend2 = currentUsersRoom.find((userChat) => {
      return userChat.uid === data.senderId;
    });
    return {
      ...userSend2,
      userDisplayName: userSend.displayName,
      photoURL: userSend.photoURL,
    };
  }, [currentUsersRoom, data.senderId, allUser]);

  let displayAvata = true;
  if (centerMessageSend === true) {
    displayAvata = false;
  }
  if (firstMessageSend === true) {
    displayAvata = false;
  }
  if (
    firstMessageSend === undefined &&
    firstMessage === undefined &&
    centerMessageSend === undefined &&
    endSendMessage === undefined
  ) {
  }

  const heightImageScroll = window.innerWidth > 739 ? "200px" : "100px";

  //image scroll top bug
  let styleImage = {
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

  if (data.type === "sticker") {
    styleImage = {
      height: "100px !important",
      width: "100px",
    };
  }
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
          style={{ zIndex: zIndex }}
          className={cx(
            "message__chat",
            "user",
            firstMessageSend === true ? "mgtop_20px" : "",
            firstMessageSend === undefined &&
              firstMessage === undefined &&
              centerMessageSend === undefined &&
              endSendMessage === undefined
              ? "mgtop_20px"
              : ""
          )}
        >
          {data.reply !== undefined &&
          data.reply !== "" &&
          data.type !== "remove" ? (
            <div className={cx("WrapperReplyMessage")}>
              <div className={cx("reply")}></div>
              {/* <p className={cx("nameUserReply")}>Trung đã trả lời long</p> */}
              <p className={cx("textReply")}>
                {data.reply === "Hình ảnh" ? (
                  <img
                    className={cx("imageReply")}
                    alt="Ảnh bị xóa"
                    src={data.urlReply}
                  />
                ) : (
                  data.reply
                )}
              </p>
            </div>
          ) : (
            false
          )}
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
                          isImage={true}
                          currentUserRoom={currentUsersRoom}
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
                      className={data.type === "sticker" ? "styleSticker" : ""}
                      style={styleImage}
                      src={data.image.url}
                      alt=""
                    />
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
                            currentUserRoom={currentUsersRoom}
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
                      currentUserRoom={currentUsersRoom}
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
          style={{ zIndex: zIndex }}
          className={cx(
            "message__chat",
            "friend",
            firstMessageSend === true ? "mgtop_20px" : "",
            firstMessageSend === undefined &&
              firstMessage === undefined &&
              centerMessageSend === undefined &&
              endSendMessage === undefined
              ? "mgtop_20px"
              : ""
          )}
        >
          {roomChatInfo.user.type === "group" ? (
            <>
              {firstMessageSend && (
                <span className={cx("nameUserSend")}>
                  {userChatSender !== undefined
                    ? userChatSender.nickName
                      ? userChatSender.nickName
                      : "Không xác định"
                    : "Không xác định"}{" "}
                </span>
              )}
              {firstMessageSend === undefined &&
                firstMessage === undefined &&
                centerMessageSend === undefined &&
                endSendMessage === undefined && (
                  <span className={cx("nameUserSend")}>
                    {userChatSender !== undefined
                      ? userChatSender.nickName
                        ? userChatSender.nickName
                        : "Không xác định"
                      : "Không xác định"}{" "}
                  </span>
                )}
            </>
          ) : (
            false
          )}

          <div className={cx("avatar")}>
            {displayAvata === true ? (
              <img
                src={
                  userChatSender !== undefined
                    ? userChatSender.nickName
                      ? userChatSender.photoURL
                      : require("../../../../assets/images/avataDefalt.png")
                    : require("../../../../assets/images/avataDefalt.png")
                }
                alt=""
              />
            ) : (
              false
            )}
          </div>
          <div
            style={{ flexDirection: data.image ? "column-reverse" : "column" }}
            className={cx(
              "messageChat",
              data.type === "sticker" ? "flexColumn" : ""
            )}
          >
            {data.reply !== undefined &&
            data.reply !== "" &&
            data.type !== "remove" ? (
              <div className={cx("WrapperReplyMessage")}>
                <div className={cx("reply")}></div>
                {/* <p className={cx("nameUserReply")}>Trung đã trả lời long</p> */}
                <p className={cx("textReply")}>
                  {data.reply === "Hình ảnh" ? (
                    <img
                      className={cx("imageReply")}
                      alt="Ảnh bị xóa"
                      src={data.urlReply}
                    />
                  ) : (
                    data.reply
                  )}
                </p>
              </div>
            ) : (
              false
            )}

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
                              currentUserRoom={currentUsersRoom}
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
                            isImage={true}
                            currentUserRoom={currentUsersRoom}
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
                        className={cx(
                          "imgMessageSending",
                          data.type === "sticker" ? "stickerMes" : ""
                        )}
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
                        currentUserRoom={currentUsersRoom}
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
