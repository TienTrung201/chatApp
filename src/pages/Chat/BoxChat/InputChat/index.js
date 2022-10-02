import styles from "./InputChat.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { userChat, userLogin } from "@/components/redux/selector";

import { v4 as uuid } from "uuid";
import { db } from "@/firebase/config";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";

const cx = classNames.bind(styles);
function InputChat() {
  const displayUserChat = useSelector(userChat);
  const user = useSelector(userLogin);

  console.log(displayUserChat);

  const input = useRef();
  const handleSubmit = async () => {
    try {
      const messageSend = input.current.Text;
      await updateDoc(doc(db, "chats", displayUserChat.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: messageSend,
          senderId: user.uid,
          createdAt: Timestamp.now(),
        }),
      });
    } catch (e) {
      console.log(e);
    }
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
      {/* <input
          autoComplete="off"
          type="text"
          placeholder="Hello:)))))"
          name="message"
        /> */}
      <div className={cx("wrapperTextMessage", "autoCenter")}>
        <div
          ref={input}
          contentEditable="true"
          className={cx("inputMessage")}
        ></div>
      </div>
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
