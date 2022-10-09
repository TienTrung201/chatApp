import { userChat, userLogin } from "@/components/redux/selector";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import styles from "./Message.module.scss";

const cx = classNames.bind(styles);

function Message({ data }) {
  // const [message,setMessage]=useState([])
  // const mesage
  const heightImageScroll = window.innerWidth > 739 ? "200px" : "100px";
  const userLoginChat = useSelector(userLogin);
  const displayUserChat = useSelector(userChat);
  const styleImage = {
    minHeight:
      data.image !== undefined
        ? window.innerHeight < 420
          ? "80px"
          : data.image.height > 200
          ? heightImageScroll
          : `${data.image.height}px`
        : "",
    maxHeight: window.innerHeight < 420 ? "80px" : "200px",
  };
  const getHours =
    data.createdAt.toDate().getHours() < 10
      ? `0${data.createdAt.toDate().getHours()}`
      : data.createdAt.toDate().getHours();
  const getMinutes =
    data.createdAt.toDate().getMinutes() < 10
      ? `0${data.createdAt.toDate().getMinutes()}`
      : data.createdAt.toDate().getMinutes();
  return (
    <>
      {userLoginChat.uid === data.senderId ? (
        <div className={cx("message__chat", "user")}>
          {data.image ? (
            <img style={styleImage} src={data.image.url} alt="" />
          ) : (
            false
          )}
          {data.text.trim(" ") === "" ? (
            false
          ) : (
            <div className={cx("boxText")}>
              <p className={cx("textMessage")}>{data.text}</p>
              <p className={cx("textTime")}>{`${getHours}:${getMinutes}`}</p>
            </div>
          )}
        </div>
      ) : (
        <div className={cx("message__chat", "friend")}>
          <div className={cx("avatar")}>
            <img
              src={
                displayUserChat.user.photoURL !== null
                  ? displayUserChat.user.photoURL
                  : require("../../../../assets/images/photoUser.png")
              }
              alt=""
            />
          </div>
          <div className={cx("messageChat")}>
            {data.text.trim(" ") === "" ? (
              false
            ) : (
              <div className={cx("boxText")}>
                <p className={cx("textMessage")}>{data.text}</p>
                <p className={cx("textTime")}>{`${getHours}:${getMinutes}`}</p>
              </div>
            )}
            {data.image ? (
              <img style={styleImage} src={data.image.url} alt="" />
            ) : (
              false
            )}
          </div>
        </div>
      )}

      {/*  */}
    </>
  );
}

export default Message;
