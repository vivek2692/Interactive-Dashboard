const jwt = require("jsonwebtoken");
const Faculty = require("../models/facultyModel.js");
const Subject = require("../models/subjectModel.js");
const Student = require("../models/studentModel.js");
const Result = require("../models/resultModel.js");
const Coursera = require("../models/courseraModel.js");
const Placement = require("../models/placementModel");
const Event = require("../models/eventModel");
const Skill = require("../models/skillModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const moment = require("moment");

//Register Faculty
const FacultyRegister = async (req, res) => {
  const {
    name,
    faculty_id,
    email,
    gender,
    qualification,
    position,
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
    gender &&
    qualification &&
    position &&
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
      const hashedPassword = await bcrypt.hash(faculty_id, salt);

      const newFaculty = new Faculty({
        name,
        faculty_id,
        email,
        password: hashedPassword,
        gender,
        qualification,
        position,
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
  const { college, department, subs, open_elective, core_elective, semester } =
    req.body;
  if (college && department && semester) {
    const item = await Subject.findOne({ college, department, semester });

    if (item) {
      // console.log(item);
      // let subs = [];

      subs.map((sub) => {
        item.subs.push(sub);
      });
      open_elective.map((sub) => {
        item.open_elective.push(sub);
      });
      core_elective.map((sub) => {
        item.core_elective.push(sub);
      });

      // console.log(subs);

      try {
        // let appear = false;
        // item.subjects.map((sem) => {
        //   if (sem.semester === semester) {
        //     sem.subs = subs;
        //     appear = true;
        //   }
        // });

        // if (appear === false) {
        //   item.subjects.push({ semester: semester, subs: subs });
        // }
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
        semester,
        subs: subs,
        open_elective,
        core_elective,
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
  const {
    name,
    enrollment_no,
    subjects,
    college,
    department,
    current_semester,
    batch,
  } = req.body;

  // console.log(req.body);

  if (
    name &&
    enrollment_no &&
    college &&
    department &&
    current_semester &&
    batch
  ) {
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
        current_semester,
        batch,
      });

      if (student) {
        // student.results.map((sem) => {
        //   if (sem.semester === semester) {
        //     subjects.map((sub) => {
        //       sem.result.push(sub);
        //     });
        //   }
        // });

        student.subjects = subjects;

        try {
          await student.save();
          res.status(200).send({
            status: "success",
            msg: "Subjects assigned successfully",
            data: student,
          });
        } catch (error) {
          console.log(error);
          res
            .status(500)
            .send({ status: "failure", msg: "Something went wrong" });
        }
      } else {
        // const item = await Subject.findOne({ college, department });

        // let subs = [];

        // item.subjects.map((sem) => {
        //   if (sem.semester === semester) {
        //     sem.subs.map((sub) => {
        //       subs.push(sub);
        //     });
        //   }
        // });

        const newStudent = new Result({
          name,
          enrollment_no,
          college,
          // year: new Date().getFullYear(),
          department,
          batch,
          current_semester,
          subjects: subjects,
        });

        try {
          await newStudent.save();
          res.status(200).send({
            status: "success",
            msg: "Subjects assigned successfully",
            data: newStudent,
          });
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

// Searching
const Searching = async (req, res) => {
  const { faculty_id } = req.query;

  let queryObject = {};

  if (faculty_id !== "") {
    queryObject.faculty_id = { $regex: faculty_id, $options: "i" };
  }

  const data = await Faculty.find(queryObject);

  if (data) {
    res.status(200).send({ status: "success", data: data });
  }
};

const PlacementRegister = async (req, res, next) => {
  if (!req.body.enrollment_no) {
    return res
      .status(500)
      .send({ status: "failure", msg: "Enrollment Number not found" });
  }
  const student = await Student.findOne({
    enrollment_no: req.body.enrollment_no,
  });
  if (!student) {
    return res.status(500).send({ status: "failure", msg: "No Student Found" });
  }
  const {
    student_name,
    student_email,
    mobile_number,
    gender,
    enrollment_no,
    student_address,
    state,
    placement_year,
    college,
    department,
    package,
    company,
    contract_duration,
    company_state,
  } = req.body;
  if (
    !(
      student_name &&
      student_email &&
      mobile_number &&
      gender &&
      enrollment_no &&
      student_address &&
      state &&
      placement_year &&
      college &&
      department &&
      package &&
      company &&
      contract_duration &&
      company_state
    )
  ) {
    return res
      .status(500)
      .send({ status: "failure", msg: "Please enter all the details" });
  }
  const placedStudent = await Placement.findOne({
    enrollment_no: req.body.enrollment_no,
  });
  if (placedStudent) {
    return res
      .status(500)
      .send({ status: "failure", msg: "Student is already placed" });
  }
  const newPlacement = new Placement({
    student_name,
    student_email,
    mobile_number,
    gender,
    enrollment_no,
    student_address,
    state,
    placement_year,
    college,
    department,
    package,
    company,
    contract_duration,
    company_state,
  });

  newPlacement
    .save()
    .then((result) => {
      return res.status(200).json({ status: "Success", data: result });
    })
    .catch((error) => {
      res.status(500).send({ status: "failure", msg: "Error Occured" });
    });
};

const PostShowPlacedStudents = async (req, res, next) => {
  const { college, department, placement_year } = req.query;
  const queryObject = {};
  if (college !== "") {
    queryObject.college = { $regex: `${college}`, $options: "i" };
  }
  if (department !== "") {
    queryObject.department = { $regex: `${department}`, $options: "i" };
  }
  if (placement_year !== "") {
    queryObject.placement_year = { $regex: `${placement_year}`, $options: "i" };
  }
  // console.log(queryObject);
  await Placement.find(queryObject)
    .exec()
    .then((placements) => {
      if (!placements) {
        return res.status(500).send({
          status: "failure",
          msg: "No placement details avaible for this filter",
        });
      }
      return res.status(200).json({
        data: placements,
        hasError: false,
      });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .send({ status: "failure", msg: "Error in finding placement detail" });
    });
};

const PatchPlacedStudents = async (req, res, next) => {
  const data = req.body;
  const enrollment_no = req.params.id;
  // console.log(data);
  try {
    const updatedPlacement = await Placement.findOneAndUpdate(
      { enrollment_no: enrollment_no },
      data,
      { new: true, runValidators: true }
    );
    // console.log(updatedPlacement);
    if (!updatedPlacement) {
      return res
        .status(404)
        .json({ status: "failed", msg: "Placement Data not found" });
    }
    return res.status(200).json({ status: "success", data: updatedPlacement });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "failed", msg: "Update failed" });
  }
};

const getAllPlacements = async (req, res, next) => {
  const queryObject = {};
  const { college, department, placement_year } = req.query;

  // console.log(req.query);

  if (college !== "") {
    queryObject.college = { $regex: `${college}`, $options: "i" };
    // queryObject.college = college;
  }

  if (department !== "") {
    // queryObject.department = department;
    queryObject.department = { $regex: `${department}`, $options: "i" };
  }

  if (placement_year !== "") {
    // queryObject.placement_year = placement_year;
    queryObject.placement_year = { $regex: `${placement_year}`, $options: "i" };
  }

  try {
    const placements = await Placement.find(queryObject);
    res.status(200).send({ status: "success", data: placements });
  } catch (error) {
    res.status(500).send({ status: "failed", msg: "Something went wrong" });
  }
};

const postAllPlacements = async (req, res, next) => {
  const { college, department, placement_year } = req.body;

  console.log(req.body);

  try {
    const placements = await Placement.find(req.body);
    res.status(200).send({ status: "success", data: placements });
  } catch (error) {
    res.status(500).send({ status: "failed", msg: "Something went wrong" });
  }
};

const getPlacedStudentInfo = async (req, res) => {
  const enrollment_no = req.params.id;
  console.log(enrollment_no);
  if (enrollment_no) {
    const student = await Student.findOne({ enrollment_no });

    if (student) {
      try {
        const data = await Placement.findOne({ enrollment_no });
        res.status(200).send({ status: "success", data: data });
      } catch (error) {
        res.status(500).send({ status: "failed", msg: "Something went wrong" });
      }
    } else {
      res.status(404).send({ status: "failed", msg: "Student doesn't exist" });
    }
  } else {
    res
      .status(500)
      .send({ status: "failed", msg: "Enrollment No. is not provided" });
  }
};

const getPlacedStudentInfoCollege = async (req, res) => {
  const enrollment_no = req.params.id;
  const { college } = req.body;
  // console.log(enrollment_no, college);
  if (enrollment_no) {
    const student = await Student.findOne({ enrollment_no, college });

    if (student) {
      try {
        const data = await Placement.findOne({ enrollment_no, college });
        res.status(200).send({ status: "success", data: data });
      } catch (error) {
        res.status(500).send({ status: "failed", msg: "Something went wrong" });
      }
    } else {
      res.status(404).send({ status: "failed", msg: "Student doesn't exist" });
    }
  } else {
    res
      .status(500)
      .send({ status: "failed", msg: "Enrollment No. is not provided" });
  }
};

const SearchPlacedStudents = async (req, res) => {
  const { enrollment_no } = req.query;

  let queryObject = {};

  if (enrollment_no !== "") {
    queryObject.enrollment_no = { $regex: enrollment_no, $options: "i" };
  }

  const data = await Placement.find(queryObject);

  if (data) {
    res.status(200).send({ status: "success", data: data });
  }
};

const midMarksEntry = async (req, res, next) => {
  const subject = req.body.subject;
  const obj = req.body.obj;
  const batch = req.body.batch;
  const current_semester = req.body.semester;
  console.log(req.body);
  obj.map(async (studentObj) => {
    // if (studentObj.enrollment !== "12002040501079") {
    const enrollment_no = studentObj.enrollment;
    const marks = studentObj.marks;
    try {
      const resultStd = await Result.findOne({
        enrollment_no,
        batch,
        current_semester,
      });
      if (!resultStd) {
        return res
          .status(500)
          .send({ status: "failed", msg: "Enrollment No. not found" });
      }
      resultStd.result.push({ sub_name: subject, midsem_exam: marks });
      await resultStd.save();
      // res.send({ status: "success", msg: "Marks added successfully" });
    } catch (err) {
      console.log(err);
      res.send({ status: "failed", msg: "Enrollment No. is not provided" });
    }
    // }
  });
  res.send({ status: "success", msg: "Marks added successfully" });
};

const internalPracMarksEntry = async (req, res, next) => {
  const subject = req.body.subject;
  const obj = req.body.obj;
  const batch = req.body.batch;
  const current_semester = req.body.semester;

  obj.map(async (studentObj) => {
    // if (studentObj.enrollment !== "12002040501079") {
    const enrollment_no = studentObj.enrollment;
    const marks = studentObj.marks;
    try {
      const resultStd = await Result.findOne({
        enrollment_no,
        batch,
        current_semester,
      });
      if (!resultStd) {
        return res
          .status(500)
          .send({ status: "failed", msg: "Enrollment No. not found" });
      }
      resultStd.result.map((intSubObj) => {
        if (intSubObj.sub_name === subject) {
          intSubObj.internal_prac = marks;
        }
      });
      await resultStd.save();
    } catch (err) {
      console.log(err);
      res.send({ status: "failed", msg: "Enrollment No. is not provided" });
    }
    // }
  });
  res.send({ status: "success", msg: "Marks added successfully" });
};

const vivaMarksEntry = async (req, res, next) => {
  const subject = req.body.subject;
  const obj = req.body.obj;
  const batch = req.body.batch;
  const current_semester = req.body.semester;

  obj.map(async (studentObj) => {
    // if (studentObj.enrollment !== "12002040501079") {
    const enrollment_no = studentObj.enrollment;
    const marks = studentObj.marks;
    try {
      const resultStd = await Result.findOne({
        enrollment_no,
        batch,
        current_semester,
      });
      if (!resultStd) {
        return res
          .status(500)
          .send({ status: "failed", msg: "Enrollment No. not found" });
      }
      resultStd.result.map((intSubObj) => {
        if (intSubObj.sub_name === subject) {
          intSubObj.viva_marks = marks;
        }
      });
      await resultStd.save();
    } catch (err) {
      console.log(err);
      res.send({ status: "failed", msg: "Enrollment No. is not provided" });
    }
    // }
  });
  res.send({ status: "success", msg: "Marks added successfully" });
};

const EnrolledStudents = async (req, res) => {
  const { batch, current_semester, subject, college, department } = req.body;
  // console.log(req.body);
  const semester = Number(current_semester);
  try {
    const data = await Result.find({
      batch,
      current_semester: semester,
      college,
      department,
      subjects: { $in: [subject] },
    });
    // console.log(data);
    res.status(200).send({ status: "success", data: data });
  } catch (error) {
    res.status(500).send({ status: "failed", msg: "Something went wrong" });
  }
};

const FacultyStats = async (req, res) => {
  const { college, department } = req.body;

  const students = await Student.find({ college });
  const faculties = await Faculty.find({ college });
  const deptFaculties = await Faculty.find({ college, department });
  const depStudents = await Student.find({ college, department });

  const obj = {};
  obj.total_students = students.length;
  obj.total_faculties = faculties.length;
  obj.dept_faculties = deptFaculties.length;

  if (college === "GCET") {
    const gcet_cp = [];
    const gcet_it = [];
    const gcet_ec = [];
    const gcet_ee = [];
    const gcet_me = [];
    const gcet_ch = [];
    const gcet_cl = [];

    let gcet_fy = [];
    let gcet_sy = [];
    let gcet_ty = [];
    let gcet_fiy = [];

    students.map((student) => {
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
      } else if (student.department === "CH") {
        gcet_ch.push(student);
      } else if (student.department === "CL") {
        gcet_cl.push(student);
      }
    });

    depStudents.map((student) => {
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

    obj.cp = gcet_cp.length;
    obj.it = gcet_it.length;
    obj.ec = gcet_ec.length;
    obj.ee = gcet_ee.length;
    obj.me = gcet_me.length;
    obj.ch = gcet_ch.length;
    obj.cl = gcet_cl.length;

    obj.first_year = gcet_fy.length;
    obj.second_year = gcet_sy.length;
    obj.third_year = gcet_ty.length;
    obj.fourth_year = gcet_fiy.length;

    res.status(200).send({ status: "success", data: obj });
  } else if (college === "MBIT") {
    const mbit_cp = [];
    const mbit_it = [];

    let mbit_fy = [];
    let mbit_sy = [];
    let mbit_ty = [];
    let mbit_fiy = [];

    students.map((student) => {
      if (student.department === "CP") {
        mbit_cp.push(student);
      } else if (student.department === "IT") {
        mbit_it.push(student);
      }
    });

    depStudents.map((student) => {
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

    obj.cp = mbit_cp.length;
    obj.it = mbit_it.length;

    obj.first_year = mbit_fy.length;
    obj.second_year = mbit_sy.length;
    obj.third_year = mbit_ty.length;
    obj.fourth_year = mbit_fiy.length;

    res.status(200).send({ status: "success", data: obj });
  } else if (college === "ADIT") {
    const adit_cp = [];
    const adit_it = [];
    const adit_ec = [];
    const adit_ee = [];
    const adit_me = [];
    const adit_ch = [];
    const adit_cl = [];

    let adit_fy = [];
    let adit_sy = [];
    let adit_ty = [];
    let adit_fiy = [];

    students.map((student) => {
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
      } else if (student.department === "CH") {
        adit_ch.push(student);
      } else if (student.department === "CL") {
        adit_cl.push(student);
      }
    });

    depStudents.map((student) => {
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

    obj.cp = adit_cp.length;
    obj.it = adit_it.length;
    obj.ec = adit_ec.length;
    obj.ee = adit_ee.length;
    obj.me = adit_me.length;
    obj.ch = adit_ch.length;
    obj.cl = adit_cl.length;

    obj.first_year = adit_fy.length;
    obj.second_year = adit_sy.length;
    obj.third_year = adit_ty.length;
    obj.fourth_year = adit_fiy.length;

    res.status(200).send({ status: "success", data: obj });
  }
};

const FacultyAllStudents = async (req, res) => {
  const { college, department } = req.body;

  try {
    const students = await Student.find({ college, department }).sort({
      enrollment_no: 1,
    });
    res.status(200).send({ status: "success", data: students });
  } catch (error) {
    res.status(500).send({ status: "failed", msg: "Something went wrong" });
  }
};

const FacultyAllFaculties = async (req, res) => {
  const { college, department } = req.body;

  try {
    const students = await Faculty.find({ college, department }).sort({
      faculty_id: 1,
    });
    res.status(200).send({ status: "success", data: students });
  } catch (error) {
    res.status(500).send({ status: "failed", msg: "Something went wrong" });
  }
};

const postSelectStudent = async (req, res) => {
  const { semester } = req.query;
  const { college, department } = req.body;
  const queryObject = { college: college, department: department };
  if (semester !== "") {
    let current_semester = Number(semester);
    queryObject.current_semester = current_semester;
  }

  await Student.find(queryObject)
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

const SearchingStudent = async (req, res) => {
  const { enrollment_no } = req.query;
  const { college, department } = req.body;

  let queryObject = { college: college, department: department };

  if (enrollment_no !== "") {
    queryObject.enrollment_no = { $regex: enrollment_no, $options: "i" };
  }

  const data = await Student.find(queryObject);

  if (data) {
    res.status(200).send({ status: "success", data: data });
  }
};

const SearchingFaculty = async (req, res) => {
  const { faculty_id } = req.query;

  const { college, department } = req.body;

  let queryObject = { college: college, department: department };

  if (faculty_id !== "") {
    queryObject.faculty_id = { $regex: faculty_id, $options: "i" };
  }

  const data = await Faculty.find(queryObject);

  if (data) {
    res.status(200).send({ status: "success", data: data });
  }
};

const SearchStudentPlacement = async (req, res) => {
  const { enrollment_no } = req.query;
  const { college } = req.body;

  // console.log(req.body, req.query);

  let queryObject = { college: college };

  if (enrollment_no !== "") {
    queryObject.enrollment_no = { $regex: `${enrollment_no}`, $options: "i" };
  }

  const data = await Placement.find(queryObject);

  if (data) {
    res.status(200).send({ status: "success", data: data });
  }
};

const GetCourses = async (req, res) => {
  const { department, semester } = req.body;
  // console.log(req.body);
  let data = [];

  const sem = Number(semester);

  try {
    const subjects = await Subject.findOne({ department, semester: sem });
    // console.log(subjects);
    if (subjects) {
      subjects.subs.map((sub) => {
        data.push({
          title: sub.sub_name,
          credits: sub.sub_credits,
          type: "Professional Core",
        });
      });
      subjects.open_elective.map((sub) => {
        data.push({
          title: sub.sub_name,
          credits: sub.sub_credits,
          type: "Open Elective",
        });
      });
      subjects.core_elective.map((sub) => {
        data.push({
          title: sub.sub_name,
          credits: sub.sub_credits,
          type: "Core Elective",
        });
      });
      // console.log(data);
      res.status(200).send({ status: "success", data: data });
    } else {
      res.status(404).send({ status: "failed", msg: "Not Available" });
    }
  } catch (err) {
    res.status(500).send({ status: "failed", msg: "Something went wrong" });
  }
};

const GetAllCoursera = async (req, res) => {
  const { college, department, semester } = req.body;
  // console.log(req.body);

  try {
    if (semester !== "") {
      const current_semester = Number(semester);
      const data = await Coursera.find({
        college,
        department,
        current_semester,
      });
      res.status(200).send({ status: "success", data: data });
    } else {
      const data = await Coursera.find({ college, department });
      // console.log("semester not provided");
      // console.log(data);
      res.status(200).send({ status: "success", data: data });
    }
  } catch (err) {
    res.status(500).send({ status: "failed", msg: "Something went wrong" });
  }
};

const GetFaculty = async (req, res) => {
  const { faculty_id } = req.body;

  try {
    const student = await Faculty.findOne({ faculty_id });

    if (student) {
      const { password, otp, ...others } = student._doc;
      res.status(200).send({ status: "success", data: others });
    } else {
      res.status(404).send({ status: "failed", msg: "Faculty doesn't exist" });
    }
  } catch (error) {
    res.status(500).send({ status: "failed", msg: "Something went wrong" });
  }
};

const addNewEvent = async (req, res, next) => {
  const {
    name,
    skills,
    department,
    college,
    cordinator,
    contact_no,
    description,
    email,
    link,
  } = req.body;
  if (
    (name &&
      skills &&
      department &&
      college &&
      cordinator &&
      contact_no &&
      description &&
      email &&
      link) ||
    (name &&
      skills &&
      department &&
      college &&
      cordinator &&
      contact_no &&
      description &&
      email)
  ) {
    let newEvent;
    if (
      name &&
      skills &&
      department &&
      college &&
      cordinator &&
      contact_no &&
      description &&
      email &&
      link
    ) {
      newEvent = new Event({
        name,
        skills,
        department,
        college,
        cordinator,
        contact_no,
        description,
        email,
        link,
      });
    } else {
      newEvent = new Event({
        name,
        skills,
        department,
        college,
        cordinator,
        contact_no,
        description,
        email,
      });
    }
    try {
      const event = await newEvent.save();
      return res
        .status(200)
        .json({ data: event, msg: "Event Add Successfully" });
    } catch (error) {
      return res
        .status(500)
        .send({ status: "failed", msg: "Unable to register the event" });
    }
  } else {
    res.status(500).send({ status: "failed", msg: "All fields are required" });
  }
};

const deleteEvent = async (req, res, next) => {
  const { name, cordinator } = req.body;
  const event = await Event.findOne({ name, cordinator });
  if (!event) {
    return res
      .status(500)
      .send({ status: "failed", msg: "No such event exists" });
  }
  const result = await Event.deleteOne({ name, cordinator });
  if (!result) {
    return res.status(500).send({ status: "failed", msg: "No events deleted" });
  } else {
    return res
      .status(200)
      .json({ data: result, msg: "Event Deleted Successfully" });
  }
};

const fetchEvent = async (req, res, next) => {
  // const { name, cordinator } = req.body;
  const eventData = await Event.find();
  if (!eventData) {
    return res.status(500).send({ status: "failed", msg: "No events found" });
  }
  return res
    .status(200)
    .json({ data: eventData, msg: "Event fetched Successfully" });
};

const searchSkill = async (req, res, next) => {
  const { skills } = req.body;
  const data = [];
  for (i = 0; i < skills.length; i++) {
    const resultStd = await Skill.find({ skills: { $in: [skills[i]] } });
    if (!resultStd) {
      return res.status(500).send({ status: "failed", msg: "No skills found" });
    } else {
      data.push({ skill: skills[i], students: resultStd });
    }
  }

  return res
    .status(200)
    .send({ data: data, msg: "Event fetched Successfully" });
};

<<<<<<< Updated upstream
const BirthdayWish = async (req, res) => {
  const { college, department } = req.body;
  // console.log(req.body);

  const today = moment().format("MM-DD");
  console.log(today);

  let arr = Number(today.split("-")[1]);
  // console.log(arr);
  arr++;

  const tomorrow = today.split("-")[0];
  let str = tomorrow + "-" + arr.toString();

  // console.log(str);

  const tommorowBirthDay = await Student.aggregate([
    {
      $addFields: {
        birthdayMonthDay: {
          $substr: ["$birthday", 5, 5],
        },
      },
    },
    {
      $match: {
        $expr: {
          $eq: ["$birthdayMonthDay", str],
        },
        department: department,
        college: college,
      },
    },
  ]);
=======
const BirthdayWishes = async (req, res) => {
  const today = moment().format("MM-DD");
>>>>>>> Stashed changes

  await Student.aggregate([
    {
      $addFields: {
        birthdayMonthDay: {
          $substr: ["$birthday", 5, 5],
        },
      },
    },
    {
      $match: {
        $expr: {
          $eq: ["$birthdayMonthDay", today],
        },
<<<<<<< Updated upstream
        department: department,
        college: college,
=======
>>>>>>> Stashed changes
      },
    },
  ])
    .then((students) => {
<<<<<<< Updated upstream
      res.status(200).send({
        status: "success",
        data: { today: students, tommorow: tommorowBirthDay },
      });
    })
    .catch((err) => {
      res.status(500).send({ status: "failed" });
    });
};

const SendWish = async (req, res) => {
  const { users } = req.body;
  console.log(users);

  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587,
    auth: {
      user: "cvmuh82@outlook.com",
      pass: "Cvmtestdemo",
    },
  });
  let emails = [];
  users.map((user) => {
    emails.push(user.email);
  });
  const mailOptions = {
    from: '"CVM University" <cvmuh82@outlook.com>', // sender address
    to: emails, // list of receivers
    subject: "Birthday Wish", // Subject line
    text: `Happy Birthday!`, // plain text body
    html: `CVM University is wishing you a very happy birthday!`, // html body
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }

    // res.status(StatusCodes.OK).json({ otpsent: true });
    res.send({ status: "success", msg: "wish sent successfully" });
  });
};

=======
      console.log(students);
      res.status(200).send({status: "success", data: students});
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({status: "failed"});
    });
};

>>>>>>> Stashed changes
module.exports = {
  FacultyRegister,
  FacultyLogin,
  FacultyForgotPassword,
  FacultyValidateOTP,
  FacultyUpdatePassword,
  AddSubjects,
  SubjectsAssign,
  GiveMarks,
  Searching,
  PlacementRegister,
  PostShowPlacedStudents,
  PatchPlacedStudents,
  getAllPlacements,
  postAllPlacements,
  getPlacedStudentInfo,
  getPlacedStudentInfoCollege,
  SearchPlacedStudents,
  midMarksEntry,
  internalPracMarksEntry,
  vivaMarksEntry,
  EnrolledStudents,
  FacultyStats,
  FacultyAllStudents,
  FacultyAllFaculties,
  postSelectStudent,
  SearchingFaculty,
  SearchingStudent,
  SearchStudentPlacement,
  GetCourses,
  GetAllCoursera,
  GetFaculty,
  addNewEvent,
  deleteEvent,
  fetchEvent,
  searchSkill,
<<<<<<< Updated upstream
  BirthdayWish,
  SendWish,
=======
  BirthdayWishes,
>>>>>>> Stashed changes
};
