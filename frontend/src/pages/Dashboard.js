import { Link } from 'react-router-dom';

function Dashboard() {
  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '32rem',
    backgroundColor: '#fff',
    borderRadius: '1rem',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.08)',
    padding: '2rem',
  };

  const sectionTitleStyle = {
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '1rem',
    marginBottom: '1.5rem',
  };

  const titleTextStyle = {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#1f2937',
  };

  const subtitleTextStyle = {
    color: '#4b5563',
    marginTop: '0.25rem',
  };

  const linkStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    border: '1px solid #d1d5db',
    padding: '1rem 1.5rem',
    borderRadius: '0.75rem',
    textDecoration: 'none',
    color: '#1f2937',
    transition: 'all 0.2s ease',
    marginBottom: '1rem',
  };

  const linkHoverStyle = {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f0fdf4',
  };

  const arrowStyle = (color) => ({
    color,
    fontSize: '1.25rem',
  });

  const footerStyle = {
    marginTop: '1.5rem',
    color: '#9ca3af',
    fontSize: '0.875rem',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={sectionTitleStyle}>
          <h1 style={titleTextStyle}>Admin Dashboard</h1>
          <p style={subtitleTextStyle}>Manage your distribution system</p>
        </div>

        <Link to="/add-agent" style={linkStyle}>
          <div>
            <h3 style={{ fontWeight: '500', fontSize: '1.125rem' }}>Add Agent</h3>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Register new agents in the system</p>
          </div>
          <span style={arrowStyle('#2563eb')}>→</span>
        </Link>

        <Link to="/upload" style={linkStyle}>
          <div>
            <h3 style={{ fontWeight: '500', fontSize: '1.125rem' }}>Upload CSV</h3>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Import and distribute data</p>
          </div>
          <span style={arrowStyle('#16a34a')}>→</span>
        </Link>

        <Link to="/lists" style={linkStyle}>
          <div>
            <h3 style={{ fontWeight: '500', fontSize: '1.125rem' }}>View Lists</h3>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>See all distributed data lists</p>
          </div>
          <span style={arrowStyle('#4f46e5')}>→</span>
        </Link>
      </div>

      <div style={footerStyle}>
        Admin Panel • {new Date().getFullYear()}
      </div>
    </div>
  );
}

export default Dashboard;
