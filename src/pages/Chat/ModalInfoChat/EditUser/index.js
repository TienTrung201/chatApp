import styles from "./EditUser.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { isSelectedMusic } from "@/components/redux/selector";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);
function EditUser({ userEdit, roomId, remainUser, listUserRoom }) {
  const input = useRef();
  const isCheckedMusic = useSelector(isSelectedMusic);
  const handleChangName = (e) => {
    setNameValue(e.target.value);
  };

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
  if (findCurrentRoom[1].listUsers) {
    substituteUserEdit = findCurrentRoom[1].listUsers.find((user) => {
      return user.uid === userEdit.uid;
    });
    substituteUserRemain = findCurrentRoom[1].listUsers.find((user) => {
      return user.uid === remainUser.uid;
    });
  }
  const [nameValue, setNameValue] = useState(
    substituteUserEdit !== undefined
      ? substituteUserEdit.nickName
      : userEdit.displayName
  );
  const checkName = useCallback(() => {
    if (nameValue.length > 20) {
      return false;
    } else {
      return true;
    }
  }, [nameValue]);

  const nickName = useCallback(() => {
    if (substituteUserEdit === undefined) {
      return "Đặt biệt danh";
    } else if (substituteUserEdit.nickName.trim(" ") === "") {
      return "Đặt biệt danh";
    } else {
      return substituteUserEdit.displayName;
    }
  }, [substituteUserEdit]);
  //  lưu biệt danh
  const saveChange = async () => {
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
        <img width={40} src={userEdit.photoURL} alt="" />
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
            {substituteUserEdit !== undefined
              ? substituteUserEdit.nickName !== ""
                ? substituteUserEdit.nickName
                : userEdit.displayName
              : userEdit.displayName}
            {/* Biệt danh  nếu chưa có biệt danh để name*/}
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
                  saveChange();
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
              saveChange();
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
