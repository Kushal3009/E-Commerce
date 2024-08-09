const mongoose = require("mongoose");

const connectMongo = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Connected to Database Successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the application if there is a connection error
  }
};

module.exports = connectMongo;
