const jwt = require("jsonwebtoken");
const JWT_SECRET = "This Is a Super Special Secret Key";
// For MiddleWare doubt ho wapas to watch Harry Bhai Ka 51th video
const fetchUser = (req,res,next)=>{
    // Get the user id from JwtToken and append it to req and object and then call next middlware function
    // First will Grab Authentication token from his Header His request will contain his Auth Token
    const token = req.header('auth-token');
    // If he dosent have that token then we will not go further
    if(!token){
        res.status(401).send({error: "Access Denied"});
    }
    // will use jwt verify function to check whether this token is valid or not 
    try {
        const data = jwt.verify(token,JWT_SECRET);
    
    req.user = data.user;
    next()
    } catch (error) {
        // If its not then we will throw error
        console.error(error.message);
        res.status(401).send({error: "Access Denied"});
    }
    
}

module.exports = fetchUser;