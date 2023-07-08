const mongoose = require("mongoose");
const { Schema } = mongoose;

//timestamps: true ile kayıdın oluşturulma tarihini tut.
const userRoleSchema = Schema(
  {
    //user ve role 'un çoka çok ilişkisi, unique: true ile tekrarlı kayıt olma ihtimalini engelle.
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "You must enter an user!"],
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Roles",
      required: [true, "You must enter an role!"],
    },
  },
  { timestamps: true },
  { unique: true }
);

const UserRole = mongoose.model("UserRoles", userRoleSchema);

module.exports = UserRole;
