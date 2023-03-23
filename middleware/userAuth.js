const jwt = require("jsonwebtoken");
const User = require("../model/usermodel");
const secret = process.env.SECRET;


const checkAuthUser = async (req, res, next) => {
    try {
        
        let token = req.headers.token;
        let result = jwt.verify(token, secret);
         if (!result) {
            return res.status(401).send({ message: "token not found" });
        }
        else {
            let findeEmail;
            try {
                findeEmail = await User.findOne({ email: result.email });
             }
            catch (err) {
                res.status(401).send("authentication error 3");
             }
             if (findeEmail ) {
                // req.email = result.email;
                next();
            }
            else {
                 res.status(401).send({error:"authentication error"} );
            }

        }
    }
    catch (err) {
        res.status(401).send({error:err});
    }
 
};
module.exports = { checkAuthUser }; 