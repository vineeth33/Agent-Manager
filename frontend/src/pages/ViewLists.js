import axios from 'axios';
import { useEffect, useState } from 'react';

function ViewLists() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLists = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get('http://localhost:5002/api/lists');

        const filteredLists = response.data.filter(list => {
          const item = list.data?.[0];
          return item && item.FirstName && item.Phone && item.Notes;
        });

        setLists(filteredLists);
      } catch (err) {
        console.error('Error fetching lists:', err);
        setError('Failed to load lists. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, []);

  const spinnerStyle = {
    height: '40vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  };

  const spinCircleStyle = {
    height: '40px',
    width: '40px',
    border: '4px solid #2563eb',
    borderRightColor: 'transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  const retryBoxStyle = {
    maxWidth: '600px',
    margin: '2rem auto',
    backgroundColor: '#fee2e2',
    border: '1px solid #fecaca',
    color: '#991b1b',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    textAlign: 'center',
  };

  const retryButtonStyle = {
    marginTop: '1rem',
    backgroundColor: '#dc2626',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '0.5rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  const noDataBoxStyle = {
    maxWidth: '700px',
    margin: '3rem auto',
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  };

  const listContainerStyle = {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '2rem 1rem',
  };

  const listCardStyle = {
    marginBottom: '2.5rem',
    backgroundColor: '#fff',
    borderRadius: '0.75rem',
    overflow: 'hidden',
    border: '1px solid #f3f4f6',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
  };

  const listHeaderStyle = {
    backgroundColor: '#eff6ff',
    padding: '1rem 1.5rem',
    borderBottom: '1px solid #dbeafe',
    fontWeight: '600',
    fontSize: '1rem',
    color: '#1e3a8a',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thStyle = {
    textAlign: 'left',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#f9fafb',
    color: '#374151',
    fontWeight: 'bold',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    borderBottom: '1px solid #e5e7eb',
  };

  const tdStyle = {
    padding: '0.75rem 1.5rem',
    fontSize: '0.875rem',
    color: '#1f2937',
    borderBottom: '1px solid #f3f4f6',
  };

  if (loading) {
    return (
      <div style={spinnerStyle}>
        <div style={spinCircleStyle}></div>
        <p style={{ marginTop: '1rem', color: '#4b5563', fontSize: '0.875rem' }}>
          Loading distributed lists...
        </p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={retryBoxStyle}>
        <p>{error}</p>
        <button style={retryButtonStyle} onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  if (lists.length === 0) {
    return (
      <div style={noDataBoxStyle}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
          No Distributed Lists Found
        </h3>
        <p style={{ color: '#4b5563' }}>
          Please upload a valid CSV file with columns <strong>FirstName</strong>, <strong>Phone</strong>, and{' '}
          <strong>Notes</strong>.
        </p>
      </div>
    );
  }

  return (
    <div style={listContainerStyle}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '2rem' }}>
        Distributed Contact Lists
      </h2>

      {lists.map(list => (
        <div key={list._id} style={listCardStyle}>
          <div style={listHeaderStyle}>
            Agent: {list.agentId?.name || 'Unknown Agent'}
            <span style={{ marginLeft: '0.5rem', fontSize: '0.875rem', fontWeight: 'normal', color: '#6b7280' }}>
              ({list.data.length} contacts)
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Phone</th>
                  <th style={thStyle}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {list.data.map((item, index) => (
                  <tr key={index} style={{ transition: 'background 0.2s' }} onMouseOver={e => (e.currentTarget.style.backgroundColor = '#f9fafb')} onMouseOut={e => (e.currentTarget.style.backgroundColor = 'white')}>
                    <td style={tdStyle}>{item.FirstName || 'N/A'}</td>
                    <td style={tdStyle}>{item.Phone || 'N/A'}</td>
                    <td style={tdStyle}>{item.Notes || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewLists;
