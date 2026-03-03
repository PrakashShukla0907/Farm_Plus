import "./KnowledgeHub.css";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const KnowledgeHub = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="knowledge-section">
      <div className="knowledge-header">
        <h2>{t("home.knowledgeHub.title", "Knowledge Hub for Farmers")}</h2>
        <button className="browse-btn" onClick={() => navigate('/knowledge-hub')}>{t("home.knowledgeHub.browseMore", "Browse More")}</button>
      </div>

      <div className="knowledge-grid">
        <div className="knowledge-card" onClick={() => navigate('/knowledge-hub')} role="button" tabIndex={0}>
          <span className="k-icon">▶️</span>
          <span className="k-label">{t("home.knowledgeHub.videoGuide", "Video Guide")}</span>
          <span className="k-arrow">›</span>
        </div>
        <div className="knowledge-card" onClick={() => navigate('/knowledge-hub')} role="button" tabIndex={0}>
          <span className="k-icon">📰</span>
          <span className="k-label">{t("home.knowledgeHub.latestArticles", "Latest Articles")}</span>
          <span className="k-arrow">›</span>
        </div>
        <div className="knowledge-card" onClick={() => navigate('/knowledge-hub')} role="button" tabIndex={0}>
          <span className="k-icon">🌱</span>
          <span className="k-label">{t("home.knowledgeHub.soilHealthTips", "Soil Health Tips")}</span>
          <span className="k-arrow">›</span>
        </div>
        <div className="knowledge-card" onClick={() => navigate('/knowledge-hub')} role="button" tabIndex={0}>
          <span className="k-icon">🚜</span>
          <span className="k-label">{t("home.knowledgeHub.farmUpdates", "Farm Updates")}</span>
          <span className="k-arrow">›</span>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeHub;