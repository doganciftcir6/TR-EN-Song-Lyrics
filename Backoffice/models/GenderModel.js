const mongoose = require("mongoose");

const genderSchema = mongoose.Schema({
  definition: {
    type: String,
    required: [true, "You must enter a gender definition!"],
    enum: ["Male", "Female", "Other"], // İstenilen cinsiyet değerleri buraya eklenir
  },
});

const Gender = mongoose.model("Genders", genderSchema);
module.exports = Gender;
