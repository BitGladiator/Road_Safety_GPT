import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function UserDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyTickets();
  }, []);

  const fetchMyTickets = async () => {
    try {
      const response = await api.get('/tickets');
      setTickets(response.data);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f59e0b',
      processing: '#3b82f6',
      resolved: '#10b981'
    };
    return colors[status] || '#6b7280';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: '#10b981',
      medium: '#f59e0b',
      high: '#ef4444'
    };
    return colors[priority] || '#6b7280';
  };

  const pendingCount = tickets.filter(t => t.status === 'pending').length;
  const processingCount = tickets.filter(t => t.status === 'processing').length;
  const resolvedCount = tickets.filter(t => t.status === 'resolved').length;

  if (loading) {
    return (
      <div style={styles.loading}>
        <LoadingSpinner />
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Welcome Header */}
      <div style={styles.header}>
        <div style={styles.welcomeSection}>
          <h1 style={styles.title}>
            <UserIcon />
            Welcome back, {user?.firstName || 'User'}
          </h1>
          <p style={styles.subtitle}>
            You have {tickets.length} ticket{tickets.length !== 1 ? 's' : ''} in total
          </p>
        </div>
        <button 
          onClick={() => navigate('/app/support-tickets')}
          style={styles.createButton}
        >
          <PlusIcon />
          Create New Ticket
        </button>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <TicketIcon />
          </div>
          <div style={styles.statInfo}>
            <div style={styles.statNumber}>{tickets.length}</div>
            <div style={styles.statLabel}>Total Tickets</div>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: 'rgba(245, 158, 11, 0.1)'}}>
            <PendingIcon />
          </div>
          <div style={styles.statInfo}>
            <div style={styles.statNumber}>{pendingCount}</div>
            <div style={styles.statLabel}>Pending</div>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: 'rgba(59, 130, 246, 0.1)'}}>
            <ProcessingIcon />
          </div>
          <div style={styles.statInfo}>
            <div style={styles.statNumber}>{processingCount}</div>
            <div style={styles.statLabel}>In Progress</div>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: 'rgba(16, 185, 129, 0.1)'}}>
            <ResolvedIcon />
          </div>
          <div style={styles.statInfo}>
            <div style={styles.statNumber}>{resolvedCount}</div>
            <div style={styles.statLabel}>Resolved</div>
          </div>
        </div>
      </div>

      {/* Recent Tickets Section */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            <RecentIcon />
            My Recent Tickets
          </h2>
          {tickets.length > 0 && (
            <button 
              onClick={() => navigate('/app/support-tickets')}
              style={styles.viewAllButton}
            >
              View All Tickets
              <ArrowIcon />
            </button>
          )}
        </div>

        {tickets.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>
              <EmptyTicketIcon />
            </div>
            <h3 style={styles.emptyTitle}>No tickets yet</h3>
            <p style={styles.emptyText}>
              Create your first support ticket to get started
            </p>
            <button 
              onClick={() => navigate('/app/support-tickets')}
              style={styles.emptyButton}
            >
              <PlusIcon />
              Create First Ticket
            </button>
          </div>
        ) : (
          <div style={styles.ticketList}>
            {tickets.slice(0, 5).map(ticket => (
              <div 
                key={ticket._id} 
                style={styles.ticketCard}
                onClick={() => navigate('/app/support-tickets')}
              >
                <div style={styles.ticketHeader}>
                  <div style={styles.ticketTitleSection}>
                    <h3 style={styles.ticketTitle}>{ticket.title}</h3>
                    <div style={styles.ticketMeta}>
                      <span style={{
                        ...styles.priority,
                        color: getPriorityColor(ticket.priority)
                      }}>
                        <PriorityIcon priority={ticket.priority} />
                        {ticket.priority} priority
                      </span>
                      <span style={styles.date}>
                        <CalendarIcon />
                        {new Date(ticket.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                  <div style={styles.badges}>
                    <span style={{
                      ...styles.badge,
                      backgroundColor: getStatusColor(ticket.status),
                    }}>
                      {ticket.status}
                    </span>
                  </div>
                </div>

                <p style={styles.ticketDescription}>
                  {ticket.description.length > 150 
                    ? ticket.description.substring(0, 150) + '...' 
                    : ticket.description
                  }
                </p>

                <div style={styles.ticketFooter}>
                  <span style={styles.viewLink}>
                    View Details
                    <ArrowIcon />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <RocketIcon />
          Quick Actions
        </h2>
        <div style={styles.actionGrid}>
          <button 
            style={styles.actionCard}
            onClick={() => navigate('/app/support-tickets')}
          >
            <div style={styles.actionIcon}>
              <CreateIcon />
            </div>
            <span style={styles.actionText}>Create Ticket</span>
          </button>
          
          <button 
            style={styles.actionCard}
            onClick={() => navigate('/app/support-tickets')}
          >
            <div style={styles.actionIcon}>
              <AnalyticsIcon />
            </div>
            <span style={styles.actionText}>View All Tickets</span>
          </button>
          
          <button 
            style={styles.actionCard}
            onClick={() => window.location.href = 'mailto:support@flowbit.com'}
          >
            <div style={styles.actionIcon}>
              <EmailIcon />
            </div>
            <span style={styles.actionText}>Email Support</span>
          </button>
          
          <button 
            style={styles.actionCard}
            onClick={() => alert('Help documentation coming soon!')}
          >
            <div style={styles.actionIcon}>
              <HelpIcon />
            </div>
            <span style={styles.actionText}>Help Center</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// SVG Icons
const UserIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const TicketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M15 11V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M15 17V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M5 5H19C20.1046 5 21 5.89543 21 7V10C19.8954 10 19 10.8954 19 12C19 13.1046 19.8954 14 21 14V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V14C4.10457 14 5 13.1046 5 12C5 10.8954 4.10457 10 3 10V7C3 5.89543 3.89543 5 5 5Z" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const PendingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const ProcessingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 18V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2 12H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M18 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ResolvedIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RecentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const EmptyTicketIcon = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M15 11V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M15 17V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M5 5H19C20.1046 5 21 5.89543 21 7V10C19.8954 10 19 10.8954 19 12C19 13.1046 19.8954 14 21 14V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V14C4.10457 14 5 13.1046 5 12C5 10.8954 4.10457 10 3 10V7C3 5.89543 3.89543 5 5 5Z" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const PriorityIcon = ({ priority }) => {
  const icons = {
    low: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 13.5L10 10.5L13 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 10.5L10 13.5L13 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    medium: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 8H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 16H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    high: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 10.5L10 13.5L13 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 13.5L10 10.5L13 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  };
  return icons[priority] || icons.medium;
};

const CalendarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M16 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const RocketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 11L22 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M13.5 5.5L18.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12.5 6.5L17.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9.00001 15C7.40871 13.4087 6.5 11 6.5 11L3.00001 11C2.44773 11 2.00001 11.4477 2.00001 12V16.5C2.00001 17.0523 2.44773 17.5 3.00001 17.5H6.50001C6.50001 17.5 9.00001 16 9.00001 15Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M15 9.00001C16.5913 7.40871 19 6.5 19 6.5L19 3.00001C19 2.44773 18.5523 2.00001 18 2.00001H13.5C12.9477 2.00001 12.5 2.44773 12.5 3.00001V6.50001C12.5 6.50001 14 9.00001 15 9.00001Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M14.5 13.5L10.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CreateIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const AnalyticsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 7L10.5 13.5C11.5 14.1667 12.5 14.1667 13.5 13.5L22 7" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const HelpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 16V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 8H12.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const LoadingSpinner = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 18V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2 12H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M18 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #2d2d2d 100%)',
    color: '#ffffff',
    padding: '32px',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    gap: '16px',
    color: 'rgba(255,255,255,0.7)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '40px',
    gap: '24px',
  },
  welcomeSection: {
    flex: 1,
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #ffffff 0%, #cccccc 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '0 0 8px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  subtitle: {
    fontSize: '16px',
    color: 'rgba(255,255,255,0.7)',
    margin: 0,
  },
  createButton: {
    padding: '14px 24px',
    background: 'linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    whiteSpace: 'nowrap',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
  },
  statCard: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  },
  statIcon: {
    width: '60px',
    height: '60px',
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#00d4ff',
  },
  statInfo: {
    flex: 1,
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: 1,
    marginBottom: '4px',
  },
  statLabel: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  section: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '16px',
    padding: '32px',
    marginBottom: '32px',
    backdropFilter: 'blur(10px)',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  viewAllButton: {
    padding: '10px 16px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: '#00d4ff',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
  },
  emptyIcon: {
    width: '80px',
    height: '80px',
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#00d4ff',
    margin: '0 auto 20px',
  },
  emptyTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#ffffff',
    margin: '0 0 8px 0',
  },
  emptyText: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: '24px',
  },
  emptyButton: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    margin: '0 auto',
  },
  ticketList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  ticketCard: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  },
  ticketHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
    gap: '16px',
  },
  ticketTitleSection: {
    flex: 1,
  },
  ticketTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#ffffff',
    margin: '0 0 8px 0',
    lineHeight: 1.4,
  },
  ticketMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontSize: '13px',
  },
  priority: {
    fontWeight: '500',
    textTransform: 'capitalize',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  date: {
    color: 'rgba(255,255,255,0.5)',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  badges: {
    display: 'flex',
    gap: '8px',
  },
  badge: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    color: 'white',
    textTransform: 'capitalize',
    letterSpacing: '0.5px',
  },
  ticketDescription: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.7)',
    lineHeight: '1.5',
    marginBottom: '16px',
  },
  ticketFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  viewLink: {
    fontSize: '13px',
    color: '#00d4ff',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    transition: 'all 0.3s ease',
  },
  actionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  actionCard: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: 'inherit',
    textDecoration: 'none',
  },
  actionIcon: {
    width: '48px',
    height: '48px',
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#00d4ff',
  },
  actionText: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
    textAlign: 'center',
  },
};

// Add hover effects
Object.assign(styles.createButton, {
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0, 212, 255, 0.3)',
  },
});

Object.assign(styles.statCard, {
  ':hover': {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderColor: 'rgba(255,255,255,0.15)',
    transform: 'translateY(-2px)',
  },
});

Object.assign(styles.viewAllButton, {
  ':hover': {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderColor: 'rgba(255,255,255,0.2)',
    transform: 'translateY(-1px)',
  },
});

Object.assign(styles.ticketCard, {
  ':hover': {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderColor: 'rgba(255,255,255,0.2)',
    transform: 'translateY(-2px)',
  },
});

Object.assign(styles.viewLink, {
  ':hover': {
    gap: '8px',
  },
});

Object.assign(styles.actionCard, {
  ':hover': {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderColor: 'rgba(255,255,255,0.2)',
    transform: 'translateY(-2px)',
  },
});