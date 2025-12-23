import React, { useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { Paperclip, ExternalLink, Trash2, Lightbulb } from "lucide-react";

// 디자인 가이드 색상
const PRIMARY = "#3338A0";
const TEXT_DARK = "#111827";
const TEXT_GRAY = "#6B7280";
const BORDER_LIGHT = "#E5E7EB";

// --- 가상 데이터 ---
const MOCK_CONTEST = {
  organizer: "세종대 캠퍼스타운",
  title: "입주경진대회 입주기업 모집 공고",
  tags: ["캠퍼스타운", "창업 7년 미만", "AI 우대"],
  leftDays: 12,
  url: "https://example.com",
};

// 초기 사업계획서 내용 (수정 가능하도록 상태로 관리 예정)
const INITIAL_PLAN_DATA = [
  {
    title: "1. 문제인식 (Problem)",
    sub: [
      { id: "1-1", label: "창업아이템 배경 및 필요성", content: "STARTMATE는 대학생 창업팀들의 고질적인 문제인 서류 작성의 높은 허들을 해결하고자 합니다. 대부분의 팀이 우수한 기술력을 가지고 있음에도 불구하고 복잡한 양식과 작성법 때문에 기회를 놓치곤 합니다." },
      { id: "1-2", label: "창업아이템 목표시장 (고객) 설정 및 요구사항 분석", content: "주요 타깃은 초기 창업 단계를 지나고 있는 대학생 스타트업 및 예비 창업자입니다. 이들은 풍부한 아이디어에 비해 행정적 처리에 익숙하지 않으며, 효율적인 업무 분배를 필요로 합니다." }
    ]
  },
  {
    title: "2. 실현가능성 (Solution)",
    sub: [
      { id: "2-1", label: "창업아이템 개발, 개선 준비현황", content: "현재 MVP 개발이 완료되어 클로즈드 베타 테스트를 진행 중입니다. 자체 구축한 LLM 모델을 통해 사업계획서 각 항목별 최적화된 문구를 생성할 수 있습니다." },
      { id: "2-2", label: "창업아이템 실현 (개선, 개발) 및 구체화 방안", content: "사용자가 핵심 키워드와 기술적 장점만 입력하면 AI가 문맥에 맞는 전문 용어를 섞어 설득력 있는 문서를 만듭니다." }
    ]
  }
];

// --- 서브 컴포넌트: 상태 배지 ---
function StatusBadge({ status }) {
  const isRed = status === "첨부 필요";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      height: 24, padding: "0 10px", borderRadius: 4, fontSize: 12, fontWeight: 700,
      color: isRed ? "#DC2626" : PRIMARY,
      background: isRed ? "#FEE2E2" : "#E0E7FF",
      border: `1px solid ${isRed ? "#FCA5A5" : "#C7D2FE"}`,
      whiteSpace: "nowrap",
    }}>
      {status}
    </span>
  );
}

// --- 서브 컴포넌트: 사업계획서 편집 화면 (버튼 하단 배치) ---
function BusinessPlanEditor({ planData, setPlanData, onComplete }) {
  const handleChange = (sIdx, subIdx, value) => {
    const nextData = [...planData];
    nextData[sIdx].sub[subIdx].content = value;
    setPlanData(nextData);
  };

  return (
    <section>
      {planData.map((sec, sIdx) => (
        <div key={sIdx} style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: PRIMARY, borderBottom: `2px solid ${PRIMARY}`, paddingBottom: 15, marginBottom: 30 }}>
            {sec.title}
          </h2>
          {sec.sub.map((sub, subIdx) => (
            <div key={sub.id} style={{ marginBottom: 40 }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: TEXT_DARK, marginBottom: 15 }}>
                {sub.id}. {sub.label}
              </h3>
              {/* 글자가 잘리지 않는 넉넉한 입력창 */}
              <textarea
                value={sub.content}
                onChange={(e) => handleChange(sIdx, subIdx, e.target.value)}
                style={{
                  width: "100%",
                  minHeight: "260px",
                  padding: "24px",
                  borderRadius: "12px",
                  border: `1px solid ${BORDER_LIGHT}`,
                  background: "#F9FAFB",
                  fontSize: "16px",
                  lineHeight: "1.8",
                  color: "#374151",
                  fontFamily: "inherit",
                  resize: "vertical",
                  outline: "none",
                  boxSizing: "border-box",
                  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)"
                }}
              />
            </div>
          ))}
        </div>
      ))}

      {/* --- 하단 버튼 영역: 낑기지 않게 넉넉히 배치 --- */}
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        gap: "16px", 
        marginTop: "80px", 
        paddingTop: "40px", 
        borderTop: `1px solid ${BORDER_LIGHT}` 
      }}>
        <button 
          onClick={onComplete}
          style={{ 
            background: PRIMARY, color: "#fff", border: "none", 
            padding: "16px 48px", borderRadius: 10, fontWeight: 800, 
            cursor: "pointer", fontSize: "16px", boxShadow: "0 4px 12px rgba(51, 56, 160, 0.2)"
          }}
        >
          작성 완료하기
        </button>
        <button style={{ 
          background: "#E5E7EB", color: "#4B5563", border: "none", 
          padding: "16px 48px", borderRadius: 10, fontWeight: 800, 
          cursor: "pointer", fontSize: "16px" 
        }}>
          임시 저장
        </button>
      </div>
    </section>
  );
}

// --- 메인 페이지 컴포넌트 ---
export default function ContestApplyPage() {
  const { id } = useParams();
  const fileRef = useRef(null);
  
  // 상태 관리 (상위에서 관리하여 화면 전환 시에도 데이터 유지)
  const [hasTemplate, setHasTemplate] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [docs, setDocs] = useState([]);
  const [planData, setPlanData] = useState(INITIAL_PLAN_DATA);
  
  const contest = useMemo(() => MOCK_CONTEST, []);

  // 양식 첨부 핸들러
  const onAttachFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileName = e.target.files[0].name;
      // 리스트 데이터 업데이트
      setDocs([
        { id: "d1", status: "생성 완료", name: "캠퍼스타운_사업계획서", updatedAt: "2025.12.11", action: "수정" },
        { id: "d2", status: "첨부 완료", name: fileName, updatedAt: "방금 전", action: "수정" },
        { id: "d3", status: "첨부 필요", name: "대표자_신분증 사본", updatedAt: "", action: "업로드" },
        { id: "d4", status: "첨부 필요", name: "대표자_통장 사본", updatedAt: "", action: "업로드" },
      ]);
      setHasTemplate(true);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "Pretendard, sans-serif" }}>
      <Header />

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 20px 120px" }}>
        
        {/* --- 상단 공고 정보 카드: 어떤 화면에서도 사라지지 않게 항상 노출 --- */}
        <section style={{ background: "#F7F7F8", borderRadius: 12, padding: "32px 40px", marginBottom: 60, border: `1px solid ${BORDER_LIGHT}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{contest.organizer}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#111827", marginBottom: 16 }}>{contest.title}</div>
              <div style={{ display: "flex", gap: 8 }}>
                {contest.tags.map((t) => (
                  <span key={t} style={{ background: "#E0E7FF", color: PRIMARY, borderRadius: 4, padding: "6px 12px", fontSize: 13, fontWeight: 700 }}>{t}</span>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 20 }}>
              <div style={{ display: "flex", gap: 10 }}>
                <button style={{ height: 38, padding: "0 18px", borderRadius: 8, border: "1px solid #D1D5DB", background: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                  홈페이지 확인 <ExternalLink size={14} />
                </button>
                <button 
                  onClick={() => fileRef.current?.click()} 
                  style={{ height: 38, padding: "0 18px", borderRadius: 8, border: `1px solid ${PRIMARY}`, background: "#fff", color: PRIMARY, fontSize: 13, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
                >
                  <Paperclip size={16} /> 양식 첨부하기
                </button>
                <input ref={fileRef} type="file" style={{ display: "none" }} onChange={onAttachFile} />
              </div>
              <div style={{ width: 400 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#111827", background: "#E5E7EB", padding: "3px 10px", borderRadius: 6 }}>{contest.leftDays}일 남음</span>
                </div>
                <div style={{ height: 10, borderRadius: 10, background: "#E5E7EB", overflow: "hidden" }}>
                  <div style={{ width: "70%", height: "100%", background: PRIMARY }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 조건부 렌더링 영역 --- */}
        {isEditing ? (
          /* 1. 사업계획서 수정 화면 */
          <BusinessPlanEditor 
            planData={planData} 
            setPlanData={setPlanData} 
            onComplete={() => setIsEditing(false)} 
          />
        ) : !hasTemplate ? (
          /* 2. 양식 미첨부 빈 화면 (슬픈 얼굴) */
          <section style={{ padding: "120px 0", textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
              <div style={{ width: 84, height: 84, borderRadius: "50%", background: "#EEF2FF", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", border: "1px solid #E0E7FF" }}>
                <div style={{ display: "flex", gap: 14, marginBottom: 12 }}>
                  <div style={{ width: 6, height: 6, background: "#A5B4FC", borderRadius: "50%" }} />
                  <div style={{ width: 6, height: 6, background: "#A5B4FC", borderRadius: "50%" }} />
                </div>
                <div style={{ width: 28, height: 14, borderTop: "3px solid #A5B4FC", borderRadius: "50% 50% 0 0", marginTop: 4 }} />
              </div>
            </div>
            <h2 style={{ fontSize: "22px", fontWeight: "900", color: "#111827", marginBottom: 12 }}>필요한 양식이 첨부되지 않았어요</h2>
            <p style={{ fontSize: "16px", fontWeight: "700", color: "#4B5563" }}>제출 양식을 첨부해주시면 이에 맞게 작성해드릴게요!</p>
          </section>
        ) : (
          /* 3. 지원 서류 관리 리스트 화면 */
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
              <h2 style={{ fontSize: 26, fontWeight: 900, color: TEXT_DARK, margin: 0 }}>지원 서류 관리</h2>
              <button style={{ fontSize: 13, fontWeight: 800, color: PRIMARY, background: "#fff", border: `1px solid ${PRIMARY}`, padding: "8px 16px", borderRadius: 6, cursor: "pointer" }}>
                .zip 으로 다운로드
              </button>
            </div>
            <div style={{ background: "#EEF2FF", padding: "18px 24px", borderRadius: 4, display: "flex", alignItems: "center", gap: 12, marginBottom: 32, border: "1px solid #C7D2FE" }}>
              <Lightbulb size={20} color={PRIMARY} fill={PRIMARY} />
              <span style={{ fontSize: 14, fontWeight: 700, color: "#1F2937" }}>해당 공모전은 AI 기술 활용에 가산점을 부여합니다.</span>
            </div>
            <div style={{ borderTop: `1.5px solid ${TEXT_DARK}` }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", padding: "14px 20px", background: "#F3F4F6", borderBottom: `1px solid ${BORDER_LIGHT}`, fontSize: 13, fontWeight: 900, color: TEXT_DARK }}>
                <div style={{ textAlign: "center" }}>필요 서류</div>
                <div style={{ textAlign: "center" }}>관리</div>
              </div>
              {docs.map((d) => (
                <div key={d.id} style={{ display: "grid", gridTemplateColumns: "1fr 140px", padding: "20px", alignItems: "center", borderBottom: `1px solid ${BORDER_LIGHT}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <StatusBadge status={d.status} />
                    <div style={{ fontSize: 15, fontWeight: 900, color: d.status === "첨부 필요" ? "#9CA3AF" : PRIMARY }}>{d.name}</div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", gap: 14 }}>
                    <button onClick={() => { if(d.name.includes("사업계획서")) setIsEditing(true); }} style={{ padding: "8px 24px", borderRadius: 2, border: `1px solid #D1D5DB`, background: "#fff", fontSize: 13, fontWeight: 800, cursor: "pointer" }}>
                      {d.action}
                    </button>
                    <Trash2 size={20} color="#9CA3AF" style={{ cursor: "pointer" }} />
                  </div>
                </div>
              ))}
            </div>
            {/* 리스트 하단에도 제출하기 버튼을 추가하여 흐름 보완 */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: 60 }}>
                <button style={{ background: PRIMARY, color: "#fff", border: "none", padding: "16px 60px", borderRadius: 10, fontWeight: 800, cursor: "pointer", fontSize: "16px" }}>
                    최종 제출하기
                </button>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}