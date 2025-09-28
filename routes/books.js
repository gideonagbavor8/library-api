const express = require('express');
const router = express.Router();
const bookController = require('../controllers/books');
const ensureAuth = require('../middleware/auth');
const passport = require('passport');
require('../auth/jwt'); 

// Swagger Comments
/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API for managing books
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of all books
 */
// GET all books
router.get('/', bookController.getAllBooks);
// Add this route for testing
router.get('/test-auth', ensureAuth, (req, res) => {
  res.json({ message: 'You are authenticated' });
});

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a single book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book found
 *       404:
 *         description: Book not found
 */
// GET single book
router.get('/:id', bookController.getSingleBook);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book created
 *       400:
 *         description: Validation error
 *     security:
 *       - bearerAuth: []
 */
// POST new book
router.post('/', passport.authenticate('jwt', { session: false }), bookController.createBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Book not found
 */
// PUT update book
router.put('/:id', passport.authenticate('jwt', { session: false }), bookController.updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted
 *       404:
 *         description: Book not found
 */
// DELETE book
router.delete('/:id', passport.authenticate('jwt', { session: false }), bookController.deleteBook);

module.exports = router;