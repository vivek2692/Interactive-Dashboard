const jwt = require("jsonwebtoken");
const Faculty = require("../models/facultyModel.js");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

//Register Faculty
const FacultyRegister = async (req, res) => {
  const { name, faculty_id, email, password, gender, qualification, address, college, department, role, contact } = req.body;

  if (name && faculty_id && email && password && gender && qualification && address && college && department && role && contact) {
    const user = await Faculty.findOne({ email: email });

    if (user) {
      res.send({ status: "failed", msg: "Email already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newFaculty = new Faculty({
        name,
        faculty_id,
        email,
        password: hashedPassword,
        gender,
        qualification,
        address,
        college,
        department,
        role,
        contact
      });

      try {
        const user = await newFaculty.save();
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

// Login Faculty
const FacultyLogin = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    try {
      const user = await Faculty.findOne({ email: email });
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

const FacultyForgotPassword = async (req, res) => {
  const { email } = req.body;

  if (email) {
    const user = await Faculty.findOne({ email });

    if (user) {
      const otp = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
      // console.log(otp)
      const Faculty = await Faculty.findOneAndUpdate(
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

const FacultyValidateOTP = async (req, res) => {
  const { email, otp } = req.body;

  if (email && otp) {
    const faculty = await Faculty.findOne({ email });

    if (faculty) {
      if (otp !== faculty.otp) {
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

const FacultyUpdatePassword = async (req, res) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (email && password) {
    const faculty = await Faculty.findOneAndUpdate(
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
  FacultyRegister,
  FacultyLogin,
  FacultyForgotPassword,
  FacultyValidateOTP,
  FacultyUpdatePassword,
};
