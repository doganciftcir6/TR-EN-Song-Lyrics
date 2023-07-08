const mongoose = require("mongoose");
const { Schema } = mongoose;

const songCategorySchema = Schema(
  {
    //song ve category 'in çoka çok ilişkisi, unique: true ile tekrarlı kayıt olma ihtimalini engelle. timestamps: true ile oluşturma tarini tut.
    song: {
      type: Schema.Types.ObjectId,
      ref: "Songs",
      required: [true, "You must enter an song!"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
      required: [true, "You must enter an category!"],
    },
  },
  { timestamps: true },
  { unique: true }
);

const SongCategory = mongoose.model("SongCategories", songCategorySchema);
module.exports = SongCategory;
