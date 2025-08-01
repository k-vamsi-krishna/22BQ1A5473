import React, { useEffect, useState } from 'react';

interface UrlData {
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

function Statistics() {
  const [data, setData] = useState<UrlData[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('shortenedUrls') || '[]');
    setData(stored);
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>URL Statistics</h1>
      {data.map((item, idx) => (
        <div key={idx} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <h3>
            <a href={`/${item.shortcode}`}>{window.location.origin}/{item.shortcode}</a>
          </h3>
          <p><strong>Created:</strong> {new Date(item.created).toLocaleString()}</p>
          <p><strong>Expires:</strong> {new Date(item.expiry).toLocaleString()}</p>
          <p><strong>Clicks:</strong> {item.clicks.length}</p>
          {item.clicks.length > 0 && (
            <ul>
              {item.clicks.map((click, i) => (
                <li key={i}>{click.time} - {click.location || 'Unknown'} - {click.source}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default Statistics; 