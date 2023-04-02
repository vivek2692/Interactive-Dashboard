const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel.js");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const Student = require("../models/studentModel");
const Faculty = require("../models/facultyModel");
const Coursera = require("../models/courseraModel");
const Result = require("../models/resultModel");
const Subject = require("../models/subjectModel");
const Placement = require("../models/placementModel");
const FacultyComp = require("../models/facultyCompareModel");

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
  const { college, department, batch, enrollment_no } = req.query;
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
  // if (semester !== "") {
  //   let current_semester = Number(semester);
  //   queryObject.current_semester = current_semester;
  // }

  if (batch !== "") {
    queryObject.admission_year = batch;
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

const patchUpdateFaculty = async (req, res, next) => {
  const data = req.body;
  const faculty_id = req.params.id;
  console.log(data);

  try {
    const updatedStudent = await Faculty.findOneAndUpdate(
      { faculty_id },
      data,
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res
        .status(404)
        .json({ status: "failed", msg: "Faculty not found" });
    }

    return res.status(200).json({ status: "success", data: updatedStudent });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "failed", msg: "Update failed" });
  }
};

const AdminStats = async (req, res) => {
  let obj = {};

  const all_students = await Student.find();
  const gcet_students = await Student.find({ college: "GCET" });
  const mbit_students = await Student.find({ college: "MBIT" });
  const adit_students = await Student.find({ college: "ADIT" });

  const placements = await Placement.find();

  const gcet_placement = await Placement.find({ college: "GCET" });
  const mbit_placement = await Placement.find({ college: "MBIT" });
  const adit_placement = await Placement.find({ college: "ADIT" });

  const cp_placement = await Placement.find({ department: "CP" });
  const it_placement = await Placement.find({ department: "IT" });
  const ec_placement = await Placement.find({ department: "EE" });
  const ee_placement = await Placement.find({ department: "EC" });
  const me_placement = await Placement.find({ department: "ME" });
  const mc_placement = await Placement.find({ department: "MC" });
  const ch_placement = await Placement.find({ department: "CH" });

  obj.gcet_placement = gcet_placement.length;
  obj.mbit_placement = mbit_placement.length;
  obj.adit_placement = adit_placement.length;

  obj.cp_placement = cp_placement.length;
  obj.it_placement = it_placement.length;
  obj.ec_placement = ec_placement.length;
  obj.ee_placement = ee_placement.length;
  obj.me_placement = me_placement.length;
  obj.mc_placement = mc_placement.length;
  obj.ch_placement = ch_placement.length;

  const total_phd = await Faculty.find({ qualification: "Ph.D." });
  const total_pur_phd = await Faculty.find({ qualification: "Pursuing Ph.D." });
  const total_mtech = await Faculty.find({ qualification: "M.Tech." });
  const male_students = await Student.find({ gender: "Male" });
  const female_students = await Student.find({ gender: "Female" });

  obj.total_phd = total_phd.length;
  obj.total_pur_phd = total_pur_phd.length;
  obj.total_mtech = total_mtech.length;
  obj.male_students = male_students.length;
  obj.female_students = female_students.length;

  let all_fy = [];
  let all_sy = [];
  let all_ty = [];
  let all_fiy = [];

  let all_cp = [];
  let all_it = [];
  let all_ec = [];
  let all_ee = [];
  let all_me = [];
  let all_mc = [];
  let all_ch = [];

  all_students.map((student) => {
    if (student.current_semester === 1 || student.current_semester === 2) {
      all_fy.push(student);
    } else if (
      student.current_semester === 3 ||
      student.current_semester === 4
    ) {
      all_sy.push(student);
    } else if (
      student.current_semester === 5 ||
      student.current_semester === 6
    ) {
      all_ty.push(student);
    } else if (
      student.current_semester === 7 ||
      student.current_semester === 8
    ) {
      all_fiy.push(student);
    }

    if (student.department === "CP") {
      all_cp.push(student);
    } else if (student.department === "IT") {
      all_it.push(student);
    } else if (student.department === "EC") {
      all_ec.push(student);
    } else if (student.department === "EE") {
      all_ee.push(student);
    } else if (student.department === "ME") {
      all_me.push(student);
    } else if (student.department === "MC") {
      all_mc.push(student);
    } else if (student.department === "CH") {
      all_ch.push(student);
    }
  });

  let gcet_fy = [];
  let gcet_sy = [];
  let gcet_ty = [];
  let gcet_fiy = [];

  let gcet_cp = [];
  let gcet_it = [];
  let gcet_ec = [];
  let gcet_ee = [];
  let gcet_me = [];
  let gcet_mc = [];
  let gcet_ch = [];

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

    if (student.department === "CP") {
      gcet_cp.push(student);
    } else if (student.department === "IT") {
      gcet_it.push(student);
    } else if (student.department === "EC") {
      gcet_ec.push(student);
    } else if (student.department === "EE") {
      gcet_ee.push(student);
    } else if (student.department === "ME") {
      gcet_me.push(student);
    } else if (student.department === "MC") {
      gcet_mc.push(student);
    } else if (student.department === "CH") {
      gcet_ch.push(student);
    }
  });

  let mbit_fy = [];
  let mbit_sy = [];
  let mbit_ty = [];
  let mbit_fiy = [];

  let mbit_cp = [];
  let mbit_it = [];

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

    if (student.department === "CP") {
      mbit_cp.push(student);
    } else if (student.department === "IT") {
      mbit_it.push(student);
    }
  });

  let adit_fy = [];
  let adit_sy = [];
  let adit_ty = [];
  let adit_fiy = [];

  let adit_cp = [];
  let adit_it = [];
  let adit_ec = [];
  let adit_ee = [];
  let adit_me = [];
  let adit_mc = [];
  let adit_ch = [];

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

    if (student.department === "CP") {
      adit_cp.push(student);
    } else if (student.department === "IT") {
      adit_it.push(student);
    } else if (student.department === "EC") {
      adit_ec.push(student);
    } else if (student.department === "EE") {
      adit_ee.push(student);
    } else if (student.department === "ME") {
      adit_me.push(student);
    } else if (student.department === "MC") {
      adit_mc.push(student);
    } else if (student.department === "CH") {
      adit_ch.push(student);
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

  obj.total_placements = placements.length;

  obj.gcet_students = gcet_students.length;
  obj.mbit_students = mbit_students.length;
  obj.adit_students = adit_students.length;
  obj.total_students = total_students.length;
  obj.total_faculties = total_faculties.length;
  obj.total_departments = 7;
  obj.placement = 100;

  obj.all_first_year = all_fy.length;
  obj.all_second_year = all_sy.length;
  obj.all_third_year = all_ty.length;
  obj.all_fourth_year = all_fiy.length;

  obj.all_cp = all_cp.length;
  obj.all_it = all_it.length;
  obj.all_ec = all_ec.length;
  obj.all_ee = all_ee.length;
  obj.all_me = all_me.length;
  obj.all_mc = all_mc.length;
  obj.all_ch = all_ch.length;

  obj.gcet_cp = gcet_cp.length;
  obj.gcet_it = gcet_it.length;
  obj.gcet_ec = gcet_ec.length;
  obj.gcet_ee = gcet_ee.length;
  obj.gcet_me = gcet_me.length;
  obj.gcet_mc = gcet_mc.length;
  obj.gcet_ch = gcet_ch.length;

  obj.adit_cp = adit_cp.length;
  obj.adit_it = adit_it.length;
  obj.adit_ec = adit_ec.length;
  obj.adit_ee = adit_ee.length;
  obj.adit_me = adit_me.length;
  obj.adit_mc = adit_mc.length;
  obj.adit_ch = adit_ch.length;

  obj.mbit_cp = mbit_cp.length;
  obj.mbit_it = mbit_it.length;

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

const GetAllCoursera = async (req, res) => {
  const { college, department } = req.query;
  const queryObject = {};

  if (college !== "") {
    queryObject.college = { $regex: college, $options: "i" };
  }

  if (department !== "") {
    queryObject.department = { $regex: department, $options: "i" };
  }

  // if(current_semester !== ""){
  //   const semester = Number(current_semester);
  //   queryObject.current_semester = semester;
  // }

  try {
    if (Object.keys(queryObject).length === 0) {
      const data = await Coursera.find();
      res.status(200).send({ status: "success", data: data });
    } else {
      const data = await Coursera.find(queryObject);
      res.status(200).send({ status: "success", data: data });
    }
  } catch (err) {
    res.status(500).send({ status: "failed", msg: "Something went wrong" });
  }
};

// Searching in Coursera
const SearchingCoursera = async (req, res) => {
  const { enrollment_no } = req.query;

  let queryObject = {};

  if (enrollment_no !== "") {
    queryObject.enrollment_no = { $regex: enrollment_no, $options: "i" };
  }

  const data = await Coursera.find(queryObject);

  if (data) {
    res.status(200).send({ status: "success", data: data });
  }
};

const endSemMarks = async (req, res, next) => {
  // console.log(req.body);
  const subject = req.body.subject;
  const obj = req.body.obj;
  const batch = req.body.batch;
  const college = req.body.college;
  const department = req.body.department;
  const semester = req.body.semester;
  obj.map(async (studentObj) => {
    const enrollment_no = studentObj.enrollment;
    const marks = studentObj.marks;
    try {
      const resultStd = await Result.findOne({
        enrollment_no,
        batch,
        college,
        department,
        current_semester: semester,
      });
      if (!resultStd) {
        return res
          .status(500)
          .send({ status: "failed", msg: "Enrollment No. not found" });
      }
      let gradePoint = 0;
      // const counter = resultStd.counter;
      resultStd.result.map(async (intSubObj) => {
        if (intSubObj.sub_name === subject) {
          intSubObj.final_exam = marks;
          gradePoint = Math.floor(
            (intSubObj.midsem_exam +
              intSubObj.internal_prac +
              intSubObj.viva_marks +
              marks) /
              15
          );
          intSubObj.credit = gradePoint;
          if (gradePoint <= 3) {
            resultStd.backlog_subs.push(intSubObj.sub_name);
          }
          if (gradePoint > 3 && resultStd.backlog_subs.length > 0) {
            resultStd.backlog_subs.map((backSubs) => {
              if (backSubs === subject) {
                resultStd.backlog_subs.pop(subject);
              }
            });
          }
          const subjects = await Subject.findOne({
            college,
            department,
            semester,
          });
          subjects.subs.map(async (subjectObj) => {
            if (subjectObj.sub_name === subject) {
              intSubObj.sub_credit = subjectObj.sub_credits;
              await resultStd.save();
            }
          });
          subjects.open_elective.map(async (subjectObj) => {
            if (subjectObj.sub_name === subject) {
              intSubObj.sub_credit = subjectObj.sub_credits;
              await resultStd.save();
            }
          });
          subjects.core_elective.map(async (subjectObj) => {
            if (subjectObj.sub_name === subject) {
              intSubObj.sub_credit = subjectObj.sub_credits;
              await resultStd.save();
            }
          });
        }
      });
      // console.log(resultStd);
      // await resultStd.save();
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ status: "failed", msg: "Enrollment No. is not provided" });
    }
  });
  return res
    .status(200)
    .send({ status: "success", msg: "Marks added successfully" });
};

const calculateSGPA = async (req, res) => {
  const { college, department, batch, semester, enrollment_no } = req.body;
  try {
    for (j = 0; j < enrollment_no.length; j++) {
      const enroll = enrollment_no[j];
      const resultStd = await Result.findOne({
        college,
        department,
        batch,
        semester,
        enrollment_no: enroll,
      });
      if (!resultStd) {
        res
          .status(500)
          .send({ status: "failed", msg: "Enrollment No. not found" });
      }
      let sgpa = 0;
      let sum_cred = 0;
      let cgpa = 0;
      resultStd.result.map((intSubObj) => {
        sgpa = sgpa + intSubObj.credit * intSubObj.sub_credit;
        sum_cred = sum_cred + intSubObj.sub_credit;
      });
      sgpa = sgpa / sum_cred;
      resultStd.sgpa = sgpa;
      await resultStd.save();
      for (i = semester; i >= 1; i--) {
        const sem = i;
        const result = await Result.findOne({
          college,
          department,
          batch,
          semester: sem,
          enrollment_no: enroll,
        });
        cgpa = cgpa + Number(result.sgpa);
      }
      resultStd.cgpa = cgpa / semester;
      await resultStd.save();
      return res.send({
        status: "success",
        msg: "CGPA & SGPA calculated successfully",
      });
    }
  } catch (err) {
    return res.send({
      status: "failed",
      msg: "Enrollment No. is not provided",
    });
  }
};

const showBackLogStudents = async (req, res, next) => {
  const { current_semester, department, batch, college } = req.body;
  const resultStdArr = await Result.find({
    current_semester,
    department,
    batch,
    college,
  });

  if (!resultStdArr) {
    res.status(500).send({ status: "failed", msg: "No Student found" });
  }
  let resultArr = [];
  let resultMarks = [];
  resultStdArr.map((resultStd) => {
    if (resultStd.backlog_subs.length > 0) {
      resultStd.result.map((resultObj) => {
        resultStd.backlog_subs.map((sub) => {
          if (resultObj.sub_name === sub) {
            resultMarks.push({
              sub_name: resultObj.sub_name,
              sub_cred: resultObj.sub_credit,
              mid_sem: resultObj.midsem_exam,
              internal_prac: resultObj.internal_prac,
              viva_marks: resultObj.viva_marks,
              final_exam: resultObj.final_exam,
              gradePoints: resultObj.credit,
            });
          }
        });
      });
      resultArr.push({
        enrollment_no: resultStd.enrollment_no,
        name: resultStd.name,
        college: college,
        department: department,
        current_semester: current_semester,
        sgpa: Number(resultStd.sgpa),
        cgpa: Number(resultStd.cgpa),
        result: resultMarks,
      });
    }
  });
  res.status(200).send({ status: "success", data: resultArr });
};

const getPalcementDetial = async (req, res, next) => {
  const { college, department, from, to } = req.body;
  console.log(req.body);
  let placementArr = [];
  for (i = from; i <= to; i++) {
    const placements = await Placement.find({
      college: { $in: college },
      department: { $in: department },
      placement_year: i,
    });
    placements.map((placement) => {
      placementArr.push(placement);
    });
  }
  res.status(200).send({ status: "success", data: placementArr });
};

const getCompData = async (req, res, next) => {
  const { department, college } = req.body;
  const findFacultyComp = await FacultyComp.find({ department, college });
  if (!findFacultyComp) {
    return res.status(500).send({ status: "failed", msg: "No Student found" });
  }
  res.status(200).send({ status: "success", data: findFacultyComp });
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
  GetAllCoursera,
  SearchingCoursera,
  endSemMarks,
  patchUpdateFaculty,
  calculateSGPA,
  showBackLogStudents,
  getPalcementDetial,
  getCompData,
};
