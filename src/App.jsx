import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProjectInfoPage from './pages/ProjectInfoPage';
import ContestRecommendationPage from './pages/ContestRecommendationPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectInfoPage />} />
        <Route path="/recommendations" element={<ContestRecommendationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
