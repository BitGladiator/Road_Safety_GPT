import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const [screens, setScreens] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { user } = useAuth();
  useEffect(() => {
    fetchScreens();
  }, []);

  const fetchScreens = async () => {
    try {
      const response = await api.get("/me/screens");
      setScreens(response.data);
    } catch (error) {
      console.error("Failed to fetch screens:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <aside style={styles.sidebar}>
        <div style={styles.loading}>
          <LoadingSpinner />
          <span>Loading navigation...</span>
        </div>
      </aside>
    );
  }

  return (
    <aside style={styles.sidebar}>
      <div style={styles.sidebarHeader}>
        <h3 style={styles.sidebarTitle}>Navigation</h3>
      </div>

      <nav style={styles.nav}>
        <Link
          to={user?.role === "Admin" ? "/dashboard" : "/my-dashboard"}
          style={{
            ...styles.navItem,
            ...(location.pathname === "/dashboard" ||
            location.pathname === "/my-dashboard"
              ? styles.navItemActive
              : {}),
          }}
        >
          <DashboardIcon />
          <span>Dashboard</span>
        </Link>
        {user?.role === "Admin" && (
          <Link
            to="/employees"
            style={{
              ...styles.navItem,
              ...(location.pathname === "/employees"
                ? styles.navItemActive
                : {}),
            }}
          >
            <UsersIcon />
            <span>Employees</span>
          </Link>
        )}

        {screens.map((screen) => (
          <Link
            key={screen.id}
            to={`/app/${screen.id}`}
            style={{
              ...styles.navItem,
              ...(location.pathname === `/app/${screen.id}`
                ? styles.navItemActive
                : {}),
            }}
          >
            <ScreenIcon />
            <span>{screen.name}</span>
          </Link>
        ))}
      </nav>

      <div style={styles.sidebarFooter}>
        <div style={styles.footerContent}>
          <ShieldIcon />
          <span style={styles.footerText}>Multi-Tenant Secure</span>
        </div>
      </div>
    </aside>
  );
}
const DashboardIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="3"
      width="7"
      height="7"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="14"
      y="3"
      width="7"
      height="7"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="14"
      y="14"
      width="7"
      height="7"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="3"
      y="14"
      width="7"
      height="7"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const ScreenIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2"
      y="3"
      width="20"
      height="14"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M8 21L16 21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12 17L12 21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg
    width="16"
    height="16"
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
const UsersIcon = () => (
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

const styles = {
  sidebar: {
    width: "280px",
    background: "#1a1a1a",
    borderRight: "1px solid #333",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    position: "sticky",
    top: 0,
  },
  sidebarHeader: {
    padding: "24px 24px 16px",
    borderBottom: "1px solid #333",
  },
  sidebarTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    margin: 0,
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "16px 0",
    flex: 1,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 24px",
    color: "#999",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.3s ease",
    borderLeft: "3px solid transparent",
    margin: "0 8px",
    borderRadius: "8px",
  },
  navItemActive: {
    background: "rgba(0, 212, 255, 0.1)",
    color: "#00d4ff",
    borderLeftColor: "#00d4ff",
    fontWeight: "600",
  },
  loading: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "24px",
    color: "#666",
    fontSize: "14px",
  },
  sidebarFooter: {
    padding: "20px 24px",
    borderTop: "1px solid #333",
    background: "rgba(0, 0, 0, 0.3)",
  },
  footerContent: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  footerText: {
    fontSize: "12px",
    color: "#666",
    fontWeight: "500",
  },
};

Object.assign(styles.navItem, {
  ":hover": {
    background: "rgba(255, 255, 255, 0.05)",
    color: "#cccccc",
    borderLeftColor: "rgba(0, 212, 255, 0.3)",
    transform: "translateX(4px)",
  },
});
const activeHover = {
  ...styles.navItemActive,
  ":hover": {
    background: "rgba(0, 212, 255, 0.15)",
    color: "#00d4ff",
    borderLeftColor: "#00d4ff",
    transform: "translateX(4px)",
  },
};

Object.assign(styles.navItemActive, activeHover[":hover"]);
