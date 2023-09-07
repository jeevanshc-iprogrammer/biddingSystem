const authService = require('../../services/authServices/auth');



const signup = async (req,res,next) => {
    try {
        const {userId, name, email, password, role} = req.body;

        if(  !name || !email || !password || !role){
            return res.status(400).json({
                status:"FAILED",
                message: "All the fields are mandatory"
            })
        }

        const response = await authService.signup(userId, name, email, password, role);

        res.status(200).json({
            status:"SUCCESS",
            message:"User registered successfully!",
            response
        })
    } catch (error) {
        res.status(400).json({
            status:"FAILED",
            message: error.message
        })
    }
}



const login = async (req,res,next) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status.json({
                status:"FAILED",
                message: "Email and password are mandatory"
            })
        }

        const response = await authService.login(email, password);

        res.status(200).json({
            status:"SUCCESS",
            message:"User logged in successfully!",
            response
        })
    } catch (error) {
        res.status(400).json({
            status:"FAILED",
            message: error.message
        })
    }
}


const isAuthenticated = async (req,res,next) => {
    try {
        const response = await authService.isAuthenticated(req);

        req.user = response;

        next();
    } catch (error) {
        res.status(400).json({
            status:"FAILED",
            message: error.message
        })
    }
}

module.exports = {
    signup,
    login,
    isAuthenticated
}