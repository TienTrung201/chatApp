import styles from "./ModalInfoChat.module.scss";
import classNames from "classnames/bind";
import { v4 as uuid } from "uuid";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faCheck,
  faChevronDown,
  faGear,
  faImage,
  faImages,
  faPen,
  faSignature,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  isSelectedMusic,
  userChat,
  userLogin,
  // users,
} from "@/components/redux/selector";
import Modal from "@/components/Modal";
import EditUser from "./EditUser";
import { useFireStore } from "@/hooks/useFirestor";
import AddUser from "./AddUser";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "@/firebase/config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

const cx = classNames.bind(styles);

function ModalInfoChat({ modal, setModal, listUserChats, allUsers }) {
  let user = useSelector(userLogin);
  const [searchUser, setSearchUser] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [nameGroup, setNameGroup] = useState("");
  const roomChatInfo = useSelector(userChat);
  const [currentUserRoom, setCurrentUserRoom] = useState([]);
  const [currentGroup, setCurrentGroup] = useState({
    displayName: "",
    photoURL: "",
  });
  const file = useRef();
  const conditionUser = useMemo(() => {
    return {
      fieldName: "displayName",
      operator: "!=",
      compareValue: "getAll",
    };
  }, []);
  //đổi tên nhóm
  const handleChangeNameGroup = (e) => {
    setNameGroup(e.target.value);
  };
  const handleSubmitNameGroup = () => {
    try {
      currentUserRoom.forEach(async (user) => {
        await updateDoc(doc(db, "userChats", user.uid), {
          [roomChatInfo.chatId + ".userInfo"]: {
            uid: roomChatInfo.chatId,
            displayName: nameGroup,
            photoURL: currentGroup.photoURL,
          },
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  //đổi tên nhóm
  // const listuserChat = useFireStore("users", conditionUser);
  const allUser = useFireStore("users", conditionUser);
  user = allUser.find((userChat) => {
    return userChat.uid === user.uid;
  });
  const [usersRoomSearch, setUsersRoomSearch] = useState([]);
  //hành động thêm người dùng vào phòng
  const handleAddusersGroup = async () => {
    const listUserRoomAdd = currentUserRoom;
    usersRoomSearch.forEach((user) => {
      if (user.checked === true) {
        listUserRoomAdd.push({
          displayName: user.displayName,
          nickName: user.displayName,
          uid: user.uid,
        });
      }
    });

    listUserRoomAdd.forEach(async (user) => {
      await updateDoc(doc(db, "userChats", user.uid), {
        [roomChatInfo.chatId + ".userInfo"]: {
          uid: roomChatInfo.chatId,
          displayName: roomChatInfo.user.displayName,
          photoURL: roomChatInfo.user.photoURL,
        },
        [roomChatInfo.chatId + ".createdAt"]: serverTimestamp(),
        [roomChatInfo.chatId + ".listUsers"]: listUserRoomAdd,
        [roomChatInfo.chatId + ".type"]: "group",
      });
    });
  };
  //hành động thêm người dùng vào phòng

  //checked tạo danh sách người dùng vào phòng
  const addUserCheckedToggle = (id) => {
    setUsersRoomSearch(
      usersRoomSearch.map((user) => {
        if (user.uid === id) {
          return {
            ...user,
            checked: !user.checked,
          };
        }
        return { ...user };
      })
    );
    setSearchResult(
      searchResult.map((user) => {
        if (user.uid === id) {
          return {
            ...user,
            checked: !user.checked,
          };
        }
        return { ...user };
      })
    );
  };
  useEffect(() => {
    const listUserRoom = listUserChats.find((room) => {
      return room[0] === roomChatInfo.chatId;
    });

    let userRoom = [];

    if (listUserRoom !== undefined) {
      if (listUserRoom[0].search("group") === 0) {
        setCurrentUserRoom(listUserRoom[1].listUsers);
        setCurrentGroup({
          ...listUserRoom[1].userInfo,
        });
        userRoom = allUsers.map((users) => {
          for (let i = 0; i < listUserRoom[1].listUsers.length; i++) {
            if (users.uid === listUserRoom[1].listUsers[i].uid) {
              return false;
            }
          }
          return users;
        });
      }
    } else {
      userRoom = [];
    }
    const userRoomSearch = [];

    for (let i = 0; i < userRoom.length; i++) {
      if (userRoom[i] !== false) {
        userRoomSearch.push({ ...userRoom[i], checked: false });
      }
    }
    //sửa user room thêm checked
    setUsersRoomSearch(userRoomSearch);
    //checked tạo danh sách người dùng vào phòng
  }, [allUsers, listUserChats, roomChatInfo.chatId]);
  //checked tạo danh sách người dùng vào phòng
  //

  const handleChangeImg = (imgFile) => {
    const idRandom = uuid();
    const imgRef = ref(
      storage,
      `group/${roomChatInfo.chatId}/${imgFile.name}${idRandom}`
    );
    if (currentGroup.fullPath) {
      const desertRef = ref(storage, currentGroup.fullPath);
      deleteObject(desertRef)
        .then(() => {
          // File deleted successfully
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
        });
    }
    uploadBytes(imgRef, imgFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((imgurl) => {
        currentUserRoom.forEach(async (user) => {
          await updateDoc(doc(db, "userChats", user.uid), {
            [roomChatInfo.chatId + ".userInfo"]: {
              uid: roomChatInfo.chatId,
              displayName: currentGroup.displayName,
              photoURL: imgurl,
              fullPath: snapshot.metadata.fullPath,
            },
          });
        });
      });
    });
  };
  //tìm kiếm người dùng
  useEffect(() => {
    setSearchResult(
      usersRoomSearch.filter((user) => {
        return user.displayName
          .toLowerCase()
          .includes(searchUser.toLowerCase());
      })
    );

    if (searchUser === "") {
      setSearchResult([]);
    }
  }, [searchUser, usersRoomSearch]);

  const handleChangeSearch = (e) => {
    setSearchUser(e.target.value);
  };
  //tìm kiếm người dùng

  const isCheckedMusic = useSelector(isSelectedMusic);
  const [isSetting, setIsSetting] = useState(false);
  const [isListUserGroup, setIsListUserGroup] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [visibleModal, setVisibleModal] = useState(false);
  const screenWidth = window.innerWidth;
  const widthProfileChatRoom =
    screenWidth > 739 && screenWidth < 1023
      ? 200
      : screenWidth > 1023
      ? 250
      : "calc(100% - 1px)";
  const findCurrentRoom = listUserChats.find(
    (roomList) => roomChatInfo.chatId === roomList[0]
  );
  let roomChat;
  if (findCurrentRoom) {
    if (findCurrentRoom[1].listUsers !== undefined)
      roomChat = findCurrentRoom[1].listUsers.find((user) => {
        return user.uid === roomChatInfo.user.uid;
      });
  }

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
  }, [roomChat, findCurrentRoom, roomChatInfo.user.displayName]);
  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          initial={{ width: 0, opacity: 0.5 }}
          animate={{
            transition: { stiffness: 300 },
            // width: "calc(100% - 16px)",
            width: widthProfileChatRoom,
            opacity: 1,
          }}
          exit={{
            width: 0,
            transition: { duration: 0.2 },
            opacity: 0,
          }}
          className={cx(
            "wrapper",
            isCheckedMusic === true ? "backgroundTransparentNoHover" : ""
          )}
        >
          {typeModal === "nickName" ? (
            <Modal
              visible={visibleModal}
              seiVisible={setVisibleModal}
              title={"Biệt danh"}
              group={roomChatInfo.user.type}
            >
              {roomChatInfo.user.type === "group" ? (
                <h1>Đang update...</h1>
              ) : (
                <div className={cx("editNickName")}>
                  <EditUser
                    listUserRoom={listUserChats}
                    remainUser={user}
                    roomId={roomChatInfo.chatId}
                    userEdit={roomChatInfo.user}
                  />
                  <EditUser
                    remainUser={roomChatInfo.user}
                    roomId={roomChatInfo.chatId}
                    userEdit={user}
                    listUserRoom={listUserChats}
                  />
                </div>
              )}
            </Modal>
          ) : (
            false
          )}
          {typeModal === "editNameGroup" ? (
            <Modal
              visible={visibleModal}
              seiVisible={setVisibleModal}
              title={"Đổi tên nhóm"}
              save="Lưu"
              haldleSendModal={handleSubmitNameGroup}
              onClick={() => {}}
            >
              <div className={cx("editNameGroup")}>
                <div className={cx("nameGroup")}>
                  <label htmlFor="name" className={cx("lableName")}>
                    Tên nhóm
                  </label>
                  <input
                    name="name"
                    id="name"
                    value={nameGroup}
                    className={cx("inputName")}
                    placeholder="name"
                    onChange={handleChangeNameGroup}
                  />
                </div>
              </div>
            </Modal>
          ) : (
            false
          )}
          {typeModal === "addUser" ? (
            <Modal
              visible={visibleModal}
              seiVisible={setVisibleModal}
              title={"Thêm thành viên"}
              save="Thêm"
              haldleSendModal={handleAddusersGroup}
            >
              <div className={cx("editNameGroup", "addUserGroup")}>
                <div className={cx("nameGroup", "addUser")}>
                  <input
                    name="name"
                    id="name"
                    className={cx("inputName")}
                    placeholder="Tìm Kiếm"
                    onChange={handleChangeSearch}
                    value={searchUser}
                  />
                </div>
                <div className={cx("selectUser")}>
                  <div className={cx("listUserSelected")}>
                    {usersRoomSearch.map((user) => {
                      if (user.checked === true) {
                        return <AddUser user={user} key={user.uid} />;
                      }
                      return false;
                    })}
                  </div>

                  {/* <h5 className={cx("autoCenter")}>Chưa chọn người dùng nào</h5> */}
                </div>
                <ul className={cx("listUserSearch")}>
                  {searchResult.map((user, i) => {
                    return (
                      <li
                        onClick={() => {
                          addUserCheckedToggle(user.uid);
                        }}
                        key={user.uid}
                        className={cx("userItem")}
                      >
                        <div className={cx("avata", "autoCenter")}>
                          <img
                            src={
                              user.photoURL !== null
                                ? user.photoURL
                                : require("../../../assets/images/photoUser.png")
                            }
                            alt=""
                          />
                        </div>
                        {user.checked === true ? (
                          <div className={cx("inputCheck", "autoCenter")}>
                            <FontAwesomeIcon
                              className={cx("iconCheck")}
                              icon={faCheck}
                            />
                          </div>
                        ) : (
                          <div className={cx("inputCheck")}></div>
                        )}

                        <div className={cx("user__display")}>
                          <h5 className={cx("user__name")}>
                            {user.displayName}
                          </h5>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Modal>
          ) : (
            false
          )}

          <div
            onClick={() => {
              setModal(!modal);
            }}
            className={cx("closeModal", "autoCenter")}
          >
            <FontAwesomeIcon
              icon={faAngleLeft}
              className={cx("closeModal--icon")}
            />
          </div>

          <div className={cx("infoUser")}>
            <div className={cx("avatar")}>
              {roomChatInfo.user.type === "group" ? (
                <img
                  src={
                    roomChatInfo.user.photoURL !== null
                      ? findCurrentRoom[1].userInfo.photoURL
                      : require("../../../assets/images/photoUser.png")
                  }
                  alt=""
                />
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
            </div>

            <h1 className={cx("nameUser")}>{nickName()}</h1>
          </div>
          <div className={cx("controlRoom")}>
            <ul className={cx("controlList")}>
              <li
                className={cx(
                  "controlItem",
                  "setting",
                  isCheckedMusic === true ? "backgroundTransparent" : ""
                )}
              >
                <div
                  onClick={() => {
                    setIsSetting(!isSetting);
                  }}
                  className={cx("boxBug")}
                >
                  <div className={cx("wrappIcon", "autoCenter")}>
                    <FontAwesomeIcon className={cx("icon")} icon={faGear} />
                  </div>
                  <FontAwesomeIcon
                    className={cx("iconOpen")}
                    icon={faChevronDown}
                    style={
                      isSetting === true
                        ? { rotate: "-90deg" }
                        : { rotate: "0deg" }
                    }
                  />
                  <p className={cx("content", "settingHover")}>
                    Cài đặt đoạn chat
                  </p>
                </div>
                <AnimatePresence>
                  {isSetting && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        transition: { stiffness: 300 },
                        opacity: 1,
                        height: "auto",
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        transition: { duration: 0.2 },
                      }}
                      className={cx("navBar")}
                    >
                      <li
                        onClick={() => {
                          setTypeModal("nickName");
                          setVisibleModal(true);
                        }}
                        className={cx(
                          "childrentControl",
                          "nickName",
                          isCheckedMusic === true ? "backgroundTransparent" : ""
                        )}
                      >
                        <div className={cx("boxBug")}>
                          <div className={cx("wrappIcon", "autoCenter")}>
                            <FontAwesomeIcon
                              className={cx("icon")}
                              icon={faSignature}
                            />
                          </div>
                          <p className={cx("content")}>Sửa biệt danh</p>
                        </div>
                      </li>{" "}
                      {roomChatInfo.user.type === "group" ? (
                        <>
                          <li
                            onClick={() => {
                              setTypeModal("editNameGroup");
                              setVisibleModal(true);
                              setNameGroup("");
                            }}
                            className={cx(
                              "childrentControl",
                              "nameGroup",
                              isCheckedMusic === true
                                ? "backgroundTransparent"
                                : ""
                            )}
                          >
                            <div className={cx("boxBug")}>
                              <div className={cx("wrappIcon", "autoCenter")}>
                                <FontAwesomeIcon
                                  className={cx("icon")}
                                  icon={faPen}
                                />
                              </div>
                              <p className={cx("content")}>Đổi tên nhóm</p>
                            </div>
                          </li>
                          <li
                            onClick={() => {}}
                            className={cx(
                              "childrentControl",
                              "replaceImage",
                              isCheckedMusic === true
                                ? "backgroundTransparent"
                                : ""
                            )}
                          >
                            <div
                              onClick={() => {
                                file.current.click();
                              }}
                              className={cx("boxBug")}
                            >
                              <div className={cx("wrappIcon", "autoCenter")}>
                                <FontAwesomeIcon
                                  className={cx("icon")}
                                  icon={faImage}
                                />
                              </div>
                              <input
                                style={{ display: "none" }}
                                accept="image/*"
                                type="file"
                                name="file"
                                ref={file}
                                onChange={(e) => {
                                  handleChangeImg(e.target.files[0]);
                                  e.target.value = "";
                                }}
                              />
                              <p className={cx("content")}>Thay đổi ảnh</p>
                            </div>
                          </li>
                          <li
                            onClick={() => {
                              setTypeModal("addUser");
                              setVisibleModal(true);
                              setSearchUser("");
                            }}
                            className={cx(
                              "childrentControl",
                              "addUser",
                              isCheckedMusic === true
                                ? "backgroundTransparent"
                                : ""
                            )}
                          >
                            <div className={cx("boxBug")}>
                              <div className={cx("wrappIcon", "autoCenter")}>
                                <FontAwesomeIcon
                                  className={cx("icon")}
                                  icon={faUserPlus}
                                />
                              </div>
                              <p className={cx("content")}>Thêm thành viên</p>
                            </div>
                          </li>
                        </>
                      ) : (
                        false
                      )}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
              {roomChatInfo.user.type === "group" ? (
                <li
                  onClick={() => {
                    setIsListUserGroup(!isListUserGroup);
                  }}
                  className={cx(
                    "controlItem",
                    "usersGroup",
                    isCheckedMusic === true ? "backgroundTransparent" : ""
                  )}
                >
                  <div className={cx("boxBug")}>
                    <div className={cx("wrappIcon", "autoCenter")}>
                      <FontAwesomeIcon className={cx("icon")} icon={faUsers} />
                    </div>
                    <FontAwesomeIcon
                      className={cx("iconOpen")}
                      icon={faChevronDown}
                      style={
                        isListUserGroup === true
                          ? { rotate: "-90deg" }
                          : { rotate: "0deg" }
                      }
                    />
                    <p className={cx("content", "imageHover")}>
                      Xem thành viên
                    </p>
                  </div>
                  <AnimatePresence>
                    {isListUserGroup && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                          transition: { stiffness: 300 },
                          opacity: 1,
                          height: "auto",
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                          transition: { duration: 0.2 },
                        }}
                        className={cx("navBar")}
                      >
                        {currentUserRoom.map((user) => {
                          let avata;
                          let name;
                          allUser.forEach((userFind) => {
                            if (userFind.uid === user.uid) {
                              avata = userFind.photoURL;
                              name = userFind.displayName;
                            }
                          });
                          return (
                            <li
                              onClick={() => {}}
                              key={user.uid}
                              className={cx(
                                "userItem",
                                isCheckedMusic === true
                                  ? "backgroundTransparent"
                                  : ""
                              )}
                            >
                              <div className={cx("avata", "autoCenter")}>
                                <img
                                  src={
                                    avata !== null
                                      ? avata
                                      : require("../../../assets/images/photoUser.png")
                                  }
                                  alt=""
                                />
                              </div>

                              <div className={cx("user__display")}>
                                <h5 className={cx("user__name")}>{name}</h5>
                              </div>
                            </li>
                          );
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                false
              )}

              <li
                className={cx(
                  "controlItem",
                  "image",
                  isCheckedMusic === true ? "backgroundTransparent" : ""
                )}
              >
                <div className={cx("boxBug")}>
                  <div className={cx("wrappIcon", "autoCenter")}>
                    <FontAwesomeIcon className={cx("icon")} icon={faImages} />
                  </div>
                  <FontAwesomeIcon
                    className={cx("iconOpen")}
                    icon={faChevronDown}
                  />
                  <p className={cx("content", "imageHover")}>
                    FIle phương tiện
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ModalInfoChat;
