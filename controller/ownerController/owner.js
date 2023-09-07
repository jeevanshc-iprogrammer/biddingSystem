const ownerServices = require('../../services/ownerServices/owner');

const createBid = async (req,res,next) => {
    try {
        const {bidName, description, budget, deadline} = req.body;

        const user = req.user;

        if(!bidName || !description || !budget || !deadline) throw new Error('All fields are mandatory!');

        const response = await ownerServices.createBid(bidName, description, budget, deadline, user);
        

        res.status(200).json({
            status:"SUCCESS",
            response
        })
    } catch (error) {
        res.status(400).json({
            status:"FAILED",
            message: error.message
        })
    }
}



const viewMyBids = async (req,res,next) => {
    try {
        const user = req.user;

        const response = await ownerServices.viewMyBids(user);

        if(!response) throw new error('Data not found')

        res.status(200).json({
            status:"SUCCESS",
            response
        })
    } catch (error) {
        res.status(400).json({
            status:"FAILED",
            message: error.message
        })
    }
}


const viewAllBids = async (req,res,next) => {
    try {
        const user = req.user;
        const bidId = req.params.bidId;

        const response = await ownerServices.viewAllBids(user, bidId);

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


const approveAndCloseBid = async (req,res,next) => {
    try {
        const user = req.user;
        const bidId = req.params.bidId;
        const bidderId = req.body.bidder;

        const response = await ownerServices.approveAndCloseBid(user, bidId, bidderId);

        console.log(response);

        if(!response) throw new Error('No Data Found!');

        res.status(200).json({
            status:"SUCCESS",
            message:"Bid Approved successfully!",
            response
        })
    } catch (error) {
        throw error
    }
}


module.exports = {
    createBid,
    viewMyBids,
    viewAllBids,
    approveAndCloseBid
};