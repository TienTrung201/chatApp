import styles from "./Sticker.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import {
  listSticker,
  messageAnswered,
  typeSticker,
  urlImageAnsered,
} from "@/components/redux/selector";
import { db } from "@/firebase/config";
import { useState } from "react";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import StickerSlice from "../StickerSlice";
import boxChatSlice from "../../BoxChatSlice";

const cx = classNames.bind(styles);
function Sticker({ idRoom, userId }) {
  const typeStickerApp = useSelector(typeSticker);
  const listStickerApp = useSelector(listSticker);
  const [typeStickers, setTypeStickers] = useState("dog");
  const messageAnswer = useSelector(messageAnswered);
  const urlImageAnser = useSelector(urlImageAnsered);
  const Dispatch = useDispatch();

  const handleSendSticker = async (imgUrl) => {
    Dispatch(StickerSlice.actions.setIsOpenSticker(false));
    Dispatch(boxChatSlice.actions.setUserNameAnswered(""));
    Dispatch(boxChatSlice.actions.setMessageAnswered(""));
    Dispatch(boxChatSlice.actions.setUrlImageAnsered(""));
    Dispatch(boxChatSlice.actions.setIsReplyMessage(false));
    try {
      await updateDoc(doc(db, "chats", idRoom), {
        messages: arrayUnion({
          id: uuid(),
          text: "",
          senderId: userId,
          createdAt: Timestamp.now(),
          image: {
            url: imgUrl,
          },
          type: "sticker",
          reply: messageAnswer,
          urlReply: messageAnswer === "Hình ảnh" ? urlImageAnser : "",
          userIdReply: userId,
        }),
      });
    } catch {}
  };
  // const [listSticker, setListSticker] = useState([]);
  // const imgListSticker = ref(storage, `Sticker/${typeSticker}`);
  // console.log(listStickerApp);
  // let listStickers = useMemo(() => [], []);
  // useEffect(() => {

  // useEffect(() => {
  //   listAll(imgListSticker).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         listStickers.push(url);
  //         // setListSticker((prev) => [...prev, url]);
  //       });
  //     });
  //   });
  //   setListSticker(listStickers);
  // }, [listStickers, imgListSticker]);
  // }, [imgListSticker, listSticker]);
  // console.log(listSticker);

  return (
    <div className={cx("WrapperStickerComponent")}>
      {" "}
      <div className={cx("headerStiker")}>
        <ul className={cx("listTypeSticker")}>
          {typeStickerApp.map((type, i) => {
            return (
              <li
                onClick={() => {
                  setTypeStickers(type.type);
                }}
                key={type.type + i}
                className={cx(
                  "typeSticker",
                  "autoCenter",
                  typeStickers === type.type ? "checkedType" : ""
                )}
              >
                <img src={type.url} alt="" />
              </li>
            );
          })}
        </ul>
      </div>
      <div className={cx("continerStiker")}>
        <ul>
          {listStickerApp.map((img, i) => {
            if (img.type === typeStickers) {
              return (
                <li
                  onClick={() => {
                    // console.log("hello");
                    handleSendSticker(img.url);
                  }}
                  key={i + img.url + img.type}
                  className={cx("WrapperSticker")}
                >
                  <button className={cx("choseSticker", "autoCenter")}>
                    <img src={img.url} alt="" />
                  </button>
                </li>
              );
            }
            return false;
          })}
        </ul>
      </div>
    </div>
  );
}

export default Sticker;
