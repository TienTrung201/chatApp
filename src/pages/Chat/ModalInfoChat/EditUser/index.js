import styles from "./EditUser.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { isSelectedMusic } from "@/components/redux/selector";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

const cx = classNames.bind(styles);
function EditUser({
  group,
  allUserApp,
  userEdit,
  roomId,
  remainUser,
  listUserRoom,
  uidSender,
  userLoginGroup,
  userLogin,
}) {
  const input = useRef();
  const isCheckedMusic = useSelector(isSelectedMusic);
  const handleChangName = (e) => {
    setNameValue(e.target.value);
  };

  let userForEdit;
  if (group) {
    userForEdit = allUserApp.find((user) => user.uid === userEdit.uid);
  }

  const [isEditUserChat, setIsEditUserChat] = useState(false);

  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
  }, [isEditUserChat]);
  // console.log(listUserRoom);

  const findCurrentRoom = listUserRoom.find(
    (roomList) => roomId === roomList[0]
  );
  let substituteUserEdit;
  let substituteUserRemain;
  if (!group) {
    if (findCurrentRoom[1].listUsers) {
      substituteUserEdit = findCurrentRoom[1].listUsers.find((user) => {
        return user.uid === userEdit.uid;
      });
      substituteUserRemain = findCurrentRoom[1].listUsers.find((user) => {
        return user.uid === remainUser.uid;
      });
    }
  }

  const [nameValue, setNameValue] = useState(
    substituteUserEdit !== undefined
      ? substituteUserEdit.nickName
      : userEdit.displayName === userEdit.nickName
      ? userEdit.displayName
      : userEdit.nickName
  );
  const checkName = useCallback(() => {
    if (nameValue) {
      if (nameValue.length > 20) {
        return false;
      } else {
        return true;
      }
    }
    return true;
  }, [nameValue]);
  const nickNameEditSender = useCallback(() => {
    if (!group) {
      if (substituteUserEdit === undefined) {
        return userEdit.displayName;
      } else if (substituteUserEdit.nickName.trim(" ") === "") {
        return substituteUserEdit.displayName;
      } else {
        return substituteUserEdit.nickName;
      }
    }
  }, [group, substituteUserEdit, userEdit]);

  const nickName = useCallback(() => {
    if (!group) {
      if (substituteUserEdit === undefined) {
        return "Đặt biệt danh";
      } else if (substituteUserEdit.nickName.trim(" ") === "") {
        return "Đặt biệt danh";
      } else {
        return substituteUserEdit.displayName;
      }
    } else {
      if (userEdit.nickName !== userEdit.displayName) {
        return userEdit.displayName;
      }
      if (userEdit.nickName === "") {
        return userEdit.displayName;
      } else {
        return "Đặt biệt danh";
      }
    }
  }, [substituteUserEdit, group, userEdit]);
  const senderName = useCallback(() => {
    if (!group) {
      if (
        substituteUserRemain === undefined ||
        substituteUserEdit === undefined
      ) {
        return userLogin.displayName;
      }
      let senderName;
      if (substituteUserRemain.uid === uidSender) {
        senderName = substituteUserRemain;
      } else {
        senderName = substituteUserEdit;
      }
      if (substituteUserRemain.nickName.trim(" ") === "") {
        return senderName.displayName;
      } else {
        return senderName.nickName;
      }
    }
  }, [substituteUserRemain, substituteUserEdit, uidSender, group, userLogin]);
  //  lưu biệt danh
  const handleEditNickName = async () => {
    if (!group) {
      await updateDoc(doc(db, "userChats", userEdit.uid), {
        [roomId + ".listUsers"]: [
          {
            uid: userEdit.uid,
            displayName: userEdit.displayName,
            nickName: nameValue,
          },
          {
            uid: remainUser.uid,
            displayName: remainUser.displayName,
            nickName:
              substituteUserRemain !== undefined
                ? substituteUserRemain.nickName
                : remainUser.displayName,
          },
        ],
      });
      await updateDoc(doc(db, "userChats", remainUser.uid), {
        [roomId + ".listUsers"]: [
          {
            uid: userEdit.uid,
            displayName: userEdit.displayName,
            nickName: nameValue,
          },
          {
            uid: remainUser.uid,
            displayName: remainUser.displayName,
            nickName:
              substituteUserRemain !== undefined
                ? substituteUserRemain.nickName
                : remainUser.displayName,
          },
        ],
      });
      await updateDoc(doc(db, "chats", roomId), {
        messages: arrayUnion({
          id: uuid(),
          // ${remainUser.displayName}
          text: `đã đặt biệt danh cho ${nickNameEditSender()} là ${nameValue}`,
          senderId: uidSender,
          senderName: senderName(),
          createdAt: Timestamp.now(),
          type: "notification",
        }),
      });
    } else {
      let listUserRoomAdd = [];
      listUserRoom.forEach((user) => {
        if (user.uid === userEdit.uid) {
          listUserRoomAdd.push({
            ...user,
            nickName: nameValue.trim(" ") === "" ? user.displayName : nameValue,
          });
        } else {
          listUserRoomAdd.push(user);
        }
      });
      listUserRoom.forEach(async (user) => {
        await updateDoc(doc(db, "userChats", user.uid), {
          [roomId + ".listUsers"]: listUserRoomAdd,
        });
      });
      await updateDoc(doc(db, "chats", roomId), {
        messages: arrayUnion({
          id: uuid(),
          // ${userLoginGroup.nickName}
          text: `đã đặt biệt danh cho ${userEdit.nickName} là ${nameValue}`,
          senderId: uidSender,
          senderName: userLoginGroup.nickName,
          createdAt: Timestamp.now(),
          type: "notification",
        }),
      });
    }
  };

  //  lưu biệt danh

  return (
    <div className={cx("user")}>
      <div
        onClick={() => {
          setIsEditUserChat(true);
        }}
        className={cx("avata")}
      >
        <img
          width={40}
          src={group === true ? userForEdit.photoURL : userEdit.photoURL}
          alt=""
        />
      </div>
      <div className={cx("user__display")}>
        {isEditUserChat === true ? (
          false
        ) : (
          <h5
            onClick={() => {
              setIsEditUserChat(true);
            }}
            className={cx("user__name")}
          >
            {
              group === true ? (
                <>
                  {" "}
                  {userEdit.nickName === userEdit.displayName
                    ? userEdit.displayName
                    : userEdit.nickName}
                </>
              ) : (
                <>
                  {substituteUserEdit !== undefined
                    ? substituteUserEdit.nickName !== ""
                      ? substituteUserEdit.nickName
                      : userEdit.displayName
                    : userEdit.displayName}
                </>
              )
              // {/* Biệt danh  nếu chưa có biệt danh để name*/}
            }
          </h5>
        )}

        {isEditUserChat === true ? (
          <input
            onChange={(e) => {
              handleChangName(e);
            }}
            onBlur={() => {
              setTimeout(() => {
                setIsEditUserChat(false);
              }, 100);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsEditUserChat(false);
                if (checkName() === true && isEditUserChat === true) {
                  handleEditNickName();
                }
              }
            }}
            className={cx(
              checkName() === false ? "error" : "successful",
              isCheckedMusic === true ? "textWhite" : ""
            )}
            ref={input}
            type="text"
            value={nameValue}
          />
        ) : (
          <p
            onClick={() => {
              setIsEditUserChat(true);
            }}
            className={cx("user__active")}
          >
            {/* Nếu có biệt danh để tên */}
            {nickName()}
          </p>
        )}
      </div>
      {isEditUserChat === true ? (
        <button
          onClick={(e) => {
            // e.preventDefault();
            if (checkName() === true) {
              console.log(2);
              setIsEditUserChat(false);
              handleEditNickName();
            }
          }}
        >
          <FontAwesomeIcon className={cx("iconPen")} icon={faCheck} />
        </button>
      ) : (
        <button
          onClick={() => {
            setIsEditUserChat(true);
          }}
        >
          <FontAwesomeIcon className={cx("iconPen")} icon={faPen} />
        </button>
      )}

      {isEditUserChat === true ? false : <div className={cx("overlay")}></div>}
    </div>
  );
}

export default EditUser;
