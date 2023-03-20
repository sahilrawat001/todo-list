/* eslint-disable no-unused-vars */
const Data = require("../model/dataModel");
const jwt=require("jsonwebtoken");
// eslint-disable-next-line no-undef
const secret = process.env.SECRET;

const getAllData = async (req, res) => {
	let token = req.headers.token;

	let result = jwt.verify(token, secret);

	let datas;
	try {
		datas = await Data.find({ email:result.email} );

	}
	catch (err) {
		console.log(err);
	}
	if (datas.length < 1) {
		return res.status(404).send({ message: " user not find" });
	}
	return res.status(200).send({ datas });
};

const newData = async (req, res) => {
	let token = req.headers.token;
	// console.log(token, "--");
	let result = jwt.verify(token, secret);
	console.log(result.email, "==");
	let { title, detail, attachment, startdate } = req.body;
    
	const data = new Data({
		title,
		detail,
		attachment,
		startdate,
		email:result.email
	});
	try {

		data.save();
	}
	catch (err) {
		console.log(err);
	}
	return res.status(200).send("ok");

};

const updateData = async (req, res) => {

	let { title, detail, attachment, startdate, id } = req.body; 
	let updateUser;

	try {
		updateUser = await Data.findOneAndUpdate({ _id: id }, {
			$set: {
				title,detail,attachment,startdate
			}} );
		console.log(updateUser);
	}
	catch (err) {
		console.log(err);
	}
	res.status(200).send("ok");
  
    
};
const deleteData = async (req, res) => {
	let {  id } = req.body; 

	let deleteData;
	try {
		deleteData = await Data.findOneAndDelete({ _id: id });
	}
	catch (err) {
		console.log(err);
	}
	res.status(200).send("ok");


    

};
module.exports = { getAllData,newData ,updateData,deleteData};