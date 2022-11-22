import styles from "./Media.module.scss";
import classNames from "classnames/bind";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  arrayMessageImg,
  currentIndexImage,
} from "@/components/redux/selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import mediaSlide from "./MediaSlide";
const cx = classNames.bind(styles);

function Media() {
  // const [currentSlide, setCurrentSlide] = useState(1);
  const slider1 = useRef();
  const slider2 = useRef();
  const currentIndexImg = useSelector(currentIndexImage);
  const listImgMessage = useSelector(arrayMessageImg);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  useEffect(() => {
    slider1.current.slickGoTo(currentIndexImg);
    slider2.current.slickGoTo(currentIndexImg);
  }, [currentIndexImg]);
  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  const settings = {
    dots: true,
    className: "imgSelected",
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const settingsListImage = {
    className: "center",
    dots: true,
    speed: 300,
    slidesToShow: 13,
    // centerPadding: "60px",
    slidesToScroll: 1,
    swipeToSlide: true,
    focusOnSelect: true,
    // centerMode: true,
    infinite: false,
    row: 1,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 10,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 660,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // console.log(array.reverse());
  const Dispatch = useDispatch();
  return (
    <section className={cx("wrapperMedia")}>
      <button
        onClick={() => {
          Dispatch(mediaSlide.actions.setIsOpenMedia(false));
        }}
        className={cx("close")}
      >
        <FontAwesomeIcon className={cx("icon")} icon={faClose} />
      </button>
      <div className={cx("selectedImage")}>
        <Slider asNavFor={nav2} ref={slider1} {...settings}>
          {listImgMessage.map((image, i) => {
            return (
              <div key={image + i} className={cx("image")}>
                <img src={image} alt="" />
              </div>
            );
          })}
        </Slider>
      </div>

      <div className={cx("wrapperListEmage")}>
        <Slider asNavFor={nav1} ref={slider2} {...settingsListImage}>
          {listImgMessage.map((image, i) => {
            return (
              <div key={image + i} className={cx("image")}>
                <img src={image} alt="" />
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
}

export default Media;

// const array = [
//   "https://lh3.googleusercontent.com/vC6aUV4yp-HFFTJtci6m8Jkqb0Ri-bt2_bwcjaEwCy3dHV-YXbyqP3qV0ukSehRnv50NhtboforVHbSOoFdgnPV2QfHsuGY69BWhfPNg2OGMQpPTXXvL-iGCY2O75mqzuYhUA4UoZ4_ZHM52I_irjtMIQljXBd8-EN8sHqAH8-Qj5PNs5k2sfDLJ7b-HHoayunc7QCW95xjQCTajLeylwuF0tqNYdtCfgeGN_y0ElSr5RVPSGaECJnJ_7t0V4oTmxHlStXWAew-9h0wkbnZ4QNw9kNuqhmRxhNQ1o8GVXsaXyOMwtUqtLH3Sq20B7-FbdK74V9yhJaXZjcaAT58luEhkgd6uXTnsdpax-rh3dmoAztwtnvn0mK2dmG2KGF8P6xxpsbPT3GNN8x70ZJDcnrPMYxGCDXKXYITtL4ddJ337jr4I4cjcfeBdhknc8nO_FgJGv2lG56e10MgMFx8hQQtD88CW26IjfKPiuxNFDtDCrMJSm7Eud41-SzFUL1Hc0wTN7XKWU8mWr6W3f-Q851EDl0dC_h7_qmWCcwzyBQqSdxlulmFOmTsJQYs-44H8d7A9ERcDJJV4SZXlZiof6RFeyHfCU_WADdRdoA9beE-lRlBPOISKmRClB5hATuQ_YEU5svAYpXJOCCsVYquWqaOqtaACjdkfvcpulNPrmuSUH__RHKINsD_pC2S7_h367RKpNAcqyS9arMtzxvEvrL5m6dSsmVG_rS0zrV0iVnx-Gyud_tgR7g0wWUrk-tM0aglS-P0KNjDcuX6J8ObMbps-ptp-VihICmicSdyYP52wQdTyqv_ftbW2buCxi-4VKZLm0_egJsul8yxMIknl882y2xasaM4xwGb6AJDi9FL6RbCkuLL-2kibCfv3us0j6SWKorDQRwxY0TuuheH24-axFULo036NYAlUBk_1_MuTJdrj1JhN57r1mVTi07Kdc68i20M-QblKZG9wk8ID8vVjS9NY59s8YZCchS6tjWU1UheJVmA=s128-no?authuser=0",

//   "https://lh3.googleusercontent.com/98OwC3ckg71gkjGmjfFYzNDTBBl88bQzpOdb3ChIHMAeJOZQo2VDf7gw7Sku4nmcSLgrkgfXi-WEP0iCoEL56E7jYhvEb9OEOD8olBipkxUhzxFyHIdFFhwye9hngjb3UgyrWgH03OJJXOru11pYlYW9VrfKQc2yX6IeNEqaukDqtA-qHghde2fcLWKOttkP96vH2Nm2ok188qF8z4qbdaSPDyg_bhajuKTu5V2Kg81pjTmL_2yfqi3FKSeT1HPzcyc3fkOhN2RMvwV3tXGLaxg54LEpKf26eiBFz5YaFmlqGjpXceqiBhEI2F-9rru8w_LVKaK1NVN_0-1Etus5_y6w791b6myTZNGOxjulH9XqW813dlUp0DY7AngH8z8wIAAMUdN3cx6qIU7tqn8QUGda0AifZWeRj8nDEg7CvFwwn0VMVwLZSPYVR3BB3_PTJxcFGQZ8uP1a-xs7w75WeEUqFVuk0kyt_4z_GLDg3fvur4XsPvKiYdourcp4GJjhXHuq_rIbFZnrLloEYqxZP18afEKBcSqv8ZiCq2YQps9SND3kAiT3GShFeZyTQ72GG4v4gtCvN5w5mcoScDwvn4DPyvxX3g6rKoy65NvFpwA9xzni4UOG6TcbKcmrqAHbj-pDlvQ4dDBtjGTzAj6Ics0TPLoNoZVMapt7MSn6H7QRcB59d5vFoT_-HlLO8lM3bm3cqtuMwTGKttjoDJklqwvlQcuHsNhWJnvXLhPPDdihuKOs1ojSs1QP3tZKkEjJoU_q4QbXq8jb4Lr0dmPeacjOlbe5Wju-UNE71lQTbKstNC-50kX_S1g0ZJ5jePjCkjexX0X0A-VomUyGzAAEWKc2i-CGxyl9EtlifsZTm7v2z22BIEwqxRi4R_48LwSdz1XTAQtir7d6okPblae8GJR_kTr7toWSjTxLfh5KbQrVWvs-3vbDrvh0NaSzBlx2cyq0wQlIY13vAKgzprJoelnGqkmiNe1ZKyWzSx9KgN9jmSVN3i0=s128-no?authuser=0",

//   "https://lh3.googleusercontent.com/4RvPHP-W0W5RGex4MdUWsM7FJK0sJWp_lyaZWjSMY9VpLBIY3ywcMZntaWYluKyGPhKMxKJ2dI-dxFu7rJM0Beck6GDGjT7Mea9OTNokwb7NLreV4H8hQckUP9IWfM_yi_hN96FmGJ_GKrXeYsF44HzudoiWwB__IC1Dss-AuSiPJsN-vKcHUIo5yRvRQ-A7jBcAgtnWo_RDXh5VCfrjAlCrlQZxvcCOBAXGvj-IHGGTKKtUDPtihBHu2Kh0Af9V1tAgtur0lYd3AlxvIKmTD_78N9QiO6XdoyaLkbhh4r15iRvIieSRmyyeI2F3InaNfqhnJ4Res7lKYVKcyg--KueyRvFbd9VWdaT2Wn9o2HW7ME5HurWgGJp8nKBPnomHhhAx8ZCCFukW5lPPfOw6K8NlYFPH1f8sHuiN3RVB8oCxaU18lhzuOnU1XJnJw7VPJz2j23LMmR6M4HvXhaP183JfPNOiZn4-YCvqy8K6OV2eJnAeBPSe3O02enKEXAxEhLlJWarvQjwTzR0m9CwW5tQxKTMi_uDpoHMjhY2tYohI80l4Jgr4pgK_d8P4VQDt010sKTVL9LBVUR7jvQWH7Zqf7fQ_aRoAx8E5zhm7ujvLy6AaWW58Ipqw7pVcCSomWFU4rlgWltP5Uu-h0gRRBf-0CALLIN2tgt8Yr-s5XRQQWsbCJgmP9uZvxMo8C3MuT8NALMVuk4cb74vkFcGIaQbvIJcSMscxZ3DV07e6Ot3--FpZmvTHwFnEQpdnqIU9tndSZpxSnigbN2HPc97j79rZdErWSSguNK48xqmjeNSS7VfPy2d0SgBiCAHO2RxnJgZhFrgmg0Wm_P9PTwcaCjvw5yJuOiatJL1dEO-8PhIWJAvoFGNRCPlXqgSyPJ_0kgmYLBUv12SJ_DEGKO3IXdDkj9n04aRhOjwXR8nXeiH-C4gOEUOCKU7FS6FDbnJWDkXCZTkKNhgVjj9Ij3FTpQwG1cnDh9TGH9FKTJXbKYxAAfeAGR0=s128-no?authuser=0",

//   "https://lh3.googleusercontent.com/0G3-vUP_1nLmdg5vKrcsH-h9GBiwXwaxD9CB8pJ8GlXI99R1Vdp04AWFDkV_6DEgXvxr5iL2eCpSTdkCcUZp-2urwRkw4_kh_h9XR8OUiBfeP4d3zX-DkV_vmNiVwbyWzMzrRdUY9JHMt__Fm1HuBEdGTjHJEANZXmR1vvtYLnQYlsK1cY1KJjS0dHAlzHV7xsq5-dKH7GmM0hPMSewT8IVJjHyKmveYX0ckK1pGLZDJMXdslBIGx2HHZl6WbG5iKhj_XnVFnJV5X0VbVyU4Jlw0042bm-8s4fjikPWVeuvSqbV7tCSQVXS12y3hylmXSbKe1qh55ZrWD9wsxlSYludBFbd1RDTtY_ascGQr0QF0HtB4-Vti2rK8F9jkPAKGmGvjktpESwYz2xoUdJpUc2hwHHfkqyO_iDndTLNb-zyqXqkv8IBNSZd820-BK_mOT6OEsYlEs_TycKeyKHMG3Xfp74-r07207hNDIHXFm5KmrAbGFjRrhM4P5pOT9DEDgu_UMo8GdciztyuWtTTgeWTg_Yqpco_xYtdO01FreA3PccGvOxayQmqMj3Rv_YqNPC5QBzhL2N3LZnFU59R4GH1JNutIrJVsBwjCCHIdGDe9JBLYxk2MZqBYq3MbFOIJM-eINKFTl4B-2nfv37Mstu47paSGjz-656SdVz-WdnDNgexmdMXXjCC3Zd5pfRGyWjLTzV9__34BZNEwFzin6zyc8oQ-u-bILObFWC3JTw8vlkDe3dW9c2iRScIQ_6jxHW8D6h_mmGZheTiVVUFbRwz7oUUejyUFy9C5XmOZTsMOr8KTNkUklYqGVUONPWjkl7B1j3B-yuhdDv9yCpgHl2wWqpatDZthic3E4HvFXwGiVC_X8-9hiZk38q84gD6zAKNfOPBjECg6sZBr4W5oLfkjYp00e9w8idIfq268W5YdeaVuBrIl6t-1CFUYmg84R_hxZqkmvMVSUGv8AjOCZUkuytgImfRhwv8Z_hUOsD6tGjVX1-0=s128-no?authuser=0",

//   "https://lh3.googleusercontent.com/xX61qk7Y0D1XVkdzrfKMUgBJGBxwfq-OjGdE-vgcfwjO2G7vXdEd_aalpiadrkJLn0wrjNEaPbgxQWx5FTRZ1-n6RVYFQmkjKfOyFoUE2cd1kuYxVtb_w2SlZl6M9wmtpxug-68gsgmNNG7Xy3ys8IsYW7EZTrOvt7WWwQNDC6ltonyGlCfPMVG0gh19Qo6MJ-gvOWZERT-sQnH5kzPnwJsFICDLtQlllyRzmV09VR0k12Dp18KfL7oFSJw4lt1A06AAZ1ijlG9rbhOBj2wa7qmoRu6osnsE0CiGFZyBK8UzA8Lsqw_8uOS3EMmR7RN2B6etu8J2wOzsZv-y4F01_aRuNEb3mxz_MAGmej5LbvQY76Y-UXO6BD4zF2YFTq3F7iETsJgjU7yNFekEz8tpFd3N3utBHyujT1USJK7u90CGnw5uy-MozVgJaa48HkGIjNuayaYqHYYSmx4rB8nybKYO58q1TVJnooWrMQ74F03E_u-N5hWb3t7TZLXEZaYUTuwJz72AKAe3GzbJ_2P3FhX6o3aNbubIKAcCUC3e1gJZejTIdD9ssam7xFxksLkhUysqykLntkMUtVh0chdzbM3h-roA3R-H4fIdIhExVYFp_J_BC0mG7a_jyFwA8-QPrK8Ippe2UpfCLCGHBizDvlrj_wql0TKmq2rbUjGfkP9nvgmUSCaH5PsJPF9TCo3LIPFXZyQ8mZPYuuy7982WvvkgfIN8Cdvg2182kngTaCypkR8_1J8a-4T_ciqyhrQDfqHg1DkaH3hQSEK6XL6vv7S4vi-NFjbHLv1W21xWO3xh07Lj5T4MAGbHihv3TYRopPBSoBE4-xGScIpktlKoG_sI8gFYduI1DN_-lF_lRR4BHVf1X8WiVFyZfn_nvBp-MlAgxLhbDXW7ctMmhIbrpsz-pheo4IYS1dlJAxtw1gTr0I8NdZAPBZGR97CTFLiNz0dvCOB55kfOuKAtZFQNN5rQf0DKT9BF_a3YUi5ml5cXKcTp9DM=s128-no?authuser=0",

//   "https://lh3.googleusercontent.com/OJy0CxuPvD5hSF49tO7KTRbq_BhgeHEkZecI6146WB4uoNOzaGJaBVaD3NXIv9yI6rEu7-t_p83z8WPKC6pIoKtGxJCppEQvuFtaszuAANY23qcOsdAwM9shaM5_B1Yxjr0CcbCiZ5oKnfSDcoRZbBFfw0O4mfM_LK5799so7tinC24UkLaLEcYu5N3ozSUlNQJiXnhWXswmixfE-CRPJQJCmVa27-zFABKevuE0v8F24tdrMw4j9jZYnyF1ZJFZHRwJtihzCLW2N0o5OIo3wPQsk3GZMc2lntSQXMwohw1gyi22DNghfWVrNsaHB2pQXHonXCPAIfSBWvrQYm8CNq0w6fCYQZJvSxMgfaHmaEFI7JPIBThPRFDC5qZFs18Gc38mMVdHVtyWEWSNBH4zA3REBchkT3so-C0O3Uxhtd3cz876lDOoO4HaWD_vb_5I7TW5Y6kQzpcGNa7KZunOQjwCjha8Nk449yNc7cmPzsdtgzn1yJM8E5kfSoUh7WSGR4nEuBMJ8TpWJN7V4A0uTEckBArIq54JtXTjKXTJAv8b64j-NtD4FINsnYHwZvyDVopnSSCTuPc71zUiy2nRajUlEdKV9TwLNg4-6eHgr7FgIJENBdf3hn--7BbIH8g2p_-U79hdNB-doS_a-DX2ASW4GDDJDfyYxGFJd05L3OG9FDZrvlD9ckglKFN9wNbPogVzSACl3ttgP1t2KitmG-ovYkzshRHucnmBhNMKAqhYgF4txGEhO9BZ0eH_bmSsOQHhvMeqUJaUuakjyRr1uGQvNgceEhZ3TyBj-DK0Z26jFk4GOVZlu0U4LHa8i6m4FCUdSFKwFvFT26mZMX85rXqo4fQOGAJUAesDnwIgFhrTpKFzawTR9kQv9C4uBJOyz_SpK61Fcp3gMUD3naOAn4xm2oVk5eWRKLWs9tt7g6JBaEVGYV0Kiv7wS519lF4p0EdEVpBaKsvYH2g2I8l3JN9U_ne2EYrqe0XL4q1ExrmdYXGNUp0=s128-no?authuser=0",

//   "https://lh3.googleusercontent.com/TaBE4nTnNMJlJvIkXNdQ2p0B7K6i8cNSde7aYgVbRm5dzmU4IRFa-KF-DbVbvYYxsOcr66hcUgrtt6ZW1w5cZqpB77FblUxwAwZ9n3cE6ebP6PpoAN2IqcpI8-47MWVPiCrYbdSK3zGizVqfwsC3Zb8DSgRmcCuUcePrMXj5qXqJVWGbz5ZBG3N8vi5XWL3qrMdz07Oh0_En18aNsfjiDlXDJLtJsGMpwVgV6WiTPyt0eNE6V3EbFZvovyWozf4Aq9t7QGb-ZGjh5Z28WHPhOfzkAyzYwQ-JQdzX7xDXL3MYxfc6_Gb30hTD5bHmqIt6t7CZD3E3XsVnVsW2GgHi3bUmpK_WRl8P9_i0rknqUQoborGgh-BEmzhKt7u9sKFEyR5uxHUCxmJ_Rrt18c7jDAu-r-OgtBH9IiA0PlJtvgE3yDkOFpRbpoNx4qA7zklxYi_bIXwLyFgrX1-l6fSbbWWGlcBzI_tZlKlXwf3ueIdxOPl2A14EzOl74C6Evyy0n1ydDSAMz6q0j90nCw_ZguFmJE6Un2iz2Mf-hD2l8cBXmODURS0jaA6M-gciAfMfB6WdesgpvxiUBl-65zadbD5b_HvXL5wV7g-MRTRaOG2nK3WUZ322Rf1p6hChgQIl0ecaCkevQLPvnzCdC9EgwEir242iPQhEcWB5otXtIgB_3SdCFW8GS32KE0I68FdJnXFZAI_bSepaUdN2alqBaxBxZewp1dQsmwfcQCKU8ll1ubtMZf_6Di_LJMaWdV_2iqenwpT1i7KvAD-hBfRnxjZw_jqoOojukOUIN6h4Ioxfj8bsp7kbLRrXNOuGsxyni5frNdAHlrit9WZ0D20M_PvD2HHY5tTDE9_hzlkFaREwH4AvEh1APsOJCqsLz19EGcQdvtyvLMV5ZEb_CeFgkl9lIE8xmw0VZzGvev2I8gLnRrMuZ6v05Bz5xqpj-X9JYcl5_OFTS17yN4A8rnWAkQMc5Lsx4eQ0NSC5_UM7xO-QGq0e__Q=s128-no?authuser=0",

//   "https://lh3.googleusercontent.com/-6ZIqdmgYQnMbRhn7P4HuwDwVsynhOOgQUraxnIHJCxYMerKsQ0TRJ2kc2MwZMQ5mbtYF7Qv44AClSNSEqLcCZ4GL6arYIaZtFTPT2MegNRohWpg8nOA1aP5fPrmWr-ue0QPqNhTK0F89ru_pYAdCdBrpCU9GtKklW3RB4qU_ElDuwfCxDHqGmOs5xYEU6fdk4pL-nLiBy4a2x35JKTwj3QgMlVHefpkL6_rvS1hFE4EcPPIOleuWdDaqkhCMRlowkOX2qeQb5SPOeJBQMKjs5brZM0roW1RrIAGSxrcZj45ExSJK7cFeTbIgMmvuJsbh42wn-qUSAMoUjkcZqYQikpOa6ijNcMEoYiMCy4_-PZgLSAyBDWEGRHiFI7l3HkrKxb3viHuTaZjBxszNvXF6pBm5hj_CDXIvVz1BqkvCI-zajAKpx7MD4qslTkj5C53vNgaaZ20Aj34lT06gJrz5LZc2p_kDhv_IpkODaTOnO_iZNGcZQVT05bNtVfLeL08XOcjtCctNWmGa8463CgOT2buXLLOqbrxI1cjwy2OCNLiLYhMz8OiCJLjY4I5Bl8U8OSwJqLryMixLT1kj7Wq1klk5tLpYSOQSxU1J11ZHOokX6K-Q3Sed-3z3BL9hVWT923QnizTdYlUQAVVC5qCgdmZ1tD8MWsI2jGom2lSZFDENxAjfsvAf2Zzuwb0zq_Ota_2E2d4t1dJpq9UHKYaBaNbRKADqvNG1ISUXuwdtcFWTSqbUAH66xKu-b1dvIxfTZyuZ-OkHLStCVbODirgLVflBxgU50R_9FfpA5a1yrXsfaOBq6Ma1LoPZ-AxXxr6OBxNPSLh_t4VvTzHosd-OpgPZYpu_4wVw5qTnIfaXUlhM3ulKZ8fFF8JF3UzyQnBXNOMTBMr8B6HCvxIQlPwk8DlKniTwOLFIwUQIRQPY8j6boOIMHSBTBoHFpMhL_8Utr1LGuATqfC9vVo8q8xjnHeJG8bD008vcOzoHIDLWna8mEpa2eY=s128-no?authuser=0",

//   "https://lh3.googleusercontent.com/-laERHG9_ScCEp9i2efyH2SSwqOx2lmf1XQn7x1ceZJyqy-7YslcR0Hb-w4rjWolP8SJwnFbOl6sFgtlmvTeLioGQpgoaOXTZdHRWmjE3_fUnVB4RwvZaVlH_CdCSbw4-O26hWZJbKY4uH_eESb6tawuNtq7iIPhnNXtucOuWMvulikatF08pH0zgdPi7wUnDhmoziMSCLsd1xjuDtMPQBM0P9E_m-4924rz-EwoYJ2e--P4S5fd97VnW_LcvomcFyXmBkCUBkihvmn5faWpeO3vUxbZIlPNoW8b6JV3cVTDxANKoLryW5ayyYIqQUfujJrofFO4kpjSDGkudznuEKgORHl2Nx0zQLzSCr_ie765jcyw_7HdJh6Fl2b1RK3LtR5mhUTMiAIcGgJdWYFAAJIMel2N3Hz_gU4kY2ZXfC67iu0vKfYfc1UxUHpjbPC6hL3zgH4nKkgYulsTjNFGYpJpf5khljyYGHsx902A3ZSIEaCVpUbFAPuYXSYsrV-ES-1XWQhE0UchiOKYCcIZX5XOQol3BccIBS-L6qykqQcsynKsJebvMwKVanyLKgwa47tEkNZyFph1Cz2wHLdb02pANMUdy3DrGuXVg0hyelnWsoof-5I6TskbtdsXkXrygPVAuv6zch0WTWmY4dPUTzCY79Yce1vFX5arhRntqXXEfNLZUm28EcpdkPowKtQphvcdwSuvuoqkZTJroCj_06H27nt3iVKvmhmDzL-qdNaxbEIkwVnZcKKCxkvkOIL6Jh2g0ff4BvSGLAJPTQ8wyJaKb7PgBSPqb_yMlDIqRFcUYo0HcdIcy51cXyKHGngkhBehCSti2FXi5-j9Qlve48wrRTLArPGcKcUUwzIt2RNy17D0HVJJRjR7glQh_BJIIjgCvkG-_tYiiHqJMmv8KwxmuiyvpgpiFbo9BltHGeZ_cVdPi1Se7GVugKCobtUydM6IRy590SYWFi2sP9UZeLIjNgiBmX-JJud9j1DM9r-LBX_xzFY=s128-no?authuser=0",

//   "https://lh3.googleusercontent.com/sh_7G2TkJt2q3-yxTIMDPrgpTtqoq4T2eFGULVNatD8MUuyeFKT4OwVZ-b_z-gEazxX76aqWRLjXzRjLGINoGA4aqb1MwpO65X3xdhEutriPUH_0vgoIIA6UPwdPttSoazzlqCcKD_VZiZVK6N7qQl1zvnS2rmPAfVvxHZX1mkI40cE5x02X3ytSzvWGo-BEA0cwDf4MSXMiCC1k32_XizXfp54m4TN4N0EDVsE3XR1yWrDGvPDUFQob9JZxzodL4Vx7RQ4Ia88egjOST6ELYVY9oS3A0asz2A89FU71d3wrRSIlOglcyTfELXofF-pDa6wJv9fT24ljMiCerdbn5G0zoye8tgciHUXJCh2cvFNS_2ItffiOc0H6zZvTXr06rFty0Krp5t6q9BUN8BtsKsRgOOvdKr-JRhr8qeeskvRzaerlqMLdUsXX4r1h3SjJpMQ0eJLOf5qcnBI_4pN1ToSjynuQ3zu5ueg2T8oXBcD1hBJGj1_t-RhqK7iOifSGCbyPkA69_bL_V_awDuXUGseG6d_qjoJPCnWHddH7DmAB4Wdp3Z5JiczWhJLAqwf1iE_S9ilaYtgFdRplJ_M-gMIzYmJJZ6uPHz2qKlGBQG3-fZTSr2aaWlJJRNYDtp_TEJ03BSceEGt8Jkf6CwSJg4W-u6kPwb_ZtuR6SmTnvZ84G2z8jKRsBp_8glGp99w2YXoT_Trr047TDKwhEDxWbPOywarXgqXWG7f4s0vjVeIe8WPt0KI7L8oK6LQsK72N4_TZH0VRFE-sbPrXsXUfO4GKyp9XD4LCE0VzcjitnzFwRUFnTaXrRqQR-hXs-5uCSFD7YaoBYtXDnQfclQBiTCE-huMi_L1sg8IHDfIhcTuU1HSjwGy6FW_HcsKnaOPQWvUDxE9AmfYc7mP0wXa3uwYIR3LdCwFF7sL_h0ikJ_3i4ufAFn6wLgF7FpZJoF4N1cLkvDDh8AihwDNAujzxEsggnPeikDsnvxD0UrgrhKIT_VPOW6U=s128-no?authuser=0",

//   "https://lh3.googleusercontent.com/oMfyEuGf0Bc-NhtAE2B12w4_lzrL6-illKNXxD7teUxt8UOyA30Xd1xD5WGqqJGZ4xgIz9aIhJc9ZB1spfpA1alW7cRGJ85tU7Mjv22u-_rFBIZz5ghoz5A25A7uAp9BzQIItzNsNp9q7aqN8HZK8x6q1Agymc4fdXjSjnT7psaflGQ8_ff8sEsnPSO8tTJrdmQpe8_k3jMugtMM0zNBZxcn-8mJdTDQpKnTQDKPsZIK4HLwyX46NGNsL4oYX-quGHOfmQEmXjiFVxBx7IzaYapG10ddi9NDxG6pcnzfUSg4niFsa5psjIENc3II8ov0P4TtWqpecCLRydpYFJ9b1qYpITIKg1V8xHXJIqf5eAaBGteI4jBEmhVapUlAsYmYfS1WmnD7bLVA5tx5cPHM6JJ-05XY175T-unwouoHsOeuoq1cUxqrIXpJ8JIxxjREdcmrPc5OU7EPpU31Ic_8mCo1cGFTQQ8y5ZPU9mnxtPFBbzLqKHIKGVXDkbef9FpnGhsQx3hNoGd818oe0qPb9ngli-FF06vH5k3b4Y37XtgOeraaY0eSasUykeO645ZkWYBn6tA2Btm19HsXEstF1sdxkfzw8rY2FwpZr6rxSo3p1HQ9gFjJmHpTVNY8Yh6XCWAkuVIm_7YZvrJBVBZh92Rb5wbq3wEWoPK9O4EWAqBTGUkVY1ibWvU7IpQZPKcYBanapb3OFu9Jpse7TPHSGIsdKTglQtBiH0tWGAZMhnMX9tbnNDDih8kk6suxuR0MabwmJheKAN6VSa-wawIn1xFiN1YJUTwz7BzvDuIPhVLUY9la_ERTDxreAVu6Uib_d_BZvw6d1nZe-X278bsd_TGlsi39XDm7dbmyxe0_N81D8tz7ChyrIxncj1K0iPInTAVY-_lQgcSUR0dukvlXhShdOfiOn70c4GCghv6IzgteWdw3PQnT86Uk6Syfhv-SkG244Fm2Pw49veauee5GrTPbc9kv2zaw7c9_ondyM0Nwz_DYbbQ=s128-no?authuser=0",

//   "https://lh3.googleusercontent.com/rvMPTGWXQxTEaoeQX7VRnijMdlejOfTTWty0HKxbl-Ej6TtyBcqiF5QkOdjnAgDDtAhY--wrwYiJvHwgBVAnB-BbIUhEb7f-PxN9N17gF9LNOyedq_xGJS8w0Kdpre9Zx7-ckjvTuNNCg9iBelvOoWm51GgWUsGlaCw6aWcySyLp1b7w7GTgOvgTezMj5-kTaZUieMj4kELg5HPN_xWS8_izqRWroq_2t7y4ec4jV7S-SeYq0qtv6VY3Gbi9ItXErip1kof8kMFHeaFTQVvKXJyR7FN7lkLcBokdXzBTshAS0hcxrA1EpqDt6AZz8dSzkp6gqcsLHI9_zAKLNAEI5iDVOl8STo_gnF8jkFTWpHVTAnYEaI9ZW-ppFzueUsWasITMM8fLq9bgwRLJpJ1JYsmx_wYFDyXALJQU0gQVlWIumVJodFBt5WxD7ElI84fVOZl_YF1VeGE2QQSaFk4vMe57J6TZkHe97CA03jrrm4NR38KzKmud2Kde1-evhEmlEuXq9Gz87cnfM5KRMQhkUpEo1CWNJEhiJBr9acbJv7cYZQndgM_fuYaD-AX1gkfsP7aBtum22rpIDZaeL5q-FyXkllf54rupyJHfH3gLhksW1uDuNnSMTZsc4EUCOEXqtUFuxXvxJtdKICpNNzDUF6DmGdgeGGFI_w14zJfj0fxpxTyrE0P0JyqMBDQ4k6I78UVb0LQYheIpEVqAmp2lNJ9Q5pj7uPoktZLJ6q9QgzSaHjY97CotTWxODINlYDoHtE_TDbU2eBg0x9_lCQfxxToC2QmjQkauDZnOSxnOnvwb-iSZbWE40VJzdoiIF3Awok4wbTHwxVN_Vfk7sMSYir_9rKExVV97h1okrW-3rSfGLyPGWbJdn-GyGdC5CR6rZXZ6nT-1h9rT66kAyulzUjk_KKHh855BOvsAEGhHgW4NoG8MLu9A0EQjaQ6HeY-mgn-0bN8lSE3zu664V-m6yNgbNZt2tInh-kkEFUOHHe_0rg3Oeig=s128-no?authuser=0",

//   "https://lh3.googleusercontent.com/RlMfL9u5e9-DoWd656JUQh5oh2TBjftdWVMWGx6lXlk7urlJ6cveLa115C-iuuHAEjghXowESairIWy5Jmj1sMqhhwqdQAA6f707PoDJgSrFEJ72PmLhE-DcTrcYc_Z4qy1HPenAfSNWoW3Ourzb51t2pnc3H7JmqF5WcFjHbRnJY2iptexrB_M4bL-a5oW9A3QBc3UuRE6TVoLrXJ6MrhT4O9vxPumg3b4KJ-fNFufQcruTXiqSzFxpKgw63MKGHO-huORERvMeXJ_M8_wY1JJeGCy6elOHZ4VXzdNKm50ZU-myTEUmhV9KmaC5u3mg5gWOu0A_5nVprtqs6KEfMJNPUD2--jz8_hvWW6zLmRLYLIzVjvt0JsW9gETjuSfTqCxzjVJG0zSQe3kIP8Kgied_Bku3OytrhHLZ7Fhv0D9iIQGcoC03R3iJo_ga_pIhkLQws9Q3iZQL87bjP9DtaE-RUAv5KAvhf5Dh6XopGnSS1Pxv1WW2P0qwf9bY6lpC2T8ca4AmjaZQKcu2hSTW2D27hh3w365FDdKwv0zhUZ_9N8nijHIWFydl6LnaFYPqekaOft5JU3P8pj6i-moh8fKBOiwGJgBlfuTNIz1hsuZluR6xUN1dS7769nUCqOMPuI0zYVvaTI0AJidzFPb-Rf1hj2UMrGFHSFsZyKc8J80tKlFqHUCuCjHCawrsrYeqs7I0ysfjOCr9mEJfiUJ_TwzC77trHXSGuRSnwcqAtwA3OtJobrB0qyYiCmodr2hgBv9u_GISXuwPWoo7qtJOuQxSff4C60sJmesOGS-PGxjKZ8Z39-HSmEe0705uV6QqPwHVwLHmPTRhhzWndbQzAWt17hslrOSA09WR5odv2JhE-cK1jvaYj4XkelAutoINgF-ThtEwo5ohYo_n4-Mh13WPg8aJoRC2KUcgGxTuHfW8XwZQSOX-mTFw2MjA0BIDwmftdD96Yn5YQsvidqN_jy-9G-FEPA5Iu8cgRCKpK29DhdwHUec=s128-no?authuser=0",

//   "https://lh3.googleusercontent.com/X4EnlJ8iUvZMJFHHezak-ZLhMccRSyR6w9SNKGhw5gUUu7_JGQ-1w86Wueu8Z46HUDfbRdxHnurVKbRUIvExPZOGV2zavLDShnP53XKJaCGUvyWYs9UCEnoxH1BkJhLGDhQqJj-jYTrPyRY9HXHysIvufuOAs6EIkgBor1BNenUd2HCsVtmfn6NLMx7sPNPpXhCg28_zY932QnS4Kn3QmdvOCapH9tz0BqqHxjOxDoRIbbuZ-J0fL_M5t0PtEVyNPAr8EeDjrcaWnhHSbXx9VwwXeLHYpbPKdt7fVvsPDCoCuxfjIAVUCBPaUK_AzIgl50MXzQCAVdKmHH9oeXO2UE-J8vcjrA0C-ce1ncmwtcTiv8UoJSk_aAjlDqM3-FJA7gP5J92iEG4qYgdqPtRWDEJ6zlSKBUvHJE0gHiYwZ2bF5-DXjzjo6ZBnj4H881I9EmRycYVaaR0dVAphXQe6mQJvbXzf6z0BZeGwUYWMwPqyvr_upA6Oe2qWwtfFJURsh8CDBWzMvvaR4vRrmo00aUn3SPu1rABy8wf7zgS0MgN3bAzKuTuJ4ot9BBM3cEy25fkLXfZCwn2g2wgq4v4Jnc-eADg5aoFtJuxFAkgL1to6CIxyvfojJ-Hxa9zwgd0cWgvHD3QBdnGkTiHSSWV2sufxXq0l-dvbW44X-Fk2VcrkfkPDXerYhhPMFWvtT4z-zC6nxtRwfj1QFMffndNtrcNgalUF_mCgZ0_vJ3ipvQNTZmHHpipvU2LiqYGmtWvBLC7P-meDaiVhLinJGblhBIKjSE-Swf-NRBFG25H1Ldqgk1v9Cpfz99cX1pvXwA5ThFAoSpdF2ZK-ICX3Jk8cWZKOsLSwu_Jn99ZlQavzwlFfyN1lM9h3N9v0p_AfGPM8tBEsbYzkuGL2kT6zbOIENstkY6gEo08HScTSFcHf1SJftEVyowRDNh1b07JvoErU20676U4gaEix-i4JZlKws56UE0dmi6Uk-Vm8TeIfuF-PwVdj3TU=s128-no?authuser=0",

//   "https://lh3.googleusercontent.com/TUq5GmKVFW-awLJ0Zb7doyLA4as09-uO20tvyQ2C-eCKYd_AOWpyTVLO6hmY9-M66gDLjUCXPvwkz7hQG_f3n7nKEziR5Cy9_ScHF5C6FYlVnePWaU6mE_AJFfJ3LzU3j84OOvOr0uaJsIzHcatRAfN5qLX1pYkPwWmJdS1vG7lA_EaP6C3TjGxqJEshwyRa80sJPWoqG-i2auuaorwtRcXDpIQ1cdyARy165G_EmZWlziNxD2icwtkfT3TgwZu_Ivi4TAUPMtsoqBvEnvCg8YZ10W5UFVViSpIv49CiHKEFAXYK9i5hHrQ6tzss1kuG_nrN4ceMqaJrcV7kcfGkDBZernyhZZ9jHMFrxzZcdZcLUn5sdCtSVfXMpr3LBIwg2pEJT5_Mr77nYP3tglSlIBYAbFpma5fKALo6RnfuzZoS7nmWmZrrp0hfMvu3_Sac1Q8o061_QbGWmjJM_YaicOUzspOpEYfkSkN-y5q2R7-LDBxSA1ieORR_nH9U4bp9W6JaQD1Bc0fddXRRFOmrxWsE-DZBeVuT4p9UmFi4UcT8z_TEZrlLw9H8aGi1fEBY05wxf0VH8rd52Nn94iyOdxvpv54ufFNO3Q_mkVQgNJqYTGRyNw7iJDatmW45RB0sNuEzuFE9kEmzB8-o3u-bOE_i4jqTZOfizqz_6khoMtEa9ukmjZrvGwEUWn9RwN5RXf4e5QpGqGkZQ-gnskocMjSNZ98G_XqYc8C_QjD6Q5u4o4tfWlOUdBN3ltUEPc2iWYSuO-_J2EP7QLtkdvCit59jHPvGcsUeeKiWwvscquhXXL8Q8HTcLokfaR1KL4DFvlodOxv1SOGS4HDUjKNGeWM9JQHiv-alEtzK4Zx8D7o5NxpEBbtR02dWerUcLSXm3ezsDx7ZCCWO6hqszACFWKg45XRCBMPrp51DvxywU-7K3O1DatKsPJZWAyb0OX2BcnzcE8vcef5gbH5mXv0qOpC8dcWdRb024DRB719aye1WUvFIn3c=s128-no?authuser=0",
// ];
