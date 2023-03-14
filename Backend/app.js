const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')

const connectDB = require("./config/connectDB.js");
const AdminRoute = require("./routes/adminRoute.js");
const FacultyRoute = require("./routes/facultyRoute.js");
const StudentRoute = require("./routes/studentRoute.js");

dotenv.config()
mongoose.set('strictQuery', true);

const app = express();
const PORT = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL;

// CORS 
app.use(cors());

// DATABASE Connection
connectDB(DATABASE_URL);

// JSON Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/uploads', express.static('uploads'));
app.use('/coursera', express.static('coursera'));


// Routes
app.use("/api/admin", AdminRoute);
app.use("/api/faculty", FacultyRoute);
app.use("/api/student", StudentRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
})