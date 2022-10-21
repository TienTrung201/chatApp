import styles from "./InputChat.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  isSelectedMusic,
  userChat,
  userLogin,
} from "@/components/redux/selector";

import { v4 as uuid } from "uuid";
import { db, storage } from "@/firebase/config";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function InputChat({ myNickNameChat }) {
  const roomChatInfo = useSelector(userChat);
  const user = useSelector(userLogin);
  const [valueInput, setValueInput] = useState("");
  const file = useRef();
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [fullPath, setFullPath] = useState(null);
  const isCheckedMusic = useSelector(isSelectedMusic);
  const createGetSize = (imageFile, getSize) => {
    var image;
    var _URL = window.URL || window.webkitURL;
    image = new Image();
    image.src = _URL.createObjectURL(imageFile);
    image.onload = function () {
      if (getSize) {
        getSize(this.width, this.height);
      }
    };
  };

  const handleSubmit = async () => {
    setValueInput("");
    setImgFile(false);
    setImgUrl(null);

    if (imgUrl !== null) {
      createGetSize(imgFile, (w, h) => {
        try {
          updateDoc(doc(db, "chats", roomChatInfo.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text: valueInput,
              senderId: user.uid,
              createdAt: Timestamp.now(),
              image: {
                url: imgUrl,
                fullPath: fullPath,
                width: w,
                height: h,
              },
            }),
          });
        } catch (e) {
          console.log("e");
        }
      });
    } else {
      if (valueInput.trim(" ") === "") {
        return;
      }
      try {
        await updateDoc(doc(db, "chats", roomChatInfo.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text: valueInput,
            senderId: user.uid,
            createdAt: Timestamp.now(),
          }),
        });
      } catch (e) {
        console.log(e);
      }
    }

    try {
      await updateDoc(doc(db, "userChats", roomChatInfo.user.uid), {
        [roomChatInfo.chatId + ".lastMessage"]: {
          text: valueInput,
          sender: myNickNameChat,
        },
        [roomChatInfo.chatId + ".createdAt"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", user.uid), {
        [roomChatInfo.chatId + ".lastMessage"]: {
          text: valueInput,
          sender: myNickNameChat,
        },
        [roomChatInfo.chatId + ".createdAt"]: serverTimestamp(),
      });
    } catch (e) {
      console.log(e);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  const handleChange = (e) => {
    setValueInput(e.target.value);
  };
  const handleChangeFile = (imgFile) => {
    const imgRef = ref(
      storage,
      `imagesChats/${roomChatInfo.chatId}/${imgFile.name}${uuid()}`
    );
    uploadBytes(imgRef, imgFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((imgUrl) => {
        setImgUrl(imgUrl);
        setFullPath(snapshot.metadata.fullPath);
        setImgFile(imgFile);
      });
    });
  };
  return (
    <>
      <input
        style={{ display: "none" }}
        accept="image/*"
        type="file"
        name="file"
        ref={file}
        onChange={(e) => {
          // setImgFile(e.target.files[0]);
          handleChangeFile(e.target.files[0]);
          e.target.value = "";
        }}
      />
      <button
        onClick={() => {
          file.current.click();
        }}
        className={cx("chooseButton")}
      >
        <FontAwesomeIcon className={cx("addFile-icon")} icon={faImages} />
      </button>
      <div className={cx("wrapperTextMessage", "autoCenter")}>
        {imgUrl !== null ? (
          <div className={cx("img-container")}>
            <div className={cx("imgWaitingSend")}>
              <button
                onClick={() => {
                  setImgFile(false);
                  setImgUrl(null);
                  imgFile.current.value = "";
                }}
                className={cx("close", "autoCenter")}
              >
                <FontAwesomeIcon icon={faClose} className={cx("iconClose")} />
              </button>
              <img src={imgUrl} alt="" />
            </div>
          </div>
        ) : (
          false
        )}

        <input
          className={cx(isCheckedMusic === true ? "textWhite" : "")}
          autoComplete="off"
          type="text"
          placeholder="Hello:)))))"
          name="message"
          value={valueInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* <div className={cx("wrapperTextMessage", "autoCenter")}>
        <div
          onChange={handleChange}
          ref={input}
          contentEditable="true"
          className={cx("inputMessage")}
        >
          {valueInput}
        </div>
      </div> */}
      {/* icon message */}
      <button
        onClick={() => {
          handleSubmit();
        }}
        className={cx("sendMessage")}
      >
        <FontAwesomeIcon className={cx("send--icon")} icon={faPaperPlane} />
      </button>
    </>
  );
}

export default InputChat;
