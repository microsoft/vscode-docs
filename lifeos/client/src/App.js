import React, { Suspense, lazy, memo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';

// Lazy load components for code splitting
const Home = lazy(() => import('./components/Home'));
const Products = lazy(() => import('./components/Products'));
const Users = lazy(() => import('./components/Users'));
const ImageOptimizer = lazy(() => import('./components/ImageOptimizer'));
const PerformanceMonitor = lazy(() => import('./components/PerformanceMonitor'));

// Navigation component
const Navigation = memo(() => (
  <nav className="navigation">
    <div className="nav-container">
      <h1>Performance Demo</h1>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/users">Users</a></li>
        <li><a href="/image-optimizer">Image Optimizer</a></li>
        <li><a href="/performance">Performance</a></li>
      </ul>
    </div>
  </nav>
));

// Loading component
const LoadingSpinner = memo(() => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
));

// Create React Query client with optimizations
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="App">
            <Navigation />
            <main className="main-content">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/image-optimizer" element={<ImageOptimizer />} />
                  <Route path="/performance" element={<PerformanceMonitor />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </Router>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;