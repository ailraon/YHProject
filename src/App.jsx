import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFound from './pages/NotFound';
import Nav from './components/common/Nav';
import PlanCreatePage from './pages/PlanCreatePage';

function App() {
  return (
    <BrowserRouter>
      {/* Nav 들어갈 자리 */}
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/createPlan" element={<PlanCreatePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
