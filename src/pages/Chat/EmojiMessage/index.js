import styles from "./EmojiMessage.module.scss";
import classNames from "classnames/bind";
import { emojiMessage } from "@/components/redux/selector";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

function EmojiMessageModal() {
  //modal emoji
  const typeEmoji = ["haha", "tym", "wow", "sad", "angry", "like"];
  const listEmoji = useSelector(emojiMessage);
  const countEmoji = useMemo(() => {
    return (
      listEmoji.haha.length +
      listEmoji.angry.length +
      listEmoji.like.length +
      listEmoji.sad.length +
      listEmoji.tym.length +
      listEmoji.wow.length
    );
  }, [listEmoji]);
  return (
    <div className={cx("wrapperEmojiMessage")}>
      <ul className={cx("listTypeEmoji")}>
        <li className={cx("emoji")}>Tất cả {countEmoji}</li>
        {typeEmoji.map((emoji) => {
          if (listEmoji[emoji].length > 0) {
            return (
              <li key={emoji} className={cx("emoji")}>
                {emoji === "haha" ? (
                  <img
                    width={25}
                    src={require("@/assets/images/haha.png")}
                    alt=""
                  />
                ) : (
                  false
                )}
                {emoji === "tym" ? (
                  <img
                    width={25}
                    src={require("@/assets/images/tym.png")}
                    alt=""
                  />
                ) : (
                  false
                )}
                {emoji === "wow" ? (
                  <img
                    width={25}
                    src={require("@/assets/images/wow.png")}
                    alt=""
                  />
                ) : (
                  false
                )}
                {emoji === "sad" ? (
                  <img
                    width={25}
                    src={require("@/assets/images/sad.png")}
                    alt=""
                  />
                ) : (
                  false
                )}
                {emoji === "angry" ? (
                  <img
                    width={25}
                    src={require("@/assets/images/angry.png")}
                    alt=""
                  />
                ) : (
                  false
                )}
                {emoji === "like" ? (
                  <img
                    width={25}
                    src={require("@/assets/images/like.png")}
                    alt=""
                  />
                ) : (
                  false
                )}

                <span className={cx("countEmoji")}>
                  {listEmoji[emoji].length}
                </span>
              </li>
            );
          }
          return false;
        })}
      </ul>
      <ul className={cx("listEmoji")}>
        <li className={cx("listEmoji__emoji")}>
          <div className={cx("infoEmoji")}>
            <div className={cx("avata")}>
              <img
                width={40}
                className={cx("avataUserImg")}
                src={require("@/assets/images/avata.jpg")}
                alt=""
              />
            </div>
            <div className={cx("nameUser")}>
              <p>trung test thôi chưa update :))</p> <span>Nhấp để gỡ</span>
            </div>
            <div className={cx("emojiByUser")}>
              <img
                width={40}
                className={cx("emojiImg")}
                src={require("@/assets/images/haha.png")}
                alt=""
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default EmojiMessageModal;
