import React, { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import { useMediaQuery } from "react-responsive";
import styles from "./MobilePopup.module.scss";

const MobilePopup = ({ onClosed, popupImage, numbering }) => {
    const [type, setType] = useState(0);
    const [cookies, setCookie] = useCookies();
    const isPopupShown = cookies[`Popup_Cookie${numbering}`];
    const isMobile = useMediaQuery({ query: '(max-width: 900px)' });

    // 유효기간 설정 함수
    const getExpiredDate = (days) => {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return date;
    };

    
    // 원래 쿠키와 팝업 상태를 자동으로 제어하던 코드 → 잠시 주석 처리
    useEffect(() => {
        if (type === 1) {
            const expires = getExpiredDate(1);
            setCookie(`Popup_Cookie${numbering}`, true, { path: '/', expires });
            onClosed(false);
        } else if (type === 2) {
            onClosed(false);
        } else if (isPopupShown) {
            onClosed(false);
        }
    }, [type, cookies]);
    

    return (
        <div className={styles.backgroundContainer}>
            <div className={styles.contentContainer}>
                {/* 각 이미지에 맞는 usemap 설정 */}
                <img
                    className={styles.popupImg}
                    style={!isMobile && numbering === 1 ? { width: '25vw'} : {}}
                    src={popupImage}
                    alt={`hansinduhyue-popup-image${numbering}`}
                    useMap={`#image-map${numbering}`}  
                />

                {/* 이미지 맵 영역 정의 */}
                {numbering === 2 && (
                    <map name="image-map2">
                        <area
                            target="_blank"
                            alt="관심고객등록"
                            title="관심고객등록"
                            href="https://naver.me/55rUFpYq"
                            coords="1,292,359,475"
                            shape="rect"
                        />
                    </map>
                )}

                {numbering === 1 && (
                    <map name="image-map1">
                        <area
                            target="_self"
                            alt="입주자 모집 공고"
                            title="입주자 모집 공고"
                            href="https://naver.me/55rUFpYq"
                            coords="21,452,289,542"
                            shape="rect"
                        />
                        <area
                            target="_self"
                            alt="관심고객등록"
                            title="관심고객등록"
                            href="https://naver.me/55rUFpYq"
                            coords="346,556,656,439"
                            shape="rect"
                        />
                    </map>
                )}

                {numbering === 3 && (
                    <map name="image-map3">
                        <area
                            target="_self"
                            alt="관심고객등록"
                            title=""
                            href=""
                            coords=""
                            shape="rect"
                        />
                        <area
                            target="_self"
                            alt="관심고객등록"
                            title=""
                            href=""
                            coords=""
                            shape="rect"
                        />
                    </map>
                )}

                <div className={styles.btnContainer}>
                    <div className={styles.todayNotOpenBtn} onClick={() => setType(1)}>
                        오늘 하루 보지 않기
                    </div>
                    <div className={styles.closeBtn} onClick={() => setType(2)}>
                        닫기
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MobilePopup;
