import React from "react";
import { Calendar } from "lucide-react";

const PRIMARY = "#3338A0";

export default function ContestCard({ title, organization, dueDate, categories = [], image, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "#fff",
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid #EEF2F7",
        boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <div style={{ width: "100%", height: 148, overflow: "hidden" }}>
        <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>

      <div style={{ padding: "14px 16px 16px" }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", marginBottom: 6 }}>{organization}</div>

        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            lineHeight: 1.35,
            color: "#111827",
            marginBottom: 10,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#6B7280", fontSize: 13 }}>
          <Calendar size={16} />
          <span>서류 마감 ~ {dueDate}</span>
        </div>

        {/* ✅ 태그 radius: 999 → 4px */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
          {categories.slice(0, 3).map((t) => (
            <span
              key={t}
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: PRIMARY,
                background: "#EEF2FF",
                border: "1px solid #E6E8F5",
                padding: "6px 10px",
                borderRadius: 4, // ✅ 여기!!!
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
