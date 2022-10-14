import { isNight, isRainy, isSelectedMusic } from "@/components/redux/selector";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
//npm i classnames ...........cssBY
import styles from "./CafeDay.module.scss";

import CafeDay from "@/assets/video/CafeDay.mp4";
import CafeRainyDay from "@/assets/video/CafeRainyDay.mp4";
import CafeNight from "@/assets/video/CafeNight.mp4";
import CafeRainyNight from "@/assets/video/CafeRainyNight.mp4";
const cx = classNames.bind(styles);

function CafeDayChill() {
  const isCheckedMusic = useSelector(isSelectedMusic);
  const isCheckNight = useSelector(isNight);
  const isRain = useSelector(isRainy);
  return (
    <div className={cx(isCheckedMusic === true ? "opacity1" : "opacity0")}>
      <div
        className={cx(
          "backGroundVideo",
          isCheckNight === true && isRain === false ? "opacity0" : "opacity1"
        )}
      >
        <video loop autoPlay>
          <source src={CafeDay} type="video/mp4" />
        </video>
      </div>

      <div
        className={cx(
          "backGroundVideo",
          isRain === true && isCheckNight === false ? "opacity1" : "opacity0"
        )}
      >
        <video loop autoPlay>
          <source src={CafeRainyDay} type="video/mp4" />
        </video>
      </div>

      <div
        className={cx(
          "backGroundVideo",
          isCheckNight === true && isRain === false ? "opacity1" : "opacity0"
        )}
      >
        <video loop autoPlay>
          <source src={CafeNight} type="video/mp4" />
        </video>
      </div>

      <div
        className={cx(
          "backGroundVideo",
          isRain === true && isCheckNight === true ? "opacity1" : "opacity0"
        )}
      >
        <video loop autoPlay>
          <source src={CafeRainyNight} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default CafeDayChill;
