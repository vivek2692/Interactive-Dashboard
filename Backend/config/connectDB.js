const mongoose = require("mongoose");

const connectDB = async (DATABASE_URL) => {
  try {
    await mongoose
      .connect(DATABASE_URL)
      .then(() => console.log("Database connected successfully"));
  } catch (error) {
    console.log("Database is not connected");
  }
};

module.exports = connectDB;
