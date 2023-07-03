const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
  definition: {
    type: String,
    required: [true, "You must enter a role definition!"],
    minlength: [5, "The definition field must have a minimum of 5 characters!"],
    maxlength: [30, "The definition field must have a maximum of 30 characters!"],
    enum: ["Admin", "Member"], // İstenilen role değerlerini enum olarak ekle
  },
  status: {
    type: Boolean
  },
});

const Role = mongoose.model("Roles", roleSchema);
module.exports = Role;