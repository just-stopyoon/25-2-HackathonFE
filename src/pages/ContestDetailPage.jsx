import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Share2, Printer } from "lucide-react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";

const ContestDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ 백엔드 안 붙어도 UI 확인 가능하도록 mock fallback
  const MOCK = {
    title: "입주경진대회 입주기업 모집 공고",
    organizer: "세종대 캠퍼스타운",
    tags: ["캠퍼스타운", "창업 7년 미만", "AI 우대"],
    poster:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
    eligibility: "창업 7년 미만, 39세 이하 예비창업자, 기타(상세 공고 확인)",
    preferred: "AI/SW 기술기반 서비스, 글로벌 창업, 교수창업, 실험실창업",
    support: "공간 제공, 창업활동비, 네트워킹/컨설팅 등(상세 공고 확인)",
    deadline: "11/15 (금)",
    url: "https://example.com",
  };

  useEffect(() => {
    const fetchContestDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/competitions/${id}`);
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();

        setContest({
          title: data.name,
          organizer: data.organizer,
          tags: data.tracks || [],
          poster:
            data.image ||
            "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
          eligibility: data.eligibility || "상세 공고 확인",
          preferred: data.preferred || data.description || "상세 공고 확인",
          support: data.support || "지원금 및 공간 지원 (상세 내용 참조)",
          deadline: data.deadline || "-",
          url: data.url,
        });
      } catch (e) {
        setContest(MOCK);
      } finally {
        setLoading(false);
      }
    };

    fetchContestDetail();
  }, [id]);

  if (loading)
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ color: "var(--text-muted)" }}>공모전 상세 정보를 불러오는 중...</div>
      </div>
    );

  if (!contest)
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ color: "var(--error)" }}>공모전을 찾을 수 없습니다.</div>
      </div>
    );

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      <Header />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "var(--spacing-xl) var(--spacing-md)" }}>
        <div style={{ marginBottom: "var(--spacing-xl)" }}>
          <div style={{ color: "var(--text-muted)", fontWeight: 600, marginBottom: "var(--spacing-sm)" }}>
            {contest.organizer}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: 800, lineHeight: 1.3, maxWidth: "800px", color: "var(--text-main)" }}>
              {contest.title}
            </h1>

            <div style={{ display: "flex", gap: "var(--spacing-md)" }}>
              <Star size={24} color="var(--text-muted)" style={{ cursor: "pointer" }} />
              <Share2 size={24} color="var(--text-muted)" style={{ cursor: "pointer" }} />
            </div>
          </div>

          <div style={{ display: "flex", gap: "var(--spacing-sm)", marginTop: "var(--spacing-md)" }}>
            {(contest.tags || []).map((tag, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--primary)",
                  backgroundColor: "#e0e7ff",
                  padding: "6px 10px",
                  borderRadius: 4,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <hr style={{ border: "none", borderTop: "2px solid var(--primary)", marginBottom: "var(--spacing-xl)" }} />

        <div style={{ display: "flex", gap: "var(--spacing-xl)", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 600px", display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
            <div
              style={{
                width: "100%",
                minHeight: "800px",
                backgroundColor: "#f1f5f9",
                backgroundImage: `url(${contest.poster})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "var(--radius-md)",
              }}
            />
          </div>

          <div style={{ flex: "0 0 320px", display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
            <div
              style={{
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "var(--spacing-lg)",
                backgroundColor: "white",
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "var(--spacing-md) var(--spacing-sm)", fontSize: "0.9rem" }}>
                <div style={{ fontWeight: 600, color: "var(--text-muted)" }}>신청자격</div>
                <div style={{ fontWeight: 500 }}>{contest.eligibility || "-"}</div>

                <div style={{ fontWeight: 600, color: "var(--text-muted)" }}>우대분야</div>
                <div style={{ fontWeight: 500 }}>{contest.preferred || "-"}</div>

                <div style={{ fontWeight: 600, color: "var(--text-muted)" }}>지원내용</div>
                <div style={{ fontWeight: 500 }}>{contest.support || "-"}</div>

                <div style={{ fontWeight: 600, color: "var(--text-muted)" }}>마감일</div>
                <div style={{ fontWeight: 800, color: "var(--primary)" }}>{contest.deadline}</div>
              </div>

              <div style={{ marginTop: "var(--spacing-xl)", display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
                {/* ✅ 여기서 /contest/:id/apply 로 이동 */}
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/contest/${id}/apply`)}
                  style={{ width: "100%", padding: "12px", fontSize: "1rem", display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}
                >
                  <Printer size={18} /> 지원 준비하기
                </button>

                <button
                  onClick={() => contest.url && window.open(contest.url, "_blank")}
                  style={{
                    width: "100%",
                    padding: "12px",
                    fontSize: "1rem",
                    backgroundColor: "white",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    cursor: "pointer",
                  }}
                >
                  홈페이지 확인
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContestDetailPage;
