import styles from "./InputChat.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import images from "@/assets/images";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isOpenSticker,
  isReplyMessage,
  isSelectedMusic,
  isSendMessageTogle,
  messageAnswered,
  urlImageAnsered,
  userChat,
  userLogin,
  // userNameAnswered,
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
import boxChatSlice from "../BoxChatSlice";
import Sticker from "./Sticker";
import StickerSlice from "./StickerSlice";
import Tippy from "@tippyjs/react";

const cx = classNames.bind(styles);
function InputChat({ myNickNameChat, listUserChat }) {
  const roomChatInfo = useSelector(userChat);
  const user = useSelector(userLogin);
  const [valueInput, setValueInput] = useState("");
  const file = useRef();
  const inputMessage = useRef();
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [currentUserRoom, setCurrentUserRoom] = useState([]);
  const isCheckedMusic = useSelector(isSelectedMusic);
  const isSendMessage = useSelector(isSendMessageTogle);
  const isReplyMessages = useSelector(isReplyMessage);
  // const userNameAnswer = useSelector(userNameAnswered);
  const messageAnswer = useSelector(messageAnswered);
  const urlImageAnser = useSelector(urlImageAnsered);
  const isOpenStickerApp = useSelector(isOpenSticker);
  const Dispatch = useDispatch();
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
  useEffect(() => {
    inputMessage.current.focus();
  }, [isReplyMessages]);
  useEffect(() => {
    const listUserRoom = listUserChat.find((room) => {
      return room[0] === roomChatInfo.chatId;
    });
    if (listUserRoom !== undefined) {
      if (listUserRoom[0].search("group") === 0) {
        setCurrentUserRoom(listUserRoom[1].listUsers);
      }
    }
  }, [roomChatInfo.chatId, listUserChat]);

  const handleSubmit = async () => {
    setValueInput("");
    setImgFile(false);
    setImgUrl(null);
    Dispatch(boxChatSlice.actions.setUserNameAnswered(""));
    Dispatch(boxChatSlice.actions.setMessageAnswered(""));
    Dispatch(boxChatSlice.actions.setUrlImageAnsered(""));
    Dispatch(boxChatSlice.actions.setIsReplyMessage(false));
    Dispatch(boxChatSlice.actions.setIsSendMessageTogle(!isSendMessage));
    if (imgFile) {
      const imgRef = ref(
        storage,
        `imagesChats/${roomChatInfo.chatId}/${imgFile.name}${uuid()}`
      );
      createGetSize(imgFile, (w, h) => {
        uploadBytes(imgRef, imgFile).then((snapshot) => {
          getDownloadURL(snapshot.ref).then(async (imgUrl) => {
            try {
              if (isReplyMessages) {
                await updateDoc(doc(db, "chats", roomChatInfo.chatId), {
                  messages: arrayUnion({
                    id: uuid(),
                    text: valueInput,
                    senderId: user.uid,
                    createdAt: Timestamp.now(),
                    image: {
                      url: imgUrl,
                      fullPath: snapshot.metadata.fullPath,
                      width: w,
                      height: h,
                    },
                    reply: messageAnswer,
                    urlReply: messageAnswer === "Hình ảnh" ? urlImageAnser : "",
                    userIdReply: user.uid,
                  }),
                });
              } else {
                await updateDoc(doc(db, "chats", roomChatInfo.chatId), {
                  messages: arrayUnion({
                    id: uuid(),
                    text: valueInput,
                    senderId: user.uid,
                    createdAt: Timestamp.now(),
                    image: {
                      url: imgUrl,
                      fullPath: snapshot.metadata.fullPath,
                      width: w,
                      height: h,
                    },
                  }),
                });
              }
            } catch (e) {
              console.log(e);
            }
          });
        });
      });
    } else {
      if (valueInput.trim(" ") === "") {
        return;
      }
      try {
        if (isReplyMessages) {
          await updateDoc(doc(db, "chats", roomChatInfo.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text: valueInput,
              senderId: user.uid,
              createdAt: Timestamp.now(),
              reply: messageAnswer,
              urlReply: messageAnswer === "Hình ảnh" ? urlImageAnser : "",
              userIdReply: user.uid,
            }),
          });
        } else {
          await updateDoc(doc(db, "chats", roomChatInfo.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text: valueInput,
              senderId: user.uid,
              createdAt: Timestamp.now(),
            }),
          });
        }
      } catch (e) {
        console.log(e);
      }
    }

    try {
      if (roomChatInfo.user.type === "group") {
        currentUserRoom.forEach(async (user) => {
          await updateDoc(doc(db, "userChats", user.uid), {
            [roomChatInfo.chatId + ".lastMessage"]: {
              text: imgFile ? "Đã gửi 1 ảnh" : valueInput,
              sender: myNickNameChat,
            },
            [roomChatInfo.chatId + ".createdAt"]: serverTimestamp(),
          });
        });
      } else {
        await updateDoc(doc(db, "userChats", roomChatInfo.user.uid), {
          [roomChatInfo.chatId + ".lastMessage"]: {
            text: imgFile ? "Đã gửi 1 ảnh" : valueInput,
            sender: myNickNameChat,
          },
          [roomChatInfo.chatId + ".createdAt"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [roomChatInfo.chatId + ".lastMessage"]: {
            text: imgFile ? "Đã gửi 1 ảnh" : valueInput,
            sender: myNickNameChat,
          },
          [roomChatInfo.chatId + ".createdAt"]: serverTimestamp(),
        });
      }
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
    setImgUrl(URL.createObjectURL(imgFile));
  };
  return (
    <div className={cx("controlMessage2")}>
      <input
        style={{ display: "none" }}
        accept="image/*"
        type="file"
        name="file"
        ref={file}
        onChange={(e) => {
          setImgFile(e.target.files[0]);
          handleChangeFile(e.target.files[0]);
          e.target.value = "";
        }}
      />

      <button
        onClick={() => {
          file.current.click();
        }}
        className={cx("openImage")}
      >
        <img src={images.imgIcon} alt="" />
        {/* <FontAwesomeIcon className={cx("addFile-icon")} icon={faImages} /> */}
      </button>
      <div>
        <Tippy
          trigger="click"
          placement="top"
          interactive="true" // cho phep hanh dong tren ket qua
          content={
            isOpenStickerApp && (
              <Sticker
                senderName={myNickNameChat}
                idFriend={roomChatInfo.user.uid}
                currentUsersRoom={currentUserRoom}
                typeRoom={roomChatInfo.user.type}
                idRoom={roomChatInfo.chatId}
                userId={user.uid}
              />
            )
          }
        >
          <div
            onClick={() => {
              Dispatch(StickerSlice.actions.setIsOpenSticker(true));
            }}
            className={cx("openStickers", "autoCenter")}
          >
            <img src={images.sticker} alt="" />
          </div>
        </Tippy>
      </div>

      <button onClick={() => {}} className={cx("openStickers", "autoCenter")}>
        <img src={images.gif} alt="" />
      </button>
      <div className={cx("wrapperTextMessage", "autoCenter")}>
        {imgUrl !== null ? (
          <div className={cx("img-container")}>
            <div className={cx("imgWaitingSend")}>
              <button
                onClick={() => {
                  setImgFile(false);
                  setImgUrl(null);
                  file.current.value = "";
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
          ref={inputMessage}
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
    </div>
  );
}

export default InputChat;
