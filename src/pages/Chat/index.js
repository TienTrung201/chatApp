import styles from "./Chat.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import BoxChat from "@/pages/Chat/BoxChat";
import { Link } from "react-router-dom";
import ModalInfoChat from "./ModalInfoChat";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, users } from "@/components/redux/selector";
import userSlice from "../Login/UserSlice";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { useFireStoreGetFields } from "@/hooks/useFirestor";
import LoadingListUser from "@/components/Loaddings/LoadingListUser";
import boxChatSlice from "./BoxChat/BoxChatSlice";

const cx = classNames.bind(styles);

function Chat() {
  console.log("Chat");
  const user = useSelector(userLogin);
  const Dispatch = useDispatch();
  const allUser = useSelector(users);
  const [modalInfo, setModalInfo] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isloadingUser, setIsLoadingUser] = useState(false);
  const listuserChat = useFireStoreGetFields("userChats", user.uid);

  const timeNow = Timestamp.now();
  // const getHours =
  //   timeNow.getHours() < 10 ? `0${timeNow.getHours()}` : timeNow.getHours();
  // const getMinutes =
  //   timeNow.getMinutes() < 10
  //     ? `0${timeNow.getMinutes()}`
  //     : timeNow.getMinutes();
  // console.log(getHours);

  const handleChangeSearch = (e) => {
    setSearchUser(e.target.value);
  };
  const handleSelect = async (userSelect) => {
    const combinedId =
      userSelect.uid > user.uid
        ? userSelect.uid + user.uid
        : user.uid + userSelect.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      // nếu 2 người chưa kết nốt thì tạo 1 liên kết và setDoc vào rooms(chats)
      // update người lạ có info của mình

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), {
          messages: [],
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: userSelect.uid,
            displayName: userSelect.displayName,
            photoURL: userSelect.photoURL,
          },
          [combinedId + ".createdAt"]: serverTimestamp(),
        });
      }

      await updateDoc(doc(db, "userChats", userSelect.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [combinedId + ".createdAt"]: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    } finally {
      console.log("done");
    }
  };
  const handleSelsectUserSearch = (userSelect) => {
    // if(listuserChat.findIndex())
    if (
      listuserChat.find((user) => {
        return user[1].userInfo.displayName === userSelect.displayName;
      })
    ) {
      console.log("đã tồn tại");
    } else {
      setIsLoadingUser(true);
    }

    // setIsLoadingUser(true)
  };
  const selectedRoom = (userSelect) => {
    const combinedId =
      userSelect[1].userInfo.uid > user.uid
        ? userSelect[1].userInfo.uid + user.uid
        : user.uid + userSelect[1].userInfo.uid;

    const data = { chatId: combinedId, user: userSelect[1].userInfo };
    Dispatch(boxChatSlice.actions.setUserSelect(data));
  };
  useEffect(() => {
    setIsLoadingUser(false); // khi click user unmount Loadding
  }, [listuserChat]);
  useEffect(() => {
    setSearchResult(
      allUser.filter((user) => {
        return removeVietnameseTones(user.displayName.toLowerCase()).includes(
          removeVietnameseTones(searchUser.toLowerCase())
        );
      })
    );
    if (searchUser === "") {
      setSearchResult([]);
    }
  }, [searchUser, allUser]);
  return (
    <section className={cx("wrapper")}>
      <article className={cx("controlChat")}>
        <div className={cx("wrapperControl")}>
          <div className={cx("createNew")}>
            <div className={cx("createPlus", "autoCenter")}>
              <FontAwesomeIcon className={cx("creatPlusIcon")} icon={faPlus} />
            </div>
            <h4 className={cx("create__title")}>Create New</h4>
          </div>
          <div className={cx("wrapperTitle")}>
            <h2 className={cx("title__Chat")}>Chat</h2>
            {/* <FontAwesomeIcon /> */}
          </div>
          <div className={cx("wrapperSearch")}>
            <input
              className={cx("searchText")}
              placeholder="Search Name"
              type="text"
              onChange={handleChangeSearch}
              value={searchUser}
            />
            <FontAwesomeIcon
              className={cx("searchIcon")}
              icon={faMagnifyingGlass}
            />
          </div>
        </div>
        <ul className={cx("wrapperListUser")}>
          {searchResult.length > 0 && searchUser.length > 0 ? (
            <>
              {searchResult.map((user, i) => {
                return (
                  <li
                    onClick={() => {
                      Dispatch(userSlice.actions.setUserSelect(user));
                      handleSelsectUserSearch(user);
                      setSearchUser("");
                    }}
                    key={i}
                    className={cx("userItem")}
                  >
                    <Link
                      onClick={() => {
                        handleSelect(user);
                      }}
                      to={"#"}
                      className={cx("user")}
                    >
                      <div className={cx("avata", "autoCenter")}>
                        <img
                          src={
                            user.photoURL !== null
                              ? user.photoURL
                              : require("../../assets/images/photoUser.png")
                          }
                          alt=""
                        />
                      </div>
                      <div className={cx("user__display")}>
                        <h5 className={cx("user__name")}>{user.displayName}</h5>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </>
          ) : (
            <>
              {listuserChat.map((user, index) => {
                const lastSent = lastSentMessage(timeNow, user[1].createdAt);
                // const getHours =
                //   user[1].createdAt.toDate().getHours() < 10
                //     ? `0${user[1].createdAt.toDate().getHours()}`
                //     : user[1].createdAt.toDate().getHours();
                // const getMinutes =
                //   user[1].createdAt.toDate().getMinutes() < 10
                //     ? `0${user[1].createdAt.toDate().getMinutes()}`
                //     : user[1].createdAt.toDate().getMinutes();
                return (
                  <li
                    onClick={() => {
                      selectedRoom(user);
                    }}
                    key={index}
                    className={cx("userItem")}
                  >
                    <Link to={"#"} className={cx("user")}>
                      <div className={cx("avata", "autoCenter")}>
                        <img
                          src={
                            user[1].userInfo.photoURL !== null
                              ? user[1].userInfo.photoURL
                              : require("../../assets/images/photoUser.png")
                          }
                          alt=""
                        />
                      </div>
                      <div className={cx("user__display")}>
                        <h5 className={cx("user__name")}>
                          {user[1].userInfo.displayName}
                        </h5>
                        <div className={cx("user__chatHistory")}>
                          <p>{user[1].lastMessage.sender}</p>
                          {/* <p>{`.${getHours}:${getMinutes}`}</p> */}
                          <p>{lastSent}</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
              {isloadingUser && (
                <div className={cx("Loading")}>
                  <LoadingListUser />
                </div>
              )}
              {/* <LoadingListUser /> */}
            </>
          )}
        </ul>
      </article>
      <article className={cx("rooms")}>
        <BoxChat modal={modalInfo} setModal={setModalInfo} />
      </article>
      <article className={cx("ModalInfoChat")}>
        <ModalInfoChat modal={modalInfo} setModal={setModalInfo} />
      </article>
    </section>
  );
}

export default Chat;
function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  // str = str.replace(
  //   /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
  //   " "
  // );
  return str;
}
function lastSentMessage(timeNow, timeSendMessage) {
  if (timeSendMessage === null) {
    return "";
  }
  const timeNowConvert = timeNow.toDate();
  const timeSendMessageConvert = timeSendMessage.toDate();
  const dateNow = `${timeNowConvert.getDate()}/${timeNowConvert.getMonth()}/${timeNowConvert.getFullYear()} ${timeNowConvert.getHours()}:${timeNowConvert.getMinutes()}`;
  const dateSent = `${timeSendMessageConvert.getDate()}/${timeSendMessageConvert.getMonth()}/${timeSendMessageConvert.getFullYear()} ${timeSendMessageConvert.getHours()}:${timeSendMessageConvert.getMinutes()}`;
  console.log("ngày gửi", dateSent);
  console.log("Hiện tại", dateNow);

  return dateSent;
}
