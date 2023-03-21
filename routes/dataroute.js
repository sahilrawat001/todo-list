const express = require("express");
const list = express.Router();


const { getAllData, newData, updateData, deleteData } = require("../controller/dataController");
 const { checkAuthUser } = require("../middleware/userAuth");
const { newDataValidate } = require("../middleware/dataValidation");


list.get("/show", checkAuthUser, getAllData);
list.post("/newdata",newDataValidate, checkAuthUser, newData);
list.put("/update",  checkAuthUser, updateData);
list.delete("/delete",  checkAuthUser , deleteData);


module.exports = list;

 