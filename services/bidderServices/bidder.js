const {User} = require('../../model/user');

const applyBid = async (user, bidId, budget, deadline) => {
    try {
        const status = 'pending';
        const bidder = user.userId;

        console.log(user);
        
        const currentUser = await User.findByPk(user.userId);

        const bids = currentUser.bids;

        bids.push({
            bidId, 
            budget, 
            deadline,
            status,
            bidder
        })

        const updateUser = await User.update({bids},{
            where:{
                userId:user.userId
            }
        })

        return updateUser
    } catch (error) {
        throw error
    }
}


const viewAvailableBids = async () => {
    try {
        const availableBids = [];
        const owners = await User.findAll({
            where:{
                role:'owner'
            }
        });

        owners.forEach((owner)=>{
            owner.bids.forEach((bid)=>{
                if(bid.status == 'open'){
                    availableBids.push(bid);
                }
            })
        });

        if(availableBids.length == 0) throw new Error('No Bids found!');

        return availableBids
    } catch (error) {
        throw error
    }
}


const myOpenBids = async (user) => {
    const openBids = [];

    const currentUser = await User.findByPk(user.userId);

    currentUser.bids.forEach((bid)=>{
        if(bid.status == "pending"){
            openBids.push(bid);
        }
    });

    if(openBids.length == 0) throw new Error('No Data found!!');

    return openBids
}


const myClosedBids = async (user) => {
    try {
        const closedBids = [];

        const currentUser = await User.findByPk(user.userId);

        currentUser.bids.forEach((bid)=>{
            if(bid.status !== "pending"){
                closedBids.push(bid);
            }
        });

        if(closedBids.length == 0) throw new Error('No Data Found!');

        return closedBids
    } catch (error) {
        throw error
    }
}

module.exports = {
    applyBid,
    viewAvailableBids,
    myOpenBids,
    myClosedBids
}