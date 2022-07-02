const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");
const Course = new Schema(
  {
    _id: { type: Number },
    name: { type: String, required: true },
    description: { type: String, maxLength: 600 },

    slug: { type: String, slug: "name", unique: true }, // nếu như name bị trùng thì tự động shortId tạo ra id khác
    level: { type: String, maxLength: 256 },
    image: { type: String },
    videoId: { type: String },
  },
  {
    _id: false,
    timestamps: true,
  }
);

mongoose.plugin(slug);
Course.plugin(AutoIncrement);
Course.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

module.exports = mongoose.model("Course", Course);
