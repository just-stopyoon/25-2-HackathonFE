// src/pages/ProjectInfoPage.jsx
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../components/Layout/MainLayout";
import FormSection from "../components/Form/FormSection";
import TextAreaField from "../components/Form/TextAreaField";

import { FolderOpen, Target, Lightbulb, TrendingUp, Users } from "lucide-react";

// ✅ 메인 컬러
const PRIMARY = "#3338A0";

// ✅ 질문 설정 (placeholder/helpText 더 친절하게 + 전 섹션 tip 채움)
const QUESTION_CONFIG = [
  // 1) 서비스 핵심 정보
  {
    id: "1-1",
    label: "서비스(아이디어) 이름이 무엇인가요?",
    question: "서비스 이름이 무엇인가요?",
    placeholder: "예: BIZSTEP / MINDI / SNAPINFO 처럼 짧고 기억하기 쉬운 이름을 적어주세요.",
    helpText: "기억하기 쉽고 서비스의 특징을 잘 나타내는 이름이 좋습니다.",
    minHeight: "52px",
  },
  {
    id: "1-2",
    label: "이 서비스를 한 문장으로 소개해 주세요.",
    question: "한 줄 소개를 해주세요.",
    placeholder: "예: 공모전 준비를 자동으로 정리해주는 창업팀 문서 도우미",
    helpText: "서비스의 핵심 가치를 가장 잘 드러내는 한 문장을 작성해주세요.",
    minHeight: "52px",
  },
  {
    id: "1-3",
    label: "이 서비스를 만들게 된 계기나 문제 상황을 알려주세요.",
    question: "서비스 계기 및 문제 상황",
    placeholder:
      "예: 공모전/지원사업 준비할 때 팀이 해야 할 문서가 너무 많고, 매번 양식이 달라서 정리하다가 시간을 다 쓰는 문제가 있었어요.",
    helpText: "개인 경험/관찰한 상황을 기준으로 ‘왜 필요했는지’를 구체적으로 적어주세요.",
    minHeight: "110px",
  },

  // 2) 문제 인식 & 고객 정의
  {
    id: "2-1",
    label: "이 서비스가 해결하려는 핵심 문제는 무엇인가요?",
    question: "핵심 문제는 무엇인가요?",
    placeholder:
      "예: 창업팀이 ‘서류/사업계획서/자료정리’에 시간을 너무 많이 쓰고, 정작 개발·검증을 못하는 문제",
    helpText: "표면 현상(시간이 없다)보다 ‘근본 원인(구조/프로세스)’을 적어주세요.",
    minHeight: "52px",
  },
  {
    id: "2-2",
    label: "이 문제를 가장 크게 겪는 사람은 누구인가요?",
    question: "타겟 고객은 누구인가요?",
    placeholder: "예: 대학생 창업팀 PM(기획 담당) / 공모전 준비 중인 팀 리더",
    helpText: "구체적인 대상(누구/언제/어떤 상황)을 적어주면 설득력이 올라가요.",
    minHeight: "52px",
  },
  {
    id: "2-3",
    label: "기존에는 이 문제를 어떻게 해결하고 있었나요?",
    question: "기존 해결 방식",
    placeholder: "예: 노션 템플릿 복붙 + 구글링 + 팀원에게 자료 요청 + GPT로 초안 생성",
    helpText: "현재 사람들이 실제로 쓰는 대체재(노션/엑셀/구글/기존 서비스)를 적어주세요.",
    minHeight: "52px",
  },
  {
    id: "2-4",
    label: "기존 방식의 불편한 점을 적어주세요. (3개 이상)",
    question: "기존 방식의 불편한 점",
    placeholder:
      "1) 자료가 흩어져서 찾기 어렵다\n2) 양식이 매번 달라서 반복 작업이 많다\n3) 협업/버전 관리가 번거롭다\n(최소 3개 이상)",
    helpText: "‘왜 불편한지’까지 한 줄씩 이유를 붙이면 좋아요.",
    minHeight: "110px",
  },

  // 3) 개요 & 실현 가능성
  {
    id: "3-1",
    label: "이 문제를 해결하기 위한 핵심 기능을 적어주세요.",
    question: "핵심 기능",
    placeholder: "예: (1) 질문 기반 입력 폼 (2) 사업계획서 자동 초안 생성 (3) 공모전 추천",
    helpText: "기능은 3~5개 정도가 가장 보기 좋아요.",
    minHeight: "52px",
  },
  {
    id: "3-2",
    label: "기존 방식과 비교했을 때, 우리 서비스의 가장 큰 차별점은 무엇인가요?",
    question: "차별점",
    placeholder: "예: ‘문서 작성 → 공모전 추천 → 제출 준비’까지 한 번에 이어지는 흐름 제공",
    helpText: "한 문장으로 ‘대체재 대비 더 좋은 이유’를 딱 하나만 강조해보세요.",
    minHeight: "52px",
  },
  {
    id: "3-3",
    label: "현재 구현 수준은 어디까지 왔나요?",
    question: "현재 구현 수준",
    placeholder: "예: 기획 완료 / 화면 구현 완료 / API 연동 중 / MVP 데모 가능",
    helpText: "가능하면 ‘현재 가능한 것’과 ‘남은 것’을 같이 적어주세요.",
    minHeight: "52px",
  },

  // 4) 성장 전략 & 사업화
  {
    id: "4-1",
    label: "서비스는 누구에게, 어떤 방식으로 수익을 만들 수 있나요?",
    question: "수익 모델",
    placeholder: "예: 학교/기관(B2B) 구독형 + 팀 단위 유료 플랜(프리미엄 템플릿 제공)",
    helpText: "초기에는 단순한 형태여도 좋아요. (구독/수수료/라이선스 등)",
    minHeight: "52px",
  },
  {
    id: "4-2",
    label: "처음에 집중하고 싶은 도입 대상은 어디인가요?",
    question: "초기 도입 대상",
    placeholder: "예: 창업지원단/캠퍼스타운 참여 팀, 공모전 준비 중인 대학생 팀",
    helpText: "가장 빨리 써볼 수 있는 ‘좁은 시장’부터 적으면 현실적이에요.",
    minHeight: "52px",
  },
  {
    id: "4-3",
    label: "앞으로 확장한다면 어떤 방향으로 커질 수 있나요?",
    question: "확장 전략",
    placeholder: "예: 대학 → 청년창업 → 일반 스타트업 / 문서 자동화 → 투자자료/IR까지 확장",
    helpText: "확장 방향은 ‘대상 확장’ 또는 ‘기능 확장’ 둘 중 하나만 잡아도 좋아요.",
    minHeight: "52px",
  },

  // 5) 팀 구성 & 역할
  {
    id: "5-1",
    label: "팀 구성원과 역할을 적어주세요.",
    question: "팀 구성 및 역할",
    placeholder: "예: 김OO(기획/PM) · 박OO(디자인) · 이OO(프론트) · 최OO(백엔드)",
    helpText: "역할이 겹쳐도 괜찮아요. 핵심 책임이 뭔지만 보이게 적으면 됩니다.",
    minHeight: "110px",
  },
  {
    id: "5-2",
    label: "이 팀이 이 서비스를 만들기에 적합한 이유는 무엇인가요?",
    question: "팀 역량",
    placeholder: "예: 공모전 경험 多, PM/디자인/개발 모두 보유, 빠르게 MVP 만들 수 있음",
    helpText: "‘왜 우리 팀이 할 수 있는지’를 근거(경험/기술/성과)로 적어주세요.",
    minHeight: "52px",
  },
];

const STORAGE_KEY = "bizstep:project:draft";

export default function ProjectInfoPage() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ 입력 기반 진행률 (빈 값 제외)
  const progress = useMemo(() => {
    const total = QUESTION_CONFIG.length;
    const filled = QUESTION_CONFIG.reduce((acc, q) => {
      const v = (answers[q.id] ?? "").trim();
      return acc + (v.length > 0 ? 1 : 0);
    }, 0);
    return { total, filled, percent: total ? Math.round((filled / total) * 100) : 0 };
  }, [answers]);

  // 초기값 + 임시저장 불러오기
  useEffect(() => {
    const init = {};
    QUESTION_CONFIG.forEach((q) => (init[q.id] = ""));

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) Object.assign(init, JSON.parse(saved));
    } catch { }

    setAnswers(init);
  }, []);

  const handleChange = (id, value) => setAnswers((prev) => ({ ...prev, [id]: value }));

  const handleTempSave = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    alert("임시 저장되었습니다.");
  }, [answers]);

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const payload = {
      team_name: "해커톤팀",
      answers: QUESTION_CONFIG.map((q) => ({
        question_id: q.id,
        question: q.question,
        answer: answers[q.id] || "",
      })),
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        // project_id 저장 (ContestApplyPage 등에서 사용)
        if (data.id) {
          localStorage.setItem("bizstep:projectId", data.id);
        }

        localStorage.removeItem(STORAGE_KEY);
        navigate("/recommendations");
      } else {
        alert("제출에 실패했습니다.");
      }
    } catch {
      alert("네트워크 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  }, [answers, isSubmitting, navigate]);

  const sidebarItems = useMemo(
    () => [
      { id: "service-core", label: "서비스 핵심 정보", icon: FolderOpen },
      { id: "problem", label: "문제 인식 & 고객 정의", icon: Target },
      { id: "feasibility", label: "개요 & 실현 가능성", icon: Lightbulb },
      { id: "growth", label: "성장 전략 & 사업화", icon: TrendingUp },
      { id: "team", label: "팀 구성 & 역할", icon: Users },
    ],
    []
  );

  return (
    <MainLayout
      sidebarItems={sidebarItems}
      // ✅ MainLayout이 progress 받는 구조면 이렇게 전달 (없어도 안전)
      progressPercent={progress.percent}
      progressText={`작성 진행률 ${progress.filled}/${progress.total}`}
      primaryColor={PRIMARY}
    >
      {/* ✅ 가운데 정렬 강제 wrapper (폼 오른쪽 쏠림 방지) */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 920 }}>
          {/* ✅ 페이지 내부 우측 상단 버튼 */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <button
              onClick={handleSubmit}
              style={{
                background: PRIMARY,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "8px 14px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              작성완료하기
            </button>

            <button
              onClick={handleTempSave}
              style={{
                background: "#E5E7EB",
                color: "#374151",
                border: "none",
                borderRadius: 8,
                padding: "8px 14px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              임시 저장
            </button>
          </div>

          {/* ✅ 메인 카드 */}
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: "32px 32px 8px",
              border: "1px solid #EEF2F7",
            }}
          >
            <FormSection id="service-core" title="서비스 핵심 정보">
              {QUESTION_CONFIG.slice(0, 3).map((q) => (
                <TextAreaField
                  key={q.id}
                  label={q.label}
                  placeholder={q.placeholder}
                  helpText={q.helpText}
                  minHeight={q.minHeight}
                  value={answers[q.id] || ""}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                />
              ))}
            </FormSection>

            <FormSection id="problem" title="문제 인식 & 고객 정의">
              {QUESTION_CONFIG.slice(3, 7).map((q) => (
                <TextAreaField
                  key={q.id}
                  label={q.label}
                  placeholder={q.placeholder}
                  helpText={q.helpText}
                  minHeight={q.minHeight}
                  value={answers[q.id] || ""}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                />
              ))}
            </FormSection>

            <FormSection id="feasibility" title="개요 & 실현 가능성">
              {QUESTION_CONFIG.slice(7, 10).map((q) => (
                <TextAreaField
                  key={q.id}
                  label={q.label}
                  placeholder={q.placeholder}
                  helpText={q.helpText}
                  minHeight={q.minHeight}
                  value={answers[q.id] || ""}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                />
              ))}
            </FormSection>

            <FormSection id="growth" title="성장 전략 & 사업화">
              {QUESTION_CONFIG.slice(10, 13).map((q) => (
                <TextAreaField
                  key={q.id}
                  label={q.label}
                  placeholder={q.placeholder}
                  helpText={q.helpText}
                  minHeight={q.minHeight}
                  value={answers[q.id] || ""}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                />
              ))}
            </FormSection>

            <FormSection id="team" title="팀 구성 & 역할">
              {QUESTION_CONFIG.slice(13).map((q) => (
                <TextAreaField
                  key={q.id}
                  label={q.label}
                  placeholder={q.placeholder}
                  helpText={q.helpText}
                  minHeight={q.minHeight}
                  value={answers[q.id] || ""}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                />
              ))}
            </FormSection>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
