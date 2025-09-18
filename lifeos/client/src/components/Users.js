import React, { useState, useMemo, useCallback, memo } from 'react';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet-async';
import { FixedSizeList as List } from 'react-window';
import { debounce } from 'lodash';

// Optimized User Card component
const UserCard = memo(({ user }) => (
  <div className="card">
    <div className="user-info">
      {user.avatar && (
        <img 
          src={user.avatar} 
          alt={user.name}
          className="user-avatar"
          loading="lazy"
          width="60"
          height="60"
        />
      )}
      <div className="user-details">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <small>Joined: {new Date(user.createdAt).toLocaleDateString()}</small>
      </div>
    </div>
  </div>
));

UserCard.displayName = 'UserCard';

// Virtualized list item component
const VirtualizedUserItem = memo(({ index, style, data }) => {
  const user = data[index];
  return (
    <div style={style}>
      <UserCard user={user} />
    </div>
  );
});

VirtualizedUserItem.displayName = 'VirtualizedUserItem';

// API functions
const fetchUsers = async ({ queryKey }) => {
  const [, page, limit] = queryKey;
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString()
  });
  
  const response = await fetch(`/api/users?${params}`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

const searchUsers = async (query) => {
  if (!query || query.length < 2) return { results: [] };
  
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&type=users`);
  if (!response.ok) {
    throw new Error('Failed to search users');
  }
  return response.json();
};

const Users = memo(() => {
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [searchQuery, setSearchQuery] = useState('');
  const [useVirtualization, setUseVirtualization] = useState(false);

  // Debounced search
  const debouncedSearch = useMemo(
    () => debounce((query) => {
      setSearchQuery(query);
    }, 300),
    []
  );

  // Clean up debounced function on unmount
  React.useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);
  // Handle search input
  const handleSearchChange = useCallback((e) => {
    debouncedSearch(e.target.value);
  }, [debouncedSearch]);

  // Fetch users with React Query
  const { 
    data: usersData, 
    isLoading, 
    error,
    isFetching 
  } = useQuery(
    ['users', page, limit],
    fetchUsers,
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  // Search users
  const { data: searchResults } = useQuery(
    ['search-users', searchQuery],
    () => searchUsers(searchQuery),
    {
      enabled: searchQuery.length >= 2,
      staleTime: 2 * 60 * 1000, // 2 minutes
    }
  );

  // Memoized users list
  const users = useMemo(() => {
    if (searchQuery && searchResults) {
      return searchResults.results || [];
    }
    return usersData?.users || [];
  }, [searchQuery, searchResults, usersData]);

  // Memoized pagination info
  const pagination = useMemo(() => {
    if (searchQuery) return null;
    return usersData?.pagination;
  }, [searchQuery, usersData]);

  // Handle page change
  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (error) {
    return (
      <div className="card">
        <h2>Error loading users</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Users - Performance Demo</title>
        <meta name="description" content="Browse our user directory with fast search and pagination" />
      </Helmet>

      <div className="card">
        <h1>Users</h1>
        
        {/* Search */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search users..."
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="controls">
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

        {/* Users List */}
        {users.length > 0 && (
          <>
            <h2>
              {searchQuery ? `Search Results (${users.length})` : `Users (${pagination?.total || users.length})`}
            </h2>
            
            {useVirtualization && users.length > 50 ? (
              <div style={{ height: '600px', width: '100%' }}>
                <List
                  height={600}
                  itemCount={users.length}
                  itemSize={120}
                  itemData={users}
                >
                  {VirtualizedUserItem}
                </List>
              </div>
            ) : (
              <div className="card-grid">
                {users.map((user) => (
                  <UserCard key={user._id || user.id} user={user} />
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

        {users.length === 0 && !isLoading && (
          <p>No users found. Try adjusting your search.</p>
        )}
      </div>
    </>
  );
});

Users.displayName = 'Users';

export default Users;