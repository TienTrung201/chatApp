import styles from "./MainMusic.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(styles);

function MainMusic() {
  return (
    <section className={cx("wrapper")}>
      <header className={cx("header")}>
        <div className={cx("title")}>
          <FontAwesomeIcon icon={faChartSimple} className={cx("iconTitle")} />
          <h1 className={cx("content")}>Music</h1>
        </div>
        <div className={cx("search")}>
          <FontAwesomeIcon icon={faSearch} className={cx("iconSearch")} />
          <input placeholder="Search" type="text" className={cx("input")} />
        </div>
        <div className={cx("userLogin")}>
          <div className={cx("avatar")}>
            <img
              width={40}
              src={require("../../../assets/images/photoUser.png")}
              alt=""
            />
          </div>
          <h2 className={cx("nameUser")}>Hello Trung</h2>
        </div>
      </header>
      <article className={cx("main")}>
        <div className={cx("continer")}>
          <h2 className={cx("title")}>Releases you</h2>
          <div className={cx("content")}>
            <div className={cx("banner")}>
              <img
                width={300}
                alt=""
                src={require("../../../assets/images/foryou.jpg")}
              />
            </div>
            <div className={cx("musicForYou")}>
              <ul className={cx("listMusic")}>
                <li className={cx("itemMusic")}>
                  <span className={cx("index")}>1</span>
                  <span className={cx("heart")}>
                    <FontAwesomeIcon
                      className={cx("iconHeart")}
                      icon={faHeart}
                    />
                  </span>
                  <div className={cx("song")}>
                    <h3 className={cx("nameMusic")}>Sleep 4Ever</h3>
                    <p className={cx("artist")}>MAGGIE ANDREW, bkackbear</p>
                  </div>
                  <span className={cx("time")}>2:42</span>
                </li>
                <li className={cx("itemMusic")}>
                  <span className={cx("index")}>1</span>
                  <span className={cx("heart")}>
                    <FontAwesomeIcon
                      className={cx("iconHeart")}
                      icon={faHeart}
                    />
                  </span>
                  <div className={cx("song")}>
                    <h3 className={cx("nameMusic")}>Sleep 4Ever</h3>
                    <p className={cx("artist")}>MAGGIE ANDREW, bkackbear</p>
                  </div>
                  <span className={cx("time")}>2:42</span>
                </li>
                <li className={cx("itemMusic")}>
                  <span className={cx("index")}>1</span>
                  <span className={cx("heart")}>
                    <FontAwesomeIcon
                      className={cx("iconHeart")}
                      icon={faHeart}
                    />
                  </span>
                  <div className={cx("song")}>
                    <h3 className={cx("nameMusic")}>Sleep 4Ever</h3>
                    <p className={cx("artist")}>MAGGIE ANDREW, bkackbear</p>
                  </div>
                  <span className={cx("time")}>2:42</span>
                </li>
                <li className={cx("itemMusic")}>
                  <span className={cx("index")}>1</span>
                  <span className={cx("heart")}>
                    <FontAwesomeIcon
                      className={cx("iconHeart")}
                      icon={faHeart}
                    />
                  </span>
                  <div className={cx("song")}>
                    <h3 className={cx("nameMusic")}>Sleep 4Ever</h3>
                    <p className={cx("artist")}>MAGGIE ANDREW, bkackbear</p>
                  </div>
                  <span className={cx("time")}>2:42</span>
                </li>
                <li className={cx("itemMusic")}>
                  <span className={cx("index")}>1</span>
                  <span className={cx("heart")}>
                    <FontAwesomeIcon
                      className={cx("iconHeart")}
                      icon={faHeart}
                    />
                  </span>
                  <div className={cx("song")}>
                    <h3 className={cx("nameMusic")}>Sleep 4Ever</h3>
                    <p className={cx("artist")}>MAGGIE ANDREW, bkackbear</p>
                  </div>
                  <span className={cx("time")}>2:42</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

export default MainMusic;
