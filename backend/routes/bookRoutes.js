const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const { bookFetch, bookCreate, bookSearch, bookGet, bookUpdate, bookDelete } = require("../controller/bookController");
const router = express.Router();

// Fetch book
router.get('/', checkAuth, bookFetch);

// Create book
router.post('/create', checkAuth, bookCreate);

// Search book
router.post('/search', checkAuth, bookSearch);

// Get a book
router.get('/:id', bookGet);

// Update a book
router.put('/:id', checkAuth, bookUpdate);

// Delete a book
router.delete('/:id', checkAuth, bookDelete);

module.exports = router;