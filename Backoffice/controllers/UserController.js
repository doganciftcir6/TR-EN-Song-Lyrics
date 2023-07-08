const User = require("../models/UserModel");
const Gender = require("../models/GenderModel");
const CheckIsValidMongoID = require("../Helpers/FindHelpers/FindIDHelper");

//!GetAll
module.exports.GetAllUsers = async (req, res) => {
  await User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!GetById
module.exports.GetByIdUser = async (req, res) => {
  //id urlden gelecek
  const userId = req.params.id;
  //verilen id mongoose'un varsayılan id özelliklerine göre (ObjectId'ye göre) geçerlimi veya var mı (helpera alındı)
  const isValidId = CheckIsValidMongoID(userId);
  if (!isValidId) {
    return res.status(400).json("Invalid user ID!!");
  }

  await User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json("User not found!");
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Insert
module.exports.InsertUser = async (req, res) => {
  // Girilen genderID'nin geçerli olup olmadığını kontrol et yani bu idli kayıt dbde var mı?
  const { genderId } = req.body;

  const isValidGenderId = await Gender.exists({ _id: genderId });
  if (!isValidGenderId) {
    return res.status(400).json("Invalid Gender ID!");
  }

  const newUser = new User(req.body);
  newUser
    .save()
    .then(() => {
      res.status(200).json(`${newUser._id} User with ID successfully added.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Update
module.exports.UpdateUser = async (req, res) => {
  //id bu sefer bodyden gelecek
  const updatedUser = req.body;

  //hem kayıdın idsi kurallara uyuyor mu diye bakacağız hem de update edilmek istenilen kayıtlar db de var mı diye.
  const isValidId = CheckIsValidMongoID(updatedUser.userId);
  if (!isValidId) {
    return res.status(400).json("Invalid User ID!!");
  }

  // Girilen genderID'nin geçerli olup olmadığını kontrol et yani bu idli kayıt dbde var mı?
  const isValidGenderId = await Gender.exists({ _id: updatedUser.genderId });
  if (!isValidGenderId) {
    return res.status(400).json("Invalid Gender ID!");
  }

  User.findOneAndUpdate(
    { _id: updatedUser.userId }, // Güncellenecek kategorinin ID'si
    updatedUser, // Güncelleme verileri
    { runValidators: true } // validation kontrollerinin yapılması için
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json("User not found!");
      }
      res.status(200).json(`${result._id} User with ID successfully updated.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Delete
module.exports.DeleteUser = async (req, res) => {
  //id urlden gelecek
  const userId = req.params.id;
  //verilen id mongoose'un varsayılan id özelliklerine göre (ObjectId'ye göre) geçerlimi veya var mı
  //BU KOD YAPISINI HELPER METOTA AL TEKRARA DÜŞTÜ!!!!!! (alındı)
  const isValidId = CheckIsValidMongoID(userId);
  if (!isValidId) {
    return res.status(400).json("Invalid user ID!!");
  }

  await Song.findByIdAndDelete(userId)
    .then((result) => {
      if (!result) {
        return res.status(404).json("User not found!");
      }
      res.status(200).json(`${result._id} user with ID successfully deleted.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
