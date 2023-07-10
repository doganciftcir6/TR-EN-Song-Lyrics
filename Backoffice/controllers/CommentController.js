const Comment = require("../models/CommentModel");
const User = require("../models/UserModel");
const Song = require("../models/SongModel");
const CheckIsValidMongoID = require("../Helpers/FindHelpers/FindIDHelper");

//!GetAll
module.exports.GetAllComments = async (req, res) => {
  await Comment.find()
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!GetById
module.exports.GetByIdComment = async (req, res) => {
  //id urlden gelecek
  const commentId = req.params.id;
  //verilen id mongoose'un varsayılan id özelliklerine göre (ObjectId'ye göre) geçerlimi veya var mı (helpera alındı)
  const isValidId = CheckIsValidMongoID(commentId);
  if (!isValidId) {
    return res.status(400).json("Invalid comment ID!!");
  }

  await Comment.findById(commentId)
    .then((comment) => {
      if (!comment) {
        return res.status(404).json("Comment not found!");
      }
      res.status(200).json(comment);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Insert
module.exports.InserComment = async (req, res) => {
  const { userId, songId } = req.body;

  // Girilen userId ve roleId'nin geçerli olup olmadığını kontrol et yani bu idli kayıtlar dbde var mı?
  const isValidUserId = await User.exists({ _id: userId });
  const isValidSongId = await Song.exists({ _id: songId });

  if (!isValidUserId || !isValidSongId) {
    return res.status(400).json("Invalid user ID or song ID!");
  }

  const newComment = new Comment({
    user: userId,
    song: songId,
  });
  await newComment
    .save()
    .then(() => {
      res
        .status(200)
        .json(`${newComment._id} comment with ID successfully added.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Update
module.exports.UpdateComment = async (req, res) => {
  //id bu sefer bodyden gelecek
  const { commentId, userId, songId } = req.body;

  //hem kayıdın idsi kurallara uyuyor mu diye bakacağız hem de update edilmek istenilen kayıtlar db de var mı diye.
  const isValidId = CheckIsValidMongoID(commentId);
  if (!isValidId) {
    return res.status(400).json("Invalid comment ID!!");
  }

  // Girilen userId ve roleId'nin geçerli olup olmadığını kontrol et yani bu idli kayıtlar dbde var mı?
  const isValidUserId = await User.exists({ _id: userId });
  const isValidSongId = await Song.exists({ _id: songId });

  if (!isValidUserId || !isValidSongId) {
    return res.status(400).json("Invalid user ID or song ID!");
  }

  await Comment.findOneAndUpdate(
    { _id: commentId }, // Güncellenecek commentin ID'si
    { user: userId, song: songId }, // Güncelleme verileri
    { runValidators: true } // validation kontrollerinin yapılması için
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json("Comment not found!");
      }
      res
        .status(200)
        .json(`${result._id} Comment with ID successfully updated.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Delete
module.exports.DeleteComment = async (req, res) => {
  //id urlden gelecek
  const commentId = req.params.id;
  //verilen id mongoose'un varsayılan id özelliklerine göre (ObjectId'ye göre) geçerlimi veya var mı
  //BU KOD YAPISINI HELPER METOTA AL TEKRARA DÜŞTÜ!!!!!! (alındı)
  const isValidId = CheckIsValidMongoID(commentId);
  if (!isValidId) {
    return res.status(400).json("Invalid Comment ID!!");
  }

  await Comment.findByIdAndDelete(commentId)
    .then((result) => {
      if (!result) {
        return res.status(404).json("Comment not found!");
      }
      res
        .status(200)
        .json(`${result._id} Comment with ID successfully deleted.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
