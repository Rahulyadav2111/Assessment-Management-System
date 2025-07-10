import React, { useState } from 'react';
import axios from 'axios';

// ReportGenerator component
function ReportGenerator({ token }) {
  // State for session_id, message, error, and generated filename
  const [sessionId, setSessionId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [filename, setFilename] = useState('');

  // Handle report generation
  const handleGenerate = async () => {
    try {
      // Send request to generate report
      const response = await axios.post(
        'http://localhost:5000/api/reports/generate-report',
        { session_id: sessionId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Show success message and store filename
      setMessage(`PDF generated successfully!`);
      setFilename(response.data.file);
      setError('');
    } catch (err) {
      // Show error message
      setError(err.response?.data.message || 'Failed to generate report');
      setMessage('');
      setFilename('');
    }
  };

  // Handle PDF download
  const handleDownload = async () => {
    try {
      // Send request to download PDF with token
      const response = await axios.get(
        `http://localhost:5000/api/reports/download/${filename}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob', // Expect a binary response (PDF)
        }
      );

      // Create a blob URL for the PDF
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));

      // Create a temporary link to trigger download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename); // Set filename for download
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      // Show error message
      setError(err.response?.data.message || 'Failed to download PDF');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Generate Report</h2>
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Session ID</label>
            <input
              type="text"
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
              placeholder="Enter Session ID (e.g., session_001)"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleGenerate}
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Generate PDF
          </button>
          {filename && (
            <button
              onClick={handleDownload}
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Download PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportGenerator;