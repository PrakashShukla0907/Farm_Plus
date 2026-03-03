import { useState } from "react";
import type { MouseEvent } from "react";
import { FaMobileAlt, FaLock } from "react-icons/fa";
import { MdLanguage, MdVolumeUp } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth, firebaseReady } from "../../lib/firebase";
import "./Login.css";

const Login = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!firebaseReady || !auth) {
      setMessage("Firebase is not configured. Add VITE_FIREBASE_* values in frontend/.env.local.");
      return;
    }

    const email = identifier.trim();
    if (!email || !password) {
      setMessage("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      setMessage(null);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/smart-advisory');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (!firebaseReady || !auth) {
      setMessage("Firebase is not configured. Add VITE_FIREBASE_* values in frontend/.env.local.");
      return;
    }

    const email = identifier.trim();
    if (!email) {
      setMessage("Enter your email first, then click Forgot Password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to send password reset email.");
    }
  };

  const handleSpeak = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const textToSpeak = `${t("login.welcomeBack")}, ${t("login.subtitle")}, ${t("login.mobileEmailPlaceholder")}, ${t("login.passwordPlaceholder")}, ${t("login.logIn")}.`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = i18n.language === "hi" ? "hi-IN" : "en-US";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="login-page">
      <div className="login-bg" />

      <div className="login-card">
        <div className="login-card-body">

          {/* Logo */}
          <div className="login-logo" onClick={() => navigate('/')}>
            <span className="login-logo-icon">🌿</span>
            <span className="login-logo-text">Farm+</span>
          </div>

          <h2 className="login-title">{t("login.welcomeBack")}</h2>
          <p className="login-subtitle">{t("login.subtitle")}</p>

          {/* Mobile / Email */}
          <div className="login-input-group">
            <span className="input-icon"><FaMobileAlt size={18} /></span>
            <input
              type="text"
              placeholder={t("login.mobileEmailPlaceholder")}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="login-input-group">
            <span className="input-icon"><FaLock size={18} /></span>
            <input
              type="password"
              placeholder={t("login.passwordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="lock-icon"><FaLock size={16} /></span>
          </div>

          {/* Remember + Forgot */}
          <div className="login-options">
            <label className="login-remember">
              <input type="checkbox" />
              {t("login.rememberMe")}
            </label>
            <a href="#" className="login-forgot" onClick={handleForgotPassword}>{t("login.forgotPassword")}</a>
          </div>

          {/* Login Button */}
          <button className="login-btn" onClick={() => void handleLogin()} disabled={loading}>
            {loading ? t("login.signingIn") : t("login.logIn")}
          </button>

          {message && <p className="login-subtitle">{message}</p>}

          {/* Divider */}
          <div className="login-divider"><span>{t("login.or")}</span></div>

          {/* Sign Up */}
          <p className="login-signup">
            {t("login.noAccount")}{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/signup'); }}>
              {t("login.signUpNow")}
            </a>
          </p>
        </div>

        {/* Language Bar */}
        <div className="login-lang-bar">
          <span className="globe-icon"><MdLanguage size={18} /></span>
          <span className={`lang-option ${i18n.language === 'en' ? 'active' : ''}`} onClick={() => i18n.changeLanguage('en')} style={{cursor: "pointer"}}>English</span>
          <span className="lang-sep">|</span>
          <span className={`lang-option ${i18n.language === 'hi' ? 'active' : ''}`} onClick={() => i18n.changeLanguage('hi')} style={{cursor: "pointer"}}>Hindi</span>
          <span className="lang-sound" onClick={handleSpeak} style={{cursor: "pointer", display: "flex", alignItems: "center"}} title="Listen to Page Text">
            <MdVolumeUp size={18} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;