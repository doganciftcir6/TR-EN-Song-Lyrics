const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  category_name: {
    type: String,
    require: [true, "You must enter an category name!"],
    minlength: [
      5,
      "The category name field must have a minimum of 5 characters!",
    ],
    maxlength: [
      100,
      "The category name field must have a maximum of 100 characters!",
    ],
  },
  status: {
    type: Boolean
  }
});

const Category = mongoose.model("Categories", categorySchema);
module.exports = Category;
