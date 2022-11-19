import styles from "./EmojiMessage.module.scss";
import classNames from "classnames/bind";
import {
  currentUserGroup,
  emojiMessage,
  userChat,
} from "@/components/redux/selector";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Emoji from "./Emoji";

const cx = classNames.bind(styles);

function EmojiMessageModal({
  listUserServer,
  listUserChatRoomFriend,
  idUserLogin,
}) {
  //modal emoji
  const typeEmoji = ["haha", "tym", "wow", "sad", "angry", "like"];
  const listEmoji = useSelector(emojiMessage);
  const roomChatInfo = useSelector(userChat);
  const [typeListEmoji, setTypeListEmoji] = useState("all");
  const currentUserGroupApp = useSelector(currentUserGroup);
  const isGroup = roomChatInfo.chatId.search("group") === 0;
  const styleModalEmojiFriend = {
    height: !isGroup ? "120px" : "",
  };
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
  const [styleLine, setStyleLine] = useState({ left: 0 });

  const handleActiveLine = (e) => {
    if (e.target.tagName === "LI") {
      setStyleLine({ left: e.target.offsetLeft + "px" });
    } else {
      setStyleLine({
        left: e.target.parentElement.offsetLeft + "px",
      });
    }
  };

  return (
    <div className={cx("wrapperEmojiMessage")}>
      <ul className={cx("listTypeEmoji")}>
        <div style={styleLine} className={cx("line")}></div>
        <li
          onClick={(e) => {
            handleActiveLine(e);
            setTypeListEmoji("all");
          }}
          className={cx("emoji", typeListEmoji === "all" ? "selected" : "")}
        >
          Tất cả {countEmoji}
        </li>
        {typeEmoji.map((emoji) => {
          if (listEmoji[emoji].length > 0) {
            return (
              <li
                key={emoji}
                onClick={(e) => {
                  handleActiveLine(e);
                  setTypeListEmoji(emoji);
                }}
                className={cx(
                  "emoji",
                  typeListEmoji === emoji ? "selected" : ""
                )}
              >
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
      <ul style={styleModalEmojiFriend} className={cx("listEmoji")}>
        {isGroup && typeListEmoji === "all" ? (
          <>
            {listEmoji.haha.map((emoji) => {
              const user1 = currentUserGroupApp.find(
                (user) => user.uid === emoji
              );
              const user2 = listUserServer.find((user) => user.uid === emoji);
              const user = {
                uid: user1.uid,
                displayName: user2.displayName,
                nickName: user1.nickName,
                photoURL: user2.photoURL,
              };
              return (
                <Emoji
                  key={emoji}
                  isUserLogin={idUserLogin === emoji}
                  type={"haha"}
                  user={user}
                />
              );
            })}
            {listEmoji.tym.map((emoji) => {
              const user1 = currentUserGroupApp.find(
                (user) => user.uid === emoji
              );
              const user2 = listUserServer.find((user) => user.uid === emoji);
              const user = {
                uid: user1.uid,
                nickName: user1.nickName,
                displayName: user2.displayName,
                photoURL: user2.photoURL,
              };
              return (
                <Emoji
                  key={emoji}
                  isUserLogin={idUserLogin === emoji}
                  type={"tym"}
                  user={user}
                />
              );
            })}
            {listEmoji.wow.map((emoji) => {
              const user1 = currentUserGroupApp.find(
                (user) => user.uid === emoji
              );
              const user2 = listUserServer.find((user) => user.uid === emoji);
              const user = {
                uid: user1.uid,
                nickName: user1.nickName,
                displayName: user2.displayName,
                photoURL: user2.photoURL,
              };
              return (
                <Emoji
                  key={emoji}
                  isUserLogin={idUserLogin === emoji}
                  type={"wow"}
                  user={user}
                />
              );
            })}
            {listEmoji.sad.map((emoji) => {
              const user1 = currentUserGroupApp.find(
                (user) => user.uid === emoji
              );
              const user2 = listUserServer.find((user) => user.uid === emoji);
              const user = {
                uid: user1.uid,
                nickName: user1.nickName,
                displayName: user2.displayName,
                photoURL: user2.photoURL,
              };
              return (
                <Emoji
                  key={emoji}
                  isUserLogin={idUserLogin === emoji}
                  type={"sad"}
                  user={user}
                />
              );
            })}
            {listEmoji.angry.map((emoji) => {
              const user1 = currentUserGroupApp.find(
                (user) => user.uid === emoji
              );
              const user2 = listUserServer.find((user) => user.uid === emoji);
              const user = {
                uid: user1.uid,
                nickName: user1.nickName,
                displayName: user2.displayName,
                photoURL: user2.photoURL,
              };
              return (
                <Emoji
                  key={emoji}
                  isUserLogin={idUserLogin === emoji}
                  type={"angry"}
                  user={user}
                />
              );
            })}
            {listEmoji.like.map((emoji) => {
              const user1 = currentUserGroupApp.find(
                (user) => user.uid === emoji
              );
              const user2 = listUserServer.find((user) => user.uid === emoji);
              const user = {
                uid: user1.uid,
                nickName: user1.nickName,
                displayName: user2.displayName,
                photoURL: user2.photoURL,
              };
              return (
                <Emoji
                  key={emoji}
                  isUserLogin={idUserLogin === emoji}
                  type={"like"}
                  user={user}
                />
              );
            })}
          </>
        ) : (
          false
        )}
        {isGroup && typeListEmoji === "haha" ? (
          <>
            {listEmoji.haha.map((emoji) => {
              const user1 = currentUserGroupApp.find(
                (user) => user.uid === emoji
              );
              const user2 = listUserServer.find((user) => user.uid === emoji);
              const user = {
                uid: user1.uid,
                nickName: user1.nickName,
                displayName: user2.displayName,
                photoURL: user2.photoURL,
              };
              return (
                <Emoji
                  key={emoji}
                  isUserLogin={idUserLogin === emoji}
                  type={"haha"}
                  user={user}
                />
              );
            })}
          </>
        ) : (
          false
        )}
        {isGroup && typeListEmoji === "tym" ? (
          <>
            {listEmoji.tym.map((emoji) => {
              const user1 = currentUserGroupApp.find(
                (user) => user.uid === emoji
              );
              const user2 = listUserServer.find((user) => user.uid === emoji);
              const user = {
                uid: user1.uid,
                nickName: user1.nickName,
                displayName: user2.displayName,
                photoURL: user2.photoURL,
              };
              return (
                <Emoji
                  key={emoji}
                  isUserLogin={idUserLogin === emoji}
                  type={"tym"}
                  user={user}
                />
              );
            })}
          </>
        ) : (
          false
        )}
        {isGroup && typeListEmoji === "wow" ? (
          <>
            {listEmoji.wow.map((emoji) => {
              const user1 = currentUserGroupApp.find(
                (user) => user.uid === emoji
              );
              const user2 = listUserServer.find((user) => user.uid === emoji);
              const user = {
                uid: user1.uid,
                nickName: user1.nickName,
                displayName: user2.displayName,
                photoURL: user2.photoURL,
              };
              return (
                <Emoji
                  key={emoji}
                  isUserLogin={idUserLogin === emoji}
                  type={"wow"}
                  user={user}
                />
              );
            })}
          </>
        ) : (
          false
        )}
        {isGroup && typeListEmoji === "sad" ? (
          <>
            {listEmoji.sad.map((emoji) => {
              const user1 = currentUserGroupApp.find(
                (user) => user.uid === emoji
              );
              const user2 = listUserServer.find((user) => user.uid === emoji);
              const user = {
                uid: user1.uid,
                nickName: user1.nickName,
                displayName: user2.displayName,
                photoURL: user2.photoURL,
              };
              return (
                <Emoji
                  key={emoji}
                  isUserLogin={idUserLogin === emoji}
                  type={"sad"}
                  user={user}
                />
              );
            })}
          </>
        ) : (
          false
        )}
        {isGroup && typeListEmoji === "angry" ? (
          <>
            {listEmoji.angry.map((emoji) => {
              const user1 = currentUserGroupApp.find(
                (user) => user.uid === emoji
              );
              const user2 = listUserServer.find((user) => user.uid === emoji);
              const user = {
                uid: user1.uid,
                nickName: user1.nickName,
                displayName: user2.displayName,
                photoURL: user2.photoURL,
              };
              return (
                <Emoji
                  key={emoji}
                  isUserLogin={idUserLogin === emoji}
                  type={"angry"}
                  user={user}
                />
              );
            })}
          </>
        ) : (
          false
        )}
        {isGroup && typeListEmoji === "like" ? (
          <>
            {listEmoji.like.map((emoji) => {
              const user1 = currentUserGroupApp.find(
                (user) => user.uid === emoji
              );
              const user2 = listUserServer.find((user) => user.uid === emoji);
              const user = {
                uid: user1.uid,
                nickName: user1.nickName,
                displayName: user2.displayName,
                photoURL: user2.photoURL,
              };
              return (
                <Emoji
                  key={emoji}
                  isUserLogin={idUserLogin === emoji}
                  type={"like"}
                  user={user}
                />
              );
            })}
          </>
        ) : (
          false
        )}
        {/* is chat with friend emoji */}
        {isGroup === false && typeListEmoji === "all" ? (
          <>
            {listEmoji.haha.map((emoji) => {
              const user = listUserChatRoomFriend.find(
                (user) => user.uid === emoji
              );

              return (
                <Emoji
                  key={emoji}
                  isUserLogin={idUserLogin === emoji}
                  type={"haha"}
                  user={user}
                />
              );
            })}
            {listEmoji.tym.map((emoji) => {
              const user = listUserChatRoomFriend.find(
                (user) => user.uid === emoji
              );
              return (
                <Emoji
                  key={emoji}
                  isUserLogin={idUserLogin === emoji}
                  type={"tym"}
                  user={user}
                />
              );
            })}
            {listEmoji.wow.map((emoji) => {
              const user = listUserChatRoomFriend.find(
                (user) => user.uid === emoji
              );
              return (
                <Emoji
                  key={emoji}
                  isUserLogin={idUserLogin === emoji}
                  type={"wow"}
                  user={user}
                />
              );
            })}
            {listEmoji.sad.map((emoji) => {
              const user = listUserChatRoomFriend.find(
                (user) => user.uid === emoji
              );
              return (
                <Emoji
                  key={emoji}
                  isUserLogin={idUserLogin === emoji}
                  type={"sad"}
                  user={user}
                />
              );
            })}
            {listEmoji.angry.map((emoji) => {
              const user = listUserChatRoomFriend.find(
                (user) => user.uid === emoji
              );
              return (
                <Emoji
                  key={emoji}
                  isUserLogin={idUserLogin === emoji}
                  type={"angry"}
                  user={user}
                />
              );
            })}
            {listEmoji.like.map((emoji) => {
              const user = listUserChatRoomFriend.find(
                (user) => user.uid === emoji
              );
              return (
                <Emoji
                  key={emoji}
                  isUserLogin={idUserLogin === emoji}
                  type={"like"}
                  user={user}
                />
              );
            })}
          </>
        ) : (
          false
        )}
        {isGroup === false && typeListEmoji === "haha" ? (
          <>
            {listEmoji.haha.map((emoji) => {
              const user = listUserChatRoomFriend.find(
                (user) => user.uid === emoji
              );
              return (
                <Emoji
                  key={emoji}
                  isUserLogin={idUserLogin === emoji}
                  type={"haha"}
                  user={user}
                />
              );
            })}
          </>
        ) : (
          false
        )}
        {isGroup === false && typeListEmoji === "tym" ? (
          <>
            {listEmoji.tym.map((emoji) => {
              const user = listUserChatRoomFriend.find(
                (user) => user.uid === emoji
              );
              return (
                <Emoji
                  key={emoji}
                  isUserLogin={idUserLogin === emoji}
                  type={"tym"}
                  user={user}
                />
              );
            })}
          </>
        ) : (
          false
        )}
        {isGroup === false && typeListEmoji === "wow" ? (
          <>
            {listEmoji.wow.map((emoji) => {
              const user = listUserChatRoomFriend.find(
                (user) => user.uid === emoji
              );
              return (
                <Emoji
                  key={emoji}
                  isUserLogin={idUserLogin === emoji}
                  type={"wow"}
                  user={user}
                />
              );
            })}
          </>
        ) : (
          false
        )}
        {isGroup === false && typeListEmoji === "sad" ? (
          <>
            {listEmoji.sad.map((emoji) => {
              const user = listUserChatRoomFriend.find(
                (user) => user.uid === emoji
              );
              return (
                <Emoji
                  key={emoji}
                  isUserLogin={idUserLogin === emoji}
                  type={"sad"}
                  user={user}
                />
              );
            })}
          </>
        ) : (
          false
        )}
        {isGroup === false && typeListEmoji === "angry" ? (
          <>
            {listEmoji.angry.map((emoji) => {
              const user = listUserChatRoomFriend.find(
                (user) => user.uid === emoji
              );
              return (
                <Emoji
                  key={emoji}
                  isUserLogin={idUserLogin === emoji}
                  type={"angry"}
                  user={user}
                />
              );
            })}
          </>
        ) : (
          false
        )}
        {isGroup === false && typeListEmoji === "like" ? (
          <>
            {listEmoji.like.map((emoji) => {
              const user = listUserChatRoomFriend.find(
                (user) => user.uid === emoji
              );
              return (
                <Emoji
                  key={emoji}
                  isUserLogin={idUserLogin === emoji}
                  type={"like"}
                  user={user}
                />
              );
            })}
          </>
        ) : (
          false
        )}
      </ul>
    </div>
  );
}

export default EmojiMessageModal;
