import React, { useState } from 'react';

const BookSearch = ({ setBooks, setLoading, setError, loading }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('title');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      let apiUrl;
      switch(searchType) {
        case 'title':
          apiUrl = `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`;
          break;
        case 'author':
          apiUrl = `https://openlibrary.org/search.json?author=${encodeURIComponent(query)}`;
          break;
        case 'subject':
          apiUrl = `https://openlibrary.org/search.json?subject=${encodeURIComponent(query)}`;
          break;
        default:
          apiUrl = `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`;
      }
      
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Failed to fetch books');
      
      const data = await response.json();
      
      // Enhance book data with additional information
      const enhancedBooks = (data.docs || []).map(book => ({
        key: book.key,
        title: book.title || 'Unknown Title',
        author_name: book.author_name || ['Unknown Author'],
        first_publish_year: book.first_publish_year,
        isbn: book.isbn,
        cover_i: book.cover_i,
        subject: book.subject,
        // Add availability info for college student Alex
        availability: book.availability || { 
          availability: "check",
          status: "Available to check" 
        }
      }));
      
      setBooks(enhancedBooks);
      
      if (enhancedBooks.length === 0) {
        setError('No books found. Try a different search term.');
      }
    } catch (err) {
      setError('Failed to fetch books. Please check your connection and try again.');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  // Search suggestions for college student Alex
  const searchSuggestions = [
    { type: 'title', term: 'Calculus' },
    { type: 'author', term: 'J.K. Rowling' },
    { type: 'subject', term: 'Computer Science' },
    { type: 'title', term: 'Organic Chemistry' }
  ];

  return (
    <div className="book-search-container">
      <div className="search-header">
        <h2>Find Books for Your Studies</h2>
        <p>Search by title, author, or subject to find your next textbook or leisure read</p>
      </div>
      
      <form onSubmit={handleSearch} className="book-search-form">
        <div className="search-controls">
          <div className="search-type-selector">
            <label htmlFor="search-type">Search by:</label>
            <select 
              id="search-type"
              value={searchType} 
              onChange={(e) => setSearchType(e.target.value)}
              className="search-type"
              disabled={loading}
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="subject">Subject</option>
            </select>
          </div>
          
          <div className="search-input-container">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Enter ${searchType}...`}
              className="search-input"
              disabled={loading}
            />
            <button 
              type="submit" 
              className="search-button"
              disabled={loading || !query.trim()}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Searching...
                </>
              ) : (
                <>
                  <span className="search-icon">🔍</span>
                  Search
                </>
              )}
            </button>
          </div>
        </div>
      </form>
      
      <div className="search-suggestions">
        <h3>Quick searches for Alex:</h3>
        <div className="suggestion-buttons">
          {searchSuggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              className="suggestion-button"
              onClick={() => {
                setSearchType(suggestion.type);
                setQuery(suggestion.term);
              }}
              disabled={loading}
            >
              {suggestion.term} ({suggestion.type})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookSearch;