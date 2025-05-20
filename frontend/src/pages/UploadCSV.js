import axios from 'axios';
import { useState } from 'react';

function UploadCSV() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const upload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', file);

      console.log('Uploading file:', {
        fileName: file.name,
        fileType: file.type,
        fileSize: `${(file.size / 1024).toFixed(2)} KB`
      });

      // Send the request
      const response = await axios.post(
        'http://localhost:5002/api/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log('Upload response:', response.data);
      setSuccess(response.data.message || 'File uploaded successfully!');
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.message || 'Error uploading file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h3>Upload CSV</h3>

      {error && (
        <div style={{ color: 'red', marginBottom: '10px', padding: '8px', backgroundColor: '#ffeeee', borderRadius: '4px' }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{ color: 'green', marginBottom: '10px', padding: '8px', backgroundColor: '#eeffee', borderRadius: '4px' }}>
          {success}
        </div>
      )}

      <div style={{ marginBottom: '15px' }}>
        <input
          type="file"
          accept=".csv"
          onChange={e => setFile(e.target.files[0])}
          style={{ display: 'block', marginBottom: '10px' }}
        />

        {file && (
          <div style={{ fontSize: '0.9em', color: '#666' }}>
            Selected file: {file.name} ({(file.size / 1024).toFixed(2)} KB)
          </div>
        )}
      </div>

      <button
        onClick={upload}
        disabled={loading || !file}
        style={{
          padding: '8px 16px',
          backgroundColor: loading ? '#cccccc' : '#4285f4',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}

export default UploadCSV;