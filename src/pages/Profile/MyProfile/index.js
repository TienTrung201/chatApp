import styles from "./MyProfile.module.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { userLogin } from "@/components/redux/selector";
import Loading from "@/components/Loading";

const cx = classNames.bind(styles);

function MyProfile() {
  const user = useSelector(userLogin);
  return (
    // {user.displayName === undefined?}
    <section className={cx("wrapper")}>
      {user.displayName === undefined ? (
        <Loading />
      ) : (
        <>
          <article className={cx("myProfileInfo")}>
            <div className={cx("myProfileInfo--avata")}>
              {/* <img src={require("../../../assets/images/avata.jpg")} alt="" /> */}
              <img src={user.photoURL} alt="" />
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
          </article>
        </>
      )}
    </section>
  );
}

export default MyProfile;
