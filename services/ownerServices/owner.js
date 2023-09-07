const {User} = require('../../model/user');

const createBid = async (bidName, description, budget, deadline, user) => {
    try {
        const status = 'open';
        const createdBy = user.userId;
        const createAt = new Date();
        let bidId = 1;

        const owners = await User.findAll({
            where:{
                role:'owner'
            }
        });

        owners.forEach((owner)=>{
            bidId += owner.bids.length;
        });

        const currentUser = await User.findByPk(user.userId);

        const bids = currentUser.bids;

        bids.push({
                bidId,
                bidName,
                description,
                budget,
                deadline,
                status,
                createdBy,
                createAt
        })

        // console.log(currentUser);

        const data = await User.update({bids},{
            where:{
                userId:currentUser.userId
            }
        },{
            new:true
        });

        return data

    } catch (error) {
        throw error
    }
}


const viewMyBids = async (user) => {
    try {
        const currentUser = await User.findByPk(user.userId);

        return currentUser.bids
    } catch (error) {
        throw error
    }
}


const viewAllBids = async(user, bidId) => {
    try {
        const appliedBids = [];
        const bidders = await User.findAll({
            where: {
                role: 'bidder'
            }
        });

        bidders.forEach((bidder)=>{
            bidder.bids.forEach((bid)=>{
                if(bid.bidId == bidId){
                    appliedBids.push(bid);
                }
            })
        });

        if(appliedBids.length == 0) throw new Error('No Bids found!');

        return appliedBids
    } catch (error) {
        throw error
    }
}


const approveAndCloseBid = async (user, bidId, bidderId) => {
    try {
        const owner = await User.findByPk(user.userId);
        const bidders = await User.findAll({
            where:{
                role:'bidder'
            }
        });

        const ownerBids = owner.bids;
        console.log(ownerBids);
        

        ownerBids.forEach((bid)=>{
            if(bid.bidId == bidId){
                bid.status = "closed"
            }
        });

        const updateOwner = await User.update({bids:ownerBids},{
            where:{
                userId:user.userId
            }
        },{
            new:true
        });
        console.log(updateOwner);

        bidders.forEach(async (bidder)=>{
            let bidderBids = bidder.bids;
            bidderBids.forEach((bid)=>{
                if(bid.bidId == bidId){
                    if(bid.bidder == bidderId){
                        console.log('approvel', bidderId);
                        bid.status = "Approved"
                    }else{
                        console.log('rejected', bidderId, bid.bidder);
                        bid.status = "Rejected"
                    }
                }
            });

            console.log(bidderBids);

            let updateBidder = await User.update({bids:bidderBids},{
                where:{
                    userId:bidder.userId
                }
            },{
                new:true
            });

            console.log(updateBidder);
        })

        return updateOwner

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