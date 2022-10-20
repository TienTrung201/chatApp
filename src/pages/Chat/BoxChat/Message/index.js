import { userChat, userLogin } from "@/components/redux/selector";
import { faFaceSmileBeam } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisVertical, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import classNames from "classnames/bind";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Message.module.scss";

const cx = classNames.bind(styles);

function Message({ data }) {
  const heightImageScroll = window.innerWidth > 739 ? "200px" : "100px";
  const userLoginChat = useSelector(userLogin);
  const displayUserChat = useSelector(userChat);
  const [visibleRemoveMessages, setVisibleRemoveMessages] = useState(false);
  //image scroll top bug
  const styleImage = {
    minHeight:
      data.image !== undefined
        ? window.innerHeight < 420
          ? "80px"
          : data.image.height > 200
          ? heightImageScroll
          : `${data.image.height}px`
        : heightImageScroll,
    maxHeight: window.innerHeight < 420 ? "80px" : heightImageScroll,
  };
  //image scroll top bug

  //last send message
  const getHours =
    data.createdAt.toDate().getHours() < 10
      ? `0${data.createdAt.toDate().getHours()}`
      : data.createdAt.toDate().getHours();
  const getMinutes =
    data.createdAt.toDate().getMinutes() < 10
      ? `0${data.createdAt.toDate().getMinutes()}`
      : data.createdAt.toDate().getMinutes();
  //last send message

  const handleVisible = (set, curent) => {
    set(!curent);
  };

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
              <div className={cx("optionTextMessage")}>
                <Tippy
                  placement="top"
                  interactive // cho phep hanh dong tren ket qua
                  render={(attrs) => (
                    <>
                      {visibleRemoveMessages && (
                        <div
                          className={cx("boxRemove")}
                          tabIndex="-1"
                          {...attrs}
                        >
                          <div className={cx("removeMessage", "autoCenter")}>
                            <span>Gỡ tin nhắn</span>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                >
                  <button
                    onClick={() => {
                      handleVisible(
                        setVisibleRemoveMessages,
                        visibleRemoveMessages
                      );
                    }}
                    onBlur={() => {
                      setVisibleRemoveMessages(false);
                    }}
                    className={cx("autoCenter")}
                  >
                    <FontAwesomeIcon
                      className={cx("icon")}
                      icon={faEllipsisVertical}
                    />
                  </button>
                </Tippy>

                <button className={cx("autoCenter")}>
                  <FontAwesomeIcon className={cx("icon")} icon={faShare} />
                </button>

                <button className={cx("autoCenter")}>
                  <FontAwesomeIcon
                    className={cx("icon")}
                    icon={faFaceSmileBeam}
                  />
                </button>
              </div>
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
                <div className={cx("optionTextMessage")}>
                  <button className={cx("autoCenter")}>
                    <FontAwesomeIcon
                      className={cx("icon")}
                      icon={faEllipsisVertical}
                    />
                  </button>
                  <button className={cx("autoCenter")}>
                    <FontAwesomeIcon className={cx("icon")} icon={faShare} />
                  </button>

                  <button className={cx("autoCenter")}>
                    <FontAwesomeIcon
                      className={cx("icon")}
                      icon={faFaceSmileBeam}
                    />
                  </button>
                </div>
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
