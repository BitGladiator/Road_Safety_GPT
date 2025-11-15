import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <h1 style={styles.title}>Oops! Something went wrong</h1>
          <p style={styles.text}>{this.state.error?.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            style={styles.button}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '24px',
  },
  title: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '16px',
  },
  text: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '24px',
  },
  button: {
    padding: '12px 24px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};