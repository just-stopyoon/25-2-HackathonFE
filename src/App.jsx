import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProjectInfoPage from './pages/ProjectInfoPage';
import ContestRecommendationPage from './pages/ContestRecommendationPage';
import ContestDetailPage from './pages/ContestDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectInfoPage />} />
        <Route path="/recommendations" element={<ContestRecommendationPage />} />
        <Route path="/competitions/:id" element={<ContestDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
