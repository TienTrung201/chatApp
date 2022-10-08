import styles from "./InputChat.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { userChat, userLogin } from "@/components/redux/selector";

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

const cx = classNames.bind(styles);
function InputChat() {
  const displayUserChat = useSelector(userChat);
  const user = useSelector(userLogin);
  const [valueInput, setValueInput] = useState("");
  const file = useRef();
  const [imgFile, setImgFile] = useState(null);
  const handleSubmit = async () => {
    setValueInput("");
    setImgFile(false);
    if (imgFile) {
      console.log(imgFile);
      const imgRef = ref(
        storage,
        `imagesChats/${displayUserChat.chatId}/${imgFile.name}${uuid()}`
      );

      uploadBytes(imgRef, imgFile).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (imgUrl) => {
          try {
            await updateDoc(doc(db, "chats", displayUserChat.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text: valueInput,
                senderId: user.uid,
                createdAt: Timestamp.now(),
                image: { url: imgUrl, fullPath: snapshot.metadata.fullPath },
              }),
            });
          } catch (e) {
            console.log("e");
          }
        });
      });
    } else {
      if (valueInput.trim(" ") === "") {
        return;
      }
      try {
        await updateDoc(doc(db, "chats", displayUserChat.chatId), {
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
      await updateDoc(doc(db, "userChats", displayUserChat.user.uid), {
        [displayUserChat.chatId + ".lastMessage"]: {
          text: valueInput,
          sender: user.displayName,
        },
        [displayUserChat.chatId + ".createdAt"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", user.uid), {
        [displayUserChat.chatId + ".lastMessage"]: {
          text: valueInput,
          sender: user.displayName,
        },
        [displayUserChat.chatId + ".createdAt"]: serverTimestamp(),
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
  return (
    <>
      <input
        style={{ display: "none" }}
        accept="image/*"
        type="file"
        name="file"
        ref={file}
        onChange={(e) => {
          setImgFile(e.target.files[0]);
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
        <input
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
