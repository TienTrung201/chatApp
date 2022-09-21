import styles from "./MyProfile.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function MyProfile() {
  return (
    <section className={cx("wrapper")}>
      <article className={cx("myProfileInfo")}>
        <div className={cx("myProfileInfo--avata")}>
          <img
            src={require("../../../assets/images/avata.jpg")}
            alt=""
            width={60}
          />
        </div>
        <div className={cx("myProfileInfo--contact")}>
          <h2 className={cx("myProfileInfo--Name")}>Tiến Trung</h2>
          <p className={cx("myProfileInfo--Email")}>
            tientrung14122012@gmail.com
          </p>
          <p className={cx("myProfileInfo--Nation")}>Viet Nam</p>
        </div>
      </article>
      <article className={cx("myProfileContent")}>
        <div className={cx("myProfileContent__Property", "backgroundSpecial")}>
          <p className={cx("PropertyName")}>Name</p>
          <p className={cx("Property--content")}>Tiến trung</p>
        </div>
        <div className={cx("myProfileContent__Property")}>
          <p className={cx("PropertyName")}>Role</p>
          <p className={cx("Property--content")}>User</p>
        </div>
        <div className={cx("myProfileContent__Property", "backgroundSpecial")}>
          <p className={cx("PropertyName")}>Email</p>
          <p className={cx("Property--content")}>tientrung14122012@gmail</p>
        </div>
        <div className={cx("myProfileContent__Property")}>
          <p className={cx("PropertyName")}>Email varification</p>
          <p className={cx("Property--content", "colorRedOr")}>Pendding</p>
        </div>
        <div className={cx("myProfileContent__Property", "backgroundSpecial")}>
          <p className={cx("PropertyName")}>contact</p>
          <p className={cx("Property--content")}>0336237176</p>
        </div>
        <div className={cx("myProfileContent__Property")}>
          <p className={cx("PropertyName")}>Mobile varification</p>
          <p className={cx("Property--content")}>Active</p>
        </div>
        <div className={cx("myProfileContent__Property", "backgroundSpecial")}>
          <p className={cx("PropertyName")}>Status</p>
          <p className={cx("Property--content")}>Active</p>
        </div>
      </article>
    </section>
  );
}

export default MyProfile;
