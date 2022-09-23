import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import images from "@/assets/images";
const cx = classNames.bind(styles);
function Login() {
  return (
    <section className={cx("wrapper")}>
      <article className={cx("continer")}>
        <div className={cx("LoginContent")}>
          <div className={cx("logoApp", "autoCenter")}>
            <section className={cx("wrapperEarth")}>
              <div className={cx("earth")}>
                <div className={cx("planet", "mars")}>
                  <img
                    alt="mars"
                    src={require("../../assets/images/mars.png")}
                  />
                </div>
                <div className={cx("planet", "jupiter")}>
                  <img
                    alt="mars"
                    src={require("../../assets/images/jupiter.png")}
                  />
                </div>
                <div className={cx("planet", "mercury")}>
                  <img
                    alt="mars"
                    src={require("../../assets/images/mercury.png")}
                  />
                </div>
              </div>
            </section>
          </div>
          <h1 className={cx("Title")}>Hello :))</h1>
        </div>
        <div className={cx("body", "autoCenter")}>
          <div className={cx("signinButton", "autoCenter")}>
            <img className={cx("icon")} src={images.facebook} alt="Facebook" />
            <span className={cx("conectTitle")}>Tiếp tục với Facebook</span>
          </div>
          <div className={cx("signinButton", "autoCenter")}>
            <img className={cx("icon")} src={images.google} alt="Facebook" />
            <span className={cx("conectTitle")}>Tiếp tục với google</span>
          </div>
        </div>
      </article>
    </section>
  );
}

export default Login;
