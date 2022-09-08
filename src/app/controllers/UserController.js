const express = require("express");

const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
var cookieParser = require('cookie-parser');
// Load User model
const User = require("../models/User");

class UserController {
  login(req, res) {
    res.render("user/login");
  }
  register(req, res) {
    res.render("user/register");
  }
  handleRegister(req, res, next) {
    const { name, email, password } = req.body;
    User.findOne({ name: name }).then((user) => {
      if (user) {
        res.json("name is already exists");
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;

            newUser.save().then(res.redirect("/user/login")).catch(next());
          });
        });
      }
    });
  }

  // Login  METHOD POST
  handleLogin(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/user/login",
      failureFlash: true,
    })(req, res, next);

    const data = req.body.email;

    jwt.sign(
      { data },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "180s" },
      (err, token) => {
        res.cookie("tokenUser", `${token}`);
   
      }
    );
  }

  // Logout
  logout(req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      } else {
      }
    });
    res.redirect("/user/login");
    next();
  }
}

module.exports = new UserController();
