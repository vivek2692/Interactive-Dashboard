const jwt = require("jsonwebtoken");
const Faculty = require("../models/facultyModel.js");
const Subject = require("../models/subjectModel.js");
const Student = require("../models/studentModel.js");
const Result = require("../models/resultModel.js");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

//Register Faculty
const FacultyRegister = async (req, res) => {
  const {
    name,
    faculty_id,
    email,
    password,
    gender,
    qualification,
    address,
    college,
    department,
    role,
    contact,
  } = req.body;

  if (
    name &&
    faculty_id &&
    email &&
    password &&
    gender &&
    qualification &&
    address &&
    college &&
    department &&
    role &&
    contact
  ) {
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
        contact,
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

const FacultyForgotPassword = async (req, res) => {
  const { email } = req.body;

  if (email) {
    const user = await Faculty.findOne({ email });

    if (user) {
      const otp = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
      // console.log(otp)
      const faculty = await Faculty.findOneAndUpdate(
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
          user: "cvmhackathon@outlook.com",
          pass: "Cvmtestdemo",
        },
      });

      const mailOptions = {
        from: '"CVM University" <cvmhackathon@outlook.com>', // sender address
        to: `cvivek546@gmail.com`, // list of receivers
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

const FacultyValidateOTP = async (req, res) => {
  const { email, otp } = req.body;

  if (email && otp) {
    const faculty = await Faculty.findOne({ email });

    if (faculty) {
      if (otp !== faculty.otp) {
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

// Adding subjects semesterwise
const AddSubjects = async (req, res) => {
  const { college, department, subjects_array, semester } = req.body;
  if (college && department && semester) {
    const item = await Subject.findOne({ college, department });

    if (item) {
      // console.log(item);
      let subs = [];

      item.subjects.map((sem) => {
        if (sem.semester === semester) {
          subs = sem.subs;
        }
      });

      subjects_array.map((sub) => {
        subs.push(sub);
      });

      // console.log(subs);

      try {
        let appear = false;
        item.subjects.map((sem) => {
          if (sem.semester === semester) {
            sem.subs = subs;
            appear = true;
          }
        });

        if (appear === false) {
          item.subjects.push({ semester: semester, subs: subs });
        }
        // const newer = await item.findOne({college, department, "subjects.semester": semester},{$set: {subjects: subs}},{ runValidators: true, new: true, setDefaultsOnInsert: true });
        // console.log(newer);
        await item.save();
        res
          .status(200)
          .send({ status: "success", msg: "Subject added successfully" });
      } catch (error) {
        res
          .status(500)
          .send({ status: "failure", msg: "Something went wrong" });
      }
    } else {
      const newCourse = new Subject({
        college,
        department,
        subjects: {
          semester,
          subs: subjects_array,
        },
      });

      try {
        const newSub = await newCourse.save();
        res
          .status(200)
          .send({ status: "success", msg: "Subject added successfully" });
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    res.status(500).send({ status: "failure", msg: "All fields are required" });
  }
};

// Assigning subjects to student (for Marksheet model)
const SubjectsAssign = async (req, res) => {
  const { enrollment_no, subjects, college, department, semester } = req.body;

  if (enrollment_no && college && department && semester) {
    const isAvailable = await Student.findOne({ enrollment_no });

    if (!isAvailable) {
      res
        .status(500)
        .send({ status: "failure", msg: "Student is not available" });
    } else {
      const student = await Result.findOne({
        enrollment_no,
        college,
        department,
      });

      if (student) {
        student.results.map((sem) => {
          if (sem.semester === semester) {
            subjects.map((sub) => {
              sem.result.push(sub);
            });
          }
        });

        try {
          await student.save();
          res
            .status(200)
            .send({ status: "success", msg: "Subjects assigned successfully" });
        } catch (error) {
          console.log(error);
          res
            .status(500)
            .send({ status: "failure", msg: "Something went wrong" });
        }
      } else {
        const item = await Subject.findOne({ college, department });

        let subs = [];

        item.subjects.map((sem) => {
          if (sem.semester === semester) {
            sem.subs.map((sub) => {
              subs.push(sub);
            });
          }
        });

        const newStudent = new Result({
          enrollment_no,
          college,
          year: new Date().getFullYear(),
          department,
          results: {
            semester: semester,
            result: subs,
          },
        });

        try {
          await newStudent.save();
          res
            .status(200)
            .send({ status: "success", msg: "Subjects assigned successfully" });
        } catch (error) {
          console.log(error);
          res
            .status(500)
            .send({ status: "failure", msg: "Something went wrong" });
        }
      }
    }
  } else {
    res.status(500).send({ status: "failure", msg: "All fields are required" });
  }
};

// Giving marks to students
const GiveMarks = async (req, res) => {
  const { enrollment_no, college, department, exam_marks, semester } = req.body;

  if (enrollment_no && college && department && exam_marks) {
    const student = await Result.findOne({
      enrollment_no,
      college,
      department,
    });

    if (student) {
      // console.log(student);

      student.results.map((sem) => {
        if (sem.semester === semester) {
          sem.result = exam_marks;
        }
      });

      try {
        await student.save();
        res
          .status(200)
          .send({ status: "success", msg: "Marks uploaded succesfully" });
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .send({ status: "failure", msg: "All fields are required" });
      }
    } else {
      res
        .status(500)
        .send({ status: "failure", msg: "Student is Not Available" });
    }
  } else {
    res.status(500).send({ status: "failure", msg: "All fields are required" });
  }
};

module.exports = {
  FacultyRegister,
  FacultyLogin,
  FacultyForgotPassword,
  FacultyValidateOTP,
  FacultyUpdatePassword,
  AddSubjects,
  SubjectsAssign,
  GiveMarks,
};