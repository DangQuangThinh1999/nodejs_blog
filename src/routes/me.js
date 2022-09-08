const express = require("express");

const router = express.Router();
const meController = require("../app/controllers/MeController");
const { ensureAuthenticated } = require("../config/auth");

router.get("/stored/courses", ensureAuthenticated, meController.storedCourse);
router.get("/trash/courses", ensureAuthenticated,meController.trashCourse);
module.exports = router;
