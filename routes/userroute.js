const express = require("express");
const router = express.Router();


const { getAllData, signup, signin, updateUser, deleteUser } = require("../controller/userController");
const { signupValidate, signinValidate, updateValidate } = require("../middleware/userValidator");


router.get("/show", getAllData);
router.post("/signup", signupValidate ,signup);
router.post("/signin", signinValidate, signin); 
router.put("/update", updateValidate, updateUser);
router.delete("/delete", deleteUser);


module.exports = router;

        