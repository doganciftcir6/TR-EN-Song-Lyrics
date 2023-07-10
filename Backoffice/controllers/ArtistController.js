const Artist = require("../models/ArtistModel");
const CheckIsValidMongoID = require("../Helpers/FindHelpers/FindIDHelper");

//!GetAll
module.exports.GetAllArtists = async (req, res) => {
  await Artist.find()
    .then((artists) => {
      res.status(200).json(artists);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!GetById
module.exports.GetByIdArtist = async (req, res) => {
  //id urlden gelecek
  const artistId = req.params.id;
  //verilen id mongoose'un varsayılan id özelliklerine göre (ObjectId'ye göre) geçerlimi veya var mı (helpera alındı)
  const isValidId = CheckIsValidMongoID(artistId);
  if (!isValidId) {
    return res.status(400).json("Invalid artist ID!!");
  }

  await Artist.findById(artistId)
    .then((artist) => {
      if(!artist){
        return res.status(404).json("Artist not found!");
      }
      res.status(200).json(artist);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Insert
module.exports.InsertArtist = async (req, res) => {
  const newArtist = new Artist(req.body);
  await newArtist
    .save() //id bu sefer bodyden gelecek
    .then(() => {
      res
        .status(200)
        .json(`${newArtist._id} artist with ID successfully added.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Update
module.exports.UpdateArtist = async (req, res) => {
  //id bu sefer bodyden gelecek
  const updatedArtist = req.body;
  //verilen id mongoose'un varsayılan id özelliklerine göre (ObjectId'ye göre) geçerlimi veya var mı
  //BU KOD YAPISINI HELPER METOTA AL TEKRARA DÜŞTÜ!!!!!! (alındı)
  const isValidId = CheckIsValidMongoID(updatedArtist.artistId);
  if (!isValidId) {
    return res.status(400).json("Invalid artist ID!!");
  }

  await Artist.findOneAndUpdate(
    { _id: updatedArtist.artistId }, // Güncellenecek Artistin ID'si
    updatedArtist, // Güncelleme verileri
    { runValidators: true } // validation kontrollerinin yapılması için
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json("Artist not found!");
      }
      res
        .status(200)
        .json(`${result._id} Artist with ID successfully updated.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Delete
module.exports.DeleteArtist = async (req, res) => {
  //id urlden gelecek
  const artistId = req.params.id;
  //verilen id mongoose'un varsayılan id özelliklerine göre (ObjectId'ye göre) geçerlimi veya var mı
  //BU KOD YAPISINI HELPER METOTA AL TEKRARA DÜŞTÜ!!!!!! (alındı)
  const isValidId = CheckIsValidMongoID(artistId);
  if (!isValidId) {
    return res.status(400).json("Invalid artist ID!!");
  }

  await Artist.findByIdAndDelete(artistId)
    .then((result) => {
      if (!result) {
        return res.status(404).json("Artist not found!");
      }
      res
        .status(200)
        .json(`${result._id} Artist with ID successfully deleted.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
