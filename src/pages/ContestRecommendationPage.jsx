// src/pages/ContestRecommendationPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import SearchBar from "../components/Search/SearchBar";
import ContestCard from "../components/Card/ContestCard";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import { ChevronDown } from "lucide-react";

// 메인 컬러
const PRIMARY = "#3338A0";

// Placeholder images to cycle through (백엔드 전까지 유지)
const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
];

export default function ContestRecommendationPage() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // (백엔드 미연결이면) 화면이 깨지지 않게 샘플 데이터도 준비
  const fallbackContests = useMemo(
    () => [
      {
        id: 1,
        title: "2025 입주기업 모집공고",
        organization: "세종대 캠퍼스타운",
        dueDate: "11/15 (금)",
        categories: ["캠퍼스타운", "창업 7년 미만", "AI 우대"],
        image: PLACEHOLDER_IMAGES[0],
      },
      {
        id: 2,
        title: "KU 스타트업 스케일업: KU IR CAMP",
        organization: "건국대 캠퍼스타운",
        dueDate: "07/08 (월)",
        categories: ["1:1 멘토링", "서류만 심사", "AI 우대"],
        image: PLACEHOLDER_IMAGES[2],
      },
      {
        id: 3,
        title: "2025년 딥테크 챌린지 프로젝트",
        organization: "범부처 통합연구지원시스템",
        dueDate: "04/30 (화)",
        categories: ["R&D 사업", "서류 평가", "스케일업"],
        image: PLACEHOLDER_IMAGES[4],
      },
      {
        id: 4,
        title: "2025 입주기업 모집공고",
        organization: "세종대 캠퍼스타운",
        dueDate: "11/15 (금)",
        categories: ["캠퍼스타운", "창업 7년 미만", "AI 우대"],
        image: PLACEHOLDER_IMAGES[1],
      },
      {
        id: 5,
        title: "KU 스타트업 스케일업: KU IR CAMP",
        organization: "건국대 캠퍼스타운",
        dueDate: "07/08 (월)",
        categories: ["1:1 멘토링", "서류만 심사", "AI 우대"],
        image: PLACEHOLDER_IMAGES[3],
      },
      {
        id: 6,
        title: "2025년 딥테크 챌린지 프로젝트",
        organization: "범부처 통합연구지원시스템",
        dueDate: "04/30 (화)",
        categories: ["R&D 사업", "서류 평가", "스케일업"],
        image: PLACEHOLDER_IMAGES[0],
      },
    ],
    []
  );

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/competitions/recommend");
        if (!response.ok) throw new Error("Failed to fetch recommendations");

        const data = await response.json();

        const mappedData = data.map((item, index) => ({
          id: item.id || index,
          title: item.name,
          organization: item.organizer,
          dueDate: item.deadline,
          categories: item.tracks || [],
          image: PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length],
        }));

        setContests(mappedData);
      } catch (err) {
        console.error("Error fetching contests:", err);
        // 백엔드 아직이면 에러 띄우지 말고 fallback으로 보여주기 (UI 검수용)
        setError(null);
        setContests(fallbackContests);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, [fallbackContests]);

  // 상단 필터 chip(지금 UI 고정)
  const filterChips = ["캠퍼스타운 공모전", "예비창업자 패키지", "중소기업 벤처사업부 / 기획"];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      <Header />

      {/* ❗ 잘림 방지: main에 padding-top 크게 주고, 헤더 높이에 영향을 덜 받게 */}
      <main
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "40px 24px 80px",
        }}
      >
        {/* Search */}
        <section style={{ marginTop: 8 }}>
          <SearchBar />
        </section>

        {/* Divider Line (검색바 아래 보라 라인 느낌) */}
        <div
          style={{
            height: 2,
            backgroundColor: PRIMARY,
            opacity: 0.9,
            marginTop: 12,
            marginBottom: 24,
          }}
        />

        {/* Filter Chips Row */}
        <div
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          {filterChips.map((chip) => (
            <button
              key={chip}
              style={{
                border: "1px solid #E5E7EB",
                background: "#EEF2FF",
                color: PRIMARY,
                borderRadius: 999,
                padding: "14px 22px",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* ================= 타이틀 영역 (네가 원하는 한 줄 버전) ================= */}
        <section
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
            marginBottom: 28,
          }}
        >
          {/* 왼쪽: 한 줄 타이틀 */}
          <h1
            style={{
              margin: 0,
              fontSize: 34, // 스샷 느낌: 큼직하지만 과하지 않게
              fontWeight: 800,
              lineHeight: 1.35,
              color: "#111827",
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                border: "none",
                background: "transparent",
                color: PRIMARY,
                fontWeight: 800,
                cursor: "pointer",
                padding: 0,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: "inherit",
              }}
            >
              인공지능 활용 기술 <ChevronDown size={22} />
            </button>

            <span>을 활용한</span>

            <button
              style={{
                border: "none",
                background: "transparent",
                color: PRIMARY,
                fontWeight: 800,
                cursor: "pointer",
                padding: 0,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: "inherit",
              }}
            >
              세종대학교 <ChevronDown size={22} />
            </button>

            <span>학생을 위한 공고 추천</span>
          </h1>

          {/* 오른쪽: 말풍선 */}
          <div
            style={{
              backgroundColor: "#111827",
              color: "#ffffff",
              padding: "10px 14px",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            우리 서비스에 유리한 공모전을 확인해보세요.
          </div>
        </section>

        {/* Loading / Error / Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: 48, color: "#6B7280", fontWeight: 500 }}>
            추천 공모전을 불러오는 중입니다...
          </div>
        ) : error ? (
          <div style={{ textAlign: "center", padding: 48, color: "#EF4444", fontWeight: 500 }}>
            {error}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
              gap: 20,
              paddingBottom: 24,
            }}
          >
            {contests.map((contest) => (
              <ContestCard key={contest.id} {...contest} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
