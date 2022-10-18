import styles from "./EditUser.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
// import { doc, updateDoc } from "firebase/firestore";
// import { db } from "@/firebase/config";

const cx = classNames.bind(styles);
function EditUser({ userEdit, roomId, remainUser }) {
  const input = useRef();
  const [nameValue, setNameValue] = useState(userEdit.displayName);
  const handleChangName = (e) => {
    console.log(e.target.value);
    setNameValue(e.target.value);
  };
  const checkName = useCallback(() => {
    if (
      nameValue.length < 2 ||
      nameValue.length > 20 ||
      isNaN(Number(nameValue)) === false
    ) {
      return false;
    } else {
      return true;
    }
  }, [nameValue]);
  const [isEditUserChat, setIsEditUserChat] = useState(false);
  const editUserChat = () => {
    setIsEditUserChat(!isEditUserChat);
  };
  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
  }, [isEditUserChat]);
  const saveChange = async () => {
    // await updateDoc(doc(db, "userChats", userEdit.uid), {
    //   [roomId + ".listUsers"]: [
    //     {
    //       uid: userEdit.uid,
    //       name: userEdit.name,
    //       nickName: nameValue,
    //     },
    //     {
    //       uid: remainUser.uid,
    //       name: remainUser.name,
    //       nickName: remainUser.displayName,
    //     },
    //   ],
    // });
    // await updateDoc(doc(db, "userChats", remainUser.uid), {
    //   [roomId + ".listUsers"]: [
    //     {
    //       uid: userEdit.uid,
    //       name: userEdit.name,
    //       nickName: nameValue,
    //     },
    //     {
    //       uid: remainUser.uid,
    //       name: remainUser.name,
    //       nickName: remainUser.displayName,
    //     },
    //   ],
    // });
  };
  return (
    <div className={cx("user")}>
      <div
        onClick={() => {
          editUserChat();
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
              editUserChat();
            }}
            className={cx("user__name")}
          >
            {userEdit.displayName}
            {/* Biệt danh  nếu chưa có biệt danh để name*/}
          </h5>
        )}
        {isEditUserChat === true ? (
          false
        ) : (
          <p
            onClick={() => {
              editUserChat();
            }}
            className={cx("user__active")}
          >
            Đặt biệt danh
            {/* Nếu có biệt danh để tên */}
          </p>
        )}
        {isEditUserChat === true ? (
          <input
            onChange={(e) => {
              handleChangName(e);
            }}
            className={cx(checkName() === false ? "error" : "successful")}
            ref={input}
            type="text"
          />
        ) : (
          false
        )}
      </div>
      <button
        onClick={() => {
          editUserChat();
          if (checkName() === true && isEditUserChat === true) {
            saveChange();
          }
        }}
      >
        <FontAwesomeIcon
          className={cx("iconPen")}
          icon={isEditUserChat === true ? faCheck : faPen}
        />
      </button>
      {isEditUserChat === true ? false : <div className={cx("overlay")}></div>}
    </div>
  );
}

export default EditUser;
