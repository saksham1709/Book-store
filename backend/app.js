const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();
mongoose.connect(process.env.MONGO_URI);
// mongoose.Promise = global.Promise;

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(helmet());
app.use(morgan("tiny"));

app.use('/user', userRoutes);
app.use('/book', bookRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;


