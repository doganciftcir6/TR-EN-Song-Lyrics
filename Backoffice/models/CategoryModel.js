const mongoose = require("mongoose");

//timestamps: true ile kayıdın oluşturulma tarihini tut.
const categorySchema = mongoose.Schema(
  {
    category_name: {
      type: String,
      required: [true, "You must enter an category name!"],
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
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Categories", categorySchema);
module.exports = Category;
