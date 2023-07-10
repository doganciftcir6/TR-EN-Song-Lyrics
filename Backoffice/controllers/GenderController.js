const Gender = require("../models/GenderModel");
const CheckIsValidMongoID = require("../Helpers/FindHelpers/FindIDHelper");

//!GetAll
module.exports.GetAllGenders = async (req, res) => {
  await Gender.find()
    .then((genders) => {
      res.status(200).json(genders);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!GetByID
module.exports.GetByIdGender = async (req, res) => {
  //id urlden gelecek
  const genderId = req.params.id;
  //verilen id mongoose'un varsayılan id özelliklerine göre (ObjectId'ye göre) geçerlimi veya var mı (helpera alındı)
  const isValidId = CheckIsValidMongoID(genderId);
  if (!isValidId) {
    return res.status(400).json("Invalid gender ID!!");
  }

  await Gender.findById(genderId)
    .then((gender) => {
      if (!gender) {
        return res.status(404).json("Gender not found!");
      }
      res.status(200).json(gender);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Insert
module.exports.InsertGender = async (req, res) => {
  const newGender = new Gender(req.body);
  await newGender
    .save()
    .then(() => {
      res
        .status(200)
        .json(`${newGender._id} gender with ID successfully added.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Update
module.exports.UpdateGender = async (req, res) => {
  //id bu sefer bodyden gelecek
  const updatedGender = req.body;
  //verilen id mongoose'un varsayılan id özelliklerine göre (ObjectId'ye göre) geçerlimi veya var mı
  //BU KOD YAPISINI HELPER METOTA AL TEKRARA DÜŞTÜ!!!!!! (alındı)
  const isValidId = CheckIsValidMongoID(updatedGender.genderId);
  if (!isValidId) {
    return res.status(400).json("Invalid gender ID!!");
  }

  await Gender.findOneAndUpdate(
    { _id: updatedGender.genderId }, // Güncellenecek Genderin ID'si
    updatedGender, // Güncelleme verileri
    { runValidators: true } // validation kontrollerinin yapılması için
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json("Gender not found!");
      }
      res
        .status(200)
        .json(`${result._id} gender with ID successfully updated.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Delete
module.exports.DeleteGender = async (req, res) => {
  //id urlden gelecek
  const genderId = req.params.id;
  //verilen id mongoose'un varsayılan id özelliklerine göre (ObjectId'ye göre) geçerlimi veya var mı
  //BU KOD YAPISINI HELPER METOTA AL TEKRARA DÜŞTÜ!!!!!! (alındı)
  const isValidId = CheckIsValidMongoID(genderId);
  if (!isValidId) {
    return res.status(400).json("Invalid gender ID!!");
  }

  await Gender.findByIdAndDelete(genderId)
    .then((result) => {
      if (!result) {
        return res.status(404).json("Gender not found!");
      }
      res
        .status(200)
        .json(`${result._id} gender with ID successfully deleted.`);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};
