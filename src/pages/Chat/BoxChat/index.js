import styles from "./BoxChat.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faClose,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isReplyMessage,
  isSelectedMusic,
  isSendMessageTogle,
  messageAnswered,
  userChat,
  userLogin,
  userNameAnswered,
  // users,
} from "@/components/redux/selector";
import Message from "./Message";
import InputChat from "./InputChat";
import { doc, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/config";
import LoadingListUser from "@/components/Loaddings/LoadingListUser";
import NoMessage from "@/components/NoMessage";
import InfiniteScroll from "react-infinite-scroll-component";
import boxChatSlice from "./BoxChatSlice";
import userSlice from "@/pages/Login/UserSlice";

const cx = classNames.bind(styles);

function BoxChat({
  modal,
  setModal,
  listUserChats,
  allUsers,
  setVisibleModalEmoji,
}) {
  const Dispatch = useDispatch();
  const roomChatInfo = useSelector(userChat);
  // const allUser = useSelector(users);
  let user = useSelector(userLogin);
  user = allUsers.find((userChat) => {
    return userChat.uid === user.uid;
  });
  const isCheckedMusic = useSelector(isSelectedMusic);
  const boxMessage = useRef();
  const [messages, setMessage] = useState(undefined);
  const isSendMessage = useSelector(isSendMessageTogle);
  const isReplyMessages = useSelector(isReplyMessage);
  const userNameAnswer = useSelector(userNameAnswered);
  const messageAnswer = useSelector(messageAnswered);
  const [currentUserRoom, setCurrentUserRoom] = useState([]);
  useEffect(() => {
    const listUserRoom = listUserChats.find((room) => {
      return room[0] === roomChatInfo.chatId;
    });

    if (listUserRoom !== undefined) {
      if (listUserRoom[0].search("group") === 0) {
        Dispatch(
          userSlice.actions.setCurrentUserGroup(listUserRoom[1].listUsers)
        );
        setCurrentUserRoom(listUserRoom[1].listUsers);
      } else {
        setCurrentUserRoom([]);
      }
    }
  }, [roomChatInfo.chatId, listUserChats, Dispatch]);
  //scroll

  useEffect(() => {
    if (boxMessage.current.scrollTop > -70) {
      boxMessage.current.scrollTop = boxMessage.current.clientHeight;
    }
  }, [isSendMessage, messages]);
  //scroll

  //get message
  useEffect(() => {
    if (roomChatInfo.chatId === "") {
      setMessage(undefined);
    } else {
      const ubsub = onSnapshot(doc(db, "chats", roomChatInfo.chatId), (doc) => {
        doc.exists() && setMessage(doc.data().messages.reverse());
        // console.log(doc.data().messages);
      });
      return () => {
        ubsub();
        setMessage(false);
      };
    }
  }, [roomChatInfo.chatId]);
  //get message
  const userActive = allUsers.find((userChat) => {
    return userChat.uid === roomChatInfo.user.uid;
  });

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
  let myName;
  if (findCurrentRoom !== undefined) {
    if (findCurrentRoom[1].listUsers) {
      roomChat = findCurrentRoom[1].listUsers.find((user) => {
        return user.uid === roomChatInfo.user.uid;
      });
    }
    if (findCurrentRoom[1].listUsers) {
      myName = findCurrentRoom[1].listUsers.find((userchat) => {
        return userchat.uid === user.uid;
      });
    }
  } else {
    // setMessage([]);
  }
  //khi người dùng bị xóa khỏi nhóm

  useLayoutEffect(() => {
    if (findCurrentRoom === undefined) {
      setMessage(undefined);
      Dispatch(
        boxChatSlice.actions.setUserSelect({
          chatId: "",
          user: {},
          isSendMessageTogle: true,
        })
      );
    }
    //khi người dùng bị xóa khỏi nhóm
  }, [findCurrentRoom, Dispatch]);
  const myNickName = useCallback(() => {
    // console.log(user);
    if (user === undefined) {
      return "";
    }
    if (myName === undefined) {
      return user.displayName;
    }
    if (myName.nickName.trim(" ") === "") {
      return user.displayName;
    } else {
      return myName.nickName;
    }
  }, [myName, user]);

  const nickName = useCallback(() => {
    if (findCurrentRoom !== undefined) {
      if (findCurrentRoom[1].type === "group") {
        return findCurrentRoom[1].userInfo.displayName;
      }
    }

    if (roomChat === undefined) {
      return roomChatInfo.user.displayName;
    } else if (roomChat.nickName.trim(" ") === "") {
      return roomChatInfo.user.displayName;
    } else {
      return roomChat.nickName;
    }
  }, [roomChat, roomChatInfo.user.displayName, findCurrentRoom]);
  //lấy biệt danh
  //scroll infinite
  const [curentIndexMessage, setCurrentIndexMessage] = useState(20);
  const addDataScroll = () => {
    setTimeout(() => {
      if (curentIndexMessage < messages.length) {
        setCurrentIndexMessage((prev) => prev + 20);
      }
    }, 500);
  };
  useEffect(() => {
    setCurrentIndexMessage(20);
  }, [roomChatInfo]);
  //scroll infinite
  const [isOpenScrollTop, setIsOpenScrollTop] = useState(false);

  useEffect(() => {
    const scrollMessage = boxMessage.current;

    const handleScroll = () => {
      if (boxMessage.current.scrollTop < -100) {
        setIsOpenScrollTop(true);
      } else {
        setIsOpenScrollTop(false);
      }
    };
    scrollMessage.addEventListener("scroll", handleScroll);

    return () => {
      scrollMessage.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={cx("wrapper")}>
      <AnimatePresence>
        {isOpenScrollTop && (
          <motion.div
            initial={{ y: 50, opacity: 0, x: -20 }}
            animate={{
              transition: { stiffness: 300 },
              opacity: 1,
              y: 0,
            }}
            exit={{
              y: 50,
              transition: { duration: 0.1 },
              opacity: 0,
            }}
            onClick={() => {
              boxMessage.current.scrollTop = boxMessage.current.clientHeight;
            }}
            className={cx("buttomScrollTop")}
          >
            <FontAwesomeIcon className={cx("icon")} icon={faArrowDown} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* cách 2 */}

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
                <>
                  {roomChatInfo.user.type === "group" ? (
                    <img
                      src={
                        findCurrentRoom && findCurrentRoom[1].userInfo.photoURL
                      }
                      alt=""
                    />
                  ) : (
                    <img
                      src={
                        roomChatInfo.user.photoURL !== null
                          ? roomChatInfo.user.photoURL
                          : require("../../../assets/images/avataDefalt.png")
                      }
                      alt=""
                    />
                  )}
                </>
              )}
              {checkActiveUser(active) === "Đang hoạt động" ? (
                <span className={cx("active")}></span>
              ) : (
                false
              )}
            </div>
            <div
              className={cx(
                "user__display",
                roomChatInfo.user.type === "group" ? "alignCenter" : ""
              )}
            >
              <h5 className={cx("user__name")}>
                {messages === undefined ? false : nickName()}
              </h5>

              {/* group */}
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
      <div ref={boxMessage} id="scrollableDiv" className={cx("boxMessage")}>
        {roomChatInfo.chatId === "" ? (
          <NoMessage />
        ) : messages === undefined ? (
          false
        ) : messages === false ? (
          <LoadingListUser />
        ) : (
          <InfiniteScroll
            dataLength={curentIndexMessage}
            style={{
              display: "flex",
              flexDirection: "column-reverse",
              overflowX: "hidden",
            }}
            scrollableTarget="scrollableDiv"
            next={addDataScroll}
            hasMore={true}
            loader={
              curentIndexMessage < messages.length ? (
                <div
                  style={{
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  className={cx("Loading")}
                >
                  <LoadingListUser />
                </div>
              ) : (
                false
              )
            }
            inverse={true}
          >
            {messages.map((message, i) => {
              if (i > curentIndexMessage) {
                return false;
              }
              for (let j = 0; j < messages.length; j++) {
                if (
                  messages[i - 1] === undefined ||
                  messages[i - 1].type === "notification" // sửa hình dạng tinn nhắn
                ) {
                  if (messages[i + 1] === undefined) {
                    break;
                  }
                  if (messages[i].senderId === messages[i + 1].senderId) {
                    return (
                      <Message
                        nickNameFriend={nickName()}
                        setVisibleModalEmoji={setVisibleModalEmoji}
                        allUser={allUsers}
                        currentUsersRoom={currentUserRoom}
                        zIndex={curentIndexMessage - i}
                        firstMessage={true}
                        myNickNameChat={myNickName()}
                        allMessage={messages}
                        data={message}
                        key={message.id}
                      />
                    );
                  }

                  break;
                }
                if (messages[i + 1] === undefined) {
                  if (messages[i - 1] === undefined) {
                    break;
                  }
                  if (messages[i].senderId === messages[i - 1].senderId)
                    return (
                      <Message
                        nickNameFriend={nickName()}
                        setVisibleModalEmoji={setVisibleModalEmoji}
                        allUser={allUsers}
                        currentUsersRoom={currentUserRoom}
                        zIndex={curentIndexMessage - i}
                        firstMessageSend={true}
                        myNickNameChat={myNickName()}
                        allMessage={messages}
                        data={message}
                        key={message.id}
                      />
                    );
                }
                if (
                  messages[i + 1] === undefined ||
                  messages[i - 1] === undefined
                ) {
                  break;
                }
                if (
                  messages[i].senderId !== messages[i + 1].senderId &&
                  messages[i].senderId === messages[i - 1].senderId
                ) {
                  return (
                    <Message
                      nickNameFriend={nickName()}
                      setVisibleModalEmoji={setVisibleModalEmoji}
                      allUser={allUsers}
                      currentUsersRoom={currentUserRoom}
                      zIndex={curentIndexMessage - i}
                      firstMessageSend={true}
                      myNickNameChat={myNickName()}
                      allMessage={messages}
                      data={message}
                      key={message.id}
                    />
                  );
                } else if (
                  messages[i].senderId === messages[i + 1].senderId &&
                  messages[i].senderId !== messages[i - 1].senderId
                ) {
                  // console.log(message.text);
                  // break;
                  return (
                    <Message
                      nickNameFriend={nickName()}
                      setVisibleModalEmoji={setVisibleModalEmoji}
                      allUser={allUsers}
                      currentUsersRoom={currentUserRoom}
                      zIndex={curentIndexMessage - i}
                      endSendMessage={true}
                      myNickNameChat={myNickName()}
                      allMessage={messages}
                      data={message}
                      key={message.id}
                    />
                  );
                }
                if (
                  messages[i].senderId === messages[i - 1].senderId &&
                  messages[i].senderId === messages[i + 1].senderId
                ) {
                  return (
                    <Message
                      nickNameFriend={nickName()}
                      setVisibleModalEmoji={setVisibleModalEmoji}
                      allUser={allUsers}
                      currentUsersRoom={currentUserRoom}
                      zIndex={curentIndexMessage - i}
                      centerMessageSend={true}
                      myNickNameChat={myNickName()}
                      allMessage={messages}
                      data={message}
                      key={message.id}
                    />
                  );
                }
              }
              return (
                <Message
                  nickNameFriend={nickName()}
                  setVisibleModalEmoji={setVisibleModalEmoji}
                  allUser={allUsers}
                  currentUsersRoom={currentUserRoom}
                  zIndex={curentIndexMessage - i}
                  myNickNameChat={myNickName()}
                  allMessage={messages}
                  data={message}
                  key={message.id}
                />
              );
            })}
          </InfiniteScroll>
        )}
      </div>
      {messages === undefined ? (
        false
      ) : (
        <div
          className={cx(
            "controlMessage",
            isCheckedMusic === true ? "backgroundTransparentBlackBorder" : ""
          )}
        >
          {isReplyMessages === true ? (
            <div className={cx("WrapperReplyMessage")}>
              <div className={cx("replyNameUser")}>
                <span>Đang trả lời </span>

                <p className={cx("nameUser")}>{userNameAnswer}</p>
              </div>
              <p className={cx("textReply")}>{messageAnswer}</p>
              <button
                onClick={() => {
                  Dispatch(boxChatSlice.actions.setUserNameAnswered(""));
                  Dispatch(boxChatSlice.actions.setMessageAnswered(""));
                  Dispatch(boxChatSlice.actions.setIsReplyMessage(false));
                  Dispatch(boxChatSlice.actions.setUrlImageAnsered(""));
                }}
                className={cx("buttonCloseReply")}
              >
                <FontAwesomeIcon className={cx("close-icon")} icon={faClose} />
              </button>
            </div>
          ) : (
            false
          )}

          <InputChat
            listUserChat={listUserChats}
            userSend={user}
            myNickNameChat={myNickName()}
          />
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
