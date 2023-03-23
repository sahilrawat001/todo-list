const express = require("express");
const list = express.Router();
const IMAGEDATABASEURL = process.env.IMAGEDATABASEURL;


const { getAllData, newData, updateData, deleteData, getData } = require("../controller/dataController");
const { checkAuthUser } = require("../middleware/userAuth");
const { validateData } = require("../middleware/userValidator");
const { updateDataValidator, newDataValidator } = require("../Validation/dataValidator");
const uploads = require("../model/multer");


    
list.use(`/uploads`, express.static(IMAGEDATABASEURL));

list.get("/showall", checkAuthUser, getAllData);

list.get("/showone", checkAuthUser, getData);

list.post("/newdata", validateData(newDataValidator), uploads, newData);

list.put("/update", checkAuthUser, uploads, validateData(updateDataValidator), updateData);

list.delete("/delete", checkAuthUser, deleteData);


module.exports = list;  

    