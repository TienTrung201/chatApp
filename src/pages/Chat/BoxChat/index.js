import styles from "./BoxChat.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faImages, faPaperPlane } from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(styles);

function BoxChat() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("headerBox")}>
        <div className={cx("infoUser")}>
          <div className={cx("user")}>
            <div className={cx("avata")}>
              <img src={require("../../../assets/images/avata.jpg")} alt="" />
            </div>
            <div className={cx("user__display")}>
              <h5 className={cx("user__name")}>Tien trung</h5>
              {/* <p className={cx("user__active")}>online</p> */}
            </div>
          </div>
        </div>
        <div className={cx("infoRoom-Bar", "autoCenter")}>
          <FontAwesomeIcon className={cx("iconMenu")} icon={faEllipsis} />
        </div>
      </div>
      <div className={cx("boxMessage")}>
        <div className={cx("message__chat", "user")}>
          <div className={cx("avatar")}>
            <img
              width={40}
              src={require("../../../assets/images/avata.jpg")}
              alt=""
            />
          </div>
          <div className={cx("boxText")}>
            <p className={cx("textMessage")}>Hello chat display here</p>
            <p className={cx("textTime")}>20:00</p>
          </div>
        </div>
        <div className={cx("message__chat", "friend")}>
          <div className={cx("avatar")}>
            <img
              width={40}
              src={require("../../../assets/images/avata.jpg")}
              alt=""
            />
          </div>
          <div className={cx("boxText")}>
            <p className={cx("textMessage")}>Hello chat display here</p>
            <p className={cx("textTime")}>20:00</p>
          </div>
        </div>
      </div>
      <div className={cx("controlMessage")}>
        <input
          style={{ display: "none" }}
          accept="image/*"
          type="file"
          name="file"
        />
        <button className={cx("chooseButton")}>
          <FontAwesomeIcon className={cx("addFile-icon")} icon={faImages} />
        </button>
        {/* <input
          autoComplete="off"
          type="text"
          placeholder="Hello:)))))"
          name="message"
        /> */}
        <div className={cx("wrapperTextMessage", "autoCenter")}>
          <div contenteditable="true" className={cx("inputMessage")}></div>
        </div>
        {/* icon message */}
        <button className={cx("sendMessage")}>
          <FontAwesomeIcon className={cx("send--icon")} icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
}

export default BoxChat;
