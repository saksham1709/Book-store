const jwt = require('jsonwebtoken');
const Book = require('../model/Book');
const Cart = require('../model/Cart');
const User = require('../model/User');

const cartFetch = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        if (cart) {
            res.status(200).json({
                "message": "cart loaded",
                cart: cart
            })
        } else {
            res.status(404).json({
                "message": "cart not found"
            })
        }
    } catch (err) {
        res.status(500).json({
            "message": "unable to fetch cart",
            error: err
        })
    }
}

const cartAdd = async (req, res) => {
    try {
        const { userId, bookId, quantity } = req.body;
        console.log("Request Body:", req.body);
        const user = await User.findById(userId);
        console.log("User:", user);
        const book = await Book.findById(bookId);
        console.log("Book:", book);
        console.log("Book Price:", book.price);
        console.log("Quantity:", quantity);
        if (!user) {
            return res.status(400).json({
                "message": "User doesn't exist"
            });
        }
        if (!book) {
            return res.status(400).json({
                "message": "Book doesn't exist"
            });
        }
        if (isNaN(book.price) || isNaN(quantity)) {
            // Handle parsing errors
            console.error("Error: Invalid numeric value for price or quantity");
            return res.status(400).json({ "message": "Invalid numeric value for price or quantity" });
        }
        const newPrice = parseInt(book.price);
        const newQuantity = parseInt(quantity)
        console.log("newPrice:", typeof(newPrice), "newQuantity: ", typeof(newQuantity))
        const totalPrice = parseInt(book.price) * parseInt(quantity);
        console.log("Total Price:", totalPrice, typeof (totalPrice));
        let cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            cart = new Cart({ userId: userId, items: [], totalPrice: 0 });
        }
        const existingItemIndex = cart.items.findIndex(item => item.bookId.toString() === bookId);
        if (existingItemIndex !== -1) {
            cart.items[existingItemIndex].quantity += parseInt(quantity);
        } else {
            const bookDetails = { bookId: bookId, quantity };
            cart.items.push(bookDetails);
        }
        cart.totalPrice += parseInt(totalPrice);
        await cart.save();
        res.status(200).json({ message: 'Item added to cart successfully', cart });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({
            "message": "Unable to add to cart",
            error: err
        });
    }
}

const cartUpdate = async (req, res) => {
    try {
        const { userId, bookId, quantity } = req.body;
        const user = await User.findById(userId);
        const book = await Book.findById(bookId);
        if (!user) {
            res.status(400).json({
                "message": "user doesn't exist"
            })
        }
        if (!book) {
            res.status(400).json({
                "mesage": "book doesn't exist"
            })
        }
        let cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            res.status(404).json({
                "message": "cart doesn't exist"
            })
        }
        const itemIndex = cart.items.findIndex(item => item.bookId.toString() === bookId);
        if (itemIndex === -1) {
            res.status(400).json({
                "message": "item not found"
            })
        }
        if (parseInt(quantity) === 0) {
            console.log("here")
            cart.items.splice(itemIndex, 1);
        } else {
            parseInt(cart.items[itemIndex].quantity) = parseInt(quantity);
            await cart.save();
            res.status(200).json({
                "message": "cart updated successfully",
                cart: cart
            })
        }
    } catch (err) {
        res.status(500).json({
            "message": "unable to update cart",
            error: err
        })
    }
}

const cartRemove = async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        const user = await User.findById(userId);
        const book = await Book.findById(bookId);
        if (!user) {
            res.status(400).json({
                "message": "user doesn't exist"
            })
        }
        if (!book) {
            res.status(400).json({
                "mesage": "book doesn't exist"
            })
        }
        let cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            res.status(404).json({
                "message": "cart doesn't exist"
            })
        }
        const itemIndex = cart.items.findIndex(item => item.bookId.toString() === bookId);
        if (itemIndex === -1) {
            res.status(404).json({
                "message": "item not found"
            })
        } else {
            cart.items.splice(itemIndex, 1);
            await cart.save();
            res.status(200).json({
                "message": "cart updated successfully",
                cart: cart
            })
        }
    } catch (err) {
        res.status(500).json({
            "message": "unable to remove from cart",
            error: err
        })
    }
}

module.exports = {
    cartFetch,
    cartAdd,
    cartUpdate,
    cartRemove
}