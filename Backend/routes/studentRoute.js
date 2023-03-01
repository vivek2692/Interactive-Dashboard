const express = require('express');
const multer  = require('multer');

const { StudentRegister, StudentLogin, StudentForgotPassword, StudentValidateOTP, StudentUpdatePassword } = require('../controllers/StudentController.js');

var storage = multer.diskStorage(
    {
        destination: './uploads/',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, Date.now()+"_"+file.originalname );
        }
    }
);
const upload = multer({storage: storage})



const router = express.Router();

router.post('/register', upload.single('image'),StudentRegister);
router.post('/login', StudentLogin);
router.post('/forgot-password', StudentForgotPassword);
router.post('/validateOTP', StudentValidateOTP);
router.patch('/update-password', StudentUpdatePassword);

module.exports = router;
