const jwt = require("jsonwebtoken");
const Student = require("../models/studentModel.js");
const Coursera = require("../models/courseraModel.js");
const Result = require("../models/resultModel.js");
const Event = require("../models/eventModel.js");
const Subject = require("../models/subjectModel.js");
const Skill = require("../models/skillModel.js");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { update } = require("../models/facultyModel.js");

//Register Student
const StudentRegister = async (req, res) => {
  // console.log("files",req.files);
  // console.log("body",req.body);
  const {
    name,
    email,
    enrollment_no,
    department,
    birthday,
    college,
    gender,
    contact,
    admission_source,
    admission_year,
    current_semester,
    address,
    state,
    board,
    category,
  } = req.body;

  if (
    name &&
    email &&
    enrollment_no &&
    department &&
    college &&
    birthday &&
    gender &&
    contact &&
    admission_source &&
    admission_year &&
    current_semester &&
    address &&
    state &&
    board &&
    category
  ) {
    const user = await Student.findOne({ email: email });

    if (user) {
      res.status(500).send({ status: "failed", msg: "Email already exists" });
    } else {
      let uploaded = [];
      let notUploaded = [];

      // Aadhar Card
      try {
        var doc = req.files["AadharCard"][0];
        uploaded.push({ name: doc.fieldname, image: doc.path });
      } catch (error) {
        notUploaded.push("Aadhar Card is not uploaded.");
      }

      // 12th Marksheet
      try {
        var doc = req.files["hsc_marksheet"][0];
        uploaded.push({ name: doc.fieldname, image: doc.path });
      } catch (error) {
        notUploaded.push("HSC Marksheet is not uploaded.");
      }

      // 10th Marksheet
      try {
        var doc = req.files["ssc_marksheet"][0];
        uploaded.push({ name: doc.fieldname, image: doc.path });
      } catch (error) {
        notUploaded.push("SSC Marksheet is not uploaded.");
      }

      // LC
      try {
        var doc = req.files["lc"][0];
        uploaded.push({ name: doc.fieldname, image: doc.path });
      } catch (error) {
        notUploaded.push("LC is not uploaded.");
      }

      // GUJCET Marksheet
      if (admission_source === "ACPC") {
        try {
          var doc = req.files["gujcet_marksheet"][0];
          uploaded.push({ name: doc.fieldname, image: doc.path });
        } catch (error) {
          notUploaded.push("Gujcet Marksheet is not uploaded.");
        }
      }

      if (admission_source === "ACPC") {
        // ACPC Admission letter
        try {
          var doc = req.files["acpc_admission_letter"][0];
          uploaded.push({ name: doc.fieldname, image: doc.path });
        } catch (error) {
          notUploaded.push("ACPC Admission letter is not uploaded.");
        }
      }

      if (board !== "GSEB") {
        // Migration Certificate
        try {
          var doc = req.files["migration_certificate"][0];
          uploaded.push({ name: doc.fieldname, image: doc.path });
        } catch (error) {
          notUploaded.push("Migration Certificate is not uploaded.");
        }
      }

      if (notUploaded.length > 0) {
        res.status(500).send({ status: "failed", data: notUploaded });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(enrollment_no, salt);

        const newStudent = new Student({
          name,
          email,
          password: hashedPassword,
          enrollment_no,
          department,
          college,
          gender,
          birthday,
          contact,
          admission_source,
          admission_year,
          current_semester,
          address,
          state,
          board,
          category,
          documents: uploaded,
        });

        try {
          const user = await newStudent.save();
          const { password, otp, ...others } = user._doc;
          res.status(200).json({ ...others });
        } catch (error) {
          res.status(500).send({ status: "failed", msg: "Unable to register" });
        }
      }
    }
  } else {
    res.status(500).send({ status: "failed", msg: "All fields are required" });
  }
};

// Login Student
const StudentLogin = async (req, res) => {
  const { enrollment_no, password } = req.body;

  if (enrollment_no && password) {
    try {
      const user = await Student.findOne({ enrollment_no: enrollment_no });
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
          const token = jwt.sign({ userID: user._id }, process.env.JWT_SEC, {
            expiresIn: "5d",
          });
          const { password, otp, ...others } = user._doc;
          res.send({ status: "success", data: { ...others }, token: token });
        } else {
          res.status(500).send({
            status: "failed",
            msg: "Enrollment No or Password is not valid",
          });
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

const StudentForgotPassword = async (req, res) => {
  const { email } = req.body;

  if (email) {
    const user = await Student.findOne({ email });

    if (user) {
      const otp = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
      // console.log(otp)
      const student = await Student.findOneAndUpdate(
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

const StudentValidateOTP = async (req, res) => {
  const { email, otp } = req.body;

  if (email && otp) {
    const student = await Student.findOne({ email });

    if (student) {
      if (otp !== student.otp) {
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

const StudentCourseraUpload = async (req, res) => {
  const { name, fname, enrollment_no, college, department, current_semester } =
    req.body;

  // console.log(req.file);

  if (
    name &&
    fname &&
    enrollment_no &&
    current_semester &&
    college &&
    department
  ) {
    const student = await Coursera.findOne({ enrollment_no });

    if (student) {
      let isExist = false;
      student.courses.map((std) => {
        // console.log(std);
        if (std.semester === Number(current_semester)) {
          // console.log(std.semester);
          std.certificates.push({ name: fname, image: req.file.path });
          isExist = true;
        }
      });

      if (!isExist) {
        student.courses.push({
          semester: current_semester,
          certificates: [{ name: fname, image: req.file.path }],
        });
      }

      // student.courses.map((std) => {
      //   if(std.semester === current_semester){
      //     std.certificates.push({name: fname, image: req.file.path})
      //   }
      // })
      // student.courses.push({ name: name, image: req.file.path });
      student.save();
      res.status(200).json(student);
    } else {
      const newStudent = new Coursera({
        name,
        enrollment_no,
        college,
        department,
        current_semester,
        courses: [
          {
            semester: current_semester,
            certificates: [
              {
                name: fname,
                image: req.file.path,
              },
            ],
          },
        ],
      });

      try {
        // const coursera = await newStudent.populate([{path: 'Student', select: 'current_semester', strictPopulate: false}]);
        const coursera = await newStudent.save();
        res.status(200).json(coursera);
      } catch (error) {
        res.status(500).send({ status: "failed", msg: "Not Uploaded!" });
      }
    }
  } else {
    res.status(500).send({ status: "failed", msg: "All feilds are required" });
  }
};

// Searching
const Searching = async (req, res) => {
  const { enrollment_no } = req.query;

  let queryObject = {};

  if (enrollment_no !== "") {
    queryObject.enrollment_no = { $regex: enrollment_no, $options: "i" };
  }

  const data = await Student.find(queryObject);

  if (data) {
    res.status(200).send({ status: "success", data: data });
  }
};

const GetStudent = async (req, res) => {
  const { enrollment_no } = req.body;

  try {
    const student = await Student.findOne({ enrollment_no });

    if (student) {
      const { password, otp, ...others } = student._doc;
      res.status(200).send({ status: "success", data: others });
    } else {
      res.status(404).send({ status: "failed", msg: "Student doesn't exist" });
    }
  } catch (error) {
    res.status(500).send({ status: "failed", msg: "Something went wrong" });
  }
};

const SearchStudent = async (req, res) => {
  const { enrollment_no, college, department } = req.query;

  let queryObject = {};

  if (enrollment_no !== "") {
    queryObject.enrollment_no = { $regex: enrollment_no, $options: "i" };
  }
  if (college !== "") {
    queryObject.college = { $regex: college, $options: "i" };
  }
  if (department !== "") {
    queryObject.department = { $regex: department, $options: "i" };
  }

  const data = await Student.find(queryObject);

  if (data) {
    res.status(200).send({ status: "success", data: data });
  }
};

// const postResultShow = async (req, res, next) => {
//   const { college, department, batch, semester, enrollment_no } = req.body;
//   for (i = 0; i < enrollment_no.length; i++) {
//     const enroll = enrollment_no[i];
//     const resultStd = await Result.findOne({
//       college,
//       department,
//       batch,
//       semester,
//       enrollment_no: enroll,
//     });
//     resultStd.result.map((intSubObj)=>{

//     })
//     const returnData = {
//       name: resultStd.name,
//       enrollment_no: resultStd.enrollment_no,
//       semester:resultStd.current_semester,
//       department:resultStd.department,
//       college:resultStd.college,
//       result:{}
//     };
//   }
// };

const addSkills = async (req, res, next) => {
  const {
    name,
    enrollment_no,
    contact_no,
    email,
    batch,
    current_semester,
    department,
    college,
    profSkills,
  } = req.body;
  if (
    name &&
    enrollment_no &&
    contact_no &&
    email &&
    batch &&
    current_semester &&
    department &&
    college &&
    profSkills
  ) {
    const skilledStd = await Skill.findOne({ enrollment_no });
    if (!skilledStd) {
      const newSkilledStd = new Skill({
        name,
        enrollment_no,
        contact_no,
        email,
        batch,
        current_semester,
        department,
        college,
        profSkills,
      });
      const result = await newSkilledStd.save();
      return res
        .status(200)
        .send({ data: result, msg: "Skill Add Successfully" });
    } else {
      let updateSkill = [];
      for (i = 0; i < skilledStd.profSkills.length; i++) {
        updateSkill.push(skilledStd.profSkills[i]);
      }
      for (i = 0; i < profSkills.length; i++) {
        updateSkill.push(profSkills[i]);
      }
      const updateSkilledStudent = await Skill.findOneAndUpdate(
        { enrollment_no },
        { skills: updateSkill },
        { runValidators: true, new: true, setDefaultsOnInsert: true }
      );
      return res.status(200).send({ msg: "Skill updated Successfully" });
    }
  } else {
    res.status(500).send({ status: "failed", msg: "Enter all the details" });
  }
};

const addHobby = async (req, res, next) => {
  const {
    name,
    enrollment_no,
    contact_no,
    email,
    batch,
    current_semester,
    department,
    college,
    other,
  } = req.body;
  if (
    name &&
    enrollment_no &&
    contact_no &&
    email &&
    batch &&
    current_semester &&
    department &&
    college &&
    other
  ) {
    const skilledStd = await Skill.findOne({ enrollment_no });
    if (!skilledStd) {
      const newSkilledStd = new Skill({
        name,
        enrollment_no,
        contact_no,
        email,
        batch,
        current_semester,
        department,
        college,
        other,
      });
      const result = await newSkilledStd.save();
      return res
        .status(200)
        .send({ data: result, msg: "Hobby Add Successfully" });
    } else {
      let updateSkill = [];
      for (i = 0; i < skilledStd.other.length; i++) {
        updateSkill.push(skilledStd.other[i]);
      }
      for (i = 0; i < other.length; i++) {
        updateSkill.push(other[i]);
      }
      const updateSkilledStudent = await Skill.findOneAndUpdate(
        { enrollment_no },
        { other: updateSkill },
        { runValidators: true, new: true, setDefaultsOnInsert: true }
      );
      return res.status(200).send({ msg: "Hobby updated Successfully" });
    }
  } else {
    res.status(500).send({ status: "failed", msg: "Enter all the details" });
  }
};

const getFetchSkill = async (req, res) => {
  const { enrollment_no } = req.body;
  const skill = await Skill.findOne({ enrollment_no });
  if (!skill) {
    return res.status(500).send({ status: "failed", msg: "No events found" });
  }
  return res
    .status(200)
    .json({ data: skill, msg: "Event fetched Successfully" });
};

const GetStudentCourses = async (req, res) => {
  const { enrollment_no, college, department, current_semester } = req.body;
  try {
    const data = await Result.findOne(req.body);
    // console.log(data);
    let subjectArr = [];
    let returnArr = [];
    data.result.map((resultObj) => {
      subjectArr.push(resultObj.sub_name);
    });
    const subData = await Subject.findOne({
      semester: current_semester,
      college,
      department,
    });
    for (i = 0; i < subjectArr.length; i++) {
      subData.subs.map((subjectObj) => {
        if (subjectObj.sub_name === subjectArr[i]) {
          returnArr.push({
            type: "Professional Core",
            sub_cred: subjectObj.sub_credits,
            sub_name: subjectObj.sub_name,
          });
        }
      });
      subData.open_elective.map((subjectObj) => {
        if (subjectObj.sub_name === subjectArr[i]) {
          returnArr.push({
            type: "Open Elective",
            sub_cred: subjectObj.sub_credits,
            sub_name: subjectObj.sub_name,
          });
        }
      });
      subData.core_elective.map((subjectObj) => {
        if (subjectObj.sub_name === subjectArr[i]) {
          returnArr.push({
            type: "Core Elective",
            sub_cred: subjectObj.sub_credits,
            sub_name: subjectObj.sub_name,
          });
        }
      });
    }
    console.log(returnArr);
    res.status(200).send({ status: "success", data: returnArr });
  } catch (error) {
    return res.status(500).send({ status: "failed", msg: "No events found" });
  }
};

const viewResult = async (req, res, next) => {
  const { enrollment_no, college, department, current_semester } = req.body;
  console.log(req.body);
  let resultArr = [];
  const data = await Result.findOne(req.body);
  let subjectArr = [];
  let returnArr = [];
  data.result.map((resultObj) => {
    subjectArr.push(resultObj.sub_name);
  });
  const subData = await Subject.findOne({
    semester: current_semester,
    college,
    department,
  });
  for (i = 0; i < subjectArr.length; i++) {
    subData.subs.map((subjectObj) => {
      if (subjectObj.sub_name === subjectArr[i]) {
        returnArr.push({
          type: "Professional Core",
          sub_cred: subjectObj.sub_credits,
          sub_name: subjectObj.sub_name,
        });
      }
    });
    subData.open_elective.map((subjectObj) => {
      if (subjectObj.sub_name === subjectArr[i]) {
        returnArr.push({
          type: "Open Elective",
          sub_cred: subjectObj.sub_credits,
          sub_name: subjectObj.sub_name,
        });
      }
    });
    subData.core_elective.map((subjectObj) => {
      if (subjectObj.sub_name === subjectArr[i]) {
        returnArr.push({
          type: "Core Elective",
          sub_cred: subjectObj.sub_credits,
          sub_name: subjectObj.sub_name,
        });
      }
    });
  }
  // console.log(returnArr);

  const resultStdArr = await Result.find({
    enrollment_no,
  });
  if (!resultStdArr) {
    return res.status(500).send({ status: "failed", msg: "No events found" });
  }
  resultStdArr.map((resultStd) => {
    if (resultStd.sgpa !== 0) {
      let subjectType;
      let resultMarks = [];
      resultStd.result.map((resultObj) => {
        returnArr.map((subjObj) => {
          // console.log(subjObj.sub_name);
          // console.log(resultObj.sub_name);
          if (resultObj.sub_name === subjObj.sub_name) {
            subjectType = subjObj.type;
          }
        });
        resultMarks.push({
          sub_name: resultObj.sub_name,
          sub_cred: resultObj.sub_credit,
          type: subjectType,
          mid_sem: resultObj.midsem_exam,
          internal_prac: resultObj.internal_prac,
          viva_marks: resultObj.viva_marks,
          final_exam: resultObj.final_exam,
          gradePoints: resultObj.credit,
        });
      });
      resultArr.push({
        semester: i,
        sgpa: Number(resultStd.sgpa),
        cgpa: Number(resultStd.cgpa),
        result: resultMarks,
      });
    }
  });
  res.status(200).send({ status: "success", data: resultArr });
};

module.exports = {
  StudentRegister,
  StudentLogin,
  StudentForgotPassword,
  StudentValidateOTP,
  StudentUpdatePassword,
  StudentCourseraUpload,
  Searching,
  GetStudent,
  SearchStudent,
  addSkills,
  addHobby,
  getFetchSkill,
  GetStudentCourses,
  viewResult,
};
