import styles from "./EditProfile.module.scss";
import classNames from "classnames/bind";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import { userLogin } from "@/components/redux/selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCameraRetro,
  faFileImport,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { auth, db, storage } from "@/firebase/config";
import { useCallback, useEffect, useRef, useState } from "react";
import LoadingProFile from "@/components/Loaddings/LoadingProFile";

import { doc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useMemo } from "react";
import { useFireStore } from "@/hooks/useFirestor";
import { updatePassword } from "firebase/auth";

const cx = classNames.bind(styles);

function EditProfile() {
  const [isLoading, setIloading] = useState(false);
  let user = useSelector(userLogin);
  const conditionUser = useMemo(() => {
    return {
      fieldName: "displayName",
      operator: "!=",
      compareValue: "getAll",
    };
  }, []);

  const newUsers = useFireStore("users", conditionUser);
  const userEdit = useMemo(() => {
    return newUsers.find((userChat) => {
      return userChat.uid === user.uid;
    });
  }, [newUsers, user.uid]);

  const file = useRef();
  const [name, setName] = useState(false);
  const [email, setEmail] = useState(false);
  const [contact, setContact] = useState(false);
  const [password, setPassord] = useState(false);
  const [toggle, setToggle] = useState(true);

  const [styleButton, setStyleButton] = useState({
    right: "50px",
  });
  const buttonSend = useRef();
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(
    userEdit
      ? userEdit.photoURL
      : "https://lh3.googleusercontent.com/pw/AL9nZEWTaeBTLS3G4g_FICuxKoOrmI2W7oenJmGVzvYTXmSBGnfjag9-dAhV6psnywJmKeTgX9AXVzaWVxoQiTPhjlFhRmRshu2SezuRmdSX44497whv285LbYr66VBI3BPTPpfNlDQeUQWkEn_ha2DLAxBp=s625-no"
  );

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
    setPassord(false);
    if (userEdit.fullPath) {
      const desertRef = ref(storage, userEdit.fullPath);
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
      const userCurrent = auth.currentUser;
      updatePassword(userCurrent, passwordValue)
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
      uploadBytes(imgRef, imgFile).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((imgurl) => {
          const userUpdate = doc(db, "users", user.uid);
          updateDoc(userUpdate, {
            displayName: nameValue,
            contact: contactValue,
            photoURL: imgurl,
            fullPath: snapshot.metadata.fullPath,
          });
          if (userEdit.password) {
            updateDoc(userUpdate, {
              password: passwordValue,
            });
          }
        });
      });
    } else if (checkPhone() && checkName()) {
      const userUpdate = doc(db, "users", user.uid);
      const userCurrent = auth.currentUser;
      updatePassword(userCurrent, passwordValue)
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
      updateDoc(userUpdate, {
        displayName: nameValue,
        contact: contactValue,
      });
      if (userEdit.password) {
        updateDoc(userUpdate, {
          password: passwordValue,
        });
      }
    }
  };

  const [nameValue, setNameValue] = useState("name");
  const [emailValue, setEmailValue] = useState("");
  const [contactValue, setContactValue] = useState("");
  const [passwordValue, setPassordValue] = useState("Password");
  useEffect(() => {
    if (userEdit) {
      setNameValue(userEdit.displayName);
      setImgUrl(userEdit.photoURL);
      setEmailValue(userEdit.email);
      if (userEdit.contact) {
        setContactValue(userEdit.contact);
      } else {
        setContactValue("");
      }
      if (userEdit.password) {
        setPassordValue(userEdit.password);
      } else {
        setPassord("");
      }
    }
  }, [userEdit]);

  const contactRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();

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
  const checkPassWord = useCallback(() => {
    if (user.providerId === "google.com") {
      return true;
    }
    if (!stringMatch(passwordValue, /^([A-Za-z0-9_@!#$%^&*]){6,20}/)) {
      return false;
    } else {
      return true;
    }
  }, [passwordValue, user]);
  useEffect(() => {
    let button = buttonSend.current;
    const formError = () => {
      if (
        checkName() === false ||
        checkPhone() === false ||
        checkPassWord() === false
      ) {
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
  }, [styleButton.right, toggle, checkName, checkPhone, checkPassWord]);

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
  useEffect(() => {
    if (passwordRef.current) {
      passwordRef.current.focus();
    }
  }, [password]);
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
              {imgUrl && <img src={imgUrl} alt="" />}

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
              <h2
                style={{ height: "20px" }}
                className={cx("myProfileInfo--Name")}
              >
                {userEdit ? userEdit.displayName : ""}
              </h2>
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
                  setPassord(false);
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
                  setPassord(false);
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
                  setPassord(false);
                }}
                className={cx("replace", "autoCenter")}
              >
                <FontAwesomeIcon
                  className={cx("iconReplace")}
                  icon={faPenToSquare}
                />
              </button>
            </div>

            {user.providerId === "password" ? (
              <div className={cx("myProfileContent__Property")}>
                <p className={cx("PropertyName")}>password</p>
                {password === true ? (
                  <input
                    ref={passwordRef}
                    spellCheck="false"
                    type="text"
                    placeholder="password"
                    value={passwordValue}
                    className={cx(
                      "Property--content",
                      "borderInput",
                      checkPassWord() === false ? "error" : "successful"
                    )}
                    onChange={(e) => {
                      handleChangeValue(setPassordValue, e);
                    }}
                  />
                ) : (
                  <input
                    disabled
                    type="text"
                    placeholder="password"
                    value={passwordValue}
                    className={cx(
                      "Property--content",
                      checkPassWord() === false ? "error" : "successful"
                    )}
                    name="name"
                  />
                )}

                <button
                  onClick={() => {
                    setName(false);
                    setEmail(false);
                    setContact(false);
                    setPassord(!password);
                  }}
                  className={cx("replace", "autoCenter")}
                >
                  <FontAwesomeIcon
                    className={cx("iconReplace")}
                    icon={faPenToSquare}
                  />
                </button>
              </div>
            ) : (
              false
            )}
            <div className={cx("logout")}>
              <button
                style={styleButton}
                ref={buttonSend}
                className={cx(
                  "buttonLogout",
                  checkPhone() === false ||
                    checkName() === false ||
                    checkPassWord() === false
                    ? "opacity05"
                    : "opacity1 poiter",
                  checkPhone() === false ||
                    checkName() === false ||
                    checkPassWord() === false
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
