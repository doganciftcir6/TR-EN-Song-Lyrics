const mongoose = require("mongoose");

const songCategorySchema = mongoose.Schema(
  {
    //song ve category 'in çoka çok ilişkisi, unique: true ile tekrarlı kayıt olma ihtimalini engelle.
    song: {
      type: Schema.Types.ObjectId,
      ref: "Song",
      required: [true, "You must enter an song!"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "You must enter an category!"],
    },
  },
  { unique: true }
);

const SongCategory = mongoose.model("SongCategories", songCategorySchema);
module.exports = SongCategory;
