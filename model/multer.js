const multer = require("multer");
const uploads = multer({

    storage: multer.diskStorage({
        destination: function (req, file, func) {
            func(null, "uploads");
        },
        filename: function (req, file, fun) {
            let filetyp = /jpeg|jpg|png|gif/;
            if (!file.originalname.match(filetyp)) {
                return fun(new Error("only image files are allowed"));
            }
            //console.log(file.originalname,"****");
            fun(null, file.fieldname + "-" + Date.now() + "." + file.originalname.split(".")[1]);
        }
 
    })

}).single("attachment"); 

module.exports = uploads; 