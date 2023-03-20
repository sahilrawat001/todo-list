const express = require("express");
const { getAllData, signup, signin } = require("../controller/userController");
const router = express.Router();

router.get("/show", getAllData);
router.post("/signup", signup);
router.post("/signin", signin); 

module.exports = router;

   