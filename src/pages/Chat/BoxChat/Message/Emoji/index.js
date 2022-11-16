import styles from "./Emoji.module.scss";
import classNames from "classnames/bind";
import { useMemo } from "react";

const cx = classNames.bind(styles);

function Emoji({ emoji, friend }) {
  const countEmoji = useMemo(() => {
    return (
      emoji.haha.length +
      emoji.angry.length +
      emoji.like.length +
      emoji.sad.length +
      emoji.tym.length +
      emoji.wow.length
    );
  }, [emoji]);

  return (
    <div className={cx("wrapperEmoji")}>
      <ul className={cx("listEmoji", friend ? "friend" : "userLogin")}>
        {friend && countEmoji > 1 ? (
          <span className={cx("countEmoji")}>{countEmoji}</span>
        ) : (
          false
        )}

        {emoji.haha.length > 0 ? (
          <li className={cx("emoji")}>
            <img src={require("@/assets/images/haha.png")} alt="" />
          </li>
        ) : (
          false
        )}
        {emoji.tym.length > 0 ? (
          <li className={cx("emoji")}>
            <img src={require("@/assets/images/tym.png")} alt="" />
          </li>
        ) : (
          false
        )}
        {emoji.wow.length > 0 ? (
          <li className={cx("emoji")}>
            <img src={require("@/assets/images/wow.png")} alt="" />
          </li>
        ) : (
          false
        )}
        {emoji.sad.length > 0 ? (
          <li className={cx("emoji")}>
            <img src={require("@/assets/images/sad.png")} alt="" />
          </li>
        ) : (
          false
        )}
        {emoji.angry.length > 0 ? (
          <li className={cx("emoji")}>
            <img src={require("@/assets/images/angry.png")} alt="" />
          </li>
        ) : (
          false
        )}
        {emoji.like.length > 0 ? (
          <li className={cx("emoji")}>
            <img src={require("@/assets/images/like.png")} alt="" />
          </li>
        ) : (
          false
        )}
        {!friend && countEmoji > 1 ? (
          <span className={cx("countEmoji")}>{countEmoji}</span>
        ) : (
          false
        )}
      </ul>
    </div>
  );
}

export default Emoji;
