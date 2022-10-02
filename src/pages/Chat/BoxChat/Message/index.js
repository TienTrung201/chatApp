import { userChat, userLogin } from "@/components/redux/selector";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import styles from "./Message.module.scss";

const cx = classNames.bind(styles);

function Message({ data }) {
  // const [message,setMessage]=useState([])
  // const mesage
  const userLoginChat = useSelector(userLogin);
  const displayUserChat = useSelector(userChat);
  console.log(displayUserChat);

  console.log(data);
  console.log(userLoginChat);
  return (
    <>
      {userLoginChat.uid === data.senderId ? (
        <div className={cx("message__chat", "user")}>
          <div className={cx("boxText")}>
            <p className={cx("textMessage")}>{data.text}</p>
            <p className={cx("textTime")}>
              {`${data.createdAt.toDate().getHours()}:${data.createdAt
                .toDate()
                .getMinutes()}`}
            </p>
          </div>
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
          <div className={cx("boxText")}>
            <p className={cx("textMessage")}>{data.text}</p>
            <p className={cx("textTime")}>{`${data.createdAt
              .toDate()
              .getHours()}:${data.createdAt.toDate().getMinutes()}`}</p>
          </div>
        </div>
      )}

      {/*  */}
    </>
  );
}

export default Message;
