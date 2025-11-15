import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.welcomeSection}>
          <h1 style={styles.title}>Welcome to Flowbit</h1>
          <p style={styles.subtitle}>Multi-Tenant Support Platform</p>
        </div>
        <div style={styles.stats}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>
              <TenantIcon />
            </div>
            <div style={styles.statContent}>
              <div style={styles.statNumber}>Active</div>
              <div style={styles.statLabel}>Tenant Status</div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.mainContent}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>
                <UserIcon />
                Account Overview
              </h2>
            </div>
            <div style={styles.info}>
              <div style={styles.infoItem}>
                <div style={styles.infoIcon}>
                  <MailIcon />
                </div>
                <div style={styles.infoContent}>
                  <span style={styles.infoLabel}>Email Address</span>
                  <span style={styles.infoValue}>{user?.email}</span>
                </div>
              </div>
              <div style={styles.infoItem}>
                <div style={styles.infoIcon}>
                  <BuildingIcon />
                </div>
                <div style={styles.infoContent}>
                  <span style={styles.infoLabel}>Company</span>
                  <span style={styles.infoValue}>{user?.customerId}</span>
                </div>
              </div>
              <div style={styles.infoItem}>
                <div style={styles.infoIcon}>
                  <ShieldIcon />
                </div>
                <div style={styles.infoContent}>
                  <span style={styles.infoLabel}>Role</span>
                  <span style={styles.infoValue}>{user?.role}</span>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>
                <RocketIcon />
                Getting Started
              </h2>
            </div>
            <div style={styles.textContent}>
              <p style={styles.text}>
                Your Flowbit platform is ready and configured. Navigate to
                "Support Tickets" from the sidebar to start managing your
                tenant's support requests.
              </p>
              <div style={styles.actions}>
                <button style={styles.primaryButton}>
                  <TicketIcon />
                  Go to Support Tickets
                </button>
                <button style={styles.secondaryButton}>
                  <SettingsIcon />
                  Tenant Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.sidebar}>
          <div style={styles.card}>
            <h3 style={styles.sidebarTitle}>Quick Actions</h3>
            <div style={styles.quickActions}>
              <button style={styles.quickAction}>
                <UsersIcon />
                <span>Manage Team</span>
              </button>
              <button style={styles.quickAction}>
                <AnalyticsIcon />
                <span>View Analytics</span>
              </button>
              <button style={styles.quickAction}>
                <DocumentIcon />
                <span>Documentation</span>
              </button>
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={styles.sidebarTitle}>System Status</h3>
            <div style={styles.statusList}>
              <div style={styles.statusItem}>
                <div style={styles.statusIndicator}></div>
                <span>API Services</span>
                <span style={styles.statusBadge}>Operational</span>
              </div>
              <div style={styles.statusItem}>
                <div
                  style={{ ...styles.statusIndicator, ...styles.statusWarning }}
                ></div>
                <span>Database</span>
                <span style={styles.statusBadge}>Maintenance</span>
              </div>
              <div style={styles.statusItem}>
                <div style={styles.statusIndicator}></div>
                <span>Tenant Isolation</span>
                <span style={styles.statusBadge}>Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const UserIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
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

const BuildingIcon = () => (
  <svg
    width="20"
    height="20"
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
  </svg>
);

const ShieldIcon = () => (
  <svg
    width="20"
    height="20"
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

const RocketIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13 11L22 2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M13.5 5.5L18.5 10.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12.5 6.5L17.5 11.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M9.00001 15C7.40871 13.4087 6.5 11 6.5 11L3.00001 11C2.44773 11 2.00001 11.4477 2.00001 12V16.5C2.00001 17.0523 2.44773 17.5 3.00001 17.5H6.50001C6.50001 17.5 9.00001 16 9.00001 15Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M15 9.00001C16.5913 7.40871 19 6.5 19 6.5L19 3.00001C19 2.44773 18.5523 2.00001 18 2.00001H13.5C12.9477 2.00001 12.5 2.44773 12.5 3.00001V6.50001C12.5 6.50001 14 9.00001 15 9.00001Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M14.5 13.5L10.5 17.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const TicketIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 5V7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M15 11V13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M15 17V19"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M5 5H19C20.1046 5 21 5.89543 21 7V10C19.8954 10 19 10.8954 19 12C19 13.1046 19.8954 14 21 14V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V14C4.10457 14 5 13.1046 5 12C5 10.8954 4.10457 10 3 10V7C3 5.89543 3.89543 5 5 5Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M19.4 15C19.2669 15.3044 19.201 15.6347 19.2 16C19.2 16.7175 19.536 18 21 18C21.5523 18 22 17.5523 22 17V15.5C21.9999 14.948 21.9999 14.621 21.863 14.365C21.7884 14.2258 21.6911 14.0999 21.575 13.9926C21.366 13.8061 21.046 13.706 20.406 13.706C19.766 13.706 19.446 13.8061 19.237 13.9926C19.1209 14.0999 19.0236 14.2258 18.949 14.365C18.8654 14.5273 18.8273 14.7075 18.8 15"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M4.6 15C4.73306 15.3044 4.79901 15.6347 4.8 16C4.8 16.7175 4.464 18 3 18C2.44772 18 2 17.5523 2 17V15.5C2.00006 14.948 2.00006 14.621 2.137 14.365C2.21157 14.2258 2.30892 14.0999 2.425 13.9926C2.634 13.8061 2.954 13.706 3.594 13.706C4.234 13.706 4.554 13.8061 4.763 13.9926C4.87908 14.0999 4.97643 14.2258 5.051 14.365C5.13464 14.5273 5.17274 14.7075 5.2 15"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M17 8.00001C17.2652 8.00001 17.5196 7.89466 17.7071 7.70711C17.8946 7.51957 18 7.26523 18 7.00001V5.50001C18.0001 4.94804 18.0001 4.62107 17.863 4.36501C17.7884 4.22584 17.6911 4.09992 17.575 3.99263C17.366 3.80614 17.046 3.70605 16.406 3.70605C15.766 3.70605 15.446 3.80614 15.237 3.99263C15.1209 4.09992 15.0236 4.22584 14.949 4.36501C14.8654 4.52727 14.8273 4.70754 14.8 4.99999"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M7 8.00001C6.73478 8.00001 6.48043 7.89466 6.29289 7.70711C6.10536 7.51957 6 7.26523 6 7.00001V5.50001C5.99994 4.94804 5.99994 4.62107 6.137 4.36501C6.21157 4.22584 6.30892 4.09992 6.425 3.99263C6.634 3.80614 6.954 3.70605 7.594 3.70605C8.234 3.70605 8.554 3.80614 8.763 3.99263C8.87908 4.09992 8.97643 4.22584 9.051 4.36501C9.13464 4.52727 9.17274 4.70754 9.2 4.99999"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const UsersIcon = () => (
  <svg
    width="18"
    height="18"
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

const AnalyticsIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 3V19C3 20.1046 3.89543 21 5 21H21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M7 14L11 10L15 14L21 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 8H21V13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DocumentIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 21.7893 6 21.7893H18C18.5304 21.7893 19.0391 21.5786 19.4142 21.2035C19.7893 20.8285 20 20.3198 20 19.7893V8L14 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 2V8H20"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 13H8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M16 17H8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M10 9H9H8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const TenantIcon = () => (
  <svg
    width="24"
    height="24"
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
  </svg>
);

const styles = {
  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #2d2d2d 100%)",
    color: "#ffffff",
    padding: "32px",
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "40px",
  },
  welcomeSection: {
    flex: 1,
  },
  title: {
    fontSize: "36px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #ffffff 0%, #cccccc 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "8px",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    fontSize: "16px",
    color: "rgba(255,255,255,0.7)",
    fontWeight: "400",
  },
  stats: {
    display: "flex",
    gap: "20px",
  },
  statCard: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    minWidth: "200px",
  },
  statIcon: {
    width: "48px",
    height: "48px",
    background: "linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  statContent: {
    display: "flex",
    flexDirection: "column",
  },
  statNumber: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#ffffff",
  },
  statLabel: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.6)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "32px",
  },
  mainContent: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px",
    padding: "24px",
    backdropFilter: "blur(10px)",
  },
  cardHeader: {
    marginBottom: "24px",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  sidebarTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "16px",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "16px",
    background: "rgba(255,255,255,0.03)",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.05)",
  },
  infoIcon: {
    width: "40px",
    height: "40px",
    background: "rgba(0, 212, 255, 0.1)",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#00d4ff",
  },
  infoContent: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  infoLabel: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.6)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "4px",
  },
  infoValue: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#ffffff",
  },
  textContent: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  text: {
    fontSize: "15px",
    color: "rgba(255,255,255,0.8)",
    lineHeight: "1.6",
    margin: 0,
  },
  actions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  primaryButton: {
    padding: "14px 20px",
    background: "linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  secondaryButton: {
    padding: "14px 20px",
    background: "rgba(255,255,255,0.05)",
    color: "rgba(255,255,255,0.8)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  quickActions: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  quickAction: {
    padding: "12px 16px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    color: "rgba(255,255,255,0.8)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "14px",
  },
  statusList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  statusItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "8px 0",
    fontSize: "14px",
    color: "rgba(255,255,255,0.8)",
  },
  statusIndicator: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#10b981",
  },
  statusWarning: {
    background: "#f59e0b",
  },
  statusBadge: {
    marginLeft: "auto",
    fontSize: "12px",
    color: "rgba(255,255,255,0.6)",
    fontWeight: "500",
  },
};

Object.assign(styles.primaryButton, {
  ":hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(0, 212, 255, 0.3)",
  },
});

Object.assign(styles.secondaryButton, {
  ":hover": {
    background: "rgba(255,255,255,0.08)",
    borderColor: "rgba(255,255,255,0.2)",
    transform: "translateY(-1px)",
  },
});

Object.assign(styles.quickAction, {
  ":hover": {
    background: "rgba(255,255,255,0.08)",
    borderColor: "rgba(255,255,255,0.2)",
    transform: "translateX(4px)",
  },
});

Object.assign(styles.statCard, {
  ":hover": {
    background: "rgba(255,255,255,0.08)",
    borderColor: "rgba(255,255,255,0.15)",
    transform: "translateY(-2px)",
  },
});
