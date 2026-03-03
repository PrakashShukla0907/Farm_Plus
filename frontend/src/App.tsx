import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navbar from './features/Shared/Navbar';
import HeroSection from './features/Home/HeroSection';
import Features from './features/Home/Features';
import MarketTrends from './features/Market/MarketTrends';
import KnowledgeHubHome from './features/Knowledge/KnowledgeHub';
import CTABanner from './features/Home/CTABanner';
import MarketDashboard from './features/Market/MarketDashboard';
import GovernmentSchemes from './features/Schemes/GovernmentSchemes';
import KnowledgeHubPage from './features/Knowledge/KnowledgehubPage';
import Login from './features/Auth/Login';
import Signup from './features/Auth/Signup';
import Dashboard from './features/Advisory/Dashboard';
import LivestockCare from './features/Livestock/Livestock';
import AIModelPages from './features/AIModels/AIModelPage';

const Home = () => (
  <>
    <HeroSection />
    <div className="page-body">
      <Features />
      <MarketTrends />
      <KnowledgeHubHome />
    </div>
    <CTABanner />
    <div className="bottom-band" />
  </>
);

const MainLayout = () => (
  <div className="app-wrapper">
    <Navbar />
    <Outlet />
  </div>
);

const AuthLayout = () => (
  <div className="auth-wrapper">
    <Outlet />
  </div>
);

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/market", element: <MarketDashboard /> },
      { path: "/government-schemes", element: <GovernmentSchemes /> },
      { path: "/knowledge-hub", element: <KnowledgeHubPage /> },
      { path: "/smart-advisory", element: <Dashboard /> },
      { path: "/livestock-care", element: <LivestockCare /> },
      { path: "/ai-models", element: <AIModelPages /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;