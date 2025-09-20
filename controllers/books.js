const Book = require('../models/book');

// GET all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve books', error: error.message });
  }
};

// GET single book
const getSingleBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve book', error: error.message });
  }
};

// POST new book
const createBook = async (req, res) => {
  try {
    const { title, author, genre, isbn, pages, publishedDate, summary } = req.body;

    if (!title || !author || !genre || !isbn || !pages || !publishedDate || !summary) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newBook = new Book({ title, author, genre, isbn, pages, publishedDate, summary });
    const savedBook = await newBook.save();
    res.status(201).json({ id: savedBook._id });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create book', error: error.message });
  }
};

// PUT update book
const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book updated successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update book', error: error.message });
  }
};

// DELETE book
const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete book', error: error.message });
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook
};
