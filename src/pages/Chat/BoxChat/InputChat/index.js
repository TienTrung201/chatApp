import styles from "./InputChat.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { userChat, userLogin } from "@/components/redux/selector";

import { v4 as uuid } from "uuid";
import { db } from "@/firebase/config";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";

const cx = classNames.bind(styles);
function InputChat() {
  const displayUserChat = useSelector(userChat);
  const user = useSelector(userLogin);
  const [valueInput, setValueInput] = useState("");
  const handleSubmit = async () => {
    setValueInput("");
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
      />
      <button className={cx("chooseButton")}>
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
