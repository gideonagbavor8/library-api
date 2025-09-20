const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthdate: { type: Date, required: true },
  nationality: { type: String, required: true }
});

module.exports = mongoose.model('author', authorSchema);
