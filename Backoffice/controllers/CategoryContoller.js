const Category = require("../models/CategoryModel");
const CheckIsValidMongoID = require("../Helpers/FindHelpers/FindIDHelper");

//!GetAll
module.exports.GetAllCategories = async (req, res) => {
  await Category.find()
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!GetById
module.exports.GetByIdCategories = async (req, res) => {
  //id urlden gelecek
  const categoryId = req.params.id;
  //verilen id mongoose'un varsayılan id özelliklerine göre (ObjectId'ye göre) geçerlimi veya var mı (helpera alındı)
  const isValidId = CheckIsValidMongoID(categoryId);
  if(!isValidId){
    return res.status(400).json("Invalid category ID!!");
  }

  await Category.findById(categoryId)
    .then((category) => {
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json("Category not found!");
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Insert
module.exports.InsertCategory = async (req, res) => {
  const newCategory = new Category(req.body);
  await newCategory
    .save()
    .then(() => {
      res
        .status(200)
        .json(`${newCategory._id} category with ID successfully added.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Update
module.exports.UpdateCategory = async (req, res) => {
  //id bu sefer bodyden gelecek
  const updatedCategory = req.body;
  //verilen id mongoose'un varsayılan id özelliklerine göre (ObjectId'ye göre) geçerlimi veya var mı
  //BU KOD YAPISINI HELPER METOTA AL TEKRARA DÜŞTÜ!!!!!! (alındı)
  const isValidId = CheckIsValidMongoID(updatedCategory.categoryId);
  if(!isValidId){
    return res.status(400).json("Invalid category ID!!");
  }

  await Category.findOneAndUpdate(
    { _id: updatedCategory.categoryId }, // Güncellenecek kategorinin ID'si
    updatedCategory, // Güncelleme verileri
    { runValidators: true } // validation kontrollerinin yapılması için
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json("Category not found!");
      }
      res
        .status(200)
        .json(`${result._id} category with ID successfully updated.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//!Delete
module.exports.DeleteCategory = async (req, res) => {
  //id urlden gelecek
  const categoryId = req.params.id;
  //verilen id mongoose'un varsayılan id özelliklerine göre (ObjectId'ye göre) geçerlimi veya var mı
  //BU KOD YAPISINI HELPER METOTA AL TEKRARA DÜŞTÜ!!!!!! (alındı)
  const isValidId = CheckIsValidMongoID(categoryId);
  if(!isValidId){
    return res.status(400).json("Invalid category ID!!");
  }

  await Category.findByIdAndDelete(categoryId)
    .then((result) => {
      if (!result) {
        return res.status(404).json("Category not found!");
      }
      res
        .status(200)
        .json(`${result._id} category with ID successfully deleted.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
