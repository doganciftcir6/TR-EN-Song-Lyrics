const SongCategory = require("../models/SongCategoryModel");
const Category = require("../models/CategoryModel");
const Song = require("../models/SongModel");
const CheckIsValidMongoID = require("../Helpers/FindHelpers/FindIDHelper");

//!GetAll
module.exports.GetAllSongCategories = async (req, res) => {
  await SongCategory.find()
    .populate("song", "-__v") // song alanının verilerini çek, __v alanını hariç tut
    .populate("category", "-__v") // category alanının verilerini çek, __v alanını hariç tut
    .then((songCategories) => {
      res.status(200).json(songCategories);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!GetById
module.exports.GetByIdSongCategory = async (req, res) => {
  //id urlden gelecek
  const songCategoryId = req.params.id;
  //verilen id mongoose'un varsayılan id özelliklerine göre (ObjectId'ye göre) geçerlimi veya var mı (helpera alındı)
  const isValidId = CheckIsValidMongoID(songCategoryId);
  if (!isValidId) {
    return res.status(400).json("Invalid SongCategory ID!!");
  }

  await SongCategory.findById(songCategoryId)
    .populate("song", "-__v") // song alanının verilerini çek, __v alanını hariç tut
    .populate("category", "-__v") // category alanının verilerini çek, __v alanını hariç tut
    .then((songCategory) => {
      if (!songCategory) {
        return res.status(404).json("SongCategory not found!");
      }
      res.status(200).json(songCategory);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Insert
module.exports.InsertSongCategory = async (req, res) => {
  const { categoryId, songId } = req.body;

  // Girilen categoryId ve songId'nin geçerli olup olmadığını kontrol et yani bu idli kayıtlar dbde var mı?
  const isValidCategoryId = await Category.exists({ _id: categoryId });
  const isValidSongId = await Song.exists({ _id: songId });

  if (!isValidCategoryId || !isValidSongId) {
    return res.status(400).json("Invalid category ID or song ID!");
  }

  const newSongCategory = new SongCategory({
    category: categoryId,
    song: songId,
  });

  newSongCategory
    .save()
    .then(() => {
      res
        .status(200)
        .json(
          `${newSongCategory._id} SongCategory with ID successfully added.`
        );
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Update
module.exports.UpdateSongCategory = async (req, res) => {
  //id bu sefer bodyden gelecek
  const { songCategoryId, categoryId, songId } = req.body;

  //hem kayıdın idsi kurallara uyuyor mu diye bakacağız hem de update edilmek istenilen kayıtlar db de var mı diye.
  const isValidId = CheckIsValidMongoID(songCategoryId);
  if (!isValidId) {
    return res.status(400).json("Invalid SongCategory ID!!");
  }

  // Girilen categoryId ve songId'nin geçerli olup olmadığını kontrol et yani bu idli kayıtlar dbde var mı?
  const isValidCategoryId = await Category.exists({ _id: categoryId });
  const isValidSongId = await Song.exists({ _id: songId });

  if (!isValidCategoryId || !isValidSongId) {
    return res.status(400).json("Invalid category ID or song ID!");
  }

  SongCategory.findOneAndUpdate(
    { _id: songCategoryId }, // Güncellenecek kategorinin ID'si
    { category: categoryId, song: songId }, // Güncelleme verileri
    { runValidators: true } // validation kontrollerinin yapılması için
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json("SongCategory not found!");
      }
      res
        .status(200)
        .json(`${result._id} SongCategory with ID successfully updated.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Delete
module.exports.DeleteSongCategory = async (req, res) => {
  //id urlden gelecek
  const songCategoryId = req.params.id;
  //verilen id mongoose'un varsayılan id özelliklerine göre (ObjectId'ye göre) geçerlimi veya var mı
  //BU KOD YAPISINI HELPER METOTA AL TEKRARA DÜŞTÜ!!!!!! (alındı)
  const isValidId = CheckIsValidMongoID(songCategoryId);
  if (!isValidId) {
    return res.status(400).json("Invalid SongCategory ID!!");
  }

  await SongCategory.findByIdAndDelete(songCategoryId)
    .then((result) => {
      if (!result) {
        return res.status(404).json("SongCategory not found!");
      }
      res
        .status(200)
        .json(`${result._id} SongCategory with ID successfully deleted.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
