const mongoose = require("mongoose");

//timestamps: true ile kayıdın oluşturulma tarihini tut.
const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "You must enter an content!"],
      minlength: [3, "The username field must have a minimum of 3 characters!"],
      maxlength: [
        200,
        "The username field must have a maximum of 200 characters!",
      ],
    },
    //relations
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "You must select a user!"],
    },
    song: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Songs",
      required: [true, "You must select a song!"],
    },
    status: {
      type: Boolean
    }
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comments", commentSchema);
module.exports = Comment;
