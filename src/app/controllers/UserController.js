const express = require("express");

const bcrypt = require("bcryptjs");
const passport = require("passport");
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

  // Login
  handleLogin(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/user/login",
      failureFlash: true,
    });
  }

  // Logout
  logout(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
    })
    res.redirect("/user/login");
    next();
  }
}

module.exports = new UserController();
