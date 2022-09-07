const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");
const User = new Schema(
  {
    _id: { type: Number },
    password: { type: String, maxLength: 100, required: true },

    name: { type: String, required: true, maxLength: 40 },
    email: { type: String, required: true },

    slug: { type: String, slug: "email", unique: true }, // nếu như name bị trùng thì tự động shortId tạo ra id khác
  },
  {
    _id: false,
    timestamps: true,
  }
);

mongoose.plugin(slug);
User.plugin(AutoIncrement, { id: "sensor_id_counter" });
User.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

module.exports = mongoose.model("User", User);
