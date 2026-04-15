import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log to console (or to external service)
    // eslint-disable-next-line no-console
    console.error('Uncaught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ background: '#0A0A0A', color: '#fff', minHeight: '100vh', padding: 40 }}>
          <h1 style={{ fontSize: 28, marginBottom: 12 }}>Something went wrong</h1>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#fca5a5' }}>{String(this.state.error)}</pre>
          <p style={{ marginTop: 16 }}>Open the browser console for full stack trace.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
