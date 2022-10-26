import styles from "./EditProfile.module.scss";
import classNames from "classnames/bind";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import { userLogin, users } from "@/components/redux/selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCameraRetro,
  faFileImport,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { db, storage } from "@/firebase/config";
import { useCallback, useEffect, useRef, useState } from "react";
import LoadingProFile from "@/components/Loaddings/LoadingProFile";

import { doc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

const cx = classNames.bind(styles);

function EditProfile() {
  const [isLoading, setIloading] = useState(false);
  let user = useSelector(userLogin);
  const listUsers = useSelector(users);
  user = listUsers.find((userChat) => {
    return userChat.uid === user.uid;
  });
  const file = useRef();
  const [name, setName] = useState(false);
  const [email, setEmail] = useState(false);
  const [contact, setContact] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [styleButton, setStyleButton] = useState({
    right: "50px",
  });
  const buttonSend = useRef();
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(user ? user.photoURL : "");
  const handleChangeImg = (fileimg) => {
    setImgFile(fileimg);
    setImgUrl(URL.createObjectURL(fileimg));
  };
  const handleSendForm = () => {
    setIloading(false);
    setImgFile(false);
    // setImgUrl("");
    setName(false);
    setEmail(false);
    setContact(false);
    if (user.fullPath) {
      const desertRef = ref(storage, user.fullPath);
      deleteObject(desertRef)
        .then(() => {
          // File deleted successfully
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
        });
    }
    if (imgFile) {
      const idRandom = uuid();
      const imgRef = ref(
        storage,
        `avatarUser/${user.uid}/${imgFile.name}${idRandom}`
      );
      uploadBytes(imgRef, imgFile).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((imgurl) => {
          const userUpdate = doc(db, "users", user.uid);
          updateDoc(userUpdate, {
            displayName: nameValue,
            contact: contactValue,
            photoURL: imgurl,
            fullPath: snapshot.metadata.fullPath,
          });
        });
      });
    } else if (checkPhone() && checkName()) {
      const userUpdate = doc(db, "users", user.uid);
      updateDoc(userUpdate, {
        displayName: nameValue,
        contact: contactValue,
      });
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
  const contactRef = useRef();
  const nameRef = useRef();
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

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, [name]);
  useEffect(() => {
    if (contactRef.current) {
      contactRef.current.focus();
    }
  }, [contact]);
  return (
    <section className={cx("wrapper")}>
      {user === undefined ? (
        <LoadingProFile />
      ) : isLoading === true ? (
        <LoadingProFile />
      ) : (
        <>
          <article className={cx("myProfileInfo")}>
            {/* <Modal></Modal> */}
            <div className={cx("myProfileInfo--avata")}>
              <input
                style={{ display: "none" }}
                accept="image/*"
                type="file"
                name="file"
                ref={file}
                onChange={(e) => {
                  handleChangeImg(e.target.files[0]);
                  e.target.value = "";
                }}
              />
              <img
                src={
                  user.photoURL !== null
                    ? imgUrl
                    : require("../../../assets/images/photoUser.png")
                }
                alt=""
              />
              <button
                onClick={() => {
                  file.current.click();
                }}
                className={cx("camera")}
              >
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
                  ref={nameRef}
                  spellCheck="false"
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
                  setName(!name);
                  setEmail(false);
                  setContact(false);
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
                  spellCheck="false"
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
                  setName(false);
                  // setEmail(false)
                  setContact(false);
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
                  ref={contactRef}
                  spellCheck="false"
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
                  setName(false);
                  setEmail(false);
                  setContact(!contact);
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
