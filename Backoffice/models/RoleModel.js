const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
  definition: {
    type: String,
    required: [true, "You must enter a role definition!"],
    enum: ["Admin", "Member"], // İstenilen role değerlerini enum olarak ekle
  },
  status: {
    type: Boolean
  },
});

const Role = mongoose.model("Roles", roleSchema);
module.exports = Role;