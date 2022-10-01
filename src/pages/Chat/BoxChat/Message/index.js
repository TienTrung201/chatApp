import classNames from "classnames/bind";
import styles from "./Message.module.scss";

const cx = classNames.bind(styles);

function Message({ data }) {
  // const [message,setMessage]=useState([])
  // const mesage

  return (
    <>
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
      {/* <div className={cx("message__chat", "friend")}>
        <div className={cx("avatar")}>
          <img src={require("../../../assets/images/avata.jpg")} alt="" />
        </div>
        <div className={cx("boxText")}>
          <p className={cx("textMessage")}>Hello chat display here</p>
          <p className={cx("textTime")}>20:00</p>
        </div>
      </div> */}
    </>
  );
}

export default Message;
