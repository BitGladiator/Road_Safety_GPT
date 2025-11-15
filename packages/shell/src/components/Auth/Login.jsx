import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { login, register } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegister) {
        if (password !== confirmPassword) {
          setError("Passwords don't match");
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError("Password must be at least 6 characters");
          setLoading(false);
          return;
        }
        const result = await register(name, email, password);
        if (result.success) {
          navigate("/dashboard");
        } else {
          setError(result.error);
        }
      } else {
        const result = await login(email, password);
        if (result.success) {
          navigate("/dashboard");
        } else {
          setError(result.error);
        }
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (userEmail) => {
    setEmail(userEmail);
    setPassword("password123");
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setError("");
    if (!isRegister) {
      setName("");
      setConfirmPassword("");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.background}>
        <div style={styles.backgroundShapes}>
          <div style={styles.shape1}></div>
          <div style={styles.shape2}></div>
          <div style={styles.shape3}></div>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.leftPanel}>
          <div style={styles.brandSection}>
            <div style={styles.logo}>
              <BuildingIcon />
            </div>
            <h1 style={styles.title}>Flowbit</h1>
            <p style={styles.subtitle}>Enterprise Multi-Tenant Platform</p>
            <div style={styles.features}>
              <div style={styles.feature}>
                <ShieldIcon />
                <span>Secure Tenant Isolation</span>
              </div>
              <div style={styles.feature}>
                <ScaleIcon />
                <span>Enterprise Grade</span>
              </div>
              <div style={styles.feature}>
                <CloudIcon />
                <span>Cloud Native</span>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.rightPanel}>
          <div style={styles.loginCard}>
            <div style={styles.loginHeader}>
              <h2 style={styles.loginTitle}>
                {isRegister ? "Create Account" : "Welcome Back"}
              </h2>
              <p style={styles.loginSubtitle}>
                {isRegister
                  ? "Join your enterprise platform"
                  : "Sign in to your tenant account"}
              </p>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <div style={styles.inputContainer}>
                  <MailIcon />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    placeholder="admin@yourcompany.com"
                    required
                  />
                </div>
              </div>

              {isRegister && (
                <div style={styles.inputGroup}>
                  <div style={styles.inputContainer}>
                    <UserIcon />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={styles.input}
                      placeholder="Full Name"
                      required={isRegister}
                    />
                  </div>
                </div>
              )}

              <div style={styles.inputGroup}>
                <div style={styles.inputContainer}>
                  <LockIcon />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {isRegister && (
                <div style={styles.inputGroup}>
                  <div style={styles.inputContainer}>
                    <LockIcon />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      style={styles.input}
                      placeholder="Confirm Password"
                      required={isRegister}
                    />
                  </div>
                </div>
              )}

              {error && (
                <div style={styles.error}>
                  <AlertIcon />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                style={
                  loading
                    ? { ...styles.button, ...styles.buttonLoading }
                    : styles.button
                }
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoadingSpinner />
                    {isRegister ? "Creating Account..." : "Authenticating..."}
                  </>
                ) : (
                  <>
                    <LoginIcon />
                    {isRegister ? "Create Account" : "Sign In to Dashboard"}
                  </>
                )}
              </button>
            </form>

            {!isRegister && (
              <>
                <div style={styles.divider}>
                  <span style={styles.dividerText}>Quick Tenant Access</span>
                </div>

                <div style={styles.quickLogin}>
                  <button
                    onClick={() => quickLogin("admin@logisticsco.com")}
                    style={styles.quickButton}
                  >
                    <TenantIcon />
                    <div style={styles.tenantInfo}>
                      <span style={styles.tenantName}>LogisticsCo</span>
                      <span style={styles.tenantRole}>Administrator</span>
                    </div>
                    <ArrowIcon />
                  </button>
                  <button
                    onClick={() => quickLogin("admin@retailgmbh.com")}
                    style={styles.quickButton}
                  >
                    <TenantIcon />
                    <div style={styles.tenantInfo}>
                      <span style={styles.tenantName}>RetailGmbH</span>
                      <span style={styles.tenantRole}>Administrator</span>
                    </div>
                    <ArrowIcon />
                  </button>
                </div>
              </>
            )}

            <div style={styles.footer}>
              <p style={styles.hint}>
                Demo credentials: <code style={styles.code}>password123</code>
              </p>
              <p style={styles.support}>
                {isRegister
                  ? "Already have an account? "
                  : "Don't have an account? "}
                <button
                  type="button"
                  onClick={toggleMode}
                  style={styles.linkButton}
                >
                  {isRegister ? "Sign in" : "Create account"}
                </button>
              </p>
              <p style={styles.support}>
                Enterprise support:{" "}
                <a href="#" style={styles.link}>
                  platform@flowbit.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const BuildingIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 21H5C4.44772 21 4 20.5523 4 20V11L10 7L16 11V20C16 20.5523 15.5523 21 15 21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M10 21V17C10 16.4477 10.4477 16 11 16H13C13.5523 16 14 16.4477 14 17V21"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect x="7" y="10" width="2" height="2" rx="0.5" fill="currentColor" />
    <rect x="11" y="10" width="2" height="2" rx="0.5" fill="currentColor" />
    <rect x="15" y="10" width="2" height="2" rx="0.5" fill="currentColor" />
    <rect x="7" y="13" width="2" height="2" rx="0.5" fill="currentColor" />
    <rect x="11" y="13" width="2" height="2" rx="0.5" fill="currentColor" />
    <rect x="15" y="13" width="2" height="2" rx="0.5" fill="currentColor" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2"
      y="4"
      width="20"
      height="16"
      rx="3"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M2 7L10.5 13.5C11.5 14.1667 12.5 14.1667 13.5 13.5L22 7"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="10"
      width="18"
      height="12"
      rx="3"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M7 10V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V10"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="12" cy="15" r="2" fill="currentColor" />
  </svg>
);

const LoginIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M10 17L15 12L10 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M15 12H3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const AlertIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 9V13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12 17H12.01"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const LoadingSpinner = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2V6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12 18V22"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M4.93 4.93L7.76 7.76"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M16.24 16.24L19.07 19.07"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M2 12H6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M18 12H22"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M4.93 19.07L7.76 16.24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M16.24 7.76L19.07 4.93"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const TenantIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 12H19"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12 5L19 12L12 19"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const ScaleIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 22C16.4183 22 20 18.4183 20 14C20 9.58172 16.4183 6 12 6C7.58172 6 4 9.58172 4 14C4 18.4183 7.58172 22 12 22Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path d="M12 6V2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M17 7L19 5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 7L5 5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const CloudIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.657 18C4.085 18 2 15.915 2 13.343C2 11.067 3.589 9.189 5.794 8.763C6.381 6.834 8.165 5.417 10.285 5.417C12.82 5.417 14.917 7.514 14.917 10.049V10.5C16.858 10.5 18.5 12.142 18.5 14.083C18.5 16.024 16.858 17.666 14.917 17.666"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12 15V21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M9 18H15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const styles = {
  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #2d2d2d 100%)",
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: "#ffffff",
  },
  background: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
  },
  backgroundShapes: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  shape1: {
    position: "absolute",
    top: "20%",
    left: "10%",
    width: "300px",
    height: "300px",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
    borderRadius: "50%",
  },
  shape2: {
    position: "absolute",
    top: "60%",
    right: "15%",
    width: "200px",
    height: "200px",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)",
    borderRadius: "50%",
  },
  shape3: {
    position: "absolute",
    bottom: "10%",
    left: "20%",
    width: "150px",
    height: "150px",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.01) 0%, transparent 70%)",
    borderRadius: "50%",
  },
  content: {
    display: "flex",
    minHeight: "100vh",
    position: "relative",
    zIndex: 1,
  },
  leftPanel: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.05) 100%)",
    backdropFilter: "blur(10px)",
  },
  brandSection: {
    maxWidth: "480px",
    textAlign: "left",
  },
  logo: {
    width: "80px",
    height: "80px",
    background: "linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "24px",
    color: "white",
  },
  title: {
    fontSize: "48px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #ffffff 0%, #cccccc 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "12px",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    fontSize: "18px",
    color: "rgba(255,255,255,0.7)",
    marginBottom: "48px",
    fontWeight: "400",
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  feature: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    color: "rgba(255,255,255,0.8)",
    fontSize: "16px",
  },
  rightPanel: {
    width: "480px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    background: "rgba(255,255,255,0.02)",
    backdropFilter: "blur(20px)",
  },
  loginCard: {
    width: "100%",
    maxWidth: "400px",
  },
  loginHeader: {
    marginBottom: "40px",
    textAlign: "center",
  },
  loginTitle: {
    fontSize: "32px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "8px",
  },
  loginSubtitle: {
    fontSize: "16px",
    color: "rgba(255,255,255,0.6)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  inputGroup: {
    width: "100%",
  },
  inputContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: "16px 16px 16px 48px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    fontSize: "15px",
    color: "#ffffff",
    outline: "none",
    transition: "all 0.3s ease",
  },
  button: {
    width: "100%",
    padding: "18px 24px",
    background: "linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    marginTop: "8px",
  },
  buttonLoading: {
    opacity: 0.7,
    cursor: "not-allowed",
  },
  error: {
    padding: "16px",
    background: "rgba(220, 38, 38, 0.1)",
    color: "#fca5a5",
    borderRadius: "12px",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    border: "1px solid rgba(220, 38, 38, 0.3)",
  },
  divider: {
    position: "relative",
    textAlign: "center",
    margin: "32px 0",
  },
  dividerText: {
    background: "rgba(255,255,255,0.02)",
    padding: "0 20px",
    color: "rgba(255,255,255,0.5)",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    position: "relative",
    display: "inline-block",
  },
  quickLogin: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  quickButton: {
    width: "100%",
    padding: "16px 20px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    color: "rgba(255,255,255,0.8)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  tenantInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
  },
  tenantName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
  },
  tenantRole: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.5)",
  },
  footer: {
    marginTop: "32px",
    paddingTop: "24px",
    borderTop: "1px solid rgba(255,255,255,0.1)",
  },
  hint: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.5)",
    textAlign: "center",
    marginBottom: "8px",
  },
  code: {
    background: "rgba(255,255,255,0.1)",
    padding: "4px 8px",
    borderRadius: "6px",
    border: "1px solid rgba(255,255,255,0.2)",
    fontSize: "11px",
    fontFamily: 'Monaco, "SF Mono", monospace',
    color: "rgba(255,255,255,0.8)",
  },
  support: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.5)",
    textAlign: "center",
    margin: 0,
  },
  link: {
    color: "#00d4ff",
    textDecoration: "none",
    fontWeight: "500",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#00d4ff",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "12px",
    padding: 0,
  },
};
const hoverStyles = `
  .login-input:focus {
    border-color: #00d4ff;
    background: rgba(255,255,255,0.08);
    box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
  }
  
  .login-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 212, 255, 0.3);
  }
  
  .quick-button:hover {
    background: rgba(255,255,255,0.08);
    border-color: rgba(255,255,255,0.2);
    transform: translateY(-1px);
  }
`;
Object.assign(styles.input, {
  ":focus": {
    borderColor: "#00d4ff",
    background: "rgba(255,255,255,0.08)",
    boxShadow: "0 0 0 3px rgba(0, 212, 255, 0.1)",
  },
});

Object.assign(styles.button, {
  ":hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(0, 212, 255, 0.3)",
  },
  ":active": {
    transform: "translateY(0)",
  },
  ":disabled": {
    transform: "none",
    boxShadow: "none",
  },
});

Object.assign(styles.quickButton, {
  ":hover": {
    background: "rgba(255,255,255,0.08)",
    borderColor: "rgba(255,255,255,0.2)",
    transform: "translateY(-1px)",
  },
});
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = hoverStyles;
  document.head.appendChild(style);
}
