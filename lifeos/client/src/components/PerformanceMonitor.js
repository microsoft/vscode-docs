import React, { useState, useEffect, useCallback, memo } from 'react';
import { Helmet } from 'react-helmet-async';

const PerformanceMonitor = memo(() => {
  const [metrics, setMetrics] = useState({});
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [performanceData, setPerformanceData] = useState([]);

  // Get performance metrics
  const getPerformanceMetrics = useCallback(() => {
    if (typeof window === 'undefined' || !window.performance) {
      return {};
    }

    const navigation = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    
    const metrics = {
      // Navigation timing
      dns: navigation ? Math.round(navigation.domainLookupEnd - navigation.domainLookupStart) : 0,
      tcp: navigation ? Math.round(navigation.connectEnd - navigation.connectStart) : 0,
      ssl: navigation ? Math.round(navigation.secureConnectionStart > 0 ? navigation.connectEnd - navigation.secureConnectionStart : 0) : 0,
      ttfb: navigation ? Math.round(navigation.responseStart - navigation.requestStart) : 0,
      domLoad: navigation ? Math.round(navigation.domContentLoadedEventEnd - navigation.navigationStart) : 0,
      pageLoad: navigation ? Math.round(navigation.loadEventEnd - navigation.navigationStart) : 0,
      
      // Paint timing
      fcp: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
      lcp: 0, // Will be updated by LCP observer
      
      // Resource timing
      resourceCount: performance.getEntriesByType('resource').length,
      
      // Memory usage (if available)
      memory: performance.memory ? {
        used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
        total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
      } : null,
      
      // Connection info
      connection: navigator.connection ? {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt
      } : null,
      
      timestamp: Date.now()
    };

    return metrics;
  }, []);

  // LCP Observer
  useEffect(() => {
    if (!isMonitoring) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      setMetrics(prev => ({
        ...prev,
        lcp: Math.round(lastEntry.startTime)
      }));
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.log('LCP observer not supported');
    }

    return () => observer.disconnect();
  }, [isMonitoring]);

  // Start monitoring
  const startMonitoring = useCallback(() => {
    setIsMonitoring(true);
    setPerformanceData([]);
    
    // Get initial metrics
    const initialMetrics = getPerformanceMetrics();
    setMetrics(initialMetrics);
    setPerformanceData([initialMetrics]);
  }, [getPerformanceMetrics]);

  // Stop monitoring
  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
  }, []);

  // Add data point
  const addDataPoint = useCallback(() => {
    const newMetrics = getPerformanceMetrics();
    setMetrics(newMetrics);
    setPerformanceData(prev => [...prev, newMetrics]);
  }, [getPerformanceMetrics]);

  // Clear data
  const clearData = useCallback(() => {
    setPerformanceData([]);
    setMetrics({});
  }, []);

  // Format time
  const formatTime = useCallback((ms) => {
    if (ms === 0) return 'N/A';
    return `${ms}ms`;
  }, []);

  // Get performance score
  const getPerformanceScore = useCallback((metric, value) => {
    if (!value) return { score: 0, color: '#dc3545' };
    
    const thresholds = {
      fcp: { good: 1800, poor: 3000 },
      lcp: { good: 2500, poor: 4000 },
      ttfb: { good: 800, poor: 1800 },
      domLoad: { good: 2000, poor: 4000 },
      pageLoad: { good: 3000, poor: 6000 }
    };

    const threshold = thresholds[metric];
    if (!threshold) return { score: 100, color: '#28a745' };

    if (value <= threshold.good) {
      return { score: 100, color: '#28a745' };
    } else if (value <= threshold.poor) {
      return { score: 50, color: '#ffc107' };
    } else {
      return { score: 0, color: '#dc3545' };
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Performance Monitor - Performance Demo</title>
        <meta name="description" content="Monitor real-time performance metrics and optimization results" />
      </Helmet>

      <div className="card">
        <h1>Performance Monitor</h1>
        <p>
          Real-time performance monitoring and metrics collection. This tool helps you understand
          how your application performs and identify optimization opportunities.
        </p>

        {/* Controls */}
        <div className="monitor-controls">
          <button 
            onClick={startMonitoring} 
            className="btn"
            disabled={isMonitoring}
          >
            Start Monitoring
          </button>
          
          <button 
            onClick={stopMonitoring} 
            className="btn btn-secondary"
            disabled={!isMonitoring}
          >
            Stop Monitoring
          </button>
          
          <button 
            onClick={addDataPoint} 
            className="btn"
            disabled={!isMonitoring}
          >
            Add Data Point
          </button>
          
          <button 
            onClick={clearData} 
            className="btn btn-secondary"
          >
            Clear Data
          </button>
        </div>

        {/* Current Metrics */}
        {Object.keys(metrics).length > 0 && (
          <div className="card">
            <h2>Current Performance Metrics</h2>
            
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-value" style={{ color: getPerformanceScore('fcp', metrics.fcp).color }}>
                  {formatTime(metrics.fcp)}
                </div>
                <div className="metric-label">First Contentful Paint</div>
              </div>
              
              <div className="metric-card">
                <div className="metric-value" style={{ color: getPerformanceScore('lcp', metrics.lcp).color }}>
                  {formatTime(metrics.lcp)}
                </div>
                <div className="metric-label">Largest Contentful Paint</div>
              </div>
              
              <div className="metric-card">
                <div className="metric-value" style={{ color: getPerformanceScore('ttfb', metrics.ttfb).color }}>
                  {formatTime(metrics.ttfb)}
                </div>
                <div className="metric-label">Time to First Byte</div>
              </div>
              
              <div className="metric-card">
                <div className="metric-value" style={{ color: getPerformanceScore('domLoad', metrics.domLoad).color }}>
                  {formatTime(metrics.domLoad)}
                </div>
                <div className="metric-label">DOM Content Loaded</div>
              </div>
              
              <div className="metric-card">
                <div className="metric-value" style={{ color: getPerformanceScore('pageLoad', metrics.pageLoad).color }}>
                  {formatTime(metrics.pageLoad)}
                </div>
                <div className="metric-label">Page Load Time</div>
              </div>
              
              <div className="metric-card">
                <div className="metric-value">{metrics.resourceCount || 0}</div>
                <div className="metric-label">Resources Loaded</div>
              </div>
            </div>

            {/* Network Metrics */}
            {metrics.connection && (
              <div className="card">
                <h3>Network Information</h3>
                <div className="metrics-grid">
                  <div className="metric-card">
                    <div className="metric-value">{metrics.connection.effectiveType}</div>
                    <div className="metric-label">Connection Type</div>
                  </div>
                  
                  <div className="metric-card">
                    <div className="metric-value">{metrics.connection.downlink} Mbps</div>
                    <div className="metric-label">Download Speed</div>
                  </div>
                  
                  <div className="metric-card">
                    <div className="metric-value">{metrics.connection.rtt}ms</div>
                    <div className="metric-label">Round Trip Time</div>
                  </div>
                </div>
              </div>
            )}

            {/* Memory Usage */}
            {metrics.memory && (
              <div className="card">
                <h3>Memory Usage</h3>
                <div className="metrics-grid">
                  <div className="metric-card">
                    <div className="metric-value">{metrics.memory.used} MB</div>
                    <div className="metric-label">Used Memory</div>
                  </div>
                  
                  <div className="metric-card">
                    <div className="metric-value">{metrics.memory.total} MB</div>
                    <div className="metric-label">Total Memory</div>
                  </div>
                  
                  <div className="metric-card">
                    <div className="metric-value">{metrics.memory.limit} MB</div>
                    <div className="metric-label">Memory Limit</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Performance Data History */}
        {performanceData.length > 0 && (
          <div className="card">
            <h2>Performance Data History</h2>
            <div className="performance-table">
              <table>
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>FCP</th>
                    <th>LCP</th>
                    <th>TTFB</th>
                    <th>DOM Load</th>
                    <th>Page Load</th>
                    <th>Resources</th>
                  </tr>
                </thead>
                <tbody>
                  {performanceData.map((data, index) => (
                    <tr key={index}>
                      <td>{new Date(data.timestamp).toLocaleTimeString()}</td>
                      <td style={{ color: getPerformanceScore('fcp', data.fcp).color }}>
                        {formatTime(data.fcp)}
                      </td>
                      <td style={{ color: getPerformanceScore('lcp', data.lcp).color }}>
                        {formatTime(data.lcp)}
                      </td>
                      <td style={{ color: getPerformanceScore('ttfb', data.ttfb).color }}>
                        {formatTime(data.ttfb)}
                      </td>
                      <td style={{ color: getPerformanceScore('domLoad', data.domLoad).color }}>
                        {formatTime(data.domLoad)}
                      </td>
                      <td style={{ color: getPerformanceScore('pageLoad', data.pageLoad).color }}>
                        {formatTime(data.pageLoad)}
                      </td>
                      <td>{data.resourceCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Performance Tips */}
        <div className="card">
          <h3>Performance Optimization Tips</h3>
          <ul>
            <li><strong>First Contentful Paint (FCP):</strong> Optimize critical rendering path, minimize render-blocking resources</li>
            <li><strong>Largest Contentful Paint (LCP):</strong> Optimize images, use efficient image formats, implement lazy loading</li>
            <li><strong>Time to First Byte (TTFB):</strong> Optimize server response time, use CDN, enable compression</li>
            <li><strong>DOM Content Loaded:</strong> Minimize JavaScript execution, defer non-critical scripts</li>
            <li><strong>Page Load Time:</strong> Optimize all resources, use code splitting, implement caching</li>
            <li><strong>Memory Usage:</strong> Avoid memory leaks, clean up event listeners, optimize data structures</li>
          </ul>
        </div>
      </div>
    </>
  );
});

PerformanceMonitor.displayName = 'PerformanceMonitor';

export default PerformanceMonitor;