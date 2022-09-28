import styles from "./BoxChat.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faImages, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useRef } from "react";

const cx = classNames.bind(styles);

function BoxChat({ modal, setModal }) {
  const boxMessage = useRef();
  useEffect(() => {
    boxMessage.current.scrollTop = boxMessage.current.scrollHeight;
  });
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
        <div
          onClick={() => {
            setModal(!modal);
          }}
          className={cx("infoRoom-Bar", "autoCenter")}
        >
          <FontAwesomeIcon className={cx("iconMenu")} icon={faEllipsis} />
        </div>
      </div>
      <div ref={boxMessage} className={cx("boxMessage")}>
        <div className={cx("message__chat", "user")}>
          <div className={cx("boxText")}>
            <p className={cx("textMessage")}>
              Hello chat display here tin nhắn dài test thử xem như nào dài dài
              dài HoMua hàng và thanh toán Online Mua hàng trả góp Online Tra
              thông tin đơn hàng Tra điểm Smember Tra thông tin bảo hành Tra cứu
              hoá đơn điện tử Trung tâm bảo hành chính hãng Quy định về việc sao
              lưu dữ liệu Dịch vụ bảo hành điện thoại
            </p>
            <p className={cx("textTime")}>20:00</p>
          </div>
        </div>
        <div className={cx("message__chat", "friend")}>
          <div className={cx("avatar")}>
            <img src={require("../../../assets/images/avata.jpg")} alt="" />
          </div>
          <div className={cx("boxText")}>
            <p className={cx("textMessage")}>Hello chat display here</p>
            <p className={cx("textTime")}>20:00</p>
          </div>
        </div>
        <div className={cx("message__chat", "friend")}>
          <div className={cx("avatar")}>
            <img src={require("../../../assets/images/avata.jpg")} alt="" />
          </div>
          <div className={cx("boxText")}>
            <p className={cx("textMessage")}>Hello chat display here</p>
            <p className={cx("textTime")}>20:00</p>
          </div>
        </div>
        <div className={cx("message__chat", "friend")}>
          <div className={cx("avatar")}>
            <img src={require("../../../assets/images/avata.jpg")} alt="" />
          </div>
          <div className={cx("boxText")}>
            <p className={cx("textMessage")}>Hello chat display here</p>
            <p className={cx("textTime")}>20:00</p>
          </div>
        </div>
        <div className={cx("message__chat", "friend")}>
          <div className={cx("avatar")}>
            <img src={require("../../../assets/images/avata.jpg")} alt="" />
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
          <div contentEditable="true" className={cx("inputMessage")}></div>
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
