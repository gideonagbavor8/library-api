const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authors');
const ensureAuth = require('../middleware/auth');

// Swagger Comments
/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: API for managing authors
 */

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: List of all authors
 */
// GET all authors
router.get('/', authorController.getAllAuthors);


/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get a single author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author found
 *       404:
 *         description: Author not found
 */
// GET single author
router.get('/:id', authorController.getSingleAuthor);


/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       201:
 *         description: Author created
 *       400:
 *         description: Validation error
 */
// POST new author
router.post('/', ensureAuth, authorController.createAuthor);


/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update an author by ID
 *     tags: [Authors]
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
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: Author updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Author not found
 */
// PUT update author
router.put('/:id', ensureAuth, authorController.updateAuthor);


/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author deleted
 *       404:
 *         description: Author not found
 */
// DELETE author
router.delete('/:id', ensureAuth, authorController.deleteAuthor);

module.exports = router;
