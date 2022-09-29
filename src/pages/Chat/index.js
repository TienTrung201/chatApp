import styles from "./Chat.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import BoxChat from "@/pages/Chat/BoxChat";
import { Link } from "react-router-dom";
import ModalInfoChat from "./ModalInfoChat";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { users } from "@/components/redux/selector";
// import ModalInfoChat from "./ModalInfoChat";

const cx = classNames.bind(styles);

function Chat() {
  console.log("Chat");
  const allUser = useSelector(users);
  // const user = useSelector(userLogin);
  const [modalInfo, setModalInfo] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectUser, setSelectUser] = useState({});
  const handleChangeSearch = (e) => {
    setSearchUser(e.target.value);
  };
  const handleSelect = async () => {
    // const combinedId= selectUser.uid>user.uid?
    console.log(selectUser.name); // bug nay chi can su dung redux
  };

  useEffect(() => {
    setSearchResult(
      allUser.filter((user) => {
        return removeVietnameseTones(user.name.toLowerCase()).includes(
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
        <ul className={cx("wrapperListUser")}>
          {searchResult.length > 0 && searchUser.length > 0 ? (
            <>
              {searchResult.map((user, i) => {
                return (
                  <li
                    onClick={() => {
                      setSelectUser(user);
                    }}
                    key={i}
                    className={cx("userItem")}
                  >
                    <Link
                      onClick={handleSelect}
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
                        <h5 className={cx("user__name")}>{user.name}</h5>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </>
          ) : (
            <>
              <li className={cx("userItem")}>
                <Link to={"#"} className={cx("user")}>
                  <div className={cx("avata", "autoCenter")}>
                    <img
                      src={require("../../assets/images/avata.jpg")}
                      alt=""
                    />
                  </div>
                  <div className={cx("user__display")}>
                    <h5 className={cx("user__name")}>Tien trung</h5>
                    <p className={cx("user__chatHistory")}>Hello</p>
                  </div>
                </Link>
              </li>
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
