exports.checkBidder = async (req,res,next) => {
    try {
        const user = req.user;

        if(user.role == "owner") {
            return res.status(400).json({
                status:"FAILED",
                message:"Not Authorized"
            })
        }
            

        next();
    } catch (error) {
        res.status(400).json({
            status:"FAILED",
            message: error.message
        })
    }
}