import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/Search/SearchBar";
import ContestCard from "../components/Card/ContestCard";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";

const PRIMARY = "#3338A0";

// Placeholder images to cycle through
const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
];

// 백엔드 안 붙었을 때 UI 확인용 mock
const MOCK_CONTESTS = [
  {
    id: "m1",
    title: "2025 입주기업 모집공고",
    organization: "세종대 캠퍼스타운",
    dueDate: "11/15 (금)",
    categories: ["캠퍼스타운", "창업 7년 미만", "AI 우대"],
    image: PLACEHOLDER_IMAGES[0],
  },
  {
    id: "m2",
    title: "KU 스타트업 스케일업: KU IR CAMP",
    organization: "건국대 캠퍼스타운",
    dueDate: "07/08 (월)",
    categories: ["1:1 멘토링", "서류만 심사", "AI 우대"],
    image: PLACEHOLDER_IMAGES[2],
  },
  {
    id: "m3",
    title: "2025년 딥테크 챌린지 프로젝트",
    organization: "범부처 통합연구지원시스템",
    dueDate: "04/30 (화)",
    categories: ["R&D 사업", "서류 평가", "스케일업"],
    image: PLACEHOLDER_IMAGES[3],
  },
  {
    id: "m4",
    title: "2025 입주기업 모집공고",
    organization: "세종대 캠퍼스타운",
    dueDate: "11/15 (금)",
    categories: ["캠퍼스타운", "창업 7년 미만", "AI 우대"],
    image: PLACEHOLDER_IMAGES[1],
  },
  {
    id: "m5",
    title: "KU 스타트업 스케일업: KU IR CAMP",
    organization: "건국대 캠퍼스타운",
    dueDate: "07/08 (월)",
    categories: ["1:1 멘토링", "서류만 심사", "AI 우대"],
    image: PLACEHOLDER_IMAGES[4],
  },
  {
    id: "m6",
    title: "2025년 딥테크 챌린지 프로젝트",
    organization: "범부처 통합연구지원시스템",
    dueDate: "04/30 (화)",
    categories: ["R&D 사업", "서류 평가", "스케일업"],
    image: PLACEHOLDER_IMAGES[3],
  },
];

export default function ContestRecommendationPage() {
  const navigate = useNavigate();
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // SearchBar에서 올려주는 상태(검색/필터) - 지금은 UI용으로만
  const [keyword, setKeyword] = useState("");
  const [activeChip, setActiveChip] = useState("");

  useEffect(() => {
    const fetchContests = async () => {
      setLoading(true);
      setError(null);

      // 저장된 프로젝트 ID 확인
      const projectId = localStorage.getItem("bizstep:projectId");
      if (!projectId) {
        // 프로젝트 ID가 없으면 경고 후 리다이렉트 (또는 Mock 모드)
        alert("프로젝트 정보가 없습니다. 프로젝트를 먼저 생성해주세요.");
        navigate("/project");
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/competitions/recommend/${projectId}`, {
          method: "POST",
        });
        if (!response.ok) throw new Error("Failed to fetch recommendations");

        const data = await response.json();
        const list = data.recommendations || [];
        const mappedData = list.map((item, index) => ({
          id: item.id || index,
          title: item.title,
          organization: item.organizer,
          dueDate: item.deadline,
          categories: item.keywords || [],
          image: PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length],
        }));

        setContests(mappedData);
      } catch (err) {
        // 백엔드 미연결이면 UI 확인 위해 mock으로 보여주기
        console.error(err);
        setError("공모전 정보를 불러오는 중 오류가 발생했습니다. (현재는 Mock 데이터로 보여줄게요)");
        setContests(MOCK_CONTESTS);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, [navigate]);

  // UI 필터링(백엔드 없어도 동작)
  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    return contests.filter((c) => {
      const matchKw =
        !kw ||
        c.title.toLowerCase().includes(kw) ||
        c.organization.toLowerCase().includes(kw) ||
        (c.categories || []).some((t) => String(t).toLowerCase().includes(kw));

      const matchChip = !activeChip || (c.categories || []).includes(activeChip);

      return matchKw && matchChip;
    });
  }, [contests, keyword, activeChip]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      <Header />

      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          // ✅ 여기만 늘리면 “위가 바짝 붙는 느낌” 해결됨
          // Header가 fixed일 가능성까지 고려해서 여유 있게 64px로
          padding: "64px 20px 72px",
        }}
      >
        {/* ✅ SearchBar가 검색/라인/칩까지 “한 번만” 렌더하도록 */}
        <section
          style={{
            // ✅ 첫 블록이 더 여유 있게 내려오도록
            marginTop: 24,
          }}
        >
          <SearchBar
            primaryColor={PRIMARY}
            value={keyword}
            onChange={setKeyword}
            activeChip={activeChip}
            onChipChange={setActiveChip}
          />
        </section>

        {/* ✅ 너가 원한 타이틀(한 줄) + 말풍선(우측) */}
        <section
          style={{
            marginTop: 40, // ✅ 타이틀도 위와 간격 여유
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 34,
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              fontWeight: 700, // 너무 굵지 않게
              color: "#111827",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <span style={{ color: PRIMARY, fontWeight: 800 }}>인공지능 활용 기술</span>
            <span style={{ fontWeight: 700 }}>을 활용한</span>
            <span style={{ color: PRIMARY, fontWeight: 800 }}>세종대학교</span>
            <span style={{ fontWeight: 700 }}>학생을 위한 공고 추천</span>
          </h1>

          <div
            style={{
              background: "#111827",
              color: "#fff",
              padding: "10px 14px",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            우리 서비스에 유리한 공모전을 확인해보세요.
          </div>
        </section>

        {/* Grid */}
        <section style={{ marginTop: 22 }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "48px 0", color: "#6B7280" }}>
              추천 공모전을 불러오는 중입니다...
            </div>
          ) : error ? (
            <>
              <div style={{ textAlign: "center", padding: "16px 0", color: "#EF4444", fontWeight: 600 }}>
                {error}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gap: 18,
                }}
              >
                {filtered.map((contest) => (
                  <ContestCard
                    key={contest.id}
                    {...contest}
                    primaryColor={PRIMARY}
                    onClick={() => navigate(`/contest/${contest.id}`)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 18,
              }}
            >
              {filtered.map((contest) => (
                <ContestCard
                  key={contest.id}
                  {...contest}
                  primaryColor={PRIMARY}
                  onClick={() => navigate(`/contest/${contest.id}`)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
