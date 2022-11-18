import styles from "./Emoji.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function Emoji({ user, type }) {
  return (
    <li className={cx("listEmoji__emoji")}>
      <div className={cx("infoEmoji")}>
        <div className={cx("avata")}>
          <img
            width={40}
            className={cx("avataUserImg")}
            src={user.photoURL}
            alt=""
          />
        </div>
        <div className={cx("nameUser")}>
          <p>{user.nickName}</p> <span>Nhấp để gỡ</span>
        </div>
        <div className={cx("emojiByUser")}>
          {type === "haha" ? (
            <img
              className={cx("emojiImg")}
              src={require("@/assets/images/haha.png")}
              alt=""
            />
          ) : (
            false
          )}
          {type === "tym" ? (
            <img
              className={cx("emojiImg")}
              src={require("@/assets/images/tym.png")}
              alt=""
            />
          ) : (
            false
          )}
          {type === "wow" ? (
            <img
              className={cx("emojiImg")}
              src={require("@/assets/images/wow.png")}
              alt=""
            />
          ) : (
            false
          )}
          {type === "sad" ? (
            <img
              className={cx("emojiImg")}
              src={require("@/assets/images/sad.png")}
              alt=""
            />
          ) : (
            false
          )}
          {type === "angry" ? (
            <img
              className={cx("emojiImg")}
              src={require("@/assets/images/angry.png")}
              alt=""
            />
          ) : (
            false
          )}
          {type === "like" ? (
            <img
              className={cx("emojiImg")}
              src={require("@/assets/images/like.png")}
              alt=""
            />
          ) : (
            false
          )}
        </div>
      </div>
    </li>
  );
}

export default Emoji;
