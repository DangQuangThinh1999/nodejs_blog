const Course = require("../models/Course");
const User = require("../models/User");
const {
  multipleMongooseToObject,
  MongooseToObject,
} = require("../../util/mongoose");
class SiteController {
  index(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.render("home", {
          name:req.user.name,
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch((err) => next(err));
  }
  welcome(req, res) {
    res.render("welcome");
  }
}

module.exports = new SiteController();
