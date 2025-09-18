import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';

const Home = memo(() => {
  return (
    <>
      <Helmet>
        <title>Performance Optimization Demo - Home</title>
        <meta name="description" content="A comprehensive demo of web performance optimization techniques" />
      </Helmet>
      
      <div className="card">
        <h1>Performance Optimization Demo</h1>
        <p>
          This application demonstrates various performance optimization techniques including:
        </p>
        
        <ul>
          <li><strong>Bundle Size Optimization:</strong> Code splitting, tree shaking, and lazy loading</li>
          <li><strong>Load Time Optimization:</strong> Caching, compression, and CDN strategies</li>
          <li><strong>Database Optimization:</strong> Indexing, query optimization, and connection pooling</li>
          <li><strong>Image Optimization:</strong> Compression, lazy loading, and responsive images</li>
          <li><strong>React Performance:</strong> Memoization, virtualization, and efficient rendering</li>
          <li><strong>Caching Strategies:</strong> Redis caching, HTTP caching, and service workers</li>
        </ul>
        
        <h2>Key Features</h2>
        <div className="card-grid">
          <div className="card">
            <h3>🚀 Fast Loading</h3>
            <p>Optimized bundle sizes with code splitting and lazy loading for faster initial page loads.</p>
          </div>
          
          <div className="card">
            <h3>📊 Performance Monitoring</h3>
            <p>Real-time performance metrics and monitoring to track optimization effectiveness.</p>
          </div>
          
          <div className="card">
            <h3>🖼️ Image Optimization</h3>
            <p>Automatic image compression and format conversion for optimal loading times.</p>
          </div>
          
          <div className="card">
            <h3>💾 Smart Caching</h3>
            <p>Multi-layer caching strategy with Redis and HTTP caching for improved performance.</p>
          </div>
          
          <div className="card">
            <h3>🔍 Search Optimization</h3>
            <p>Efficient search with database indexing and query optimization.</p>
          </div>
          
          <div className="card">
            <h3>📱 Responsive Design</h3>
            <p>Mobile-first design with optimized CSS and minimal reflows.</p>
          </div>
        </div>
        
        <h2>Performance Metrics</h2>
        <p>
          Navigate through the different sections to see performance optimizations in action:
        </p>
        
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-value">&lt; 2s</div>
            <div className="metric-label">Target Load Time</div>
          </div>
          
          <div className="metric-card">
            <div className="metric-value">&lt; 500KB</div>
            <div className="metric-label">Initial Bundle Size</div>
          </div>
          
          <div className="metric-card">
            <div className="metric-value">95+</div>
            <div className="metric-label">Lighthouse Score</div>
          </div>
          
          <div className="metric-card">
            <div className="metric-value">0.1s</div>
            <div className="metric-label">API Response Time</div>
          </div>
        </div>
      </div>
    </>
  );
});

Home.displayName = 'Home';

export default Home;