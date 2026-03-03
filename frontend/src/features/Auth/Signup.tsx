import { useState } from "react";
import { FaUser, FaMapMarkerAlt, FaMobileAlt, FaKey } from "react-icons/fa";
import { MdLandscape, MdVolumeUp } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, firebaseReady } from "../../lib/firebase";
import "./Signup.css";

const Signup = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [city, setCity] = useState("");
  const [landArea, setLandArea] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSendOtp = () => {
    if (!mobile.trim()) {
      setMessage("Enter mobile number before requesting OTP.");
      return;
    }
    setMessage("OTP sent (demo flow). Use any 6 digits to continue.");
  };

  const handleSignup = async () => {
    if (!firebaseReady || !auth) {
      setMessage("Firebase is not configured. Add VITE_FIREBASE_* values in frontend/.env.local.");
      return;
    }

    if (!fullName || !email || !password) {
      setMessage("Full name, email, and password are required.");
      return;
    }

    if (!otp || otp.length < 4) {
      setMessage("Please enter OTP to continue.");
      return;
    }

    try {
      setLoading(true);
      setMessage(null);
      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(credential.user, {
        displayName: fullName,
      });
      navigate('/smart-advisory');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to create account.");
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const textToSpeak = `${t("signup.title")}, ${t("signup.fullName")}, ${t("signup.address")}, ${t("signup.state")}, ${t("signup.city")}, ${t("signup.landArea")}, ${t("signup.mobileNumber")}, ${t("signup.email")}, ${t("signup.password")}, ${t("signup.enterOtp")}, ${t("signup.sendOtp")}, ${t("signup.saveDetails")}.`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = i18n.language === "hi" ? "hi-IN" : "en-US";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="signup-page">
      <div className="signup-bg" />

      <div className="signup-wrapper">
        <div className="signup-card">

          {/* Logo */}
          <div className="signup-logo" onClick={() => navigate('/')}>
            <span className="signup-logo-icon">🌿</span>
            <span className="signup-logo-text">Farm+</span>
          </div>

          <h2 className="signup-card-title">
            <FaUser size={18} /> {t("signup.title")}
          </h2>

          {/* Full Name */}
          <div className="signup-input-group">
            <span className="input-icon"><FaUser size={16} /></span>
            <input type="text" placeholder={t("signup.fullName")} value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>

          {/* Address */}
          <div className="signup-input-group">
            <span className="input-icon"><FaMapMarkerAlt size={16} /></span>
            <input type="text" placeholder={t("signup.address")} value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>

          {/* State + City row */}
          <div className="signup-row">
            <div className="signup-input-group half">
              <span className="input-icon"><FaMapMarkerAlt size={14} /></span>
              <input type="text" placeholder={t("signup.state")} value={stateValue} onChange={(e) => setStateValue(e.target.value)} />
            </div>
            <div className="signup-input-group half">
              <span className="input-icon"><FaMapMarkerAlt size={14} /></span>
              <input type="text" placeholder={t("signup.city")} value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
          </div>

          {/* Land Area */}
          <div className="signup-input-group">
            <span className="input-icon"><MdLandscape size={16} /></span>
            <input type="number" placeholder={t("signup.landArea")} value={landArea} onChange={(e) => setLandArea(e.target.value)} />
          </div>

          {/* Mobile Number */}
          <div className="signup-input-group">
            <span className="input-icon"><FaMobileAlt size={16} /></span>
            <input type="tel" placeholder={t("signup.mobileNumber")} value={mobile} onChange={(e) => setMobile(e.target.value)} />
          </div>

          <div className="signup-input-group">
            <span className="input-icon"><FaUser size={16} /></span>
            <input type="email" placeholder={t("signup.email")} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="signup-input-group">
            <span className="input-icon"><FaKey size={16} /></span>
            <input type="password" placeholder={t("signup.password")} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {/* OTP row */}
          <div className="signup-otp-row">
            <div className="signup-input-group otp-input">
              <span className="input-icon"><FaKey size={14} /></span>
              <input type="text" placeholder={t("signup.enterOtp")} maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} />
            </div>
            <button className="otp-btn" onClick={handleSendOtp}>{t("signup.sendOtp")}</button>
          </div>

          {/* Language Preference */}
          <div className="signup-row lang-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button className="lang-pref-btn">{t("signup.languagePref")}</button>
            <div className="lang-radio-group" style={{ display: 'flex', alignItems: 'center' }}>
              <label><input type="radio" name="lang" checked={i18n.language === 'en'} onChange={() => i18n.changeLanguage('en')} /> English</label>
              <span>|</span>
              <label><input type="radio" name="lang" checked={i18n.language === 'hi'} onChange={() => i18n.changeLanguage('hi')} /> Hindi</label>
              <span className="lang-sound" onClick={handleSpeak} style={{cursor: "pointer", display: "flex", alignItems: "center", marginLeft: "15px"}} title="Listen to Page Text">
                <MdVolumeUp size={18} />
              </span>
            </div>
          </div>

          {/* Save Button */}
          <button className="signup-save-btn" onClick={() => void handleSignup()} disabled={loading}>
            {loading ? t("signup.saving") : t("signup.saveDetails")}
          </button>

          {message && <p className="signup-login-link">{message}</p>}

          {/* Already have account */}
          <p className="signup-login-link">
            {t("signup.alreadyAccount")}{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
              {t("signup.loginNow")}
            </a>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Signup;