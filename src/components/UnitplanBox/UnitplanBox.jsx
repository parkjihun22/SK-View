import React, { useEffect, useState } from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import styles from "./UnitplanBox.module.scss";
import room59A from "../../assets/UnitplanBox/52.jpg";
import room59B from "../../assets/UnitplanBox/59A.jpg";
import room84A from "../../assets/UnitplanBox/59B.jpg";
import room84B from "../../assets/UnitplanBox/75A.jpg";
import room114A from "../../assets/UnitplanBox/75B.jpg";
import room114B from "../../assets/UnitplanBox/84A1.jpg";
import room114C from "../../assets/UnitplanBox/84A2.jpg";
import room114D from "../../assets/UnitplanBox/84B.jpg";
import room114E from "../../assets/UnitplanBox/84C.jpg";
import room114F from "../../assets/UnitplanBox/84D.jpg";
import { useMediaQuery } from "react-responsive";

// (예시) 이미지/타입 목록
const contents = [
  { type: "52㎡", src: room59A },
  { type: "59A", src: room59B },
  { type: "59B", src: room84A },
  { type: "75A", src: room84B },
  { type: "75B", src: room114A },
  { type: "84A1", src: room114B },
  { type: "84A2", src: room114C },
  { type: "84B", src: room114C },
  { type: "84C", src: room114C },
  { type: "84D", src: room114C },
];

const UnitplanBox = () => {
  const [istype, setIsType] = useState(contents[0]); // 기본값은 첫 번째 객체
  const [isIdx, setIdx] = useState(0);
  const [isImage, setIsImage] = useState(room59A);
  const [isLeft, setIsLeft] = useState(false);
  const [isRight, setIsRight] = useState(true);
  const [animationClass, setAnimationClass] = useState(""); // 애니메이션 클래스 상태
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" }); // 모바일 여부

  // istype 변경 시 이미지 변경 + 페이드 애니메이션
  useEffect(() => {
    setAnimationClass(styles.fadeIn);
    setIsImage(istype.src);

    const timeout = setTimeout(() => {
      setAnimationClass("");
    }, 500);

    return () => clearTimeout(timeout);
  }, [istype]);

  // isIdx에 따라 좌우 버튼 활성화 상태 변경
  useEffect(() => {
    setIsLeft(isIdx > 0);
    setIsRight(isIdx < contents.length - 1);
  }, [isIdx]);

  // 왼쪽 화살표 클릭
  const leftArray = () => {
    if (isIdx > 0) {
      const newIndex = isIdx - 1;
      setIsType(contents[newIndex]);
      setIdx(newIndex);
    }
  };

  // 오른쪽 화살표 클릭
  const rightArray = () => {
    if (isIdx < contents.length - 1) {
      const newIndex = isIdx + 1;
      setIsType(contents[newIndex]);
      setIdx(newIndex);
    }
  };

  return (
    <>
      {/* 타입 버튼들 */}
      <div className={styles.btnContainer}>
        {contents.map((value, idx) => (
          <div
            key={idx}
            className={
              value.type === istype.type ? styles.clickedTypeBtn : styles.typeBtn
            }
            onClick={() => {
              setIsType(value);
              setIdx(idx);
            }}
          >
            {value.type}
          </div>
        ))}
      </div>

      {/* 이미지 + 좌우 화살표 */}
      <div className={styles.imgContainer}>
        <AiOutlineLeft
          className={styles.arrowIcon}
          size={!isMobile ? 60 : 20} // 데스크톱/모바일 크기
          color={isLeft ? "#d1af73" : "#eedec3"}
          onClick={isLeft ? leftArray : undefined}
        />
        <img
          className={`${styles.typeImg} ${animationClass}`}
          src={isImage}
          alt={istype.type}
        />
        <AiOutlineRight
          className={styles.arrowIcon}
          size={!isMobile ? 60 : 20}
          color={isRight ? "#d1af73" : "#eedec3"}
          onClick={isRight ? rightArray : undefined}
        />
      </div>
    </>
  );
};

export default UnitplanBox;
