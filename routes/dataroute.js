const express = require("express");
const { getAllData, newData, updateData, deleteData } = require("../controller/dataController");
const checkAuth = require("../controller/checkToken");
const list = express.Router();

list.get("/show", getAllData);
list.post("/newdata", newData);
list.put("/update",checkAuth, updateData);
list.delete("/delete",checkAuth, deleteData);

module.exports = list;

 