import React, { useState, useMemo, useCallback, memo } from 'react';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet-async';
import { FixedSizeList as List } from 'react-window';
import { debounce } from 'lodash';

// Optimized Product Card component
const ProductCard = memo(({ product }) => (
  <div className="card">
    <h3>{product.name}</h3>
    <p>{product.description}</p>
    <div className="product-details">
      <span className="price">${product.price}</span>
      <span className="category">{product.category}</span>
    </div>
    {product.images && product.images.length > 0 && (
      <img 
        src={product.images[0]} 
        alt={product.name}
        className="product-image"
        loading="lazy"
        width="200"
        height="150"
      />
    )}
  </div>
));

ProductCard.displayName = 'ProductCard';

// Virtualized list item component
const VirtualizedProductItem = memo(({ index, style, data }) => {
  const product = data[index];
  return (
    <div style={style}>
      <ProductCard product={product} />
    </div>
  );
});

VirtualizedProductItem.displayName = 'VirtualizedProductItem';

// API functions
const fetchProducts = async ({ queryKey }) => {
  const [, page, limit, filters] = queryKey;
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...filters
  });
  
  const response = await fetch(`/api/products?${params}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

const searchProducts = async (query) => {
  if (!query || query.length < 2) return { results: [] };
  
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&type=products`);
  if (!response.ok) {
    throw new Error('Failed to search products');
  }
  return response.json();
};

const Products = memo(() => {
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [useVirtualization, setUseVirtualization] = useState(false);

  // Memoized filters
  const filters = useMemo(() => ({
    ...(category && { category }),
    ...(minPrice && { minPrice }),
    ...(maxPrice && { maxPrice })
  }), [category, minPrice, maxPrice]);

  // Debounced search
  const debouncedSearch = useMemo(
    () => debounce((query) => {
      setSearchQuery(query);
    }, 300),
    []
  );

  // Cleanup debounced function on unmount
  React.useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);
  // Handle search input
  const handleSearchChange = useCallback((e) => {
    debouncedSearch(e.target.value);
  }, [debouncedSearch]);

  // Fetch products with React Query
  const { 
    data: productsData, 
    isLoading, 
    error,
    isFetching 
  } = useQuery(
    ['products', page, limit, filters],
    fetchProducts,
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  // Search products
  const { data: searchResults } = useQuery(
    ['search', searchQuery],
    () => searchProducts(searchQuery),
    {
      enabled: searchQuery.length >= 2,
      staleTime: 2 * 60 * 1000, // 2 minutes
    }
  );

  // Memoized products list
  const products = useMemo(() => {
    if (searchQuery && searchResults) {
      return searchResults.results || [];
    }
    return productsData?.products || [];
  }, [searchQuery, searchResults, productsData]);

  // Memoized pagination info
  const pagination = useMemo(() => {
    if (searchQuery) return null;
    return productsData?.pagination;
  }, [searchQuery, productsData]);

  // Handle page change
  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setPage(1);
  }, []);

  if (error) {
    return (
      <div className="card">
        <h2>Error loading products</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Products - Performance Demo</title>
        <meta name="description" content="Browse our optimized product catalog with fast search and filtering" />
      </Helmet>

      <div className="card">
        <h1>Products</h1>
        
        {/* Search and Filters */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="filters">
          <div className="form-group">
            <label>Category:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              <option value="home">Home & Garden</option>
            </select>
          </div>

          <div className="form-group">
            <label>Min Price:</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label>Max Price:</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="1000"
            />
          </div>

          <button onClick={clearFilters} className="btn btn-secondary">
            Clear Filters
          </button>

          <label>
            <input
              type="checkbox"
              checked={useVirtualization}
              onChange={(e) => setUseVirtualization(e.target.checked)}
            />
            Use Virtualization (for large lists)
          </label>
        </div>

        {/* Loading indicator */}
        {isLoading && <div className="loading-spinner"><div className="spinner"></div></div>}
        {isFetching && !isLoading && <p>Updating...</p>}

        {/* Products List */}
        {products.length > 0 && (
          <>
            <h2>
              {searchQuery ? `Search Results (${products.length})` : `Products (${pagination?.total || products.length})`}
            </h2>
            
            {useVirtualization && products.length > 50 ? (
              <div style={{ height: '600px', width: '100%' }}>
                <List
                  height={600}
                  itemCount={products.length}
                  itemSize={200}
                  itemData={products}
                >
                  {VirtualizedProductItem}
                </List>
              </div>
            ) : (
              <div className="card-grid">
                {products.map((product) => (
                  <ProductCard key={product._id || product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            
            {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
              const pageNum = Math.max(1, page - 2) + i;
              if (pageNum > pagination.pages) return null;
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={pageNum === page ? 'active' : ''}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === pagination.pages}
            >
              Next
            </button>
          </div>
        )}

        {products.length === 0 && !isLoading && (
          <p>No products found. Try adjusting your search or filters.</p>
        )}
      </div>
    </>
  );
});

Products.displayName = 'Products';

export default Products;