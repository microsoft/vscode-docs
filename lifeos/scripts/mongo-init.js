// MongoDB initialization script for performance optimization demo

// Switch to the performance-demo database
db = db.getSiblingDB('performance-demo');

// Create collections with optimized indexes
print('Creating collections and indexes...');

// Users collection
db.createCollection('users');
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "name": 1 });
db.users.createIndex({ "createdAt": -1 });

// Products collection
db.createCollection('products');
db.products.createIndex({ "name": 1 });
db.products.createIndex({ "category": 1 });
db.products.createIndex({ "price": 1 });
db.products.createIndex({ "createdAt": -1 });
db.products.createIndex({ "name": "text", "description": "text" });

// Performance metrics collection
db.createCollection('performance_metrics');
db.performance_metrics.createIndex({ "timestamp": -1 });
db.performance_metrics.createIndex({ "metric_type": 1, "timestamp": -1 });

// Sample data for demonstration
print('Inserting sample data...');

// Sample users
const sampleUsers = [
  {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://via.placeholder.com/150/007bff/ffffff?text=JD",
    createdAt: new Date()
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://via.placeholder.com/150/28a745/ffffff?text=JS",
    createdAt: new Date()
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
    avatar: "https://via.placeholder.com/150/dc3545/ffffff?text=BJ",
    createdAt: new Date()
  }
];

db.users.insertMany(sampleUsers);

// Sample products
const sampleProducts = [
  {
    name: "High-Performance Laptop",
    description: "Latest generation laptop with optimized performance for development work",
    price: 1299.99,
    category: "electronics",
    images: ["https://via.placeholder.com/400x300/007bff/ffffff?text=Laptop"],
    createdAt: new Date()
  },
  {
    name: "Wireless Headphones",
    description: "Noise-cancelling wireless headphones with premium sound quality",
    price: 299.99,
    category: "electronics",
    images: ["https://via.placeholder.com/400x300/28a745/ffffff?text=Headphones"],
    createdAt: new Date()
  },
  {
    name: "Programming Book",
    description: "Comprehensive guide to modern web development and performance optimization",
    price: 49.99,
    category: "books",
    images: ["https://via.placeholder.com/400x300/ffc107/000000?text=Book"],
    createdAt: new Date()
  },
  {
    name: "Ergonomic Chair",
    description: "Comfortable office chair designed for long coding sessions",
    price: 199.99,
    category: "home",
    images: ["https://via.placeholder.com/400x300/6c757d/ffffff?text=Chair"],
    createdAt: new Date()
  },
  {
    name: "Mechanical Keyboard",
    description: "High-quality mechanical keyboard with RGB lighting",
    price: 149.99,
    category: "electronics",
    images: ["https://via.placeholder.com/400x300/dc3545/ffffff?text=Keyboard"],
    createdAt: new Date()
  }
];

db.products.insertMany(sampleProducts);

// Sample performance metrics
const sampleMetrics = [
  {
    metric_type: "page_load",
    value: 1200,
    timestamp: new Date(),
    url: "/",
    user_agent: "Mozilla/5.0 (Chrome/91.0)"
  },
  {
    metric_type: "api_response",
    value: 150,
    timestamp: new Date(),
    endpoint: "/api/products",
    method: "GET"
  },
  {
    metric_type: "bundle_size",
    value: 450000,
    timestamp: new Date(),
    bundle_name: "main.js"
  }
];

db.performance_metrics.insertMany(sampleMetrics);

print('Database initialization completed successfully!');
print('Collections created: users, products, performance_metrics');
print('Indexes created for optimal query performance');
print('Sample data inserted for demonstration');