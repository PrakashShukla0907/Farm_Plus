import { useTranslation } from 'react-i18next';
import "./CTABanner.css";
import farmBg from "../../assets/farm-bg.jpeg";
import { useNavigate } from 'react-router-dom';

const CTABanner = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="cta-section" style={{ backgroundImage: `url(${farmBg})` }}>
      <div className="cta-overlay" />
      <div className="cta-content">
        <h2>{t("home.ctaBanner.title", "Stay Ahead, Farm Smart!")}</h2>
        <p>{t("home.ctaBanner.subtitle", "Join Farm+ for real-time insights, AI-driven decisions & better yields.")}</p>
        <button className="cta-btn" onClick={() => navigate('/signup')}>{t("home.ctaBanner.button", "Get AI Insights")}</button>
      </div>
    </section>
  );
};

export default CTABanner;