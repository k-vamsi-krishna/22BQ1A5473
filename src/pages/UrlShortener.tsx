import React, { useState } from 'react';
import { generateShortcode } from '../utils/generateShortcode';

interface UrlItem {
  original: string;
  shortcode: string;
  validity: string;
  error: string;
}

interface ResultItem {
  original: string;
  shortcode: string;
  expiry: number;
  created: number;
  clicks: Array<{
    time: string;
    location: string;
    source: string;
  }>;
}

function UrlShortener() {
  const [urls, setUrls] = useState<UrlItem[]>([
    { original: '', shortcode: '', validity: '', error: '' },
  ]);
  const [results, setResults] = useState<ResultItem[]>([]);

  const handleChange = (index: number, field: keyof UrlItem, value: string) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleShorten = () => {
    const newResults: ResultItem[] = [];
    const timestamp = Date.now();
    const updated = urls.map((item) => {
      if (!validateUrl(item.original)) {
        return { ...item, error: 'Invalid URL' };
      }
      const shortcode = item.shortcode || generateShortcode();
      const validity = item.validity ? parseInt(item.validity) : 30;
      const expiry = timestamp + validity * 60000;

      newResults.push({
        original: item.original,
        shortcode,
        expiry,
        created: timestamp,
        clicks: [],
      });

      return { original: '', shortcode: '', validity: '', error: '' };
    });

    setResults(newResults);
    setUrls([{ original: '', shortcode: '', validity: '', error: '' }]);

    const stored = JSON.parse(localStorage.getItem('shortenedUrls') || '[]');
    localStorage.setItem('shortenedUrls', JSON.stringify([...stored, ...newResults]));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>URL Shortener</h1>
      {urls.map((url, idx) => (
        <div key={idx} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
            <div>
              <label>Original URL:</label>
              <input
                type="text"
                value={url.original}
                onChange={(e) => handleChange(idx, 'original', e.target.value)}
                style={{ width: '100%', padding: '8px', border: url.error ? '1px solid red' : '1px solid #ccc' }}
                placeholder="https://example.com"
              />
              {url.error && <span style={{ color: 'red', fontSize: '12px' }}>{url.error}</span>}
            </div>
            <div>
              <label>Validity (min):</label>
              <input
                type="number"
                value={url.validity}
                onChange={(e) => handleChange(idx, 'validity', e.target.value)}
                style={{ width: '100%', padding: '8px' }}
                placeholder="30"
              />
            </div>
            <div>
              <label>Custom Shortcode:</label>
              <input
                type="text"
                value={url.shortcode}
                onChange={(e) => handleChange(idx, 'shortcode', e.target.value)}
                style={{ width: '100%', padding: '8px' }}
                placeholder="Optional"
              />
            </div>
          </div>
        </div>
      ))}
      {urls.length < 5 && (
        <button 
          onClick={() => setUrls([...urls, { original: '', shortcode: '', validity: '', error: '' }])}
          style={{ marginBottom: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Add URL
        </button>
      )}
      <button 
        onClick={handleShorten}
        style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px' }}
      >
        Shorten URLs
      </button>

      <h2>Results:</h2>
      {results.map((res, i) => (
        <div key={i} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
          <strong>Shortened:</strong> <a href={`/${res.shortcode}`}>{window.location.origin}/{res.shortcode}</a>
          <br />
          <strong>Expires:</strong> {new Date(res.expiry).toLocaleString()}
        </div>
      ))}
    </div>
  );
}

export default UrlShortener; 