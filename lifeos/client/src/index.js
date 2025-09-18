import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Performance monitoring
if (process.env.NODE_ENV === 'production') {
  // Report web vitals
  const reportWebVitals = (onPerfEntry) => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      });
    }
  };

  reportWebVitals((metric) => {
    console.log('Web Vital:', metric);
    // Send to analytics service
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);