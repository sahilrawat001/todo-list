const express = require("express");
const list = express.Router();


const { getAllData, newData, updateData, deleteData, getData } = require("../controller/dataController");
 const { checkAuthUser } = require("../middleware/userAuth");
const { newDataValidate } = require("../middleware/dataValidation");
 

const multer = require("multer");
const uploads = multer({

    storage: multer.diskStorage({
        destination: function (req, file, func) {
            func(null, "uploads");
        },
        filename: function (req, file, fun) {
            fun(null, file.fieldname + "-" + Date.now() + ".jpg");
        }

    })
}).single("attachment"); 

    

list.get("/showall", checkAuthUser, getAllData);
list.get("/showone", checkAuthUser, getData);

list.post("/newdata", newDataValidate, uploads, newData);
list.put("/update",  checkAuthUser, updateData);
list.delete("/delete", checkAuthUser, deleteData);


module.exports = list;  

    