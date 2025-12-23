import React from "react";
import { FolderOpen, Target, Lightbulb, TrendingUp, Users } from "lucide-react";

const Sidebar = ({
  activeSection,
  onSectionClick,
  menuItems = [],
  progressPercent = 0, // ✅ 외부에서 받음
}) => {
  return (
    <aside
      style={{
        width: "260px",
        backgroundColor: "white",
        height: "calc(100vh - 96px)",
        position: "fixed",
        left: "16px",
        top: "80px",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        border: "1px solid #E5E7EB",
        display: "flex",
        flexDirection: "column",
        zIndex: 10,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "20px",
          borderBottom: "1px solid #E5E7EB",
          fontWeight: 800,
          color: "#3338A0",
          fontSize: "20px",
        }}
      >
        BIZSTEP
      </div>

      {/* Menu */}
      <nav style={{ flex: 1, padding: "12px" }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <div
              key={item.id}
              onClick={() => onSectionClick(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 12px",
                borderRadius: 10,
                cursor: "pointer",
                color: isActive ? "#3338A0" : "#6B7280",
                background: isActive ? "#EEF0FF" : "transparent",
                fontWeight: isActive ? 600 : 500,
                marginBottom: 4,
              }}
            >
              <Icon size={18} />
              {item.label}
            </div>
          );
        })}
      </nav>

      {/* Progress */}
      <div style={{ padding: "16px", borderTop: "1px solid #E5E7EB" }}>
        <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
          작성 진행률
        </p>
        <div
          style={{
            width: "100%",
            height: 6,
            background: "#E5E7EB",
            borderRadius: 999,
          }}
        >
          <div
            style={{
              width: `${progressPercent}%`,
              height: "100%",
              background: "#3338A0",
              borderRadius: 999,
              transition: "width 0.3s ease",
            }}
          />
        </div>
        <p style={{ fontSize: 12, marginTop: 6, color: "#6B7280" }}>
          {progressPercent}% 완료
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
