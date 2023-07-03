const mongoose = require("mongoose");

const userRoleSchema = mongoose.Schema({
  //user ve role 'un çoka çok ilişkisi, unique: true ile tekrarlı kayıt olma ihtimalini engelle.
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
  }
}, { unique: true });

const UserRole = mongoose.model("UserRoles", userRoleSchema);


module.exports = UserRole;