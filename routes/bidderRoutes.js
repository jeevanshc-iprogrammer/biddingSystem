const express = require('express');
const router = express.Router();
const bidderController = require('../controller/bidderController/bidder');
const authController = require('../controller/authController/auth');
const bidderMiddleware = require('../middleware/checkBidder');

router.route('/applyBid').post(authController.isAuthenticated,bidderMiddleware.checkBidder,bidderController.applyBid);
router.route('/viewAvailableBids').get(authController.isAuthenticated,bidderMiddleware.checkBidder,bidderController.viewAvailableBids);
router.route('/viewMyOpenBids').get(authController.isAuthenticated,bidderMiddleware.checkBidder,bidderController.myOpenBids);
router.route('/viewMyClosedBids').get(authController.isAuthenticated,bidderMiddleware.checkBidder,bidderController.myClosedBids);

module.exports = router;