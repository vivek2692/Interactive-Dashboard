const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel.js");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const Student = require("../models/studentModel");
const Faculty = require("../models/facultyModel");

//Register Admin
const AdminRegister = async (req, res) => {
  const { name, email, password } = req.body;

  if (name && email && password) {
    const user = await Admin.findOne({ email: email });

    if (user) {
      res.status(500).send({ status: "failed", msg: "Email already exists" });
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
          const { password, otp, ...others } = user._doc;
          res.send({ status: "success", data: { ...others }, token: token });
        } else {
          res
            .status(500)
            .send({ status: "failed", msg: "Email or Password is not valid" });
        }
      } else {
        res
          .status(500)
          .send({ status: "failed", msg: "You are not registered" });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(500).send({ status: "failed", msg: "All feilds are required" });
  }
};

const AdminForgotPassword = async (req, res) => {
  const { email } = req.body;

  if (email) {
    const user = await Admin.findOne({ email });

    if (user) {
      const otp = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
      // console.log(otp)
      const admin = await Admin.findOneAndUpdate(
        { email: email },
        { otp: otp },
        { new: true, runValidators: true }
      );

      // let testAccount = await nodemailer.createTestAccount();

      const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587,
        auth: {
          user: "cvmhackathon@outlook.com",
          pass: "Cvmtestdemo",
        },
      });

      const mailOptions = {
        from: '"CVM University" <cvmhackathon@outlook.com>', // sender address
        to: "cvivek546@gmail.com", // list of receivers
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
      res
        .status(500)
        .send({ status: "failed", msg: "Please provide valid email" });
    }
  } else {
    res.status(500).send({ status: "failed", msg: "Please provide email" });
  }
};

const AdminValidateOTP = async (req, res) => {
  const { email, otp } = req.body;

  if (email && otp) {
    const admin = await Admin.findOne({ email });

    if (admin) {
      if (otp !== admin.otp) {
        res
          .status(500)
          .send({ status: "failed", msg: "Please provide valid OTP" });
      } else {
        res.send({ status: "success", msg: "OTP matched" });
      }
    } else {
      res
        .status(500)
        .send({ status: "failed", msg: "Please provide valid email" });
    }
  } else {
    res.status(500).send({ status: "failed", msg: "All fields are required" });
  }
};

const AdminUpdatePassword = async (req, res) => {
  const { password, email } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (email && password) {
    const admin = await Admin.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { runValidators: true, new: true, setDefaultsOnInsert: true }
    );
    res.send({ status: "success", msg: "Password Changed successfully" });
  } else {
    res.status(500).send({ status: "failed", msg: "All fields are required" });
  }
};

// Admin Student Functionality
const postSelectStudent = async (req, res, next) => {
  const { college, department, current_semester, enrollment_no } = req.query;
  const queryObject = {};
  if (college) {
    queryObject.college = { $regex: college, $options: "i" };
  } else {
    queryObject.college = null;
  }
  if (department) {
    queryObject.department = { $regex: department, $options: "i" };
  } else {
    queryObject.department = null;
  }
  if (current_semester) {
    queryObject.current_semester = { $regex: current_semester, $options: "i" };
  } else {
    queryObject.current_semester = null;
  }
  if (enrollment_no) {
    queryObject.enrollment_no = enrollment_no;
  } else {
    queryObject.enrollment_no = null;
  }
  await Student.find({
    $or: [
      { college: college },
      { department: department },
      { current_semester: current_semester },
      { enrollment_no: enrollment_no },
    ],
  })
    .exec()
    .then((students) => {
      console.log(students);
      return res.status(200).json({
        data: students,
        hasError: false,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        data: err,
        hasError: true,
      });
    });
};

const patchUpdateStudent = async (req, res, next) => {};

const deleteStudent = async (req, res, next) => {
  const enrollment_no = req.body.enrollment_no;
  const result = await Student.findOneAndDelete({
    enrollment_no: enrollment_no,
  })
    .then((result) => {
      return res.status(200).json({
        msg: "Student deleted successfully",
        hasError: false,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        data: err,
        hasError: true,
      });
    });
};

//Faculty Functionality
const postSelectFaculty = async (req, res, next) => {
  const { college, position, department, faculty_id } = req.query;
  const queryObject = {};
  if (college) {
    queryObject.college = { $regex: college, $options: "i" };
  } else {
    queryObject.college = null;
  }
  if (position) {
    queryObject.position = { $regex: position, $options: "i" };
  } else {
    queryObject.position = null;
  }
  if (department) {
    queryObject.department = { $regex: department, $options: "i" };
  } else {
    queryObject.department = null;
  }
  if (faculty_id) {
    queryObject.faculty_id = enrollment_no;
  } else {
    queryObject.faculty_id = null;
  }
  await Faculty.find({
    $or: [
      { college: college },
      { position: position },
      { department: department },
      { faculty_id: faculty_id },
    ],
  })
    .exec()
    .then((faculty) => {
      console.log(faculty);
      return res.status(200).json({
        data: faculty,
        hasError: false,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        data: err,
        hasError: true,
      });
    });
};

const patchUpdateFaculty = async (req, res, next) => {};

const deleteFaculty = async (req, res, next) => {
  const faculty_id = req.body.faculty_id;
  const result = await Faculty.findOneAndDelete({
    faculty_id: faculty_id,
  })
    .then((result) => {
      return res.status(200).json({
        msg: "Faculty deleted successfully",
        hasError: false,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        data: err,
        hasError: true,
      });
    });
};

//Admin Functionality
const patchUpdateAdmin = async (req, res, next) => {};

const deleteAdmin = async (req, res, next) => {
  const admin_id = req.body.admin_id;
  Admin.findOneAndDelete({
    admin_id: admin_id,
  })
    .then((result) => {
      return res.status(200).json({
        msg: "Admin deleted successfully",
        hasError: false,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        data: err,
        hasError: true,
      });
    });
};

module.exports = {
  AdminRegister,
  AdminLogin,
  AdminForgotPassword,
  AdminValidateOTP,
  AdminUpdatePassword,
  postSelectStudent,
  patchUpdateStudent,
  deleteStudent,
  postSelectFaculty,
  patchUpdateFaculty,
  deleteFaculty,
  patchUpdateAdmin,
  deleteAdmin,
};
