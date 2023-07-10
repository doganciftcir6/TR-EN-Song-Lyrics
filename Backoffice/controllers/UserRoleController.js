const UserRole = require("../models/UserRoleModel");
const User = require("../models/UserModel");
const Role = require("../models/RoleModel");
const CheckIsValidMongoID = require("../Helpers/FindHelpers/FindIDHelper");

//!GetAll
module.exports.GetAllUserRoles = async (req, res) => {
  await UserRole.find()
    .populate("user", "username") // user alanının verilerini çek, sadece id ve username bilgisi gelsin
    .populate("role", "definition") // role alanının verilerini çek, sadece id ve definition bilgisi gelsin
    .then((userRoles) => {
      res.status(200).json(userRoles);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!GetById
module.exports.GetByIdUserRole = async (req, res) => {
  //id urlden gelecek
  const userRoleId = req.params.id;
  //verilen id mongoose'un varsayılan id özelliklerine göre (ObjectId'ye göre) geçerlimi veya var mı (helpera alındı)
  const isValidId = CheckIsValidMongoID(userRoleId);
  if (!isValidId) {
    return res.status(400).json("Invalid UserRole ID!!");
  }

  await UserRole.findById(userRoleId)
    .populate("user", "username") // user alanının verilerini çek, sadece id ve username bilgisi gelsin
    .populate("role", "definition") // role alanının verilerini çek, sadece id ve definition bilgisi gelsin
    .then((userRole) => {
      res.status(200).json(userRole);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Insert
module.exports.InsertUserRole = async (req, res) => {
  const { userId, roleId } = req.body;

  // Girilen userId ve roleId'nin geçerli olup olmadığını kontrol et yani bu idli kayıtlar dbde var mı?
  const isValidUserId = await User.exists({ _id: userId });
  const isValidRoleId = await Role.exists({ _id: roleId });

  if (!isValidUserId || !isValidRoleId) {
    return res.status(400).json("Invalid user ID or role ID!");
  }

  const newUserRole = new UserRole({
    user: userId,
    role: roleId,
  });

  await newUserRole
    .save()
    .then(() => {
      res
        .status(200)
        .json(`${newUserRole._id} SongCategory with ID successfully added.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Update
module.exports.UpdateUserRole = async (req, res) => {
  //id bu sefer bodyden gelecek
  const { userRoleId, userId, roleId } = req.body;

  //hem kayıdın idsi kurallara uyuyor mu diye bakacağız hem de update edilmek istenilen kayıtlar db de var mı diye.
  const isValidId = CheckIsValidMongoID(userRoleId);
  if (!isValidId) {
    return res.status(400).json("Invalid UserRole ID!!");
  }

  // Girilen userId ve roleId'nin geçerli olup olmadığını kontrol et yani bu idli kayıtlar dbde var mı?
  const isValidUserId = await User.exists({ _id: userId });
  const isValidRoleId = await Role.exists({ _id: roleId });

  if (!isValidUserId || !isValidRoleId) {
    return res.status(400).json("Invalid user ID or role ID!");
  }

  await UserRole.findOneAndUpdate(
    { _id: userRoleId }, // Güncellenecek UserRoleun ID'si
    { user: userId, role: roleId }, // Güncelleme verileri
    { runValidators: true } // validation kontrollerinin yapılması için
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json("UserRole not found!");
      }
      res
        .status(200)
        .json(`${result._id} UserRole with ID successfully updated.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Delete
module.exports.DeleteUserRole = async (req, res) => {
  //id urlden gelecek
  const userRoleId = req.params.id;
  //verilen id mongoose'un varsayılan id özelliklerine göre (ObjectId'ye göre) geçerlimi veya var mı
  //BU KOD YAPISINI HELPER METOTA AL TEKRARA DÜŞTÜ!!!!!! (alındı)
  const isValidId = CheckIsValidMongoID(userRoleId);
  if (!isValidId) {
    return res.status(400).json("Invalid UserRole ID!!");
  }

  await UserRole.findByIdAndDelete(userRoleId)
    .then((result) => {
      if (!result) {
        return res.status(404).json("UserRole not found!");
      }
      res
        .status(200)
        .json(`${result._id} UserRole with ID successfully deleted.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
