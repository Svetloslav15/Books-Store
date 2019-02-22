const User = require('mongoose').model('User');
const Book = require('mongoose').model('Book');
const Order = require('mongoose').model('Order');

module.exports = {
    createBook: (req, res) => {
        let {description, title, imageUrl, price, author, genre} = req.body;
        if (description.trim() == "" || title.trim() == "" ||
            imageUrl.trim() == "" || author.trim() == "" ||
            +(price.trim() <= 0) || genre.trim() == "") {
            res.status(422).json({
                message: 'Validation failed, entered data is incorrect',
            });
            return;
        }
        Book.create({
            title, description, imageUrl, price: Number(price), author, genre
        }).then((x) => {
            res.status(200).json({
                message: 'Book created successfully!',
                data: x
            });
        }).catch((err) => {
            res.status(422).json({
                message: err,
            });
        });
    },
    getBookById: (req, res) => {
        let id = req.params.id;
        Book.findById(id)
            .then(x => {
                res.status(200).json({
                    data: x
                });
            }).catch(err => {
            res.status(422).json({
                message: err,
            });
        })
    },
    editBook: (req, res) => {
        let {id, description, title, imageUrl, price, author} = req.body;
        if (description.trim() == "" || title.trim() == "" ||
            imageUrl.trim() == "" || author.trim() == "" ||
            +(price.trim() <= 0)) {
            res.status(422).json({
                message: 'Validation failed, entered data is incorrect',
            });
            return;
        }
        Book.findByIdAndUpdate(id, {
            title, description, imageUrl, price: Number(price), author
        }).then((x) => {
            res.status(200).json({
                message: 'Book edited successfully!',
                data: x
            });
        }).catch((err) => {
            res.status(422).json({
                message: err,
            });
        });
    },
    deleteBook: (req, res) => {
        let id = req.body;
        Book.findByIdAndRemove(id)
            .then(book => {
                res.status(200).json({
                    data: book,
                    message: "Successfully deleted book!"
                })
            }).catch(err => {
            res.status(422).json({
                message: err,
            });
        });
    },
    addBookToCart: async (req, res) => {
        let id = req.params.id;
        let book = await Book.findById(id);
        let cart = req.session.cart;
        if (!cart) {
            cart = [];
        }
        cart.push(book);
        req.session.cart = cart;
    },
    removeFromCart: async (req, res) => {
        let id = req.params.id;
        let cart = req.session.cart;
        cart = cart.filter(x => x._id !== id);
        req.session.cart = cart;
    },
    getAll: (req, res) => {
        Book.find()
            .then((books) => {
                res.status(200).json({
                    data: books,
                    message: 'Successfully fetched all books!'
                })
            }).catch(err => {
            res.status(422).json({
                message: err,
            });
        })
    },
    getAllByCategory: (req, res) => {
        let genre = req.params.genre;
        Book.find()
            .then((books) => {
                books = books.filter(x => x.genre === genre);
                 res.status(200).json({
                    data: books,
                    message: 'Successfully fetched all books!'
                })
            }).catch(err => {
            res.status(422).json({
                message: err,
            });
        })
    },
    getSearch: (req, res) => {
        let query = req.query.query;
        Book.find({})
            .then((books) => {
                const filteredBooks = books.filter((a) => {
                    return a.name.toLowerCase().includes(query.toLowerCase());
                });
                res.status(200).json({
                    data: filteredBooks,
                    message: 'Successfully fetched books!'
                })
            }).catch(err => {
            res.status(422).json({
                message: err,
            });
        })
    }
};