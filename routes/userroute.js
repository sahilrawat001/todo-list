const express = require("express");
const router = express.Router();


const { getAllData, signup, signin, updateUser, deleteUser, forgotOtp, checkOtp } = require("../controller/userController");
const {   validateData } = require("../middleware/userValidator");
const { signupValidator, signinValidator, updateUserValidator } = require("../Validation/userValidator");



router.get("/show", getAllData);

router.post("/signup", validateData(signupValidator), signup);

router.post("/signin", validateData(signinValidator), signin); 

router.put("/update", validateData(updateUserValidator), updateUser);

router.delete("/delete", deleteUser);

router.post("/forgotpassword", forgotOtp); 
 
router.post("/checkotp",checkOtp  ); 
 

 
module.exports = router;

        