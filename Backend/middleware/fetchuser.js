const jwt = require("jsonwebtoken");
const JWT_SECRET = "HarryisgoodB$oy"

const fetchuser = (req,res,next) => {
     //get the user from the jwt token and add id to req object
     const token = req.header('auth-token');

     if(!token){
        res.status(401).send({error : "Please authenticate using a valid token"});
     }
     try{
         const data = jwt.verify(token,JWT_SECRET);
         req.user = data.user;
   
         next(); //in this next() the async function on route 3 will be called
     }
     catch(error){
         res.status(401).send({error : "Please authenticate using a valid token"});
     }
}
//here next will call the next function

module.exports = fetchuser;