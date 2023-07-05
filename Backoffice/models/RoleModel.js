const mongoose = require("mongoose");

//timestamps: true ile kayıdın oluşturulma tarihini tut.
const roleSchema = mongoose.Schema(
  {
    definition: {
      type: String,
      required: [true, "You must enter a role definition!"],
      unique: true,
      minlength: [
        5,
        "The definition field must have a minimum of 5 characters!",
      ],
      maxlength: [
        30,
        "The definition field must have a maximum of 30 characters!",
      ],
    },
    status: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Role = mongoose.model("Roles", roleSchema);
module.exports = Role;
