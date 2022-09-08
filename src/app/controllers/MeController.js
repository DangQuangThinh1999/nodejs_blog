const Course = require("../models/Course");
const {
  multipleMongooseToObject,
  MongooseToObject,
} = require("../../util/mongoose");

class MeController {
  storedCourse(req, res, next) {
    let courseQuery = Course.find({});

    if (req.query.hasOwnProperty("_sort")) {
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type,
      });
    }

    Promise.all([courseQuery, Course.countDocumentsDeleted()]).then(
      ([courses, deletedCount]) =>
        res.render("me/stored-courses", {
          name: req.user.name,
          deletedCount,
          courses: multipleMongooseToObject(courses),
        })
    );
  }
  trashCourse(req, res, next) {
    Course.findDeleted({})
      .then((courses) => {
        res.render("me/trash-courses", {
          name: req.user.name,
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }
}

module.exports = new MeController();
