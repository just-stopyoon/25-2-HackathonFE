import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProjectInfoPage from "./pages/ProjectInfoPage";
import ContestRecommendationPage from "./pages/ContestRecommendationPage";
import ContestDetailPage from "./pages/ContestDetailPage";
import ContestApplyPage from "./pages/ContestApplyPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/project" replace />} />
        <Route path="/project" element={<ProjectInfoPage />} />
        <Route path="/recommendations" element={<ContestRecommendationPage />} />

        {/* 1번째 화면: 공모전 상세 */}
        <Route path="/contest/:id" element={<ContestDetailPage />} />

        {/* 2~3번째 화면: 지원 준비 / 서류 관리 */}
        <Route path="/contest/:id/apply" element={<ContestApplyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
