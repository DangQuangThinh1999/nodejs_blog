const express = require("express");
const { forwardAuthenticated } = require("../config/auth");
const router = express.Router();
const userController = require("../app/controllers/UserController");
router.get("/login", forwardAuthenticated, userController.login);
router.get("/logout", userController.logout);
router.get("/register",forwardAuthenticated, userController.register);
router.post("/handleRegister", userController.handleRegister);
router.post("/login", userController.handleLogin);

module.exports = router;
