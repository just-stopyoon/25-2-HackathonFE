import React from "react";
import { Search } from "lucide-react";

export default function SearchBar({
  primaryColor = "#3338A0",
  value,
  onChange,
  activeChip,
  onChipChange,
}) {
  const chips = [
    "캠퍼스타운 공모전",
    "예비창업자 패키지",
    "중소기업 벤처사업부 / 기획",
  ];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1040,
        margin: "0 auto",
      }}
    >
      {/* 검색 영역 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          paddingBottom: 14,
          borderBottom: `3px solid ${primaryColor}`,
        }}
      >
        {/* ✅ 정상적인 돋보기 아이콘 */}
        <Search
          size={22}
          strokeWidth={2.2}
          color={primaryColor}
        />

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="인공지능을 활용한 공모전을 검색해보세요."
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontSize: 18,
            fontWeight: 500,
            color: "#111827",
            padding: "10px 0",
          }}
        />
      </div>

      {/* 필터 칩 */}
      <div
        style={{
          marginTop: 18,
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        {chips.map((chip) => {
          const isActive = chip === activeChip;

          return (
            <button
              key={chip}
              onClick={() => onChipChange(isActive ? "" : chip)}
              style={{
                padding: "10px 18px",
                borderRadius: 999,
                border: "none",
                backgroundColor: isActive
                  ? primaryColor
                  : "#EEF2FF",
                color: isActive
                  ? "#FFFFFF"
                  : primaryColor,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {chip}
            </button>
          );
        })}
      </div>
    </div>
  );
}
