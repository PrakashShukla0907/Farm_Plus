import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import "./MarketTrends.css";

interface PriceData {
  price: number;
  change: number;
  changeType: 'positive' | 'negative';
  current: number;
  target: number;
  max: number;
  importExport: number;
  forecast: 'High' | 'Mid' | 'Low';
}

const DEFAULT_PRICE: PriceData = {
  price: 2150,
  change: 50,
  changeType: 'positive',
  current: 300,
  target: 2500,
  max: 150,
  importExport: 6.2,
  forecast: 'High',
};

const MarketTrends = () => {
  const { t } = useTranslation();
  const [priceData, setPriceData] = useState<PriceData>(DEFAULT_PRICE);
  const [live, setLive] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/market');
    wsRef.current = ws;
    ws.onopen = () => {
      setLive(true);
      ws.send('ping'); // Send a dummy message to activate backend loop
    };
    ws.onclose = () => setLive(false);
    ws.onerror = () => setLive(false);
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setPriceData((prev) => ({ ...prev, ...data }));
      } catch (error) {
        console.error('Failed to parse market data:', error);
      }
    };
    return () => ws.close();
  }, []);

  return (
    <section className="market-section">
      <div className="market-header">
        <span className="market-icon">📊</span>
        <h2>{t("home.marketTrends.title", "Market Trends & Trade")}</h2>
        <span className="live-badge" style={{ background: live ? '#ffe0e0' : '#eee', color: live ? '#c00' : '#888' }}>
          {live ? t("home.marketTrends.live", "🔴 Live") : t("home.marketTrends.offline", "Offline")}
        </span>
      </div>

      <div className="market-grid">
        {/* LEFT: Price Card */}
        <div className="price-card">
          <div className="price-top">
            <span className="price-label">{t("home.marketTrends.wheatPrice", "🌾 Wheat Price")}</span>
            <span className="price-main">₹{priceData.price}<span>{t("home.marketTrends.perQtl", "/qtl")}</span></span>
            <span className={`price-change ${priceData.changeType}`}>{priceData.changeType === 'positive' ? '▲' : '▼'} ₹{priceData.change} {priceData.changeType === 'positive' ? t("home.marketTrends.increase", "increase") : t("home.marketTrends.decrease", "decrease")} {t("home.marketTrends.today", "today")}</span>
          </div>

          {/* Bar chart */}
          <div className="price-bars">
            <div className="bar-group">
              <div className="bar current" style={{ height: `${Math.min(100, (priceData.current / priceData.target) * 100)}%` }} />
              <span>{t("home.marketTrends.current", "Current")}<br/>₹{priceData.current}{t("home.marketTrends.perQtl", "/qtl")}</span>
            </div>
            <div className="bar-group">
              <div className="bar target" style={{ height: '85%' }} />
              <span>{t("home.marketTrends.target", "Target")}<br/>₹{priceData.target}{t("home.marketTrends.perQtl", "/qtl")}</span>
            </div>
            <div className="bar-group">
              <div className="bar max" style={{ height: `${Math.min(100, (priceData.max / priceData.target) * 100)}%` }} />
              <span>{t("home.marketTrends.max", "Max")}<br/>₹{priceData.max}{t("home.marketTrends.perQtl", "/qtl")}</span>
            </div>
          </div>

          <div className="bar-legend">
            <span><span className="dot current-dot"/>{t("home.marketTrends.current", "Current")}</span>
            <span><span className="dot target-dot"/>{t("home.marketTrends.target", "Target")}</span>
            <span><span className="dot max-dot"/>{t("home.marketTrends.max", "Max")}</span>
          </div>

          <div className="price-actions">
            <button className="btn-outline" onClick={() => navigate('/market')}>{t("home.marketTrends.viewPrices", "View Prices ›")}</button>
            <button className="btn-solid" onClick={() => navigate('/market')}>{t("home.marketTrends.tradeMarket", "Trade Market ›")}</button>
          </div>
        </div>

        {/* RIGHT: Import/Export */}
        <div className="import-card">
          <div className="import-header">
            <span>{t("home.marketTrends.importExportData", "🚛 Import/Export Data")}</span>
          </div>
          <div className="import-value">₹{priceData.importExport}{t("home.marketTrends.cr", "Cr")}</div>

          {/* Gauge */}
          <div className="gauge-wrapper">
            <svg viewBox="0 0 200 110" className="gauge-svg">
              {/* Background arc */}
              <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#e0e0e0" strokeWidth="18" strokeLinecap="round"/>
              {/* Green zone */}
              <path d="M 20 100 A 80 80 0 0 1 100 20" fill="none" stroke="#4caf50" strokeWidth="18" strokeLinecap="round"/>
              {/* Yellow zone */}
              <path d="M 100 20 A 80 80 0 0 1 155 38" fill="none" stroke="#ffc107" strokeWidth="18" strokeLinecap="round"/>
              {/* Red zone */}
              <path d="M 155 38 A 80 80 0 0 1 180 100" fill="none" stroke="#f44336" strokeWidth="18" strokeLinecap="round"/>
              {/* Needle (static for now) */}
              <line x1="100" y1="100" x2="148" y2="42" stroke="#333" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="100" cy="100" r="6" fill="#333"/>
            </svg>
            <div className="gauge-labels">
              <span>{t("home.marketTrends.low", "Low")}</span>
              <span>{t("home.marketTrends.mid", "Mid")}</span>
              <span>{t("home.marketTrends.high", "High")}</span>
            </div>
          </div>

          <div className="import-meta">
            <span>{t("home.marketTrends.forecast2Days", "📅 2 Days Forecast")}</span>
            <span className={`forecast-badge ${priceData.forecast.toLowerCase()}`}>{t(`home.marketTrends.${priceData.forecast.toLowerCase()}`, priceData.forecast)}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketTrends;