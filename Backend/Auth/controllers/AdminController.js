const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel.js");
const bcrypt = require("bcrypt");

//Register Admin
const AdminRegister = async (req, res) => {
  const { name, email, password } = req.body;

  if (name && email && password) {
    const user = await Admin.findOne({ email: email });

    if (user) {
      res.send({ status: "failed", msg: "Email already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newAdmin = new Admin({
        name: name,
        email: email,
        password: hashedPassword,
      });

      try {
        const user = await newAdmin.save();
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others });
      } catch (error) {
        res.send({ status: "failed", msg: "Unable to register" });
      }
    }
  } else {
    res.send({ status: "failed", msg: "All fields are required" });
  }
};

// Login Admin

const AdminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    try {
      const user = await Admin.findOne({ email: email });
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
          const token = jwt.sign({ userID: user._id }, process.env.JWT_SEC, {
            expiresIn: "5d",
          });
          const { password, ...others } = user._doc;
          res.send({ status: "success", data: { ...others }, "token": token });
        } else {
          res.send({ status: "failed", msg: "Email or Password is not valid" });
        }
      } else {
        res.send({ status: "failed", msg: "You are not registered" });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send({ status: "failed", msg: "All feilds are required" });
  }
};

module.exports = { AdminRegister, AdminLogin };
