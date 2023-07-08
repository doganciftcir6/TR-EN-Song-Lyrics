const { Router } = require("express");
const songCategoryController = require("../controllers/SongCategoryController");

const router = Router();

router.get("/GetAll", songCategoryController.GetAllSongCategories);
router.get("/GetById/:id", songCategoryController.GetByIdSongCategory);
router.post("/Insert", songCategoryController.InsertSongCategory);
router.put("/Update", songCategoryController.UpdateSongCategory);
router.delete("/Delete/:id", songCategoryController.DeleteSongCategory);

module.exports = router;
