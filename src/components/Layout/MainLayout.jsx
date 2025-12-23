import React from "react";
import Sidebar from "../Navigation/Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({
  children,
  sidebarItems,
  activeSection,
  onSectionClick,
  progressPercent,
}) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F9FAFB",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 상단 헤더 */}
      <Header />

      {/* 사이드바 (position: fixed) */}
      <Sidebar
        menuItems={sidebarItems}
        activeSection={activeSection}
        onSectionClick={onSectionClick}
        progressPercent={progressPercent}
      />

      {/* ⭐ 핵심: 메인 영역 */}
      <main
        style={{
          flex: 1,
          paddingTop: "96px",

          // ❌ margin-left 사용하지 말 것
          // marginLeft: "300px",

          // ✅ 사이드바 영역만 피하기
          paddingLeft: "300px",
          paddingRight: "24px",

          // ✅ 중앙 정렬
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* 실제 콘텐츠 컨테이너 */}
        <div
          style={{
            width: "100%",
            maxWidth: "920px", // ← 입력 폼 최대 폭
          }}
        >
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
