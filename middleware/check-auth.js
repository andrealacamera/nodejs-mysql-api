const jwt = require("jsonwebtoken");
const dotenv=require('dotenv');

dotenv.config();

function checkAuth(req,res,next) {
    try {
        // extract token from "Bearer fdsafdsfa.dfdsadfasdfas.dfsdafsd"
        const token = req.headers.authorization.split(" ")[1]; 
        const secret = process.env.JWT_SECRET;
        const decodedToken = jwt.verify(token, secret);
        req.userData = decodedToken; //store decodedToken for other use
        next(); //call other middleware
    }
    catch(err) {
        return res.status(401).json({
            message: "Invalid or expired token",
            error: err
        });
    }
}


module.exports = { checkAuth }