const Course = require("../models/Course");
const {
  multipleMongooseToObject,
  MongooseToObject,
} = require("../../util/mongoose");
class SiteController {
  index(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.render("home", {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch((err) => next(err));
  }
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
