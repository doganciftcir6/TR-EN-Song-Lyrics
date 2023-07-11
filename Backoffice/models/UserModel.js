const mongoose = require("mongoose");
//ek validation ayarlamaları kullanmak için validator paketi.
const { isEmail, isMobilePhone, isStrongPassword } = require("validator");

//timestamps: true ile kayıdın oluşturulma tarihini tut.
const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "You must enter an firstname!"],
    minlength: [3, "You must enter at least 3 characters for the firstname field!"],
    maxlength: [15, "The firstname field must have a maximum of 15 characters!"],
  },
  lastname: {
    type: String,
    required: [true, "You must enter an lastname!"],
    minlength: [
      3,
      "You must enter at least 3 characters for the last name field!",
    ],
    maxlength: [15, "The lastname field must have a maximum of 15 characters!"],
  },
  phone_number: {
    type: String,
    required: [true, "You must enter an phonenumber!"],
    validate: {
      validator: function (value) {
        return isMobilePhone(value, "any"); // Herhangi bir telefon numarası türünü doğrula
      },
      message: (props) => `${props.value} Not a valid phone number!`,
    },
  },
  username: {
    type: String,
    required: [true, "You must enter an usename!"],
    unique: true,
    minlength: [5, "The username field must have a minimum of 5 characters!"],
    maxlength: [15, "The username field must have a maximum of 15 characters!"],
  },
  email: {
    type: String,
    required: [true, "You must enter an email!"],
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
  image_url: {
    type: String
  },
  status: {
    type: Boolean
  },
  //gender ilişkisi
  gender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genders",
    required: [true, "You must select a gender!"]
  },
}, { timestamps: true });

const User = mongoose.model("Users", userSchema);
module.exports = User;