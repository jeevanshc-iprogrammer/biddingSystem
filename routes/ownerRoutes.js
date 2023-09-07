const express = require('express');
const router = express.Router();
const authController = require('../controller/authController/auth');
const ownerController = require('../controller/ownerController/owner');
const ownerMiddleware = require('../middleware/checkOwner');

router.route('/createBid').post(authController.isAuthenticated,ownerMiddleware.checkOwner,ownerController.createBid);
router.route('/viewMyBids').get(authController.isAuthenticated,ownerMiddleware.checkOwner,ownerController.viewMyBids);
router.route('/viewAllBids/:bidId').get(authController.isAuthenticated,ownerMiddleware.checkOwner,ownerController.viewAllBids);
router.route('/approveBidAndClose/:bidId').put(authController.isAuthenticated,ownerMiddleware.checkOwner,ownerController.approveAndCloseBid);

module.exports = router;