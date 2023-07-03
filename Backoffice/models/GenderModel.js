const mongoose = require("mongoose");

const genderSchema = mongoose.Schema({
  definition: {
    type: String,
    required: [true, "You must enter a gender definition!"],
    minlength: [5, "The definition field must have a minimum of 5 characters!"],
    maxlength: [30, "The definition field must have a maximum of 30 characters!"],
    enum: ["Male", "Female", "Other"], // İstenilen cinsiyet değerlerini enum olarak ekle
  },
});

const Gender = mongoose.model("Genders", genderSchema);
module.exports = Gender;
