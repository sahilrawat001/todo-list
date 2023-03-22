/* eslint-disable no-unused-vars */
const Data = require("../model/dataModel");
const User = require("../model/usermodel");

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
	let result = jwt.verify(token, secret);	 
 
	let findeEmail;
	findeEmail = await User.findOne({ email: result.email });
	if ( !result|| !(findeEmail) ) {
	return 	res.status(404).send("authentication error 1");
	}

	let { title, detail, attachment, taskstatus, startdate, enddate } = req.body;
    let path =req.file.path;
	const data = new Data({
		title,
		detail,  
		taskstatus,
		enddate:Date(enddate), 
		attachment:path, 
		startdate:Date(startdate),  
		email:result.email   
	});
	try {   
 
		data.save(); 
		console.log("oook");
		return res.status(200).send("oook");
	} 
	catch (err) {
		console.log("err");
		return res.status(404).send({ message: "err" });
	}

};  

const updateData = async (req, res) => { 
	let token = req.headers.token;
	let result = jwt.verify(token, secret);
	let { title, detail, attachment, startdate,enddate, id } = req.body; 

	let check; 
	try {
		check = await Data.findOne({ _id: id });
		console.log(check,"===");
		if ( !check || !check.email || check.email != result.email) {
			res.status(404).send("authentication error  present ");
		}
		else {		
			try {
				await Data.findOneAndUpdate({ _id: id }, {
					$set: {
						title, detail,
						attachment, startdate: Date(startdate), enddate:Date(enddate)
					}
				});
		}
			catch (err) {
			return	res.status(404).send({ message: err});
			}

			res.status(200).send("ok");
		}
	}
	catch (err) {
		res.status(404).send({"error":err});
		console.log(err);
	}
  
    
};
const deleteData = async (req, res) => {
	let token = req.headers.token;
	let result = jwt.verify(token, secret);

	let {  id } = req.body; 

	let check;
	try {
		check = await Data.findOne({ _id: id });
		console.log(check,"===");
		if ( !(check.email) || check.email != result.email) {
			res.status(404).send("authentication error  present here");
		}  
		else {

			try {
				await Data.findOneAndDelete({ _id: id });
			}
			catch (err) {
				console.log(err);
			}
			res.status(200).send("ok");
		}
	}
	catch (err) {
		res.status(404).send({error:err});
	}
};

const getData = async (req, res) => {
	let token = req.headers.token;
	let result = jwt.verify(token, secret);
	let { id } = req.body; 
	let check;
	try {
		check = await Data.findOne({ _id: id });
		console.log(check, "===");
		if (!check || !check.email || check.email != result.email) {
			res.status(404).send("authentication error  present ");
		}
		else {
			let showData;
			try {
				showData= await Data.findOne({ _id: id });
			}
			catch (err) {
				return res.status(404).send({ message: err });
			}
			if (!showData) {
				return res.status(404).send({ message: " user not find" });
			}
			res.status(200).send({showData});
		}
	}
	catch (err) {
		res.status(404).send({ "error": err });
		console.log(err);
	}

};


module.exports = { getAllData,getData, newData ,updateData,deleteData};