const express = require("express");

const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const siteController = require("../app/controllers/SiteController");
router.get("/home",forwardAuthenticated, siteController.welcome);
router.get("/",  ensureAuthenticated,siteController.index);

module.exports = router;
