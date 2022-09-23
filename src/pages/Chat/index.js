import styles from "./Chat.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Chat() {
  console.log("Chat");
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
          />
          <FontAwesomeIcon
            className={cx("searchIcon")}
            icon={faMagnifyingGlass}
          />
        </div>
        <div className={cx("wrapperListUser")}>
          <div className={cx("user")}>
            <div className={cx("avata", "autoCenter")}>
              <img src={require("../../assets/images/avata.jpg")} alt="" />
            </div>
            <div className={cx("user__display")}>
              <h5 className={cx("user__name")}>Tien trung</h5>
              <p className={cx("user__chatHistory")}>Hello</p>
            </div>
          </div>
          <div className={cx("user")}>
            <div className={cx("avata", "autoCenter")}>
              <img src={require("../../assets/images/avata.jpg")} alt="" />
            </div>
            <div className={cx("user__display")}>
              <h5 className={cx("user__name")}>Tien trung</h5>
              <p className={cx("user__chatHistory")}>Hello</p>
            </div>
          </div>
          <div className={cx("user")}>
            <div className={cx("avata", "autoCenter")}>
              <img src={require("../../assets/images/avata.jpg")} alt="" />
            </div>
            <div className={cx("user__display")}>
              <h5 className={cx("user__name")}>Tien trung</h5>
              <p className={cx("user__chatHistory")}>Hello</p>
            </div>
          </div>
          <div className={cx("user")}>
            <div className={cx("avata", "autoCenter")}>
              <img src={require("../../assets/images/avata.jpg")} alt="" />
            </div>
            <div className={cx("user__display")}>
              <h5 className={cx("user__name")}>Tien trung</h5>
              <p className={cx("user__chatHistory")}>Hello</p>
            </div>
          </div>
          <div className={cx("user")}>
            <div className={cx("avata", "autoCenter")}>
              <img src={require("../../assets/images/avata.jpg")} alt="" />
            </div>
            <div className={cx("user__display")}>
              <h5 className={cx("user__name")}>Tien trung</h5>
              <p className={cx("user__chatHistory")}>Hello</p>
            </div>
          </div>
          <div className={cx("user")}>
            <div className={cx("avata", "autoCenter")}>
              <img src={require("../../assets/images/avata.jpg")} alt="" />
            </div>
            <div className={cx("user__display")}>
              <h5 className={cx("user__name")}>Tien trung</h5>
              <p className={cx("user__chatHistory")}>Hello</p>
            </div>
          </div>
          <div className={cx("user")}>
            <div className={cx("avata", "autoCenter")}>
              <img src={require("../../assets/images/avata.jpg")} alt="" />
            </div>
            <div className={cx("user__display")}>
              <h5 className={cx("user__name")}>Tien trung</h5>
              <p className={cx("user__chatHistory")}>Hello</p>
            </div>
          </div>
          <div className={cx("user")}>
            <div className={cx("avata", "autoCenter")}>
              <img src={require("../../assets/images/avata.jpg")} alt="" />
            </div>
            <div className={cx("user__display")}>
              <h5 className={cx("user__name")}>Tien trung</h5>
              <p className={cx("user__chatHistory")}>Hello</p>
            </div>
          </div>
          <div className={cx("user")}>
            <div className={cx("avata", "autoCenter")}>
              <img src={require("../../assets/images/avata.jpg")} alt="" />
            </div>
            <div className={cx("user__display")}>
              <h5 className={cx("user__name")}>Tien trung</h5>
              <p className={cx("user__chatHistory")}>Hello</p>
            </div>
          </div>
        </div>
      </article>
      <article className={cx("rooms")}></article>
    </section>
  );
}

export default Chat;
