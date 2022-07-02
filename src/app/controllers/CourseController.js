const Course = require("../models/Course");
const {
  multipleMongooseToObject,
  MongooseToObject,
} = require("../../util/mongoose");

class CourseController {
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render("courses/show", {
          course: MongooseToObject(course),
        });
      })
      .catch(next);
  }
  create(req, res) {
    res.render("courses/create");
  }
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(res.redirect("/me/stored/courses"))

      .catch(next);
  }
  edit(req, res, next) {
    Course.findById({ _id: req.params.id })
      .then((course) => {
        res.render("courses/edit", {
          course: MongooseToObject(course),
        });
      })
      .catch(next);
  }
  store(req, res, next) {
    req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/hqdefault.jpg`;
    const course = new Course(req.body);
    course.save().then(res.redirect("/me/stored/courses")).catch(next);
  }
  destroy(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(res.redirect("back"))
      .catch(next);
  }
  forceDestroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(res.redirect("back"))
      .catch(next);
  }
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(res.redirect("back"))
      .catch(next);
  }
  handleFormActions(req, res, next) {
    switch (req.body.action) {
      case "delete":
        Course.delete({ _id: { $in: req.body.courseIDs } })
          .then(res.redirect("back"))
          .catch(next);

      default:
        res.json({ message: "Action not allowed" });
    }
  }
}

module.exports = new CourseController();
