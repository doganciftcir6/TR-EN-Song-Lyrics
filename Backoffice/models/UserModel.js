const mongoose = require("mongoose");
const { isEmail, isMobilePhone, isStrongPassword } = require("validator");

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    require: [true, "You must enter an firstname!"],
    minlength: [3, "You must enter at least 3 characters for the name field!"],
  },
  lastname: {
    type: String,
    require: [true, "You must enter an lastname!"],
    minlength: [
      3,
      "You must enter at least 3 characters for the last name field!",
    ],
  },
  phone_number: {
    type: String,
    require: [true, "You must enter an phonenumber!"],
    validate: {
      validator: function (value) {
        return isMobilePhone(value, "any"); // Herhangi bir telefon numarası türünü doğrula
      },
      message: (props) => `${props.value} Not a valid phone number!`,
    },
  },
  username: {
    type: String,
    require: [true, "You must enter an usename!"],
    unique: true,
    minlength: [5, "The username field must have a minimum of 5 characters!"],
    maxlength: [15, "The username field must have a maximum of 15 characters!"],
  },
  email: {
    type: String,
    require: [true, "You must enter an email!"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email address!"],
  },
  password: {
    type: String,
    required: [true, "You must enter a password!"],
    validate: {
      validator: function (value) {
        return isStrongPassword(value, {
          minUppercase: 1,
          minLowercase: 1,
          minNumbers: 1,
          minSymbols: 1,
          minlength: 8,
        }); // En az 1 büyük harf, 1 küçük harf, 1 rakam ve 1 sembol içeren güçlü bir şifre
      },
      message:
        "The password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol!",
    },
  },
  status: {
    type: Boolean
  },
  //gender ilişkisi
  gender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gender",
    required: [true, "You must select a gender"]
  },
});

const User = mongoose.model("Users", userSchema);
module.exports = User;