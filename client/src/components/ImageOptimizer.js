import React, { useState, useCallback, memo, useRef } from 'react';
import { Helmet } from 'react-helmet-async';

const ImageOptimizer = memo(() => {
  const [originalImage, setOriginalImage] = useState(null);
  const [optimizedImage, setOptimizedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    width: 800,
    quality: 80,
    format: 'webp'
  });
  const [stats, setStats] = useState(null);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileSelect = useCallback((e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target.result);
        setOptimizedImage(null);
        setStats(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Optimize image
  const optimizeImage = useCallback(async () => {
    if (!originalImage) return;

    setLoading(true);
    try {
      // Convert data URL to blob
      const response = await fetch(originalImage);
      const blob = await response.blob();

      // Create form data
      const formData = new FormData();
      formData.append('image', blob, 'image.jpg');
      formData.append('width', settings.width.toString());
      formData.append('quality', settings.quality.toString());
      formData.append('format', settings.format);

      // Send to optimization endpoint
      const optimizeResponse = await fetch('/api/optimize-image', {
        method: 'POST',
        body: formData
      });

      if (!optimizeResponse.ok) {
        throw new Error('Failed to optimize image');
      }

      // Get optimized image blob
      const optimizedBlob = await optimizeResponse.blob();
      const optimizedUrl = URL.createObjectURL(optimizedBlob);
      setOptimizedImage(optimizedUrl);

      // Calculate stats
      const originalSize = blob.size;
      const optimizedSize = optimizedBlob.size;
      const compressionRatio = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

      setStats({
        originalSize,
        optimizedSize,
        compressionRatio,
        format: settings.format,
        width: settings.width,
        quality: settings.quality
      });
    } catch (error) {
      console.error('Error optimizing image:', error);
      alert('Failed to optimize image. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [originalImage, settings]);

  // Format file size
  const formatFileSize = useCallback((bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  // Reset
  const reset = useCallback(() => {
    setOriginalImage(null);
    setOptimizedImage(null);
    setStats(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Image Optimizer - Performance Demo</title>
        <meta name="description" content="Optimize your images for better web performance" />
      </Helmet>

      <div className="card">
        <h1>Image Optimizer</h1>
        <p>
          Upload an image to see how optimization can reduce file size while maintaining quality.
          This tool demonstrates server-side image optimization using Sharp.
        </p>

        {/* File Upload */}
        <div className="form-group">
          <label>Select Image:</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
          />
        </div>

        {/* Settings */}
        {originalImage && (
          <div className="optimization-settings">
            <h3>Optimization Settings</h3>
            
            <div className="form-group">
              <label>Width (px):</label>
              <input
                type="number"
                value={settings.width}
                onChange={(e) => setSettings(prev => ({ ...prev, width: parseInt(e.target.value) }))}
                min="100"
                max="2000"
              />
            </div>

            <div className="form-group">
              <label>Quality (%):</label>
              <input
                type="range"
                min="10"
                max="100"
                value={settings.quality}
                onChange={(e) => setSettings(prev => ({ ...prev, quality: parseInt(e.target.value) }))}
              />
              <span>{settings.quality}%</span>
            </div>

            <div className="form-group">
              <label>Format:</label>
              <select
                value={settings.format}
                onChange={(e) => setSettings(prev => ({ ...prev, format: e.target.value }))}
              >
                <option value="webp">WebP</option>
                <option value="jpeg">JPEG</option>
                <option value="png">PNG</option>
                <option value="avif">AVIF</option>
              </select>
            </div>

            <button 
              onClick={optimizeImage} 
              className="btn"
              disabled={loading}
            >
              {loading ? 'Optimizing...' : 'Optimize Image'}
            </button>

            <button onClick={reset} className="btn btn-secondary">
              Reset
            </button>
          </div>
        )}

        {/* Results */}
        {originalImage && (
          <div className="image-comparison">
            <div className="image-section">
              <h3>Original Image</h3>
              <img 
                src={originalImage} 
                alt="Original" 
                className="image-preview"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              {stats && (
                <div className="image-stats">
                  <p><strong>Size:</strong> {formatFileSize(stats.originalSize)}</p>
                </div>
              )}
            </div>

            {optimizedImage && (
              <div className="image-section">
                <h3>Optimized Image</h3>
                <img 
                  src={optimizedImage} 
                  alt="Optimized" 
                  className="image-preview"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                {stats && (
                  <div className="image-stats">
                    <p><strong>Size:</strong> {formatFileSize(stats.optimizedSize)}</p>
                    <p><strong>Compression:</strong> {stats.compressionRatio}% smaller</p>
                    <p><strong>Format:</strong> {stats.format.toUpperCase()}</p>
                    <p><strong>Width:</strong> {stats.width}px</p>
                    <p><strong>Quality:</strong> {stats.quality}%</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Performance Tips */}
        <div className="card" style={{ marginTop: '2rem' }}>
          <h3>Image Optimization Tips</h3>
          <ul>
            <li><strong>Choose the right format:</strong> WebP and AVIF offer better compression than JPEG/PNG</li>
            <li><strong>Resize appropriately:</strong> Don't serve images larger than needed for display</li>
            <li><strong>Use responsive images:</strong> Serve different sizes for different screen sizes</li>
            <li><strong>Lazy load images:</strong> Load images only when they're about to be visible</li>
            <li><strong>Use CDN:</strong> Serve images from a Content Delivery Network for faster loading</li>
            <li><strong>Enable compression:</strong> Use gzip/brotli compression for image delivery</li>
          </ul>
        </div>
      </div>
    </>
  );
});

ImageOptimizer.displayName = 'ImageOptimizer';

export default ImageOptimizer;