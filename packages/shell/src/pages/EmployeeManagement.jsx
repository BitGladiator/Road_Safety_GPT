import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function EmployeeManagement() {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    role: "User",
    department: "",
    phone: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.get("/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/employees/invite", formData);
      alert(
        `Employee invited! Temporary password: ${response.data.tempPassword}`
      );
      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        role: "User",
        department: "",
        phone: "",
      });
      setShowInviteForm(false);
      fetchEmployees();
    } catch (error) {
      alert(error.response?.data?.error || "Failed to invite employee");
    }
  };

  const handleDelete = async (employeeId) => {
    if (!window.confirm("Are you sure you want to remove this employee?"))
      return;

    try {
      await api.delete(`/employees/${employeeId}`);
      fetchEmployees();
    } catch (error) {
      alert(error.response?.data?.error || "Failed to delete employee");
    }
  };

  if (user?.role !== "Admin") {
    return (
      <div style={styles.container}>
        <div style={styles.accessDenied}>
          <ShieldIcon />
          <h2>Access Denied</h2>
          <p>Only administrators can access employee management.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <LoadingSpinner />
          <p>Loading employee data...</p>
        </div>
      </div>
    );
  }

  const adminCount = employees.filter((emp) => emp.role === "Admin").length;
  const userCount = employees.filter((emp) => emp.role === "User").length;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>
            <TeamIcon />
            Employee Management
          </h1>
          <p style={styles.subtitle}>
            Manage your team members and permissions
          </p>
        </div>
        <button
          onClick={() => setShowInviteForm(!showInviteForm)}
          style={showInviteForm ? styles.cancelButton : styles.inviteButton}
        >
          {showInviteForm ? (
            <>
              <CloseIcon />
              Cancel
            </>
          ) : (
            <>
              <PlusIcon />
              Invite Employee
            </>
          )}
        </button>
      </div>
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <UsersIcon />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{employees.length}</div>
            <div style={styles.statLabel}>Total Employees</div>
          </div>
        </div>

        <div style={styles.statCard}>
          <div
            style={{
              ...styles.statIcon,
              backgroundColor: "rgba(239, 68, 68, 0.1)",
            }}
          >
            <AdminIcon />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{adminCount}</div>
            <div style={styles.statLabel}>Administrators</div>
          </div>
        </div>

        <div style={styles.statCard}>
          <div
            style={{
              ...styles.statIcon,
              backgroundColor: "rgba(59, 130, 246, 0.1)",
            }}
          >
            <UserIcon />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{userCount}</div>
            <div style={styles.statLabel}>Users</div>
          </div>
        </div>
      </div>
      {showInviteForm && (
        <div style={styles.formSection}>
          <div style={styles.formHeader}>
            <h3 style={styles.formTitle}>
              <InviteIcon />
              Invite New Employee
            </h3>
            <p style={styles.formSubtitle}>
              Send an invitation to join your team
            </p>
          </div>
          <form onSubmit={handleInvite} style={styles.form}>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <UserIconSmall />
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  style={styles.input}
                  required
                  placeholder="Enter first name"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <UserIconSmall />
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  style={styles.input}
                  required
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                <EmailIcon />
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                style={styles.input}
                required
                placeholder="employee@company.com"
              />
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <ShieldIconSmall />
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  style={styles.select}
                >
                  <option value="User">User</option>
                  <option value="Admin">Administrator</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <DepartmentIcon />
                  Department
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  style={styles.input}
                  placeholder="e.g., Engineering, Sales"
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                <PhoneIcon />
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                style={styles.input}
                placeholder="+1 234 567 8900"
              />
            </div>

            <button type="submit" style={styles.submitButton}>
              <SendIcon />
              Send Invitation
            </button>
          </form>
        </div>
      )}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            <TeamIconSmall />
            Team Members ({employees.length})
          </h2>
        </div>

        {employees.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>
              <EmptyTeamIcon />
            </div>
            <h3 style={styles.emptyTitle}>No Team Members</h3>
            <p style={styles.emptyText}>
              Start by inviting your first team member to collaborate
            </p>
          </div>
        ) : (
          <div style={styles.employeeGrid}>
            {employees.map((employee) => (
              <div key={employee._id} style={styles.employeeCard}>
                <div style={styles.employeeHeader}>
                  <div style={styles.avatar}>
                    {employee.firstName[0]}
                    {employee.lastName[0]}
                  </div>
                  <div style={styles.employeeInfo}>
                    <h3 style={styles.employeeName}>
                      {employee.firstName} {employee.lastName}
                    </h3>
                    <p style={styles.employeeEmail}>{employee.email}</p>
                  </div>
                </div>

                <div style={styles.employeeDetails}>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Role</span>
                    <span
                      style={{
                        ...styles.roleBadge,
                        backgroundColor:
                          employee.role === "Admin"
                            ? "rgba(239, 68, 68, 0.2)"
                            : "rgba(59, 130, 246, 0.2)",
                        color:
                          employee.role === "Admin" ? "#ef4444" : "#3b82f6",
                        border:
                          employee.role === "Admin"
                            ? "1px solid rgba(239, 68, 68, 0.3)"
                            : "1px solid rgba(59, 130, 246, 0.3)",
                      }}
                    >
                      {employee.role === "Admin" ? (
                        <AdminIconSmall />
                      ) : (
                        <UserIconSmall />
                      )}
                      {employee.role}
                    </span>
                  </div>
                  {employee.department && (
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Department</span>
                      <span style={styles.detailValue}>
                        <DepartmentIconSmall />
                        {employee.department}
                      </span>
                    </div>
                  )}
                  {employee.phone && (
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Phone</span>
                      <span style={styles.detailValue}>
                        <PhoneIconSmall />
                        {employee.phone}
                      </span>
                    </div>
                  )}
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Joined</span>
                    <span style={styles.detailValue}>
                      <CalendarIcon />
                      {new Date(employee.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {employee._id !== user.id && (
                  <div style={styles.employeeActions}>
                    <button
                      onClick={() => handleDelete(employee._id)}
                      style={styles.deleteButton}
                    >
                      <DeleteIcon />
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const TeamIcon = () => (
  <svg
    width="32"
    height="32"
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

const PlusIcon = () => (
  <svg
    width="18"
    height="18"
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
    width="18"
    height="18"
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

const UsersIcon = () => (
  <svg
    width="24"
    height="24"
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

const AdminIcon = () => (
  <svg
    width="24"
    height="24"
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
      d="M19 4H5C4.44772 4 4 4.44772 4 5V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V5C20 4.44772 19.5523 4 19 4Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path d="M4 9H20" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4 15H20" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 4V9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M15 4V9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 15V20" stroke="currentColor" strokeWidth="1.5" />
    <path d="M15 15V20" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const UserIcon = () => (
  <svg
    width="24"
    height="24"
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

const InviteIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M20 8V14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M23 11H17"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    width="18"
    height="18"
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

const ShieldIcon = () => (
  <svg
    width="48"
    height="48"
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

const ShieldIconSmall = () => (
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

const UserIconSmall = () => (
  <svg
    width="16"
    height="16"
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

const DepartmentIcon = () => (
  <svg
    width="18"
    height="18"
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

const DepartmentIconSmall = () => (
  <svg
    width="14"
    height="14"
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
    <rect x="7" y="10" width="2" height="2" rx="0.5" fill="currentColor" />
    <rect x="11" y="10" width="2" height="2" rx="0.5" fill="currentColor" />
    <rect x="15" y="10" width="2" height="2" rx="0.5" fill="currentColor" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 16.92V19.92C22 20.52 21.53 21 20.93 21C18.22 21 15.71 19.92 13.78 18.1C12.19 16.66 10.94 14.91 10.13 12.93C9.69 11.71 9.41 10.41 9.41 9.06C9.41 8.46 9.89 7.99 10.49 7.99H13.48C13.92 7.99 14.3 8.31 14.38 8.75C14.55 9.68 14.88 10.57 15.35 11.38C15.52 11.69 15.47 12.07 15.22 12.32L14.21 13.33C15.45 15.61 17.39 17.55 19.67 18.79L20.68 17.78C20.93 17.53 21.31 17.48 21.62 17.65C22.43 18.12 23.32 18.45 24.25 18.62C24.69 18.7 25.01 19.08 25.01 19.52V22.51C25.01 23.11 24.54 23.58 23.94 23.58C22.59 23.58 21.29 23.3 20.07 22.86C18.09 22.05 16.34 20.8 14.9 19.21C13.08 17.29 12 14.78 12 12.07C12 11.47 12.47 11 13.07 11H16.06C16.66 11 17.13 11.47 17.13 12.07C17.13 13.42 17.41 14.72 17.85 15.94C18.66 17.92 20.41 19.67 22.39 20.48C23.61 20.92 24.91 21.2 26.26 21.2C26.86 21.2 27.33 20.73 27.33 20.13V17.14C27.33 16.54 26.86 16.07 26.26 16.07H23.27C22.67 16.07 22.2 16.54 22.2 17.14C22.2 18.49 21.92 19.79 21.48 21.01C20.67 22.99 18.92 24.74 16.94 25.55C15.72 25.99 14.42 26.27 13.07 26.27C12.47 26.27 12 25.8 12 25.2V22.21C12 21.61 12.47 21.14 13.07 21.14C14.42 21.14 15.72 20.86 16.94 20.42C18.92 19.61 20.67 17.86 21.48 15.88C21.92 14.66 22.2 13.36 22.2 12.01C22.2 11.41 22.67 10.94 23.27 10.94H26.26C26.86 10.94 27.33 11.41 27.33 12.01V15C27.33 15.6 26.86 16.07 26.26 16.07Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const PhoneIconSmall = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 16.92V19.92C22 20.52 21.53 21 20.93 21C18.22 21 15.71 19.92 13.78 18.1C12.19 16.66 10.94 14.91 10.13 12.93C9.69 11.71 9.41 10.41 9.41 9.06C9.41 8.46 9.89 7.99 10.49 7.99H13.48C13.92 7.99 14.3 8.31 14.38 8.75C14.55 9.68 14.88 10.57 15.35 11.38C15.52 11.69 15.47 12.07 15.22 12.32L14.21 13.33C15.45 15.61 17.39 17.55 19.67 18.79L20.68 17.78C20.93 17.53 21.31 17.48 21.62 17.65C22.43 18.12 23.32 18.45 24.25 18.62C24.69 18.7 25.01 19.08 25.01 19.52V22.51C25.01 23.11 24.54 23.58 23.94 23.58C22.59 23.58 21.29 23.3 20.07 22.86C18.09 22.05 16.34 20.8 14.9 19.21C13.08 17.29 12 14.78 12 12.07C12 11.47 12.47 11 13.07 11H16.06C16.66 11 17.13 11.47 17.13 12.07C17.13 13.42 17.41 14.72 17.85 15.94C18.66 17.92 20.41 19.67 22.39 20.48C23.61 20.92 24.91 21.2 26.26 21.2C26.86 21.2 27.33 20.73 27.33 20.13V17.14C27.33 16.54 26.86 16.07 26.26 16.07H23.27C22.67 16.07 22.2 16.54 22.2 17.14C22.2 18.49 21.92 19.79 21.48 21.01C20.67 22.99 18.92 24.74 16.94 25.55C15.72 25.99 14.42 26.27 13.07 26.27C12.47 26.27 12 25.8 12 25.2V22.21C12 21.61 12.47 21.14 13.07 21.14C14.42 21.14 15.72 20.86 16.94 20.42C18.92 19.61 20.67 17.86 21.48 15.88C21.92 14.66 22.2 13.36 22.2 12.01C22.2 11.41 22.67 10.94 23.27 10.94H26.26C26.86 10.94 27.33 11.41 27.33 12.01V15C27.33 15.6 26.86 16.07 26.26 16.07Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M16 2V6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M8 2V6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M3 10H21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const SendIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 2L11 13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 2L15 22L11 13L2 9L22 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 6H5H21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TeamIconSmall = () => (
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
  </svg>
);

const EmptyTeamIcon = () => (
  <svg
    width="80"
    height="80"
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
  </svg>
);

const AdminIconSmall = () => (
  <svg
    width="14"
    height="14"
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
      d="M19 4H5C4.44772 4 4 4.44772 4 5V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V5C20 4.44772 19.5523 4 19 4Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const LoadingSpinner = () => (
  <svg
    width="40"
    height="40"
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
  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #2d2d2d 100%)",
    color: "#ffffff",
    padding: "32px",
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  accessDenied: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "60vh",
    gap: "16px",
    textAlign: "center",
  },
  loading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "60vh",
    gap: "16px",
    color: "rgba(255,255,255,0.7)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "32px",
    gap: "24px",
  },
  headerContent: {
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
  },
  inviteButton: {
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
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
    marginBottom: "32px",
  },
  statCard: {
    backgroundColor: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px",
    padding: "24px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
  },
  statIcon: {
    width: "60px",
    height: "60px",
    backgroundColor: "rgba(0, 212, 255, 0.1)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#00d4ff",
  },
  statContent: {
    flex: 1,
  },
  statNumber: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#ffffff",
    lineHeight: 1,
    marginBottom: "4px",
  },
  statLabel: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.6)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  formSection: {
    backgroundColor: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px",
    padding: "32px",
    marginBottom: "32px",
    backdropFilter: "blur(10px)",
  },
  formHeader: {
    marginBottom: "24px",
  },
  formTitle: {
    fontSize: "20px",
    fontWeight: "600",
    margin: "0 0 8px 0",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  formSubtitle: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.6)",
    margin: 0,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#00d4ff",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  input: {
    padding: "12px 16px",
    backgroundColor: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#ffffff",
    outline: "none",
    transition: "all 0.3s ease",
  },
  select: {
    padding: "12px 16px",
    backgroundColor: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#ffffff",
    outline: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  submitButton: {
    padding: "14px 24px",
    background: "linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    alignSelf: "flex-start",
  },
  section: {
    backgroundColor: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px",
    padding: "32px",
    backdropFilter: "blur(10px)",
  },
  sectionHeader: {
    marginBottom: "24px",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "600",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
  },
  emptyIcon: {
    width: "80px",
    height: "80px",
    backgroundColor: "rgba(0, 212, 255, 0.1)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#00d4ff",
    margin: "0 auto 20px",
  },
  emptyTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#ffffff",
    margin: "0 0 8px 0",
  },
  emptyText: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.6)",
    margin: 0,
  },
  employeeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "20px",
  },
  employeeCard: {
    backgroundColor: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    padding: "24px",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
  },
  employeeHeader: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "20px",
  },
  avatar: {
    width: "60px",
    height: "60px",
    backgroundColor: "rgba(0, 212, 255, 0.1)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#00d4ff",
    fontSize: "18px",
    fontWeight: "600",
  },
  employeeInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#ffffff",
    margin: "0 0 4px 0",
  },
  employeeEmail: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.6)",
    margin: 0,
  },
  employeeDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "20px",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabel: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.6)",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.9)",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  roleBadge: {
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    letterSpacing: "0.5px",
  },
  employeeActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  deleteButton: {
    padding: "8px 16px",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    borderRadius: "8px",
    color: "#ef4444",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
};

// Add hover effects
Object.assign(styles.inviteButton, {
  ":hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(0, 212, 255, 0.3)",
  },
});

Object.assign(styles.cancelButton, {
  ":hover": {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderColor: "rgba(255,255,255,0.2)",
    transform: "translateY(-1px)",
  },
});

Object.assign(styles.statCard, {
  ":hover": {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderColor: "rgba(255,255,255,0.15)",
    transform: "translateY(-2px)",
  },
});

Object.assign(styles.input, {
  ":focus": {
    borderColor: "#00d4ff",
    backgroundColor: "rgba(255,255,255,0.08)",
    boxShadow: "0 0 0 3px rgba(0, 212, 255, 0.1)",
  },
});

Object.assign(styles.select, {
  ":focus": {
    borderColor: "#00d4ff",
    backgroundColor: "rgba(255,255,255,0.08)",
    boxShadow: "0 0 0 3px rgba(0, 212, 255, 0.1)",
  },
});

Object.assign(styles.submitButton, {
  ":hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(0, 212, 255, 0.3)",
  },
});

Object.assign(styles.employeeCard, {
  ":hover": {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderColor: "rgba(255,255,255,0.2)",
    transform: "translateY(-2px)",
  },
});

Object.assign(styles.deleteButton, {
  ":hover": {
    backgroundColor: "rgba(239, 68, 68, 0.2)",
    borderColor: "rgba(239, 68, 68, 0.5)",
    transform: "translateY(-1px)",
  },
});
