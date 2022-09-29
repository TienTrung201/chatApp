import styles from "./Chat.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import BoxChat from "@/pages/Chat/BoxChat";
import { Link } from "react-router-dom";
import ModalInfoChat from "./ModalInfoChat";
import { useState } from "react";
// import { UseFireStore } from "@/hooks/UseFirestore";
// import ModalInfoChat from "./ModalInfoChat";

const cx = classNames.bind(styles);

function Chat() {
  console.log("Chat");
  const [modalInfo, setModalInfo] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const handleChangeSearch = (e) => {
    setSearchUser(e.target.value);
  };
  // const condition = useMemo(() => {
  //   return {
  //     fieldName: "name",
  //     operator: "==",
  //     compareValue: "Trung Tiến",
  //   };
  // }, []);
  // const userSearch = UseFireStore("users", {
  //   fieldName: "name",
  //   operator: "==",
  //   compareValue: "Trung Tiến",
  // });
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
          {searchUser.length > 0 ? (
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

          <li className={cx("userItem")}>
            <Link to={"#"} className={cx("user")}>
              <div className={cx("avata", "autoCenter")}>
                <img src={require("../../assets/images/avata.jpg")} alt="" />
              </div>
              <div className={cx("user__display")}>
                <h5 className={cx("user__name")}>Tien trung</h5>
                <p className={cx("user__chatHistory")}>Hello</p>
              </div>
            </Link>
          </li>
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
