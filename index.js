/* eslint-disable no-undef */
const express = require("express");
const { default: mongoose } = require("mongoose");
const router = require("./routes/userroute");
const list = require("./routes/dataroute");
require("dotenv").config();
port = process.env.PORT || 6000;

url = process.env.URL;
 
const app = express();
app.use(express.json());

app.use("/user", router);
app.use("/data",list );
  
mongoose.connect(url).then(
	app.listen(port) 

).then(() => {
	console.log(`running at port ${port}`);
}).catch((err) => {
	console.log(err);
}); 
 