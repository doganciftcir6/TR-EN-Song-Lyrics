const Favorite = require("../models/FavoriteModel");
const User = require("../models/UserModel");
const Song = require("../models/SongModel");
const CheckIsValidMongoID = require("../Helpers/FindHelpers/FindIDHelper");

//!GetAll
module.exports.GetAllFavorites = async (req, res) => {
  await Favorite.find()
    .populate("user", "username") // user alanının verilerini çek, sadece id ve username bilgisi gelsin
    .populate("song", "title") // song alanının verilerini çek, sadece id ve title bilgisi gelsin
    .then((favorites) => {
      res.status(200).json(favorites);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!GetByID
module.exports.GetByIdFavorite = async (req, res) => {
  //id urlden gelecek
  const favoriteId = req.params.id;
  //verilen id mongoose'un varsayılan id özelliklerine göre (ObjectId'ye göre) geçerlimi veya var mı (helpera alındı)
  const isValidId = CheckIsValidMongoID(favoriteId);
  if (!isValidId) {
    return res.status(400).json("Invalid favorite ID!!");
  }

  await Favorite.findById(favoriteId)
    .populate("user", "username") // user alanının verilerini çek, sadece id ve username bilgisi gelsin
    .populate("song", "title") // song alanının verilerini çek, sadece id ve title bilgisi gelsin
    .then((favorite) => {
      if (!favorite) {
        return res.status(404).json("Favorite not found!");
      }
      res.status(200).json(favorite);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Insert
module.exports.InsertFavorite = async (req, res) => {
  const { userId, songId } = req.body;

  // Girilen userId ve roleId'nin geçerli olup olmadığını kontrol et yani bu idli kayıtlar dbde var mı?
  const isValidUserId = await User.exists({ _id: userId });
  const isValidSongId = await Song.exists({ _id: songId });

  if (!isValidUserId || !isValidSongId) {
    return res.status(400).json("Invalid user ID or song ID!");
  }

  const newFavorite = new Favorite({
    user: userId,
    song: songId,
  });
  await newFavorite
    .save()
    .then(() => {
      res
        .status(200)
        .json(`${newFavorite._id} favorite with ID successfully added.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Update
module.exports.UpdateFavorite = async (req, res) => {
  //id bu sefer bodyden gelecek
  const { favoriteId, userId, songId } = req.body;

  //hem kayıdın idsi kurallara uyuyor mu diye bakacağız hem de update edilmek istenilen kayıtlar db de var mı diye.
  const isValidId = CheckIsValidMongoID(favoriteId);
  if (!isValidId) {
    return res.status(400).json("Invalid favorite ID!!");
  }

  // Girilen userId ve roleId'nin geçerli olup olmadığını kontrol et yani bu idli kayıtlar dbde var mı?
  const isValidUserId = await User.exists({ _id: userId });
  const isValidSongId = await Song.exists({ _id: songId });

  if (!isValidUserId || !isValidSongId) {
    return res.status(400).json("Invalid user ID or song ID!");
  }

  await Favorite.findOneAndUpdate(
    { _id: favoriteId }, // Güncellenecek favoritenin ID'si
    { user: userId, song: songId }, // Güncelleme verileri
    { runValidators: true } // validation kontrollerinin yapılması için
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json("Favorite not found!");
      }
      res
        .status(200)
        .json(`${result._id} Favorite with ID successfully updated.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Delete
module.exports.DeleteFavorite = async (req, res) => {
  //id urlden gelecek
  const favoriteId = req.params.id;
  //verilen id mongoose'un varsayılan id özelliklerine göre (ObjectId'ye göre) geçerlimi veya var mı
  //BU KOD YAPISINI HELPER METOTA AL TEKRARA DÜŞTÜ!!!!!! (alındı)
  const isValidId = CheckIsValidMongoID(favoriteId);
  if (!isValidId) {
    return res.status(400).json("Invalid Favorite ID!!");
  }

  await Favorite.findByIdAndDelete(favoriteId)
    .then((result) => {
      if (!result) {
        return res.status(404).json("Favorite not found!");
      }
      res
        .status(200)
        .json(`${result._id} Favorite with ID successfully deleted.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
