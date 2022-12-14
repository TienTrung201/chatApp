import { userChat, userLogin } from "@/components/redux/selector";
import mediaSlide from "@/pages/Media/MediaSlide";

import classNames from "classnames/bind";
import { useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import ControlMessage from "./ControlMessage";
import Emoji from "./Emoji";
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
  setVisibleModalEmoji,
  nickNameFriend,
}) {
  const Dispatch = useDispatch();

  const userLoginChat = useSelector(userLogin);
  const userId = userLoginChat.uid;
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
    // maxWidth:
    //   window.innerWidth < 550
    //     ? "100px !important"
    //     : window.innerWidth < 1024
    //     ? "200px"
    //     : "300px",
  };

  if (data.type === "sticker") {
    styleImage = {
      height: "100px !important",
      width: "100px",
    };
  }
  //image scroll top bug

  // //last send message
  const getHours =
    data.createdAt.toDate().getHours() < 10
      ? `0${data.createdAt.toDate().getHours()}`
      : data.createdAt.toDate().getHours();
  const getMinutes =
    data.createdAt.toDate().getMinutes() < 10
      ? `0${data.createdAt.toDate().getMinutes()}`
      : data.createdAt.toDate().getMinutes();

  const getDay =
    data.createdAt.toDate().getDate() < 10
      ? `0${data.createdAt.toDate().getDate()}`
      : data.createdAt.toDate().getDate();
  const getMonth =
    data.createdAt.toDate().getMonth() + 1 < 10
      ? `0${data.createdAt.toDate().getMonth() + 1}`
      : data.createdAt.toDate().getMonth() + 1;
  const getYear = data.createdAt.toDate().getFullYear();

  // //last send message
  const messageWithEmoji = useMemo(() => {
    if (data.emoji) {
      if (
        data.emoji.tym.length === 0 &&
        data.emoji.angry.length === 0 &&
        data.emoji.haha.length === 0 &&
        data.emoji.like.length === 0 &&
        data.emoji.sad.length === 0 &&
        data.emoji.wow.length === 0
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }, [data.emoji]);
  const [isFocusMessage, setIsFocusMessage] = useState();
  const nameUserNotification = useMemo(() => {
    if (roomChatInfo.user.type === "group") {
      const user = currentUsersRoom.find((user) => data.senderId === user.uid);
      if (!user) {
        return "";
      }
      if (user.uid === userId) {
        return "B???n";
      }
      return data.senderName;
    } else {
      if (userId === data.senderId) {
        return "B???n";
      } else {
        return data.senderName;
      }
    }
  }, [currentUsersRoom, data, roomChatInfo, userId]);
  // ch???n ???nh trong tin nh???n

  const handleSelectedImg = (data) => {
    const getMessageTypeImage = [];

    if (data.type !== "remove" && data.type !== "sticker" && data.image) {
      Dispatch(mediaSlide.actions.setIsOpenMedia(true));
    }

    allMessage.forEach((message) => {
      if (
        message.type !== "remove" &&
        message.type !== "sticker" &&
        message.image
      ) {
        getMessageTypeImage.push(message.image.url);
      }
    });
    let index = getMessageTypeImage.length;
    allMessage.forEach((message) => {
      if (
        message.type !== "remove" &&
        message.type !== "sticker" &&
        message.image
      ) {
        index -= 1;
        if (data.image.url === message.image.url) {
          // console.log(index);
          Dispatch(mediaSlide.actions.setCurrentIndexImage(index));
        }
      }
    });
  };
  return (
    <>
      {data.type === "notification" ? (
        <div className={cx("notification")}>
          <span className={cx("textNotification")}>
            {nameUserNotification + " " + data.text}
          </span>
        </div>
      ) : (
        <>
          {userLoginChat.uid === data.senderId ? (
            <div
              style={{ zIndex: zIndex }}
              className={cx(
                "message__chat",
                "user",
                messageWithEmoji ? "mgBtEmoji" : "",
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
                  {/* <p className={cx("nameUserReply")}>Trung ???? tr??? l???i long</p> */}
                  <p className={cx("textReply")}>
                    {data.reply === "H??nh ???nh" ? (
                      <img
                        className={cx("imageReply")}
                        alt="???nh b??? x??a"
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
                        <span>tin nh???n ???? b??? thu h???i</span>
                        {messageWithEmoji ? (
                          <Emoji
                            setVisibleModalEmoji={setVisibleModalEmoji}
                            emoji={data.emoji}
                          />
                        ) : (
                          false
                        )}
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
                              group={roomChatInfo.user.type === "group"}
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
                          className={cx(
                            data.type === "sticker" ? "styleSticker" : "pointer"
                          )}
                          onClick={() => {
                            handleSelectedImg(data);
                          }}
                          style={styleImage}
                          src={data.image.url}
                          alt=""
                        />

                        <div className={cx("emojiImage")}>
                          {data.text.trim(" ") !== "" ? (
                            false
                          ) : (
                            <>
                              {" "}
                              {messageWithEmoji ? (
                                <Emoji
                                  setVisibleModalEmoji={setVisibleModalEmoji}
                                  emoji={data.emoji}
                                />
                              ) : (
                                false
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      {/* c??? ???nh c??? ch??? */}
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
                                group={roomChatInfo.user.type === "group"}
                                currentUserRoom={currentUsersRoom}
                                myNickName={myNickNameChat}
                                userLogin={userLoginChat}
                                allMess={allMessage}
                                currentMessage={data}
                              />
                            </div>

                            <p className={cx("textMessage")}>{data.text}</p>
                            {messageWithEmoji ? (
                              <Emoji
                                setVisibleModalEmoji={setVisibleModalEmoji}
                                emoji={data.emoji}
                                userLogin={true}
                              />
                            ) : (
                              false
                            )}

                            <p
                              className={cx("textTime")}
                            >{`${getDay}/${getMonth}/${getYear} ${getHours}:${getMinutes}`}</p>
                          </div>
                        </>
                      )}
                      {/* c??? ???nh c??? ch??? */}
                    </>
                  )}
                </>
              ) : (
                <>
                  {data.type === "remove" ? (
                    <div className={cx("boxTextDeletedMessage")}>
                      <div className={cx("deletedMessage")}>
                        <span>tin nh???n ???? b??? thu h???i</span>
                        {messageWithEmoji ? (
                          <Emoji
                            setVisibleModalEmoji={setVisibleModalEmoji}
                            emoji={data.emoji}
                          />
                        ) : (
                          false
                        )}
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
                          group={roomChatInfo.user.type === "group"}
                          currentUserRoom={currentUsersRoom}
                          myNickName={myNickNameChat}
                          userLogin={userLoginChat}
                          allMess={allMessage}
                          currentMessage={data}
                        />
                      </div>

                      <p className={cx("textMessage")}>{data.text}</p>
                      {messageWithEmoji ? (
                        <Emoji
                          setVisibleModalEmoji={setVisibleModalEmoji}
                          emoji={data.emoji}
                          userLogin={true}
                        />
                      ) : (
                        false
                      )}

                      <p
                        className={cx("textTime")}
                      >{`${getDay}/${getMonth}/${getYear} ${getHours}:${getMinutes}`}</p>
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
                messageWithEmoji ? "mgBtEmoji" : "",
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
                          : userChatSender.userDisplayName
                        : "Kh??ng x??c ?????nh"}{" "}
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
                            : userChatSender.userDisplayName
                          : "Kh??ng x??c ?????nh"}{" "}
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
                          : userChatSender.photoURL
                        : require("../../../../assets/images/avataDefalt.png")
                    }
                    alt=""
                  />
                ) : (
                  false
                )}
              </div>
              <div
                style={{
                  flexDirection: data.image ? "column-reverse" : "column",
                }}
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

                    {/* <p className={cx("nameUserReply")}>Trung ???? tr??? l???i long</p> */}
                    <p className={cx("textReply")}>
                      {data.reply === "H??nh ???nh" ? (
                        <img
                          className={cx("imageReply")}
                          alt="???nh b??? x??a"
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
                          <span>tin nh???n ???? b??? thu h???i</span>
                          {messageWithEmoji ? (
                            <Emoji
                              setVisibleModalEmoji={setVisibleModalEmoji}
                              emoji={data.emoji}
                              friend={true}
                            />
                          ) : (
                            false
                          )}
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
                                  group={roomChatInfo.user.type === "group"}
                                  currentUserRoom={currentUsersRoom}
                                  friendChat={true}
                                  allMess={allMessage}
                                  currentMessage={data}
                                  userLogin={userLoginChat}
                                />
                              </div>
                              <p className={cx("textMessage")}>{data.text}</p>
                              {messageWithEmoji ? (
                                <Emoji
                                  setVisibleModalEmoji={setVisibleModalEmoji}
                                  emoji={data.emoji}
                                  friend={true}
                                />
                              ) : (
                                false
                              )}

                              <p
                                className={cx("textTime")}
                              >{`${getDay}/${getMonth}/${getYear} ${getHours}:${getMinutes}`}</p>
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
                                group={roomChatInfo.user.type === "group"}
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
                              data.type === "sticker" ? "stickerMes" : "pointer"
                            )}
                            onClick={() => {
                              handleSelectedImg(data);
                            }}
                            style={styleImage}
                            src={data.image.url}
                            alt=""
                          />
                          <div className={cx("emojiImage")}>
                            {data.text.trim(" ") !== "" ? (
                              false
                            ) : (
                              <>
                                {" "}
                                {messageWithEmoji ? (
                                  <Emoji
                                    setVisibleModalEmoji={setVisibleModalEmoji}
                                    emoji={data.emoji}
                                    friend={true}
                                  />
                                ) : (
                                  false
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {data.type === "remove" ? (
                      <div className={cx("boxTextDeletedMessage")}>
                        <div className={cx("deletedMessage")}>
                          <span>tin nh???n ???? b??? thu h???i</span>
                          {messageWithEmoji ? (
                            <Emoji
                              setVisibleModalEmoji={setVisibleModalEmoji}
                              emoji={data.emoji}
                              friend={true}
                            />
                          ) : (
                            false
                          )}
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
                            group={roomChatInfo.user.type === "group"}
                            currentUserRoom={currentUsersRoom}
                            friendChat={true}
                            allMess={allMessage}
                            currentMessage={data}
                            userLogin={userLoginChat}
                          />
                        </div>

                        <p className={cx("textMessage")}>{data.text}</p>
                        {messageWithEmoji ? (
                          <Emoji
                            setVisibleModalEmoji={setVisibleModalEmoji}
                            emoji={data.emoji}
                            friend={true}
                          />
                        ) : (
                          false
                        )}

                        <p
                          className={cx("textTime")}
                        >{`${getDay}/${getMonth}/${getYear} ${getHours}:${getMinutes}`}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/*  */}
    </>
  );
}

export default Message;
