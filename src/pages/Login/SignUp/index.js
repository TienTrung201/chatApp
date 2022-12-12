import styles from "./SignUp.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faKey, faLock, faSignature } from "@fortawesome/free-solid-svg-icons";
import images from "@/assets/images";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase/config";
import { setDocument } from "@/firebase/services";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
const cx = classNames.bind(styles);

function SignUp({ setFormSignIn, handleLoginGoogle, earthSays, setEarthSays }) {
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[3].value;
    const photoURL =
      "https://lh3.googleusercontent.com/pw/AL9nZEWTaeBTLS3G4g_FICuxKoOrmI2W7oenJmGVzvYTXmSBGnfjag9-dAhV6psnywJmKeTgX9AXVzaWVxoQiTPhjlFhRmRshu2SezuRmdSX44497whv285LbYr66VBI3BPTPpfNlDQeUQWkEn_ha2DLAxBp=s625-no";
    const type = "signUp";
    if (formSignupValidate(e.target, type) !== true) {
      setEarthSays(formSignupValidate(e.target, type));
    } else {
      setEarthSays("Đăng ký thành công");
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Đăng nhập", { user });
          updateProfile(auth.currentUser, {
            displayName: displayName,
            photoURL: photoURL,
          })
            .then(() => {
              // Profile updated!
              // ...
            })
            .catch((error) => {
              // An error occurred
              // ...
              console.log(error);
            });
          setDocument("users", {
            displayName: displayName,
            email: user.email,
            photoURL: photoURL,
            uid: user.uid,
            providerId: user.providerId,
            password: password,
          });
        })
        .catch((error) => {
          console.error(error);
          setEarthSays("Email đã được sử dụng");
          e.target.email.value = "";
          e.target.focus();

          // ..
        });
    }
  };
  return (
    <section className={cx("wrapper")}>
      <form
        onSubmit={(e) => {
          handleSubmitForm(e);
        }}
      >
        <div className={cx("signinButton", "autoCenter")}>
          <FontAwesomeIcon icon={faSignature} className={cx("icon")} />
          <input name="name" placeholder="Tên" type="text" />
        </div>
        <div className={cx("signinButton", "autoCenter")}>
          <FontAwesomeIcon icon={faEnvelope} className={cx("icon")} />
          <input name="email" placeholder="Email" type="text" />
        </div>
        <div className={cx("signinButton", "autoCenter")}>
          <FontAwesomeIcon icon={faKey} className={cx("icon")} />
          <input name="password" type="password" placeholder="Mật khẩu" />
        </div>
        <div className={cx("signinButton", "autoCenter")}>
          <FontAwesomeIcon icon={faLock} className={cx("icon")} />
          <input
            name="confirm"
            type="password"
            placeholder="Nhập lại mật khẩu"
          />
        </div>
        <div className={cx("account")}>
          <p onClick={setFormSignIn}>Đăng nhập</p>
        </div>
        <div className={cx("logInApp")}>
          <div
            onClick={() => {
              handleLoginGoogle();
            }}
            className={cx("singInGoogle", "autoCenter")}
          >
            {" "}
            <img className={cx("icon")} src={images.google} alt="Facebook" />
          </div>
          <button className={cx("signinButton", "logIn", "autoCenter")}>
            <p>Đăng Ký</p>
          </button>
        </div>
      </form>
    </section>
  );
}
var regexEmail =
  /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
var regexPhone = /^[0][0-9]{9}$/;
var regexPassword = /^([A-Za-z0-9_@!#$%^&*]){6,20}/;
function checkNull(txt) {
  if (txt.length === 0) return true;
  else return false;
}

function stringMatch(txt, reg) {
  return reg.test(txt);
}

function checkPass(txt1, txt2) {
  return txt1.value === txt2.value ? true : false;
}

export function formSignupValidate(f, type) {
  if (f.name) {
    if (checkNull(f.name.value)) {
      f.name.focus();

      return "Vui lòng nhập tên của bạn !";
    }
    if (f.name.value.length < 3 || f.name.value.length > 20) {
      f.name.value = "";
      f.name.focus();
      return "Tên người dùng chứa 3-20 ký tự";
    }
  }

  if (f.email) {
    if (checkNull(f.email.value)) {
      f.email.focus();

      return "Vui lòng nhập email";
    }
    if (!stringMatch(f.email.value, regexEmail)) {
      f.email.value = "";
      f.email.focus();
      return "Email sai định dạng !";
    }
  }

  if (f.phone) {
    if (checkNull(f.phone.value)) {
      f.phone.focus();
      return "Vui lòng nhập số điện thoại";
    }
    if (!stringMatch(f.phone.value, regexPhone)) {
      f.phone.value = "";
      f.phone.focus();
      return "Số điện thoại sai định dạng !";
    }
  }

  if (f.password) {
    if (type === "signIn") {
      if (checkNull(f.password.value)) {
        f.password.focus();
        return "Vui lòng nhập mật khẩu";
      }
    }
    if (type === "signUp") {
      console.log("hello");
      if (!stringMatch(f.password.value, regexPassword)) {
        f.password.value = "";
        f.password.focus();
        return "Mật khẩu bắt đầu bằng chữ hoa và chứa từ 6-20 kí tự";
      }
      if (f.confirm) {
        if (!checkPass(f.password, f.confirm)) {
          f.confirm.value = "";
          f.confirm.focus();
          console.log(f.password.value, f.confirm.value);
          return "Mật khẩu không giống nhau !";
        }
      }
    }
  }
  return true;
}

export default SignUp;
