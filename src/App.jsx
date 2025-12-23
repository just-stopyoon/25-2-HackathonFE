import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProjectInfoPage from "./pages/ProjectInfoPage";
import ContestRecommendationPage from "./pages/ContestRecommendationPage";
import ContestDetailPage from "./pages/ContestDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/project" replace />} />
        <Route path="/project" element={<ProjectInfoPage />} />
        <Route path="/recommendations" element={<ContestRecommendationPage />} />
        <Route path="/contest/:id" element={<ContestDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
