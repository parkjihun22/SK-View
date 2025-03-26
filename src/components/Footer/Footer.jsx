import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { IoCall } from "react-icons/io5";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// SCSS 스타일
import styles from "./Footer.module.scss";

// (선택) 팝업 컴포넌트 (필요 없으면 삭제)
import InterestPopup from "../InterestPopup/InterestPopup";

// FAMILY SITE 목록 예시
const partnerSites = [
  { name: "대전 문화자이 SK뷰", url: "https://www.tradexmeds.com/" },

];

const Footer = () => {
  // 모바일 여부 체크
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });

  // FAMILY SITE 열림/닫힘 상태 (사용자 인터랙션용)
  const [isFamilyOpen, setFamilyOpen] = useState(false);

  // (선택) 방문예약 팝업 사용 시 상태 관리
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [registration, setRegistration] = useState({ name: "", phone: "" });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistration((prev) => ({ ...prev, [name]: value }));
  };

  // FAMILY SITE 목록 JSX (재사용)
  const familySiteList = (
    <ul id="family-site-list" className={styles.familyList}>
      {partnerSites.map((site, idx) => (
        <li key={idx}>
          <a href={site.url} target="_blank" rel="noopener noreferrer">
            {site.name}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <footer className={styles.footerContainer}>
      {isMobile ? (
        <div className={styles.mobileWrapper}>
          {/* 상단 로고 */}
          <div className={styles.mobileLogo}>
            <h2>(주)GS건설, (주)SK건설</h2>
            <p>문화자이 SKVIEW</p>
          </div>

          {/* 안내문구 */}
          <div className={styles.mobileInfoText}>
            <p>
              본 웹사이트에서 사용된 사진 및 이미지는 소비자의 이해를 돕기 위한
              것으로 <br />실제와 다를 수 있습니다.
            </p>
            <p>
              단지 주변 개발계획은 인허가 및 정부 정책에 따라 변경 또는 연기,
              취소될 수 있습니다.
            </p>
          </div>

          {/* 전화번호 */}
          <div className={styles.mobilePhone}>
            <IoCall size={20} />
            <span>1533-8848</span>
          </div>

          {/* 시행사/시공사 */}
          <div className={styles.mobileCompany}>
            <div>
              <strong>시&nbsp;행&nbsp;사</strong> (주)GS건설, (주)SK건설
            </div>
            <div>
              <strong>시&nbsp;공&nbsp;사</strong> (주)GS건설, (주)SK건설
            </div>
          </div>

          {/* 방문예약 & FAMILY SITE 버튼 */}
          <div className={styles.mobileButtons}>
            <button
              type="button"
              className={styles.reserveBtn}
              onClick={() => setPopupOpen(true)}
            >
              방문예약 바로가기
            </button>

            <div className={styles.familySite}>
              <button
                type="button"
                className={styles.familyBtn}
                onClick={() => setFamilyOpen(!isFamilyOpen)}
                aria-expanded={isFamilyOpen}
                aria-controls="family-site-list"
              >
                FAMILY SITE {isFamilyOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {/* JS 실행 시 토글에 따른 링크 목록 */}
              {isFamilyOpen && familySiteList}
            </div>
          </div>

          {/* COPYRIGHT */}
          <div className={styles.mobileCopyright}>
            <p>
              COPYRIGHTⓒ 2024 문화자이 SKVIEW INC. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.desktopWrapper}>
            <div className={styles.leftSide}>
              <h2>(주)GS건설, (주)SK건설</h2>
              <p>
                본 웹사이트에서 사용된 사진 및 이미지는 소비자의 이해를 돕기 위한
                것으로 실제와 다를 수 있습니다.
                <br />
                단지 주변 개발계획은 인허가 및 정부 정책에 따라 변경 또는 연기,
                취소될 수 있습니다.
              </p>
            </div>
            <div className={styles.rightSide}>
              <div className={styles.phoneNumber}>
                <IoCall size={24} />
                <span>1533-8848</span>
              </div>
              <div className={styles.companyInfo}>
                <div>
                  <strong>시&nbsp;행&nbsp;사</strong> (주)GS건설, (주)SK건설
                </div>
                <div>
                  <strong>시&nbsp;공&nbsp;사</strong> (주)GS건설, (주)SK건설
                </div>
              </div>
              <div className={styles.buttonRow}>
                <button
                  type="button"
                  className={styles.reserveBtn}
                  onClick={() => setPopupOpen(true)}
                >
                  방문예약 바로가기
                </button>
                <div className={styles.familySite}>
                  <button
                    type="button"
                    className={styles.familyBtn}
                    onClick={() => setFamilyOpen(!isFamilyOpen)}
                    aria-expanded={isFamilyOpen}
                    aria-controls="family-site-list"
                  >
                    FAMILY SITE {isFamilyOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {isFamilyOpen && familySiteList}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.desktopCopyright}>
            <p>
              COPYRIGHTⓒ 2024 문화자이 SKVIEW INC. ALL RIGHTS RESERVED.
            </p>
          </div>
        </>
      )}

      {/* <noscript> 블록: 자바스크립트 미실행 환경에서도 파트너 링크 노출 */}
      <noscript>
        <div className={styles.familySiteNoscript}>
          <h3>FAMILY SITE</h3>
          {familySiteList}
        </div>
      </noscript>

      {/* (선택) 팝업 사용 시 */}
      {isPopupOpen && (
        <InterestPopup
          onClose={() => setPopupOpen(false)}
          registration={registration}
          handleInputChange={handleInputChange}
        />
      )}
    </footer>
  );
};

export default Footer;
