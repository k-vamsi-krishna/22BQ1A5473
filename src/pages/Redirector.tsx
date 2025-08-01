import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

function Redirector() {
  const { shortcode } = useParams<{ shortcode: string }>();

  useEffect(() => {
    const data: UrlData[] = JSON.parse(localStorage.getItem('shortenedUrls') || '[]');
    const index = data.findIndex((u) => u.shortcode === shortcode);
    if (index > -1) {
      const item = data[index];
      const now = Date.now();
      if (now < item.expiry) {
        const click = {
          time: new Date().toLocaleString(),
          location: 'IN', // mock
          source: document.referrer || 'direct',
        };
        item.clicks.push(click);
        data[index] = item;
        localStorage.setItem('shortenedUrls', JSON.stringify(data));
        window.location.href = item.original;
      } else {
        alert('This link has expired.');
      }
    } else {
      alert('Invalid short link.');
    }
  }, [shortcode]);

  return <div>Redirecting...</div>;
}

export default Redirector; 