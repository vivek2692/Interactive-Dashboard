const jwt = require("jsonwebtoken");
const Student = require("../models/studentModel.js");
const Coursera = require("../models/courseraModel.js");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

//Register Student
const StudentRegister = async (req, res) => {
  // console.log("files",req.files);
  // console.log("body",req.body);
  const {
    name,
    email,
    enrollment_no,
    department,
    college,
    gender,
    contact,
    admission_source,
    admission_year,
    current_semester,
    address,
    state,
    board,
    category
  } = req.body;

  if (
    name &&
    email &&
    enrollment_no &&
    department &&
    college &&
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
      if(admission_source === "ACPC"){
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
          contact,
          admission_source,
          admission_year,
          current_semester,
          address,
          state,
          board,
          category,
          documents: uploaded
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
          res
            .status(500)
            .send({ status: "failed", msg: "Enrollment No or Password is not valid" });
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

const StudentCourseraUpload = async(req,res) => {
  
  const {name, enrollment_no, semester, college, department} = req.body;
  
  if(name && enrollment_no && semester && college && department){
    const student = await Coursera.findOne({enrollment_no,semester});

    if(student){
      student.courses.push({name: name, image: req.file.path});
      student.save();
      res.status(200).json(student);
    }else{
      const newStudent = new Coursera({
        enrollment_no,
        semester,
        college,
        department,
        courses: [
          {
            name,
            image: req.file.path
          }
        ]
      })

      try {
        const coursera = await newStudent.save();
        res.status(200).json(coursera);
      } catch (error) {
        res.status(500).send({ status: "failed", msg: "Not Uploaded!" });
      }
    }
  }
  else{
    res.status(500).send({ status: "failed", msg: "All feilds are required" });
  }

}

// Searching
const Searching = async(req, res) => {
  const {enrollment_no} = req.query;

  let queryObject = {};

  if(enrollment_no !== ""){
    queryObject.enrollment_no = { $regex: enrollment_no, $options: "i" };
  }

  const data = await Student.find(queryObject);

  if(data){
    res.status(200).send({"status": "success", data: data});
  }
}

const GetStudent = async(req, res) => {
  const {enrollment_no} = req.body;

  try {
    const student = await Student.findOne({enrollment_no});

    if(student){
      const { password, otp, ...others } = student._doc;
      res.status(200).send({"status": "success", data: others});
    }else{
      res.status(404).send({"status": "failed", "msg": "Student doesn't exist"});
    }
  } catch (error) {
    res.status(500).send({"status": "failed", "msg": "Something went wrong"})
  }
}

module.exports = {
  StudentRegister,
  StudentLogin,
  StudentForgotPassword,
  StudentValidateOTP,
  StudentUpdatePassword,
  StudentCourseraUpload,
  Searching,
  GetStudent
};
