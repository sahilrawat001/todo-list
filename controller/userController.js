const User = require("../model/usermodel");
const Otp=require("../model/forgotModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = process.env.SALT;
const secret = process.env.SECRET;

const getAllData = async (req, res) => {
	let users;
	try {
		users = await User.find();

	}
	catch (err) {
		console.log(err);
	}
	if (users.length < 1) {
		return res.status(404).send({ message: " user not find" });
	}
	return res.status(200).send({ users });
};


const signup = async (req, res) => {
	const { username, password, email ,mobile} = req.body;
	let existUser;
	try {
		existUser = await User.findOne({ email });

	}
	catch (err) {
		console.log(err);
	}
	if (existUser) {
		return res.status(400).send({ message: "already exist" });
	}
	const hashPassword = bcrypt.hashSync(password, parseInt(saltRounds));

	const user = new User({
		username,
		email,
		password: hashPassword,
		mobile
	});
	let token;
    
	try {

		user.save();
		token = jwt.sign({ email: email }, secret, { expiresIn: "3h" });


	}
	catch (err) {
		console.log(err);
	}
	return res.status(200).send({ token, username: username });
};

const signin = async (req, res) => {
	const { password, email } = req.body;
	let existUser;
	try {
		existUser = await User.findOne({ email });

	}
	catch (err) {
		console.log(err);
	}
	if (!existUser) {
		return res.status(400).send({ message: "don't exist" });
	}
	const checkPassword = bcrypt.compareSync(password, existUser.password);
	if (!checkPassword) {
		return res.status(400).send({ message: "wrong password" });
	}
	let token;
	token = jwt.sign({ email: email }, secret, { expiresIn: "3h" });
	return res.status(200).send({ token, username: existUser.username });

};


const updateUser = async (req, res) => {
	let { username, password } = req.body;
	let updateUser;
	let token = req.headers.token;

	let result = jwt.verify(token, secret);
	const hashPassword = bcrypt.hashSync(password, parseInt(saltRounds));
	try {
		updateUser = await User.findOneAndUpdate({ email: result.email }, {
			$set: {
				username, password: hashPassword
			}
		});
		if (!updateUser) {
			return res.status(404).send({ message: "user not found" });
		}
	}
	catch (err) {
		console.log(err);
	}
	res.status(200).json("updated data successfully");
	
};

const deleteUser = async (req, res) => {
	let token = req.headers.token;

	let result = jwt.verify(token, secret);
	let deleteuser;
	try {
		deleteuser = await User.findOneAndDelete({ email: result.email });
		if (!deleteuser) {
			return res.status(404).send({ message: "user not found" });
		}
	}
	catch (err) {
		console.log(err);
	}
	res.status(200).json("deleted");

};

const forgotOtp = async (req, res) => {
	let { email } = req.body;
	let findEmail;
	findEmail = await User.findOne({ email: email });
	if (!findEmail) {
		return res.status(404).send({ message: "email not found" });
	}
	let token;
	token = jwt.sign({ email: email ,type:"otp"}, secret, { expiresIn: "1h" });

	const otp = Math.floor((Math.random() * 1000000) + 1);
	const otpData = new Otp({
		email,
		otp
	});
	otpData.save();
	console.log(otp);
	res.send({ otp,token });
};
const checkOtp = async (req, res) => {
	let { otp ,password} = req.body;
	let token = req.headers.token;
	let result = jwt.verify(token, secret);
	const hashPassword = bcrypt.hashSync(password, parseInt(saltRounds));
	let otpdata = await Otp.findOne({ email: result.email });
	if (!otpdata) {
		return res.status(404).send({ message: "otp not found" });
	}
	console.log(otpdata);
	if (result.type === "otp") {
		if (otpdata.otp=== otp) {
			await User.findOneAndUpdate({ email: result.email }, {
				$set: {
					password: hashPassword
				}
			}); 
			await Otp.findOneAndDelete({ email: result.email });
			return res.status(200).send({ message: "password updated successfully" });	
		}
		else {
			return res.status(400).send({ message: "otp not verified" });
		}
	}
	else { 
		return res.status(400).send({ message: "otp not verified" });
	}
};

module.exports = { getAllData, forgotOtp, signup, checkOtp, signin ,updateUser,deleteUser};