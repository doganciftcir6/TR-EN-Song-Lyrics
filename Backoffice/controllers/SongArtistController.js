const SongArtist = require("../models/SongArtistModel");
const Song = require("../models/SongModel");
const Artist = require("../models/ArtistModel");
const CheckIsValidMongoID = require("../Helpers/FindHelpers/FindIDHelper");

//!GetAll
module.exports.GetAllSongArtists = async (req, res) => {
  await SongArtist.find()
    .populate("song", "title") // song alanının verilerini çek, sadece id ve title bilgisi gelsin
    .populate("artist", "artist_name") // artist alanının verilerini çek, sadece id ve artist_name bilgisi gelsin
    .then((songArtists) => {
      res.status(200).json(songArtists);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!GetById
module.exports.GetByIdArtist = async (req, res) => {
  //id urlden gelecek
  const songArtistId = req.params.id;
  //verilen id mongoose'un varsayılan id özelliklerine göre (ObjectId'ye göre) geçerlimi veya var mı (helpera alındı)
  const isValidId = CheckIsValidMongoID(songArtistId);
  if (!isValidId) {
    return res.status(400).json("Invalid SongArtist ID!!");
  }

  await SongArtist.findById(songArtistId)
    .populate("song", "title") // song alanının verilerini çek, sadece id ve title bilgisi gelsin
    .populate("artist", "artist_name") // artist alanının verilerini çek, sadece id ve artist_name bilgisi gelsin
    .then((songArtist) => {
      if (!songArtist) {
        return res.status(404).json("SongArtist not found!");
      }
      res.status(200).json(songArtist);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Insert
module.exports.InsertSongArtist = async (req, res) => {
  const { songId, artistId } = req.body;

  // Girilen songId ve artistId'nin geçerli olup olmadığını kontrol et yani bu idli kayıtlar dbde var mı?
  const isValidSongId = await Song.exists({ _id: songId });
  const isValidArtistId = await Artist.exists({ _id: artistId });

  if (!isValidArtistId || !isValidSongId) {
    return res.status(400).json("Invalid song ID or artist ID!");
  }

  const newSongArtist = new SongArtist({
    song: songId,
    artist: artistId,
  });
  await newSongArtist
    .save()
    .then(() => {
      res
        .status(200)
        .json(`${newSongArtist._id} SongArtist with ID successfully added.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Update
module.exports.UpdateSongArtist = async (req, res) => {
  //id bu sefer bodyden gelecek
  const { songArtistId, songId, artistId } = req.body;

  //hem kayıdın idsi kurallara uyuyor mu diye bakacağız hem de update edilmek istenilen kayıtlar db de var mı diye.
  const isValidId = CheckIsValidMongoID(songArtistId);
  if (!isValidId) {
    return res.status(400).json("Invalid SongArtist ID!!");
  }

  // Girilen songId ve artistId'nin geçerli olup olmadığını kontrol et yani bu idli kayıtlar dbde var mı?
  const isValidSongId = await Song.exists({ _id: songId });
  const isValidArtistId = await Artist.exists({ _id: artistId });

  if (!isValidArtistId || !isValidSongId) {
    return res.status(400).json("Invalid song ID or artist ID!");
  }

  await SongArtist.findOneAndUpdate(
    { _id: songArtistId }, // Güncellenecek SongArtistin ID'si
    { song: songId, artist: artistId }, // Güncelleme verileri
    { runValidators: true } // validation kontrollerinin yapılması için
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json("SongArtist not found!");
      }
      res
        .status(200)
        .json(`${result._id} SongArtist with ID successfully updated.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Delete
module.exports.DeleteSongArtist = async (req, res) => {
  //id urlden gelecek
  const songArtistId = req.params.id;
  //verilen id mongoose'un varsayılan id özelliklerine göre (ObjectId'ye göre) geçerlimi veya var mı
  //BU KOD YAPISINI HELPER METOTA AL TEKRARA DÜŞTÜ!!!!!! (alındı)
  const isValidId = CheckIsValidMongoID(songArtistId);
  if (!isValidId) {
    return res.status(400).json("Invalid SongArtist ID!!");
  }

  await SongArtist.findByIdAndDelete(songArtistId)
    .then((result) => {
      if (!result) {
        return res.status(404).json("SongArtist not found!");
      }
      res
        .status(200)
        .json(`${result._id} SongArtist with ID successfully deleted.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
