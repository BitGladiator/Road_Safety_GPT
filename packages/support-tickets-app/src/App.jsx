import React, { useState } from "react";
import { useTickets } from "./hooks/useTickets";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import TicketDetail from "./components/TicketDetail";

export default function App() {
  const { tickets, loading, error, createTicket, updateTicket } = useTickets();
  const [showForm, setShowForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const Spinner = ({ size = 40, color = "#3B82F6" }) => {
    return (
      <div className="flex justify-center items-center">
        <div
          className="border-t-2 border-blue-500 rounded-full animate-spin"
          style={{
            width: size,
            height: size,
            borderTopColor: color,
            borderWidth: "2px",
          }}
        ></div>
      </div>
    );
  };
  const handleCreateTicket = async (ticketData) => {
    const result = await createTicket(ticketData);
    if (result.success) {
      setShowForm(false);
    }
    return result;
  };

  const handleUpdateTicket = async (ticketId, updates) => {
    const result = await updateTicket(ticketId, updates);

    if (result.success) {
      return result;
    }
    return result;
  };

  if (loading && tickets.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <LoadingSpinner />
          <p>Loading Tickets data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.error}>
        <AlertIcon />
        <div style={styles.errorContent}>
          <h3 style={styles.errorTitle}>Unable to Load Tickets</h3>
          <p style={styles.errorMessage}>{error}</p>
          <p style={styles.errorHint}>
            Please check your connection and try again
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.titleSection}>
            <h1 style={styles.title}>
              <TicketIcon />
              Support Tickets
            </h1>
            <p style={styles.subtitle}>
              Manage and track customer support requests
            </p>
          </div>
          <div style={styles.stats}>
            <div style={styles.stat}>
              <div style={styles.statIcon}>
                <TicketIconSmall />
              </div>
              <div style={styles.statContent}>
                <span style={styles.statNumber}>{tickets.length}</span>
                <span style={styles.statLabel}>Total Tickets</span>
              </div>
            </div>
            <div style={styles.stat}>
              <div style={styles.statIcon}>
                <OpenIcon />
              </div>
              <div style={styles.statContent}>
                <span style={styles.statNumber}>
                  {tickets.filter((t) => t.status === "open").length}
                </span>
                <span style={styles.statLabel}>Open</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          style={showForm ? styles.cancelButton : styles.newButton}
        >
          {showForm ? (
            <>
              <CloseIcon />
              Cancel
            </>
          ) : (
            <>
              <PlusIcon />
              New Ticket
            </>
          )}
        </button>
      </div>

      {showForm && (
        <div style={styles.formContainer}>
          <TicketForm
            onSubmit={handleCreateTicket}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div style={styles.content}>
        <TicketList
          tickets={tickets}
          onTicketClick={setSelectedTicket}
          loading={loading}
        />
      </div>

      {selectedTicket && (
        <TicketDetail
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onUpdate={handleUpdateTicket}
        />
      )}
    </div>
  );
}

const TicketIcon = () => (
  <svg
    width="32"
    height="32"
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

const TicketIconSmall = () => (
  <svg
    width="20"
    height="20"
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

const OpenIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 12C21 13.78 20.4722 15.5201 19.4832 17.0001C18.4943 18.4802 17.0887 19.6337 15.4442 20.3149C13.7996 20.9961 11.99 21.1743 10.2442 20.8271C8.49836 20.4798 6.89472 19.6226 5.63604 18.364C4.37737 17.1053 3.5202 15.5016 3.17294 13.7558C2.82567 12.01 3.0039 10.2004 3.68509 8.55585C4.36628 6.91131 5.51983 5.50571 6.99987 4.51677C8.47991 3.52784 10.22 3 12 3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M21 3H15V9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 3L13 11"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 5V19"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M5 12H19"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L6 18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M6 6L18 18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const LoadingSpinner = () => (
  <svg
    width="24"
    height="24"
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

const AlertIcon = () => (
  <svg
    width="24"
    height="24"
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
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
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
    marginBottom: "32px",
    gap: "24px",
  },
  headerContent: {
    display: "flex",
    alignItems: "flex-start",
    gap: "48px",
    flex: 1,
  },
  titleSection: {
    flex: 1,
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #ffffff 0%, #cccccc 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: "0 0 8px 0",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  subtitle: {
    fontSize: "16px",
    color: "rgba(255,255,255,0.7)",
    margin: 0,
    fontWeight: "400",
  },
  stats: {
    display: "flex",
    gap: "16px",
  },
  stat: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px 20px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    minWidth: "140px",
    transition: "all 0.3s ease",
  },
  statIcon: {
    width: "40px",
    height: "40px",
    background: "rgba(0, 212, 255, 0.1)",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#00d4ff",
  },
  statContent: {
    display: "flex",
    flexDirection: "column",
  },
  statNumber: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#ffffff",
    lineHeight: 1,
  },
  statLabel: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.6)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginTop: "2px",
  },
  newButton: {
    padding: "14px 24px",
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
    whiteSpace: "nowrap",
  },
  cancelButton: {
    padding: "14px 24px",
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
    whiteSpace: "nowrap",
  },
  formContainer: {
    marginBottom: "32px",
  },
  content: {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px",
    backdropFilter: "blur(10px)",
    overflow: "hidden",
  },
  loading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "400px",
    gap: "16px",
    color: "rgba(255,255,255,0.7)",
    fontSize: "16px",
  },
  error: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    padding: "24px",
    background: "rgba(220, 38, 38, 0.1)",
    border: "1px solid rgba(220, 38, 38, 0.3)",
    borderRadius: "12px",
    color: "#fca5a5",
  },
  errorContent: {
    flex: 1,
  },
  errorTitle: {
    fontSize: "18px",
    fontWeight: "600",
    margin: "0 0 8px 0",
    color: "#fca5a5",
  },
  errorMessage: {
    fontSize: "14px",
    margin: "0 0 8px 0",
    color: "rgba(252, 165, 165, 0.9)",
  },
  errorHint: {
    fontSize: "12px",
    margin: 0,
    color: "rgba(252, 165, 165, 0.6)",
  },
};
Object.assign(styles.newButton, {
  ":hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(0, 212, 255, 0.3)",
  },
});

Object.assign(styles.cancelButton, {
  ":hover": {
    background: "rgba(255,255,255,0.08)",
    borderColor: "rgba(255,255,255,0.2)",
    transform: "translateY(-1px)",
  },
});

Object.assign(styles.stat, {
  ":hover": {
    background: "rgba(255,255,255,0.08)",
    borderColor: "rgba(255,255,255,0.15)",
    transform: "translateY(-2px)",
  },
});
