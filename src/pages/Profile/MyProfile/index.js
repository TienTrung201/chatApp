import styles from "./MyProfile.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, users } from "@/components/redux/selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useState } from "react";
import userSlice from "@/pages/Login/UserSlice";
import LoadingProFile from "@/components/Loaddings/LoadingProFile";
import boxChatSlice from "@/pages/Chat/BoxChat/BoxChatSlice";

const cx = classNames.bind(styles);

function MyProfile() {
  const Dispatch = useDispatch();
  const [isLoading, setIloading] = useState(false);
  let user = useSelector(userLogin);
  const listUsers = useSelector(users);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setIloading(true);
      console.log("loading...");
      setTimeout(() => {
        setIloading(false);
        Dispatch(userSlice.actions.logout({}));
        Dispatch(
          boxChatSlice.actions.setUserSelect({
            chatId: "",
            user: {},
          })
        );
        console.log("logged out...");
      }, 1200);
    });
  };
  user = listUsers.find((userChat) => {
    return userChat.uid === user.uid;
  });

  return (
    // {user.displayName === undefined?}
    <section className={cx("wrapper")}>
      {user === undefined ? (
        <LoadingProFile />
      ) : isLoading === true ? (
        <LoadingProFile />
      ) : (
        <>
          <article className={cx("myProfileInfo")}>
            <div className={cx("myProfileInfo--avata")}>
              <img
                src={
                  user.photoURL !== null
                    ? user.photoURL
                    : require("../../../assets/images/photoUser.png")
                }
                alt=""
              />
            </div>
            <div className={cx("myProfileInfo--contact")}>
              <h2 className={cx("myProfileInfo--Name")}>{user.displayName}</h2>
              <p className={cx("myProfileInfo--Email")}>{user.email}</p>
              <p className={cx("myProfileInfo--Nation")}>Viet Nam</p>
            </div>
          </article>
          <article className={cx("myProfileContent")}>
            <div
              className={cx("myProfileContent__Property", "backgroundSpecial")}
            >
              <p className={cx("PropertyName")}>Name</p>
              <p className={cx("Property--content")}>{user.displayName}</p>
            </div>
            <div className={cx("myProfileContent__Property")}>
              <p className={cx("PropertyName")}>Role</p>
              <p className={cx("Property--content")}>User</p>
            </div>
            <div
              className={cx("myProfileContent__Property", "backgroundSpecial")}
            >
              <p className={cx("PropertyName")}>Email</p>
              <p className={cx("Property--content")}>{user.email}</p>
            </div>
            <div className={cx("myProfileContent__Property")}>
              <p className={cx("PropertyName")}>Email varification</p>
              <p className={cx("Property--content", "colorRedOr")}>Pendding</p>
            </div>
            <div
              className={cx("myProfileContent__Property", "backgroundSpecial")}
            >
              <p className={cx("PropertyName")}>contact</p>
              <p className={cx("Property--content")}>
                {user.number === undefined ? "" : user.number}
              </p>
            </div>
            <div className={cx("myProfileContent__Property")}>
              <p className={cx("PropertyName")}>Mobile varification</p>
              <p className={cx("Property--content")}>Active</p>
            </div>
            <div
              className={cx("myProfileContent__Property", "backgroundSpecial")}
            >
              <p className={cx("PropertyName")}>Status</p>
              <p className={cx("Property--content")}>Active</p>
            </div>
            <div className={cx("logout")}>
              <button onClick={handleLogout} className={cx("buttonLogout")}>
                <FontAwesomeIcon
                  className={cx("iconLogout")}
                  icon={faRightFromBracket}
                />
                <p className={cx("buttonContent")}>Đăng Xuất</p>
              </button>
            </div>
          </article>
        </>
        // <LoadingProFile />
      )}
    </section>
  );
}

export default MyProfile;
