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

// Admin Functionality
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ enrollment_no: 1 });
    res.status(200).send({ status: "success", data: students });
  } catch (error) {
    res.status(500).send({ status: "failed", msg: "Something went wrong" });
  }
};

const postSelectStudent = async (req, res, next) => {
  const { college, department, semester, enrollment_no } = req.query;
  const queryObject = {};
  if (college !== "") {
    queryObject.college = { $regex: college, $options: "i" };
  }
  // else {
  //   queryObject.college = "";
  // }
  if (department !== "") {
    queryObject.department = { $regex: department, $options: "i" };
  }
  // else {
  //   queryObject.department = "";
  // }
  // let current_semester = Number(semester);
  if (semester !== "") {
    let current_semester = Number(semester);
    queryObject.current_semester = current_semester;
  }
  // else {
  //   queryObject.current_semester = null;
  // }
  // if (enrollment_no) {
  //   queryObject.enrollment_no = enrollment_no;
  // } else {
  //   queryObject.enrollment_no = null;
  // }

  await Student.find(
    //   {
    //   $and: [
    //     { college: college },
    //     { department: department },
    //     // { current_semester: current_semester },
    //     // { enrollment_no: enrollment_no },
    //   ],
    // }
    queryObject
  )
    .exec()
    .then((students) => {
      // console.log(students);
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

const patchUpdateStudent = async (req, res, next) => {
  const data = req.body;
  const enrollment_no = req.params.id;
  console.log(data);

  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { enrollment_no: enrollment_no },
      data,
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res
        .status(404)
        .json({ status: "failed", msg: "Student not found" });
    }

    return res.status(200).json({ status: "success", data: updatedStudent });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "failed", msg: "Update failed" });
  }
};

// For Faculties
const getAllFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find().sort({ faculty_id: 1 });
    res.status(200).send({ status: "success", data: faculties });
  } catch (error) {
    res.status(500).send({ status: "failed", msg: "Something went wrong" });
  }
};

const postSelectFaculty = async (req, res, next) => {
  const { college, department } = req.query;
  const queryObject = {};
  if (college !== "") {
    queryObject.college = { $regex: college, $options: "i" };
  }

  if (department !== "") {
    queryObject.department = { $regex: department, $options: "i" };
  }

  await Faculty.find(queryObject)
    .exec()
    .then((faculties) => {
      // console.log(students);
      return res.status(200).json({
        data: faculties,
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

const AdminStats = async (req, res) => {
  let obj = {};

  const gcet_students = await Student.find({ college: "GCET" });
  const mbit_students = await Student.find({ college: "MBIT" });
  const adit_students = await Student.find({ college: "ADIT" });

  let gcet_fy = [];
  let gcet_sy = [];
  let gcet_ty = [];
  let gcet_fiy = [];

  gcet_students.map((student) => {
    if (student.current_semester === 1 || student.current_semester === 2) {
      gcet_fy.push(student);
    } else if (
      student.current_semester === 3 ||
      student.current_semester === 4
    ) {
      gcet_sy.push(student);
    } else if (
      student.current_semester === 5 ||
      student.current_semester === 6
    ) {
      gcet_ty.push(student);
    } else if (
      student.current_semester === 7 ||
      student.current_semester === 8
    ) {
      gcet_fiy.push(student);
    }
  });

  let mbit_fy = [];
  let mbit_sy = [];
  let mbit_ty = [];
  let mbit_fiy = [];

  mbit_students.map((student) => {
    if (student.current_semester === 1 || student.current_semester === 2) {
      mbit_fy.push(student);
    } else if (
      student.current_semester === 3 ||
      student.current_semester === 4
    ) {
      mbit_sy.push(student);
    } else if (
      student.current_semester === 5 ||
      student.current_semester === 6
    ) {
      mbit_ty.push(student);
    } else if (
      student.current_semester === 7 ||
      student.current_semester === 8
    ) {
      mbit_fiy.push(student);
    }
  });

  let adit_fy = [];
  let adit_sy = [];
  let adit_ty = [];
  let adit_fiy = [];

  adit_students.map((student) => {
    if (student.current_semester === 1 || student.current_semester === 2) {
      adit_fy.push(student);
    } else if (
      student.current_semester === 3 ||
      student.current_semester === 4
    ) {
      adit_sy.push(student);
    } else if (
      student.current_semester === 5 ||
      student.current_semester === 6
    ) {
      adit_ty.push(student);
    } else if (
      student.current_semester === 7 ||
      student.current_semester === 8
    ) {
      adit_fiy.push(student);
    }
  });

  const total_students = await Student.find();

  const total_faculties = await Faculty.find();

  let gcet_faculties = [];
  let mbit_faculties = [];
  let adit_faculties = [];

  total_faculties.map((faculty) => {
    if (faculty.college === "GCET") {
      gcet_faculties.push(faculty);
    } else if (faculty.college === "ADIT") {
      adit_faculties.push(faculty);
    } else if (faculty.college === "MBIT") {
      mbit_faculties.push(faculty);
    }
  });

  obj.gcet_students = gcet_students.length;
  obj.mbit_students = mbit_students.length;
  obj.adit_students = adit_students.length;
  obj.total_students = total_students.length;
  obj.total_faculties = total_faculties.length;
  obj.total_departments = 7;
  obj.placement = 100;

  obj.gcet_first_year = gcet_fy.length;
  obj.gcet_second_year = gcet_sy.length;
  obj.gcet_third_year = gcet_ty.length;
  obj.gcet_fourth_year = gcet_fiy.length;

  obj.mbit_first_year = mbit_fy.length;
  obj.mbit_second_year = mbit_sy.length;
  obj.mbit_third_year = mbit_ty.length;
  obj.mbit_fourth_year = mbit_fiy.length;

  obj.adit_first_year = adit_fy.length;
  obj.adit_second_year = adit_sy.length;
  obj.adit_third_year = adit_ty.length;
  obj.adit_fourth_year = adit_fiy.length;

  obj.gcet_faculties = gcet_faculties.length;
  obj.mbit_faculties = mbit_faculties.length;
  obj.adit_faculties = adit_faculties.length;

  res.status(200).json({ status: "success", data: obj });
};

module.exports = {
  AdminRegister,
  AdminLogin,
  AdminForgotPassword,
  AdminValidateOTP,
  AdminUpdatePassword,
  getAllStudents,
  postSelectStudent,
  patchUpdateStudent,
  AdminStats,
  postSelectFaculty,
  getAllFaculties,
};
