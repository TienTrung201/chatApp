import styles from "./Chat.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignLeft,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import BoxChat, { checkActiveUser } from "@/pages/Chat/BoxChat";
import { Link } from "react-router-dom";
import ModalInfoChat from "./ModalInfoChat";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isOpenMedia,
  isSelectedMusic,
  typeModalGroupAndEmoji,
  userChat,
  userLogin,
} from "@/components/redux/selector";
import userSlice from "../Login/UserSlice";
import {
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { useFireStore, useFireStoreGetFields } from "@/hooks/useFirestor";
import LoadingListUser from "@/components/Loaddings/LoadingListUser";
import boxChatSlice from "./BoxChat/BoxChatSlice";
import keyboard from "@/assets/audio/keyboard.mp3";
import Modal from "@/components/Modal";
import { v4 as uuid } from "uuid";
import chatSlice from "./ChatSlice";
import EmojiMessageModal from "./EmojiMessage";
import Media from "../Media";
const cx = classNames.bind(styles);

function Chat() {
  console.log("Chat");
  let user = useSelector(userLogin);
  const idUser = user.uid;
  const isCheckedMusic = useSelector(isSelectedMusic);
  const roomChatInfo = useSelector(userChat);

  const Dispatch = useDispatch();
  const conditionUser = useMemo(() => {
    return {
      fieldName: "displayName",
      operator: "!=",
      compareValue: "getAll",
    };
  }, []);

  // const newUsers = useFireStore("users", conditionUser);
  // const allUser = useSelector(users);
  const allUser = useFireStore("users", conditionUser);
  user = allUser.find((userChat) => {
    return userChat.uid === user.uid;
  });
  const [modalInfo, setModalInfo] = useState(false);
  const [controlChat, setControlChat] = useState(true);
  const [searchUser, setSearchUser] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isloadingUser, setIsLoadingUser] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const typeModal = useSelector(typeModalGroupAndEmoji);

  const open = useRef();
  const screenWidth = window.innerWidth;
  const activeUsersChat = useRef();

  // useEffect(() => {
  //   allUser.forEach((user) => {
  //     const userUpdate = doc(db, "users", user.uid);
  //     updateDoc(userUpdate, {
  //       lastActive: serverTimestamp(),
  //     });
  //   });
  // }, []);
  //L???ng nghe s??? ki???n thay ?????i k??ch th?????c m??n h??nh
  const resize = () => {
    if (window.innerWidth > 739 && window.innerWidth < 1023) {
    }
    if (window.innerWidth > 739) {
      if (window.innerWidth < 1023) {
        setStyleControl({
          width: 200,
        });
      } else {
        setStyleControl({
          width: 250,
          // right: 8 + "px",
        });
      }
    } else {
      setStyleControl({
        width: 60,
        // right: 8 + "px",
      });
      setControlChat(true);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", resize, true);
    return () => {
      window.removeEventListener("resize", resize, true);
    };
  }, []);
  //L???ng nghe s??? ki???n thay ?????i k??ch th?????c m??n h??nh

  //reponsive style ModalInfoChat
  const styleModalInfo = modalInfo === true ? { zIndex: 4, right: "0px" } : {};
  const [styleControl, setStyleControl] = useState({
    width:
      screenWidth > 739 && screenWidth < 1023
        ? 200
        : screenWidth > 1023
        ? 250
        : 60,
  });
  const handleClickOpen = () => {
    if (screenWidth < 739) {
      if (modalInfo) {
        setModalInfo(false);
      }

      setControlChat(!controlChat);
      const opens = controlChat === true ? "calc(100% - 16px)" : "60px";
      setStyleControl({
        width: opens,
        // right: 8 + "px",
      });
    }
  };
  const handleSelectOpenRoom = () => {
    if (modalInfo) {
      setModalInfo(false);
    }

    if (
      styleControl.width !== 60 &&
      styleControl.width !== "60px" &&
      window.innerWidth < 739
    ) {
      setControlChat(!controlChat);
      const opens = controlChat === true ? "calc(100% - 16px)" : "60px";
      setStyleControl({
        width: opens,
      });
    }
  };
  //reponsive style ModalInfoChat

  //l???y danh s??ch ng?????i d??ng chat

  const listuserChat = useFireStoreGetFields("userChats", idUser);
  //l???y danh s??ch ng?????i d??ng chat

  const timeNow = Timestamp.now();
  //t??m ki???m ng?????i d??ng
  useEffect(() => {
    setSearchResult(
      allUser.filter((user) => {
        return removeVietnameseTones(user.displayName.toLowerCase()).includes(
          removeVietnameseTones(searchUser.toLowerCase())
        );
      })
    );
    if (searchUser === "") {
      setSearchResult([]);
    }
  }, [searchUser, allUser]);

  const handleChangeSearch = (e) => {
    setSearchUser(e.target.value);
  };
  //t??m ki???m ng?????i d??ng
  const [nameGroup, setNameGroup] = useState("");
  const handleChangeNameGroup = (e) => {
    setNameGroup(e.target.value);
  };
  // t???o group
  const handleCreateGroupChat = async () => {
    const idRoom = "group" + user.uid + uuid();
    try {
      await setDoc(doc(db, "chats", idRoom), {
        messages: [],
      });
      await updateDoc(doc(db, "userChats", user.uid), {
        [idRoom + ".userInfo"]: {
          uid: idRoom,
          displayName: nameGroup,
          photoURL: user.photoURL,
        },
        [idRoom + ".createdAt"]: serverTimestamp(),
        [idRoom + ".listUsers"]: [
          {
            displayName: user.displayName,
            nickName: user.displayName,
            uid: user.uid,
            position: "admin",
          },
        ],
        [idRoom + ".type"]: "group",
      });
      await updateDoc(doc(db, "chats", idRoom), {
        messages: arrayUnion({
          id: uuid(),
          text: `???? t???o nh??m  nh??m`,
          senderName: user.displayName,
          senderId: user.uid,
          createdAt: Timestamp.now(),
          type: "notification",
        }),
      });
    } catch (e) {
      console.log(e);
    }
  };
  const checkName = useCallback(() => {
    if (nameGroup.length > 20 || nameGroup.length <= 2) {
      return false;
    } else {
      return true;
    }
  }, [nameGroup]);
  // t???o ph??ng v???i user
  const handleSelect = async (userSelect) => {
    const combinedId =
      userSelect.uid > user.uid
        ? userSelect.uid + user.uid
        : user.uid + userSelect.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      // n???u 2 ng?????i ch??a k???t n???t th?? t???o 1 li??n k???t v?? setDoc v??o rooms(chats)
      // update ng?????i l??? c?? info c???a m??nh

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), {
          messages: [],
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: userSelect.uid,
            displayName: userSelect.displayName,
            photoURL: userSelect.photoURL,
          },
          [combinedId + ".createdAt"]: serverTimestamp(),
        });
      }

      await updateDoc(doc(db, "userChats", userSelect.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [combinedId + ".createdAt"]: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    } finally {
      console.log("done");
    }
  };
  // t???o ph??ng v???i user

  const handleSelsectUserSearch = (userSelect) => {
    // if(listuserChat.findIndex())
    if (
      listuserChat.find((user) => {
        return user[1].userInfo.displayName === userSelect.displayName;
      })
    ) {
      console.log("???? t???n t???i");
    } else {
      setIsLoadingUser(true);
    }

    // setIsLoadingUser(true)
  };

  // thay ?????i ng?????i d??ng  v??o store
  const selectedRoom = (userSelect, userChat) => {
    let data;
    if (userSelect[1].type === "group") {
      data = {
        chatId: userSelect[1].userInfo.uid,
        user: {
          ...userSelect[1].userInfo,
          type: "group",
          photoURL: userSelect[1].userInfo.photoURL,
          displayName: userSelect[1].userInfo.displayName,
          lastActive: user.lastActive,
        },
      };
    } else {
      const combinedId =
        userSelect[1].userInfo.uid > user.uid
          ? userSelect[1].userInfo.uid + user.uid
          : user.uid + userSelect[1].userInfo.uid;
      data = {
        chatId: combinedId,
        user: {
          ...userSelect[1].userInfo,
          photoURL: userChat.photoURL,
          displayName: userChat.displayName,
          lastActive: userChat.lastActive,
        },
      };
    }

    Dispatch(boxChatSlice.actions.setUserSelect(data));
  };
  // thay ?????i ng?????i d??ng  v??o store
  useEffect(() => {
    setIsLoadingUser(false); //  click user unmount -> Loadding
  }, [listuserChat]);

  //tr???ng th??i ho???t ?????ng
  const userLoginCheckActive = allUser.find(
    (userChat) => userChat.uid === user.uid
  );

  useEffect(() => {
    const activeUser = activeUsersChat.current;
    const activeUserChat = () => {
      //v???a th??m if(userLoginCheckActive) v?? b??o ?????

      if (userLoginCheckActive) {
        if (
          checkActiveUser(userLoginCheckActive.lastActive) !==
            "??ang ho???t ?????ng" &&
          checkActiveUser(userLoginCheckActive.lastActive) !== ""
        ) {
          console.log(checkActiveUser(userLoginCheckActive.lastActive));
          console.log("bug");
          const userUpdate = doc(db, "users", idUser);
          updateDoc(userUpdate, {
            lastActive: serverTimestamp(),
          });
        }
      }
    };
    activeUser.addEventListener("mouseover", activeUserChat);
    return () => {
      activeUser.removeEventListener("mouseover", activeUserChat);
    };
  }, [idUser, timeNow, userLoginCheckActive]);
  //tr???ng th??i ho???t ?????ng

  // ??m thanh g?? ph??m
  const inputKeyboard = useRef();
  const [volumeKeyboard, setVolumeKeyboard] = useState(0);
  const handleChaneVolumeKeyboard = (e) => {
    inputKeyboard.current.volume = e.target.value / 100;
    setVolumeKeyboard(e.target.value);
  };
  useEffect(() => {
    if (isCheckedMusic) {
      inputKeyboard.current.volume = volumeKeyboard / 100;
    }
  }, [volumeKeyboard, isCheckedMusic]);
  // ??m thanh g?? ph??m
  const isOpenListMedia = useSelector(isOpenMedia);

  return (
    <section
      ref={activeUsersChat}
      className={cx(
        "wrapper",
        isCheckedMusic === true ? "backgroundTransparentApp" : ""
      )}
    >
      {isOpenListMedia && <Media />}

      <Modal
        visible={visibleModal && typeModal === "group"}
        seiVisible={setVisibleModal}
        title={"T???o Group"}
        save="T???o nh??m"
        haldleSendModal={handleCreateGroupChat}
        checkedSubmit={checkName()}
      >
        <div className={cx("createGroup")}>
          <div className={cx("nameGroup")}>
            <label htmlFor="name" className={cx("lableName")}>
              T??n nh??m
            </label>
            <input
              name="name"
              id="name"
              value={nameGroup}
              className={cx(
                "inputName",
                checkName() === false ? "error" : "successful"
              )}
              placeholder="t??n nh??m"
              onChange={handleChangeNameGroup}
            />
          </div>
        </div>
      </Modal>
      <Modal
        seiVisible={setVisibleModal}
        title={"C???m x??c v??? tin nh???n"}
        visible={visibleModal && typeModal === "emoji"}
      >
        <EmojiMessageModal
          idUserLogin={idUser}
          listUserChatRoomFriend={[
            {
              uid: roomChatInfo.user.uid,
              displayName: roomChatInfo.user.displayName,
              nickName: roomChatInfo.user.displayName,
              photoURL: roomChatInfo.user.photoURL,
            },
            {
              uid: idUser,
              displayName: user ? user.displayName : "",
              nickName: user ? user.displayName : "",
              photoURL: user ? user.photoURL : "",
            },
          ]}
          listUserServer={allUser}
        />
      </Modal>
      {isCheckedMusic === true ? (
        <div className={cx("wrapperKeyboard")}>
          <audio
            style={{ display: "none" }}
            ref={inputKeyboard}
            src={keyboard}
            autoPlay
            controls
            loop
          />
          {/* bugg unmount th?? ??m thanh g???c b??? m???t */}
          <input
            onChange={(e) => {
              handleChaneVolumeKeyboard(e);
            }}
            type="range"
            max={40}
            value={volumeKeyboard}
            step={1}
            className={cx("volume-rain")}
          />
        </div>
      ) : (
        false
      )}

      <article
        style={styleControl}
        ref={open}
        className={cx(
          "controlChat",
          isCheckedMusic === true ? "backgroundTransparentNoHover" : ""
        )}
      >
        <div className={cx("wrapperControl")}>
          <div
            onClick={() => {
              setNameGroup("");
              Dispatch(chatSlice.actions.setTypeModal("group"));
              setVisibleModal(true);
            }}
            className={cx("createNew")}
          >
            <div
              className={cx(
                "createPlus",
                "autoCenter",
                isCheckedMusic === true ? "backgroundTransparentNoHover" : ""
              )}
            >
              <FontAwesomeIcon className={cx("creatPlusIcon")} icon={faPlus} />
            </div>

            {controlChat === false || screenWidth > 739 ? (
              <h4 className={cx("create__title")}>T???o nh??m</h4>
            ) : (
              false
            )}
          </div>

          <div className={cx("wrapperTitle")}>
            <h2 className={cx("title__Chat")}>Chat</h2>
            {/* <FontAwesomeIcon /> */}
          </div>
          <div
            className={cx(
              "wrapperSearch",
              isCheckedMusic === true ? "backgroundTransparentBlackBorder" : ""
            )}
          >
            <input
              className={cx(
                isCheckedMusic === true ? "textWhite" : "",
                "searchText"
              )}
              placeholder="Search Name"
              type="text"
              onChange={handleChangeSearch}
              value={searchUser}
            />

            <div
              onClick={handleClickOpen}
              className={cx(
                "searchIconWrapper",
                "autoCenter",
                isCheckedMusic === true ? "backgroundTransparent" : ""
              )}
            >
              <FontAwesomeIcon
                className={cx("searchIcon")}
                icon={faMagnifyingGlass}
              />
            </div>
          </div>
        </div>
        <ul className={cx("wrapperListUser")}>
          {searchResult.length > 0 && searchUser.length > 0 ? (
            <>
              {searchResult.map((user, i) => {
                return (
                  <li
                    onClick={() => {
                      Dispatch(userSlice.actions.setUserSelect(user));
                      handleSelsectUserSearch(user);
                      setSearchUser("");
                    }}
                    key={i}
                    className={cx("userItem")}
                  >
                    <Link
                      onClick={() => {
                        handleSelect(user);
                      }}
                      to={"#"}
                      className={cx("user")}
                    >
                      <div className={cx("avata", "autoCenter")}>
                        <img
                          src={
                            user.photoURL !== null
                              ? user.photoURL
                              : require("../../assets/images/avataDefalt.png")
                          }
                          alt=""
                        />
                      </div>

                      {controlChat === false || screenWidth > 739 ? (
                        <div className={cx("user__display")}>
                          <h5 className={cx("user__name")}>
                            {user.displayName}
                          </h5>
                        </div>
                      ) : (
                        false
                      )}
                    </Link>
                  </li>
                );
              })}
            </>
          ) : (
            <>
              {listuserChat.map((user, index) => {
                const lastSend = lastSendMessage(timeNow, user[1].createdAt);

                let userChat = allUser.find((userChat) => {
                  return userChat.uid === user[1].userInfo.uid;
                });
                let nickName;

                if (user[1].listUsers) {
                  nickName = user[1].listUsers.find(
                    (userChat) => userChat.uid === user[1].userInfo.uid
                  );
                }
                if (userChat) {
                  if (nickName === undefined) {
                    nickName = userChat.displayName;
                  } else if (nickName.nickName.trim(" ") === "") {
                    nickName = userChat.displayName;
                  } else {
                    nickName = nickName.nickName;
                  }
                }

                const userActive = allUser.find((userChat) => {
                  return userChat.uid === user[1].userInfo.uid;
                });
                let active;
                if (userActive === undefined) {
                  active = undefined;
                } else {
                  active = userActive.lastActive;
                }
                // if(checkActiveUser(active).indexOf("ph??t"))
                let offline;
                if (checkActiveUser(active).indexOf("ph??t") !== -1) {
                  offline =
                    checkActiveUser(active).split(" ")[2] +
                    " " +
                    checkActiveUser(active).split(" ")[3];
                } else {
                  offline = false;
                }
                return (
                  <li
                    onClick={() => {
                      selectedRoom(user, userChat);
                      handleSelectOpenRoom();
                    }}
                    key={index}
                    className={cx("userItem")}
                  >
                    <Link to={"#"} className={cx("user")}>
                      <div className={cx("avata", "autoCenter")}>
                        {user[1].type === "group" ? (
                          <img
                            src={
                              user[1].userInfo.photoURL !== ""
                                ? user[1].userInfo.photoURL
                                : require("../../assets/images/avataDefalt.png")
                            }
                            alt=""
                          />
                        ) : (
                          <img
                            src={
                              userChat !== undefined
                                ? userChat.photoURL
                                : require("../../assets/images/avataDefalt.png")
                            }
                            alt=""
                          />
                        )}

                        {checkActiveUser(active) === "??ang ho???t ?????ng" ? (
                          <span className={cx("active")}></span>
                        ) : (
                          false
                        )}
                        {offline && (
                          <span className={cx("offline", "autoCenter")}>
                            <p className={cx("autoCenter")}>{offline}</p>
                          </span>
                        )}
                      </div>
                      {controlChat === false || screenWidth > 739 ? (
                        <div className={cx("user__display")}>
                          {user[1].type === "group" ? (
                            <h5 className={cx("user__name")}>
                              {user[1].userInfo.displayName}
                            </h5>
                          ) : (
                            <h5 className={cx("user__name")}>
                              {userChat !== undefined ? nickName : ""}
                            </h5>
                          )}

                          <div className={cx("user__chatHistory")}>
                            <p className={cx("userChatHistory")}>
                              {user[1].lastMessage === undefined
                                ? false
                                : `${
                                    user[1].lastMessage.sender
                                      .split(" ")
                                      .reverse()[0]
                                  }: ${user[1].lastMessage.text}`}
                            </p>
                            <p>
                              {user[1].lastMessage === undefined
                                ? false
                                : "??" + lastSend}
                            </p>
                          </div>
                        </div>
                      ) : (
                        false
                      )}
                    </Link>
                  </li>
                );
              })}
              {isloadingUser && (
                <div style={{ paddingTop: "10px" }} className={cx("Loading")}>
                  <LoadingListUser />
                </div>
              )}
              {/* <div style={{ paddingTop: "10px" }} className={cx("Loading")}>
                <LoadingListUser />
              </div> */}
            </>
          )}
        </ul>
        <div
          onClick={handleClickOpen}
          className={cx("barControlChat", "autoCenter")}
        >
          <div className={cx("createPlus", "autoCenter")}>
            <FontAwesomeIcon className={cx("iconBar")} icon={faAlignLeft} />
          </div>
        </div>
      </article>

      <article className={cx("rooms")}>
        <BoxChat
          setVisibleModalEmoji={setVisibleModal}
          allUsers={allUser}
          listUserChats={listuserChat}
          controlChatToBox={controlChat}
          modal={modalInfo}
          setModal={setModalInfo}
        />
      </article>
      <article style={styleModalInfo} className={cx("ModalInfoChat")}>
        <ModalInfoChat
          allUsers={allUser}
          listUserChats={listuserChat}
          modal={modalInfo}
          setModal={setModalInfo}
        />
      </article>
    </section>
  );
}

export default Chat;
export function removeVietnameseTones(str) {
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "a");
  str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "e");
  str = str.replace(/??|??|???|???|??/g, "i");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "o");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "u");
  str = str.replace(/???|??|???|???|???/g, "y");
  str = str.replace(/??/g, "d");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "A");
  str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "E");
  str = str.replace(/??|??|???|???|??/g, "I");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "O");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "U");
  str = str.replace(/???|??|???|???|???/g, "Y");
  str = str.replace(/??/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // M???t v??i b??? encode coi c??c d???u m??, d???u ch??? nh?? m???t k?? t??? ri??ng bi???t n??n th??m hai d??ng n??y
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ?? ?? ?? ?? ??  huy???n, s???c, ng??, h???i, n???ng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ?? ?? ??  ??, ??, ??, ??, ??
  // Remove extra spaces
  // B??? c??c kho???ng tr???ng li???n nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // B??? d???u c??u, k?? t??? ?????c bi???t
  // str = str.replace(
  //   /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
  //   " "
  // );
  return str;
}
export function lastSendMessage(timeNow, timeSendMessage) {
  if (timeSendMessage === null) {
    return "";
  }
  const timeNowConvert = timeNow.toDate();
  const timeSendMessageConvert = timeSendMessage.toDate();
  const dateNow = `${timeNowConvert.getDate()}/${timeNowConvert.getMonth()}/${timeNowConvert.getFullYear()} ${timeNowConvert.getHours()}:${timeNowConvert.getMinutes()}`;
  const dateSend = `${timeSendMessageConvert.getDate()}/${timeSendMessageConvert.getMonth()}/${timeSendMessageConvert.getFullYear()} ${timeSendMessageConvert.getHours()}:${timeSendMessageConvert.getMinutes()}`;

  const minutesSent = dateSend.split(" ")[1].split(":")[1];
  const curentMinutes = dateNow.split(" ")[1].split(":")[1];

  const houreSent = dateSend.split(" ")[1].split(":")[0];
  const curentHours = dateNow.split(" ")[1].split(":")[0];

  const daySent = dateSend.split(" ")[0].split("/")[0];
  const curentDay = dateNow.split(" ")[0].split("/")[0];

  const monthSent = dateSend.split(" ")[0].split("/")[1];
  const curentMonth = dateNow.split(" ")[0].split("/")[1];

  const yearSent = dateSend.split(" ")[0].split("/")[2];
  const curentYear = dateNow.split(" ")[0].split("/")[2];

  // console.log(Math.abs(dateNowMinutes - minutesSent));
  const sendingTime =
    Number(minutesSent) * 60 +
    Number(houreSent) * 3600 +
    Number(daySent) * 86400 +
    Number(monthSent) * 2592000 +
    Number(yearSent) * 31104000;
  const presentTime =
    Number(curentMinutes) * 60 +
    Number(curentHours) * 3600 +
    Number(curentDay) * 86400 +
    Number(curentMonth) * 2592000 +
    Number(curentYear) * 31104000;

  const result = presentTime - sendingTime;

  if (result / 31104000 >= 1) {
    return parseInt(result / 31104000) + "n??m";
  } else if (result / 2592000 >= 1) {
    return parseInt(result / 2592000) + "th??ng";
  } else if (result / 86400 >= 1) {
    return parseInt(result / 86400) + "ng??y";
  } else if (result / 3600 >= 1) {
    return parseInt(result / 3600) + "gi???";
  } else if (result / 60 >= 1) {
    return parseInt(result / 60) + "ph??t";
  } else if (result / 60 === 0) {
    return parseInt(result / 60) + 1 + "ph??t";
  }
}
