import classNames from "classnames/bind";
import styles from "./MusicPlayer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faForward,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import SidebarSlide from "../SideBarSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  isPlayMusic,
  isSelectedMusic,
  volumeMusic,
} from "@/components/redux/selector";
const cx = classNames.bind(styles);

function MusicPlayer() {
  const musicChillAudio = useRef();
  const volumeMusicApp = useSelector(volumeMusic);
  const isCheckedMusic = useSelector(isSelectedMusic);
  const isCheckPlayingMusic = useSelector(isPlayMusic);
  const Dispatch = useDispatch();
  const handleChaneVolumeRain = (e) => {
    musicChillAudio.current.volume = e.target.value / 100;
    Dispatch(SidebarSlide.actions.setVolumeMusic(e.target.value));
  };
  useEffect(() => {
    if (isCheckedMusic) {
      musicChillAudio.current.volume = volumeMusicApp / 100;
    }
  }, [isCheckedMusic, volumeMusicApp]);
  const handlePlayMusic = () => {
    if (isCheckPlayingMusic) {
      Dispatch(SidebarSlide.actions.setIsPlayingMusic(false));
      musicChillAudio.current.pause();
    } else {
      Dispatch(SidebarSlide.actions.setIsPlayingMusic(true));
      musicChillAudio.current.play();
    }
  };
  return (
    <div className={cx("musicApp")}>
      <input
        onChange={(e) => {
          handleChaneVolumeRain(e);
        }}
        type="range"
        max={40}
        value={volumeMusicApp}
        step={1}
        className={cx("volume-rain")}
      />

      <audio
        style={{ display: "none" }}
        ref={musicChillAudio}
        src={require("@/assets/audio/Morning Coffee ☕️ [lofi hip hop-study beats].mp3")}
        controls
        loop
      />
      <div className={cx("controlAudio")}>
        {/* <button className={cx("pause")}>
        <FontAwesomeIcon className={cx("pause-icon","icon")} icon={faPause} />
      </button> */}

        <button className={cx("prev")}>
          <FontAwesomeIcon
            className={cx("prev-icon", "icon")}
            icon={faBackward}
          />
        </button>
        <button
          onClick={() => {
            handlePlayMusic();
          }}
          className={cx("play")}
        >
          <FontAwesomeIcon
            className={cx("play-icon", "icon")}
            icon={isCheckPlayingMusic === true ? faPause : faPlay}
          />
        </button>
        <button className={cx("next")}>
          <FontAwesomeIcon
            className={cx("next-icon", "icon")}
            icon={faForward}
          />
        </button>
      </div>
    </div>
  );
}

export default MusicPlayer;
