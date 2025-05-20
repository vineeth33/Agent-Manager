import axios from 'axios';
import { useState } from 'react';

function AddAgent() {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '' });

  const submit = async () => {
    await axios.post('http://localhost:5002/api/agents', form);
    alert('Agent added');
  };

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  };

  const formStyle = {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '0.75rem',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#1f2937',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    borderRadius: '0.5rem',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#3b82f6',
    color: '#fff',
    fontWeight: 'bold',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
  };

  const buttonHoverStyle = {
    backgroundColor: '#2563eb',
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h3 style={titleStyle}>Add Agent</h3>
        <input
          style={inputStyle}
          placeholder="Name"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          style={inputStyle}
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          style={inputStyle}
          placeholder="Mobile"
          onChange={e => setForm({ ...form, mobile: e.target.value })}
        />
        <input
          style={inputStyle}
          placeholder="Password"
          type="password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button
          style={buttonStyle}
          onMouseOver={e => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={e => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
          onClick={submit}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default AddAgent;
