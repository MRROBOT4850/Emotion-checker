import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

const EmotionForm: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<{ emotion: string; confidence: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (text.trim() === '') {
      alert('Please enter a statement before submitting.');
      return;
    }
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post('http://localhost:8000/detect-emotion', { text });
      setResult(response.data);
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1 className="title">Emotion Detector</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="input-box"
          placeholder="Type your feeling..."
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading}
        />
        <button className="submit-btn" type="submit" disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>

      {loading && <div className="spinner"></div>}

      {result && !loading && (
        <div className="result-box">
          <p><strong>Emotion:</strong> {result.emotion}</p>
          <p><strong>Confidence:</strong> {Math.round(result.confidence * 100)}%</p>
        </div>
      )}
    </div>
  );
};

export default EmotionForm;
