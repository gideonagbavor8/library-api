const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  pages: { type: Number, required: true },
  publishedDate: { type: Date, required: true },
  summary: { type: String, required: true }
});

module.exports = mongoose.model('books', bookSchema);
