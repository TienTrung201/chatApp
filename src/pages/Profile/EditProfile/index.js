import styles from "./EditProfile.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import {
  replaceContact,
  replaceEmail,
  replaceName,
  userLogin,
  users,
} from "@/components/redux/selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCameraRetro,
  faFileImport,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { db } from "@/firebase/config";
import { useCallback, useEffect, useRef, useState } from "react";
import LoadingProFile from "@/components/Loaddings/LoadingProFile";
import editProfileSlice from "./EditProfileSlice";
import { doc, updateDoc } from "firebase/firestore";
const cx = classNames.bind(styles);

function EditProfile() {
  const Dispatch = useDispatch();
  const [isLoading, setIloading] = useState(false);
  let user = useSelector(userLogin);
  const listUsers = useSelector(users);
  const name = useSelector(replaceName);
  const email = useSelector(replaceEmail);
  const contact = useSelector(replaceContact);
  const [toggle, setToggle] = useState(true);
  const [styleButton, setStyleButton] = useState({
    right: "50px",
  });
  user = listUsers.find((userChat) => {
    return userChat.uid === user.uid;
  });
  const buttonSend = useRef();
  const handleSendForm = () => {
    setIloading(false);
    if (checkPhone() && checkName()) {
      const userUpdate = doc(db, "users", user.uid);
      updateDoc(userUpdate, {
        displayName: nameValue,
        contact: contactValue,
      });
      Dispatch(editProfileSlice.actions.setReplaceName(false));
      Dispatch(editProfileSlice.actions.setReplaceEmail(false));
      Dispatch(editProfileSlice.actions.setReplaceContact(false));
    }
  };

  let initName;
  let initEmail;
  let initContact;

  if (user) {
    initName = user.displayName;
    initEmail = user.email;
    if (user.contact) {
      initContact = user.contact;
    } else {
      initContact = "";
    }
  }
  const [nameValue, setNameValue] = useState(initName);
  const [emailValue, setEmailValue] = useState(initEmail);
  const [contactValue, setContactValue] = useState(initContact);
  const handleChangeValue = (setValue, e) => {
    setValue(e.target.value);
  };
  function stringMatch(txt, reg) {
    return reg.test(txt);
  }
  const checkName = useCallback(() => {
    if (
      nameValue.length < 2 ||
      nameValue.length > 20 ||
      isNaN(Number(nameValue)) === false
    ) {
      return false;
    } else {
      return true;
    }
  }, [nameValue]);
  const checkPhone = useCallback(() => {
    if (contactValue.trim(" ") === "") {
      return true;
    }
    if (!stringMatch(contactValue, /^(\+84|0)[1-9][0-9]{8}$/)) {
      return false;
    }
    return true;
  }, [contactValue]);

  useEffect(() => {
    let button = buttonSend.current;
    const formError = () => {
      if (checkName() === false || checkPhone() === false) {
        if (toggle === true) {
          setStyleButton({
            right: button.clientWidth + 80,
          });
          setTimeout(() => {
            setToggle(false);
          }, 200);
        } else {
          setStyleButton({
            right: button.clientWidth - 80,
          });
          setTimeout(() => {
            setToggle(true);
          }, 200);
        }
      }
    };
    // console.log(buttonSend.current);
    if (buttonSend.current) {
      button.addEventListener("mouseover", formError);
    }
    return () => {
      if (button) {
        button.removeEventListener("mouseover", formError);
      }
    };
  }, [styleButton.right, toggle, checkName, checkPhone]);

  return (
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
              <button className={cx("camera")}>
                <FontAwesomeIcon
                  className={cx("camereIcon")}
                  icon={faCameraRetro}
                />
              </button>
            </div>
            <div className={cx("myProfileInfo--contact")}>
              <h2 className={cx("myProfileInfo--Name")}>{user.displayName}</h2>
              <p className={cx("myProfileInfo--Email")}>{user.email}</p>
              <p className={cx("myProfileInfo--Nation")}>Viet Nam</p>
            </div>
          </article>
          <section className={cx("myProfileContent")}>
            <div className={cx("myProfileContent__Property")}>
              <p className={cx("PropertyName")}>Name</p>
              {name === true ? (
                <input
                  type="text"
                  placeholder="Name"
                  value={nameValue}
                  className={cx(
                    "Property--content",
                    "borderInput",
                    checkName() === false ? "error" : "successful"
                  )}
                  onChange={(e) => {
                    handleChangeValue(setNameValue, e);
                  }}
                />
              ) : (
                <input
                  disabled
                  type="text"
                  placeholder="Name"
                  value={nameValue}
                  className={cx(
                    "Property--content",
                    checkName() === false ? "error" : "successful"
                  )}
                  name="name"
                />
              )}

              <button
                onClick={() => {
                  Dispatch(editProfileSlice.actions.setReplaceName(true));
                  Dispatch(editProfileSlice.actions.setReplaceEmail(false));
                  Dispatch(editProfileSlice.actions.setReplaceContact(false));
                }}
                className={cx("replace", "autoCenter")}
              >
                <FontAwesomeIcon
                  className={cx("iconReplace")}
                  icon={faPenToSquare}
                />
              </button>
            </div>
            <div className={cx("myProfileContent__Property")}>
              <p className={cx("PropertyName")}>Email</p>
              {email === true ? (
                <input
                  type="text"
                  placeholder="email"
                  value={emailValue}
                  className={cx("Property--content", "borderInput")}
                  onChange={(e) => {
                    handleChangeValue(setEmailValue, e);
                  }}
                />
              ) : (
                <input
                  disabled
                  type="text"
                  placeholder="email"
                  value={emailValue}
                  className={cx("Property--content")}
                />
              )}

              <button
                style={{ opacity: 0.54, cursor: "auto" }}
                onClick={(e) => {
                  Dispatch(editProfileSlice.actions.setReplaceName(false));
                  // Dispatch(editProfileSlice.actions.setReplaceEmail(true));
                  Dispatch(editProfileSlice.actions.setReplaceContact(false));
                }}
                className={cx("replace", "autoCenter", "noScale")}
              >
                <FontAwesomeIcon
                  className={cx("iconReplace")}
                  icon={faPenToSquare}
                />
              </button>
            </div>
            <div className={cx("myProfileContent__Property")}>
              <p className={cx("PropertyName")}>contact</p>
              {contact === true ? (
                <input
                  type="text"
                  value={contactValue}
                  placeholder="phone number"
                  className={cx(
                    "Property--content",
                    "borderInput",
                    checkPhone() === false ? "error" : "successful"
                  )}
                  onChange={(e) => {
                    handleChangeValue(setContactValue, e);
                  }}
                />
              ) : (
                <input
                  disabled
                  type="text"
                  value={contactValue}
                  placeholder="phone number"
                  className={cx("Property--content")}
                />
              )}

              <button
                onClick={() => {
                  Dispatch(editProfileSlice.actions.setReplaceName(false));
                  Dispatch(editProfileSlice.actions.setReplaceEmail(false));
                  Dispatch(editProfileSlice.actions.setReplaceContact(true));
                }}
                className={cx("replace", "autoCenter")}
              >
                <FontAwesomeIcon
                  className={cx("iconReplace")}
                  icon={faPenToSquare}
                />
              </button>
            </div>
            <div className={cx("logout")}>
              <button
                style={styleButton}
                ref={buttonSend}
                className={cx(
                  "buttonLogout",
                  checkPhone() === false || checkName() === false
                    ? "opacity05"
                    : "opacity1 poiter",
                  checkPhone() === false || checkName() === false
                    ? ""
                    : "poiter"
                )}
                onClick={() => {
                  handleSendForm();
                }}
              >
                <FontAwesomeIcon
                  className={cx("iconLogout")}
                  icon={faFileImport}
                />
                <p className={cx("buttonContent")}>Gửi</p>
              </button>
            </div>
          </section>
        </>
        // <LoadingProFile />
      )}
    </section>
  );
}

export default EditProfile;
