const express = require("express");
const { ensureAuthenticated } = require("../config/auth");
const verifyToken = require("../config/verifyToken");
const router = express.Router();
const courseController = require("../app/controllers/CourseController");
router.get(
  "/create",
  ensureAuthenticated,
  verifyToken,
  courseController.create
);
router.post("/store", courseController.store);
router.get("/:slug", courseController.show);
router.get("/:id/edit", courseController.edit);
router.post("/handle-form-actions", courseController.handleFormActions);
router.put("/:id", courseController.update);
router.patch("/:id/restore", courseController.restore);
router.delete("/:id", courseController.destroy);
router.delete("/:id/force", courseController.forceDestroy);
module.exports = router;
