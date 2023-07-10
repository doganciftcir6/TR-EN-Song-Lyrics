const Role = require("../models/RoleModel");
const CheckIsValidMongoID = require("../Helpers/FindHelpers/FindIDHelper");

//!GetAll
module.exports.GetAllRoles = async (req, res) => {
  await Role.find()
    .then((roles) => {
      res.status(200).json(roles);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!GetByID
module.exports.GetByIdRole = async (req, res) => {
  //id urlden gelecek
  const roleId = req.params.id;
  //verilen id mongoose'un varsayılan id özelliklerine göre (ObjectId'ye göre) geçerlimi veya var mı (helpera alındı)
  const isValidId = CheckIsValidMongoID(roleId);
  if (!isValidId) {
    return res.status(400).json("Invalid role ID!!");
  }

  await Role.findById(roleId)
    .then((role) => {
      if (!role) {
        return res.status(404).json("Role not found!");
      }
      res.status(200).json(role);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Insert
module.exports.InsertRole = async (req, res) => {
  const newRole = new Role(req.body);
  await newRole
    .save()
    .then(() => {
      res.status(200).json(`${newRole._id} role with ID successfully added.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Update
module.exports.UpdateRole = async (req, res) => {
  //id bu sefer bodyden gelecek
  const updatedRole = req.body;
  //verilen id mongoose'un varsayılan id özelliklerine göre (ObjectId'ye göre) geçerlimi veya var mı
  //BU KOD YAPISINI HELPER METOTA AL TEKRARA DÜŞTÜ!!!!!! (alındı)
  const isValidId = CheckIsValidMongoID(updatedRole.roleId);
  if (!isValidId) {
    return res.status(400).json("Invalid role ID!!");
  }

  await Role.findOneAndUpdate(
    { _id: updatedRole.roleId }, // Güncellenecek Roleun ID'si
    updatedRole, // Güncelleme verileri
    { runValidators: true } // validation kontrollerinin yapılması için
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json("Role not found!");
      }
      res.status(200).json(`${result._id} role with ID successfully updated.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Delete
module.exports.DeleteRole = async (req, res) => {
  //id urlden gelecek
  const roleId = req.params.id;
  //verilen id mongoose'un varsayılan id özelliklerine göre (ObjectId'ye göre) geçerlimi veya var mı
  //BU KOD YAPISINI HELPER METOTA AL TEKRARA DÜŞTÜ!!!!!! (alındı)
  const isValidId = CheckIsValidMongoID(roleId);
  if (!isValidId) {
    return res.status(400).json("Invalid role ID!!");
  }

  await Role.findByIdAndDelete(roleId)
    .then((result) => {
      if (!result) {
        return res.status(404).json("Role not found!");
      }
      res.status(200).json(`${result._id} role with ID successfully deleted.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
