const Book = require("../model/Book");

const bookFetch = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({
            "message": "books founded successfully",
            books: books
        })
    } catch (err) {
        res.status(500).json({
            "message": "unable to fetch books",
            error: err
        })
    }
}

const bookCreate = async (req, res) => {
    try {
        console.log(req.body)
        const book = new Book(req.body);
        const newBook = await book.save();
        res.status(201).json({
            "message": "Book created successfully",
            "newBook": newBook
        })
    } catch (err) {
        res.status(500).json({
            "message": "unable to create book",
            error: err
        })
    }
}

const bookSearch = async (req, res) => {
    try {
        const search = req.body.search;
        const books = await Book.find({
            $or: [
                // { "title": { $regex: ".*" + search + ".*", $options: 'i' } }
                { "title": { $regex: search, $options: 'i' } },
                { "author": { $regex: search, $options: 'i' } },
                { "genre": { $regex: search, $options: 'i' } },
            ]
        });
        if (books.length < 0) {
            res.status(200).json({
                "message": "No books found"
            })
        } else {
            const response = {
                "No. of books": books.length,
                books: books.map(book => {
                    return {
                        "title": book.title,
                        "author": book.author,
                        "price": book.price
                    }
                })
            }
            res.status(200).json({
                "message": "Books founded",
                "books": response
            })
        }
    } catch (err) {
        res.status(500).json({
            "message": "unable to search book",
            error: err
        })
    }
}

const bookGet = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if(!book) {
            res.status(400).json({
                "message": "Book not found"
            })
        } else {
            res.status(200).json({
                "message": "book founded",
                book: book
            })
        }
    } catch (err) {
        res.status(500).json({
            "message": "unable to fetch book",
            error: err
        })
    }
}

const bookUpdate = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if(!book) {
            res.status(400).json({
                "message": "Book not found"
            })
        } else {
            const updatedBook = await Book.findByIdAndUpdate( req.params.id, { $set: req.body } );
            res.status(200).json({
                "message": "Book updated",
                book: updatedBook
            })
        }
    } catch (err) {
        res.status(500).json({
            "message": "unable to fetch books",
            error: err
        })
    }
}

const bookDelete = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if(!book) {
            res.status(400).json({
                "message": "Book not found"
            })
        } else {
            await book.deleteOne();
            res.status(200).json({
                "message": "book deleted successfully"
            })
        }
    } catch (err) {
        res.status(500).json({
            "message": "unable to fetch books",
            error: err
        })
    }
}

module.exports = {
    bookFetch,
    bookCreate,
    bookSearch,
    bookGet,
    bookUpdate,
    bookDelete
}