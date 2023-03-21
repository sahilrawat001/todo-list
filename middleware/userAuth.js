const jwt = require("jsonwebtoken");
const Data = require("../model/dataModel");
const secret = process.env.SECRET;


const checkAuthUser = async (req, res, next) => {
    
    let token = req.headers.token;
     let result = jwt.verify(token, secret);
    if (!result) {
        return res.status(400).send({ message: "token not found" });
    }
    else {
        let findeEmail; 
        try {
            findeEmail = await Data.findOne({ email: result.email });
        }
        catch (err) {
            console.log(err);
        } 
     
        if ( findeEmail && findeEmail.email) {
            next();
        }
        else {
            res.status(404).send("authentication error");
        }

    }

};
module.exports = { checkAuthUser };