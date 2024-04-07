import React from 'react';
import { useEffect } from 'react';
import { LinearProgress } from '@mui/material';

const BooksStoreContext = React.createContext({
  books: [],
  book: {},
  setBooks: () => {},
  getBooks: () => {},
  getBookById: async () => ({}),
  removeBookById: async () => {},
  addBook: async () => {},
  loading: false,
  toggleLoading: () => {},
});

const BooksStoreProvider = ({ children }) => {
  const [books, setBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const toggleLoading = (loading) => {
    setLoading(loading);
  };

  const getBooks = () => {
    setLoading(true);
    fetch('http://localhost:5000/books', {
      credentials: 'same-origin',
      referrerPolicy: 'no-referrer',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBooks(data);
        setLoading(false);
      });
  };

  const getBookById = async (id) => {
    setLoading(true);
    const res = await fetch(`http://localhost:5000/books/${id}`, {
      credentials: 'same-origin',
      referrerPolicy: 'no-referrer',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    setLoading(false);
    return data;
  };

  const removeBookById = async (id) => {
    setLoading(true);
    const res = await fetch(`http://localhost:5000/books/${id}`, {
      credentials: 'same-origin',
      referrerPolicy: 'no-referrer',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(res.status);
    if (res.status === 200) {
      setBooks(books.filter((book) => book.id !== id));
    }
    setLoading(false);
  };

  const addBook = async (book) => {
    setLoading(true);
    const res = await fetch('http://localhost:5000/books', {
      credentials: 'same-origin',
      referrerPolicy: 'no-referrer',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
    if (res.status === 201) {
      const newBook = await res.json();
      setBooks([...books, newBook]);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Fetch book details by id
    getBooks();
  }, []);

  return (
    <BooksStoreContext.Provider
      value={{
        getBookById,
        removeBookById,
        toggleLoading,
        books,
        addBook,
      }}
    >
      {loading && <LinearProgress />}

      {children}
    </BooksStoreContext.Provider>
  );
};
export { BooksStoreContext, BooksStoreProvider };
