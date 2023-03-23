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
	// if (datas.length < 1) {
	// 	return res.status(404).send({ message: " user not find" });
	// }
	return res.status(200).send({ datas });
}; 

const newData = async (req, res) => {
	try { 
	let token = req.headers.token;
	let result = jwt.verify(token, secret);	 
 
	let findeEmail;
	findeEmail = await User.findOne({ email: result.email });
	if ( !result|| !(findeEmail) ) {
		return res.status(404).send({ error: "authentication error  1" } );
	}

	let { title, detail, attachment, taskstatus, startdate, enddate } = req.body;
	let path;
	console.log(req.file,"----");
	if ( req.file) {
		path= req.file.path;  
			
	}
	else {
		path = "uploads/default.png";
	}
	console.log(path);
	const data = new Data({
		title,
		detail,  
		taskstatus,
		enddate:Date(enddate),  
		attachment:path, 
		startdate:Date(startdate),  
		email:result.email   
	});
  
 
		data.save(); 
		console.log("oook");
		return res.status(200).send({ message: "success  " });
	} 
	catch (err) {
		console.log("err");
		return res.status(404).send({ error:err.message });
	}

};  

const updateData = async (req, res) => { 
	let token = req.headers.token;
	let result = jwt.verify(token, secret);
	let { title, detail, attachment,taskstatus, startdate,enddate } = req.body; 
	let path; 
	
	let id = req.headers._id; 
	let check; 
	try {
		check = await Data.findOne({ _id: id });
		console.log(check,"===");
		if ( !check || !check.email || check.email != result.email) {
			res.status(404).send("authentication error  present ");
		}
		else {		
			if (req.file) {
				console.log(req.file.path,"==**");

				path = req.file.path;
			}
			else {
				path=check.attachment;
			}
			try {
				//console.log(typeof( taskstatus),"--");
				await Data.findOneAndUpdate({ _id: id }, {
					$set: {
						title, detail,taskstatus,
						attachment:path, startdate: Date(startdate), enddate:Date(enddate)
					}
				});
		}
			catch (err) {
			return	res.status(404).send({ message: err.message});
			}

			res.status(200).send({message: "task updated "});
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

	let   id  = req.headers._id; 

	let check;
	try {
		console.log(id);
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
			res.status(200).send({ message: "task deleted" });
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
	try {
	
 
			let showData;
			try {
				showData = await Data.findOne({ _id: id });
				
				console.log(showData);
			}
			catch (err) {
				return res.status(404).send({ message: err });
			}
			if (!showData) {
				return res.status(404).send({ message: " user not find" });
			}
			else {
				if (showData.email != result.email) {
					return res.status(404).send("authentication error  present");
				}
				res.status(200).send({ showData });

				}
	} 
 
	catch (err) {
		res.status(404).send({ "error": err });
		console.log(err);
	}

};


module.exports = { getAllData,getData, newData ,updateData,deleteData};