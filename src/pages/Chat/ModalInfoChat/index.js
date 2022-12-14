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
  faRightFromBracket,
  faSignature,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isSelectedMusic,
  userChat,
  userLogin,
} from "@/components/redux/selector";
import Modal from "@/components/Modal";
import EditUser from "./EditUser";
import { useFireStore } from "@/hooks/useFirestor";
import AddUser from "./AddUser";
import {
  arrayUnion,
  deleteField,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase/config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import ControlUsers from "./ControlUsers";

import mediaSlide from "@/pages/Media/MediaSlide";

const cx = classNames.bind(styles);

function ModalInfoChat({ modal, setModal, listUserChats, allUsers }) {
  const Dispatch = useDispatch();
  let user = useSelector(userLogin);
  const userId = user.uid;
  const [searchUser, setSearchUser] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [nameGroup, setNameGroup] = useState("");
  const roomChatInfo = useSelector(userChat);
  const [currentUserRoom, setCurrentUserRoom] = useState([]);
  const [currentGroup, setCurrentGroup] = useState({
    displayName: "",
    photoURL: "",
  });
  const admin = currentUserRoom.find((user) => user.uid === userId);
  const userLoginGroup = currentUserRoom.find((user) => user.uid === userId);
  const conditionUser = useMemo(() => {
    return {
      fieldName: "displayName",
      operator: "!=",
      compareValue: "getAll",
    };
  }, []);
  const allUser = useFireStore("users", conditionUser);
  user = allUser.find((userChat) => {
    return userChat.uid === user.uid;
  });

  const [usersRoomSearch, setUsersRoomSearch] = useState([]);
  const file = useRef();

  //đổi tên nhóm
  const handleChangeNameGroup = (e) => {
    setNameGroup(e.target.value);
  };
  const handleSubmitNameGroup = async () => {
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
      await updateDoc(doc(db, "chats", roomChatInfo.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: `${userLoginGroup.nickName} đã thay đổi tên nhóm thành ${nameGroup}`,
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
  //đổi tên nhóm

  // chỉ đình làm quản trị viên
  const handleDesignateAdmin = (userId) => {
    const newUserGroupAdmin = currentUserRoom.map((user) => {
      if (userId === user.uid) {
        return {
          ...user,
          position: "admin",
        };
      }
      return user;
    });
    try {
      currentUserRoom.forEach(async (user) => {
        await updateDoc(doc(db, "userChats", user.uid), {
          [roomChatInfo.chatId + ".listUsers"]: newUserGroupAdmin,
        });
      });
    } catch (e) {
      console.log(e);
    }
  };
  // chỉ đình làm quản trị viên

  let totalAdminGroup = 0;
  currentUserRoom.forEach((user) => {
    if (user.position === "admin") {
      totalAdminGroup++;
    }
  });
  // hành động xóa người dùng khỏi phòng
  const handleDeleteUserGroup = (userId) => {
    const newUserRoom = [];
    currentUserRoom.forEach((user) => {
      if (user.uid !== userId) {
        newUserRoom.push(user);
      }
    });
    try {
      currentUserRoom.forEach(async (user) => {
        if (user.uid !== userId) {
          await updateDoc(doc(db, "userChats", user.uid), {
            [roomChatInfo.chatId + ".listUsers"]: newUserRoom,
          });
        } else {
          await updateDoc(doc(db, "userChats", user.uid), {
            [roomChatInfo.chatId]: deleteField(),
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  // hành động xóa người dùng khỏi phòng

  //hành động thêm người dùng vào phòng
  const handleAddusersGroup = async () => {
    const listUserRoomAdd = [];
    let listNewUser = "";
    currentUserRoom.forEach((user) => {
      listUserRoomAdd.push(user);
    });
    usersRoomSearch.forEach((user) => {
      if (user.checked === true) {
        listUserRoomAdd.push({
          displayName: user.displayName,
          nickName: user.displayName,
          uid: user.uid,
        });
        listNewUser += `, ${user.displayName}`;
      }
    });

    try {
      listUserRoomAdd.forEach(async (user) => {
        await updateDoc(doc(db, "userChats", user.uid), {
          [roomChatInfo.chatId + ".userInfo"]: {
            uid: roomChatInfo.chatId,
            displayName: currentGroup.displayName,
            photoURL: currentGroup.photoURL,
          },
          [roomChatInfo.chatId + ".createdAt"]: serverTimestamp(),
          [roomChatInfo.chatId + ".listUsers"]: listUserRoomAdd,
          [roomChatInfo.chatId + ".type"]: "group",
        });
      });

      await updateDoc(doc(db, "chats", roomChatInfo.chatId), {
        messages: arrayUnion({
          id: uuid(),
          // ${userLoginGroup.nickName}
          text: `đã thêm ${listNewUser.slice(1, listNewUser.length)} vào nhóm`,
          senderId: user.uid,
          createdAt: Timestamp.now(),
          type: "notification",
        }),
      });
    } catch (e) {
      console.log(e);
    }
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
  // thay đổi ảnh nhóm
  const handleChangeImg = async (imgFile) => {
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
    await updateDoc(doc(db, "chats", roomChatInfo.chatId), {
      messages: arrayUnion({
        id: uuid(),
        // ${userLoginGroup.nickName}
        text: `đã thay đổi ảnh nhóm`,
        senderId: user.uid,
        createdAt: Timestamp.now(),
        type: "notification",
      }),
    });
  };
  // thay đổi ảnh nhóm

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
  //khi bị xóa khỏi group
  // useLayoutEffect(() => {
  //   setModal(false);
  // }, [findCurrentRoom, setModal]);
  //khi bị xóa khỏi group

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

  // click Xem file ảnh

  return (
    <>
      {findCurrentRoom !== undefined ? (
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
                    <div className={cx("editNickName")}>
                      {currentUserRoom.map((user) => {
                        return (
                          <EditUser
                            userLoginGroup={userLoginGroup}
                            uidSender={userId}
                            key={user.uid}
                            listUserRoom={currentUserRoom}
                            // remainUser={user}
                            allUserApp={allUser}
                            roomId={roomChatInfo.chatId}
                            group={true}
                            userEdit={user}
                            allUser={allUsers}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <div className={cx("editNickName")}>
                      <EditUser
                        allUser={allUsers}
                        userLoginGroup={userLoginGroup}
                        listUserRoom={listUserChats}
                        remainUser={user}
                        uidSender={userId}
                        roomId={roomChatInfo.chatId}
                        userEdit={roomChatInfo.user}
                        userLogin={user}
                      />
                      <EditUser
                        allUser={allUsers}
                        userLogin={user}
                        uidSender={userId}
                        userLoginGroup={userLoginGroup}
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
                  save="Thay đổi"
                  haldleSendModal={handleSubmitNameGroup}
                  onClick={() => {}}
                  checkedSubmit={checkName()}
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
                        className={cx(
                          "inputName",
                          checkName() === false ? "error" : "successful"
                        )}
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
                            return (
                              <AddUser
                                deleteUserChecked={addUserCheckedToggle}
                                user={user}
                                key={user.uid}
                              />
                            );
                          }
                          return false;
                        })}
                      </div>
                      {usersRoomSearch.find((user) => user.checked === true) ? (
                        false
                      ) : (
                        <h5 className={cx("notification")}>
                          Chưa chọn người dùng nào
                        </h5>
                      )}
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
                                    : require("../../../assets/images/avataDefalt.png")
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
              {typeModal === "notification" ? (
                <Modal
                  visible={visibleModal}
                  seiVisible={setVisibleModal}
                  title={"Thông Báo"}
                >
                  <div className={cx("wrapperNotification")}>
                    <h1>Phòng phải có ít nhất 1 quản trị viên</h1>
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
                        roomChatInfo.user.photoURL !== null && findCurrentRoom
                          ? findCurrentRoom[1].userInfo.photoURL
                          : require("../../../assets/images/avataDefalt.png")
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
                              isCheckedMusic === true
                                ? "backgroundTransparent"
                                : ""
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
                                  <div
                                    className={cx("wrappIcon", "autoCenter")}
                                  >
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
                                  <div
                                    className={cx("wrappIcon", "autoCenter")}
                                  >
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
                                  <div
                                    className={cx("wrappIcon", "autoCenter")}
                                  >
                                    <FontAwesomeIcon
                                      className={cx("icon")}
                                      icon={faUserPlus}
                                    />
                                  </div>
                                  <p className={cx("content")}>
                                    Thêm thành viên
                                  </p>
                                </div>
                              </li>
                              <li
                                onClick={() => {
                                  if (admin.position === "admin") {
                                    if (totalAdminGroup === 1) {
                                      setTypeModal("notification");
                                      setVisibleModal(true);
                                    } else {
                                      try {
                                        updateDoc(
                                          doc(db, "chats", roomChatInfo.chatId),
                                          {
                                            messages: arrayUnion({
                                              id: uuid(),
                                              text: `${userLoginGroup.nickName} đã rời khỏi nhóm`,
                                              senderId: user.uid,
                                              createdAt: Timestamp.now(),
                                              type: "notification",
                                            }),
                                          }
                                        );
                                      } catch (e) {
                                        console.log(e);
                                      }

                                      handleDeleteUserGroup(user.uid);
                                    }
                                  } else {
                                    try {
                                      updateDoc(
                                        doc(db, "chats", roomChatInfo.chatId),
                                        {
                                          messages: arrayUnion({
                                            id: uuid(),
                                            text: `${userLoginGroup.nickName} đã rời khỏi nhóm`,
                                            senderId: user.uid,
                                            createdAt: Timestamp.now(),
                                            type: "notification",
                                          }),
                                        }
                                      );
                                    } catch (e) {
                                      console.log(e);
                                    }
                                    handleDeleteUserGroup(user.uid);
                                  }
                                }}
                                className={cx(
                                  "childrentControl",
                                  "leave",
                                  isCheckedMusic === true
                                    ? "backgroundTransparent"
                                    : ""
                                )}
                              >
                                <div className={cx("boxBug")}>
                                  <div
                                    className={cx("wrappIcon", "autoCenter")}
                                  >
                                    <FontAwesomeIcon
                                      className={cx("icon")}
                                      icon={faRightFromBracket}
                                    />
                                  </div>
                                  <p className={cx("content")}>Rời nhóm</p>
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
                      className={cx(
                        "controlItem",
                        "usersGroup",
                        isCheckedMusic === true ? "backgroundTransparent" : ""
                      )}
                    >
                      <div
                        onClick={() => {
                          setIsListUserGroup(!isListUserGroup);
                        }}
                        className={cx("boxBug")}
                      >
                        <div className={cx("wrappIcon", "autoCenter")}>
                          <FontAwesomeIcon
                            className={cx("icon")}
                            icon={faUsers}
                          />
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
                          {" (" + currentUserRoom.length + ")"}
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
                                }
                              });
                              currentUserRoom.forEach((userFind) => {
                                if (userFind.uid === user.uid) {
                                  name = userFind.nickName;
                                }
                              });
                              return (
                                <li
                                  onClick={() => {}}
                                  key={user.uid}
                                  className={cx(
                                    "userItem",
                                    isCheckedMusic === true
                                      ? "backgroundTransparentNoBorder"
                                      : ""
                                  )}
                                >
                                  <div className={cx("avata", "autoCenter")}>
                                    <img
                                      src={
                                        avata !== null
                                          ? avata
                                          : require("../../../assets/images/avataDefalt.png")
                                      }
                                      alt=""
                                    />
                                  </div>

                                  {user.position !== "admin" &&
                                  admin.position === "admin" ? (
                                    <ControlUsers
                                      idRoom={roomChatInfo.chatId}
                                      currentUsersRoom={currentUserRoom}
                                      idUser={userId}
                                      controlledUser={user}
                                      adminGroup={admin}
                                      userLoginGroup={userLoginGroup}
                                      designateAdmin={handleDesignateAdmin}
                                      deleteUserGroup={handleDeleteUserGroup}
                                    />
                                  ) : (
                                    false
                                  )}
                                  <div className={cx("user__display")}>
                                    <h5 className={cx("user__name")}>{name}</h5>
                                    {user.position === "admin" ? (
                                      <span className={cx("position")}>
                                        Quản trị viên
                                      </span>
                                    ) : (
                                      false
                                    )}
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
                    onClick={() => {
                      Dispatch(mediaSlide.actions.setIsOpenMedia(true));
                    }}
                    className={cx(
                      "controlItem",
                      "image",
                      isCheckedMusic === true ? "backgroundTransparent" : ""
                    )}
                  >
                    <div className={cx("boxBug")}>
                      <div className={cx("wrappIcon", "autoCenter")}>
                        <FontAwesomeIcon
                          className={cx("icon")}
                          icon={faImages}
                        />
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
      ) : (
        false
      )}
    </>
  );
}

export default ModalInfoChat;
