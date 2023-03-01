const jwt = require("jsonwebtoken");
const Student = require("../models/studentModel.js");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

//Register Student
const StudentRegister = async (req, res) => {
  console.log(req.file);
  const { name, email, password, enrollment_no, department, college, gender, contact, admission_source, address, state } = req.body;

  if (name && email && password && enrollment_no && department && college && gender && contact && admission_source && address && state) {
    const user = await Student.findOne({ email: email });

    if (user) {
      res.status(500).send({ status: "failed", msg: "Email already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const imageUrl = req.file.path;

      const newStudent = new Student({
        name,
        email,
        password: hashedPassword,
        enrollment_no,
        department,
        college,
        gender,
        contact,
        admission_source,
        address,
        state,
        documents: [
          {
            name: req.file.originalname,
            image: imageUrl
          }
        ]
      });

      try {
        const user = await newStudent.save();
        const { password, otp, ...others } = user._doc;
        res.status(200).json({ ...others });
      } catch (error) {
        res.status(500).send({ status: "failed", msg: "Unable to register" });
      }
    }
  } else {
    res.status(500).send({ status: "failed", msg: "All fields are required" });
  }
};

// Login Student
const StudentLogin = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    try {
      const user = await Student.findOne({ email: email });
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
          const token = jwt.sign({ userID: user._id }, process.env.JWT_SEC, {
            expiresIn: "5d",
          });
          const { password, otp, ...others } = user._doc;
          res.send({ status: "success", data: { ...others }, token: token });
        } else {
          res.status(500).send({ status: "failed", msg: "Email or Password is not valid" });
        }
      } else {
        res.status(500).send({ status: "failed", msg: "You are not registered" });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(500).send({ status: "failed", msg: "All feilds are required" });
  }
};

const StudentForgotPassword = async (req, res) => {
  const { email } = req.body;

  if (email) {
    const user = await Student.findOne({ email });

    if (user) {
      const otp = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
      // console.log(otp)
      const Student = await Student.findOneAndUpdate(
        { email: email },
        { otp: otp },
        { new: true, runValidators: true }
      );

      let testAccount = await nodemailer.createTestAccount();

      const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587,
        auth: {
          user: "cvmtestdemo@outlook.com",
          pass: "Cvmhackathon",
        },
      });

      const mailOptions = {
        from: '"CVM University" <cvmtestdemo@outlook.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "Forgot Password OTP", // Subject line
        text: `Hello ${user.name}`, // plain text body
        html: `<b>Your OTP : ${otp}</b>`, // html body
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return console.log(error);
        }

        // res.status(StatusCodes.OK).json({ otpsent: true });
        res.send({ status: "success", msg: "OTP sent successfully" });
      });
    } else {
      res.status(500).send({ status: "failed", msg: "Please provide valid email" });
    }
  } else {
    res.status(500).send({ status: "failed", msg: "Please provide email" });
  }
};

const StudentValidateOTP = async (req, res) => {
  const { email, otp } = req.body;

  if (email && otp) {
    const student = await Student.findOne({ email });

    if (student) {
      if (otp !== student.otp) {
        res.status(500).send({ status: "failed", msg: "Please provide valid OTP" });
      } else {
        res.send({ status: "success", msg: "OTP matched" });
      }
    } else {
      res.status(500).send({ status: "failed", msg: "Please provide valid email" });
    }
  } else {
    res.status(500).send({ status: "failed", msg: "All fields are required" });
  }
};

const StudentUpdatePassword = async (req, res) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (email && password) {
    const student = await Student.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { runValidators: true, new: true, setDefaultsOnInsert: true }
    );
    res.send({ status: "success", msg: "Password Changed successfully" });
  } else {
    res.status(500).send({ status: "failed", msg: "All fields are required" });
  }
};

module.exports = {
  StudentRegister,
  StudentLogin,
  StudentForgotPassword,
  StudentValidateOTP,
  StudentUpdatePassword,
};
