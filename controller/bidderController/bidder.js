const bidderService = require('../../services/bidderServices/bidder');

const applyBid = async (req,res,next) => {
    try {
        const {bidId, budget, deadline} = req.body;

        const user = req.user;

        if(!bidId || !budget || !deadline) throw new error('All fields are mandatory!');

        const response = await bidderService.applyBid(user, bidId, budget, deadline);

        console.log(response);

        res.status(200).json({
            status:"SUCCESS",
            message:"Bid applied successfully!",
            response
        })
    } catch (error) {
        res.status(400).json({
            status:"FAILED",
            message: error.message
        })
    }
}


const viewAvailableBids = async (req,res,next) => {
    try {
        const response = await bidderService.viewAvailableBids();

        res.status(200).json({
            status:"SUCCESS",
            message:"Data fetched successfully",
            response
        });
    } catch (error) {
        res.status(400).json({
            status:"FAILED",
            message: error.message
        })
    }
}


const myOpenBids = async (req,res,next) => {
    try {
        const user = req.user;
        
        const response = await bidderService.myOpenBids(user);

        res.status(200).json({
            status:"SUCCESS",
            message:"Data fetched successfully",
            response
        })

    } catch (error) {
        res.status(400).json({
            status:"FAILED",
            message: error.message
        })
    }
}


const myClosedBids = async (req,res,next) => {
    try {
        const user = req.user;
        
        const response = await bidderService.myClosedBids(user);

        res.status(200).json({
            status:"SUCCESS",
            message:"Data fetched successfully!",
            response
        })
    } catch (error) {
        res.status(400).json({
            status:"FAILED",
            message: error.message
        })
    }
}

module.exports = {
    applyBid,
    viewAvailableBids,
    myOpenBids,
    myClosedBids
}