import React, { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import styles from './Popup.module.scss'
import page1 from '../../assets/Popup/page1.jpg'
import page2 from '../../assets/Popup/page2.jpg'
import page3 from '../../assets/Popup/page3.jpg'
import page4 from '../../assets/Popup/page4.jpg'

const popupArray = [
  { img: page1, url: "" },
  { img: page2, url: "https://naver.me/55rUFpYq" },
  { img: page3, url: "" },
  { img: page4, url: "" },
]

const Popup = () => {
  // 팝업이 열려있는지 여부를 추적하는 상태
  const [isClick, setIsClick] = useState(false);

  // 페이지 로드 시 2초 후 팝업이 열리도록 하는 코드 → 잠시 주석 처리
  /*
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClick(true); // 2초 후에 팝업 자동 열기
    }, 3000); // 3초 후에 실행

    return () => clearTimeout(timer);
  }, []);
  */

  return (
    <div className={styles.container}>
      {isClick &&
        <div className={styles.imgContainer}>
          {popupArray.map((value, idx) => (
            <img
              key={idx}
              className={styles.popupImg}
              src={value.img}
              alt={`progio-popup-image-${idx}`}
            />
          ))}
        </div>
      }
      <div className={styles.openPopupBtn} onClick={() => setIsClick(!isClick)}>
        <div className={styles.btnIcon}>
          {isClick
            ? <FaAngleLeft size={20} color={"#FFFFFF"} />
            : <FaAngleRight size={20} color={"#FFFFFF"} />
          }
        </div>
        <div className={styles.btnText}>
          POPUP
        </div>
      </div>
    </div>
  )
}

export default Popup;
