const Author = require('../models/author');

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve authors', error: error.message });
  }
};

const getSingleAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found' });
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve author', error: error.message });
  }
};

const createAuthor = async (req, res) => {
  try {
    const { name, birthdate, nationality } = req.body;
    if (!name || !birthdate || !nationality) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newAuthor = new Author({ name, birthdate, nationality });
    const savedAuthor = await newAuthor.save();
    res.status(201).json({ id: savedAuthor._id });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create author', error: error.message });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedAuthor) return res.status(404).json({ message: 'Author not found' });
    res.status(200).json({ message: 'Author updated successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update author', error: error.message });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!deletedAuthor) return res.status(404).json({ message: 'Author not found' });
    res.status(200).json({ message: 'Author deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete author', error: error.message });
  }
};

module.exports = {
  getAllAuthors,
  getSingleAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor
};
