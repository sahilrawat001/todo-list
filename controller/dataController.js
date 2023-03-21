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
	let result = jwt.verify(token, secret);	 
	let { title, detail, attachment, startdate, enddate } = req.body;
    
	const data = new Data({
		title,
		detail,
		enddate,
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
	let token = req.headers.token;
	let result = jwt.verify(token, secret);
	let { title, detail, attachment, startdate,enddate, id } = req.body; 

	let check;
	try {
		check = await Data.findOne({ _id: id });
		console.log(check,"===");
		if ( !check || !check.email || check.email != result.email) {
			res.status(404).send("authentication error  present here");
		}
		else {		
			try {
				await Data.findOneAndUpdate({ _id: id }, {
					$set: {
						title, detail, attachment, startdate, enddate
					}
				});
		}
			catch (err) {
				console.log(err);
			}

			res.status(200).send("ok");
		}
	}
	catch (err) {
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
module.exports = { getAllData,newData ,updateData,deleteData};