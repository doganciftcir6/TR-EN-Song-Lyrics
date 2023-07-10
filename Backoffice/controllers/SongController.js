const Song = require("../models/SongModel");
const CheckIsValidMongoID = require("../Helpers/FindHelpers/FindIDHelper");

//!GetAll
module.exports.GetAllSongs = async (req, res) => {
  await Song.find()
    .then((songs) => {
      res.status(200).json(songs);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!GetByID
module.exports.GetByIdSong = async (req, res) => {
  //id urlden gelecek
  const songId = req.params.id;
  //verilen id mongoose'un varsayılan id özelliklerine göre (ObjectId'ye göre) geçerlimi veya var mı (helpera alındı)
  const isValidId = CheckIsValidMongoID(songId);
  if (!isValidId) {
    return res.status(400).json("Invalid song ID!!");
  }

  await Song.findById(songId)
    .then((song) => {
      if (!song) {
        return res.status(404).json("Song not found!");
      }
      res.status(200).json(song);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Insert
module.exports.InsertSong = async (req, res) => {
  const newSong = new Song(req.body);
  await newSong
    .save()
    .then(() => {
      res.status(200).json(`${newSong._id} song with ID successfully added.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Update
module.exports.UpdateSong = async (req, res) => {
  //id bu sefer bodyden gelecek
  const updatedSong = req.body;
  //verilen id mongoose'un varsayılan id özelliklerine göre (ObjectId'ye göre) geçerlimi veya var mı
  //BU KOD YAPISINI HELPER METOTA AL TEKRARA DÜŞTÜ!!!!!! (alındı)
  const isValidId = CheckIsValidMongoID(updatedSong.songId);
  if (!isValidId) {
    return res.status(400).json("Invalid song ID!!");
  }

  await Song.findOneAndUpdate(
    { _id: updatedSong.songId }, // Güncellenecek Songun ID'si
    updatedSong, // Güncelleme verileri
    { runValidators: true } // validation kontrollerinin yapılması için
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json("Song not found!");
      }
      res.status(200).json(`${result._id} song with ID successfully updated.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Delete
module.exports.DeleteSong = async (req, res) => {
  //id urlden gelecek
  const songId = req.params.id;
  //verilen id mongoose'un varsayılan id özelliklerine göre (ObjectId'ye göre) geçerlimi veya var mı
  //BU KOD YAPISINI HELPER METOTA AL TEKRARA DÜŞTÜ!!!!!! (alındı)
  const isValidId = CheckIsValidMongoID(songId);
  if (!isValidId) {
    return res.status(400).json("Invalid song ID!!");
  }

  await Song.findByIdAndDelete(songId)
    .then((result) => {
      if (!result) {
        return res.status(404).json("Song not found!");
      }
      res.status(200).json(`${result._id} song with ID successfully deleted.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
