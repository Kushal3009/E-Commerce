const express = require("express");
const connectMongo = require("./config/db.js");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const url = process.env.MONGO_URL;
const User = require("./routes/user.js");
const Product = require("./routes/product.js");
const Cart = require("./routes/cart.js");
const Address = require("./routes/address.js");
const Comment = require("./routes/comment.js");

// const Comment = require('./models/Comment.js')

// Connection with Database
connectMongo(url);

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true, // Allow cookies to be sent
}));
app.use(cookieParser());

// Body parser middleware
app.use(express.json()); // To parse JSON payloads
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded payloads

// Use the User routes
app.use("/user", User);
app.use("/product", Product);
app.use('/cart', Cart);
app.use('/address', Address);
app.use('/comment', Comment);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
