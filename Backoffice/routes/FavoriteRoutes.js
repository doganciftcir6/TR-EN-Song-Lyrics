const { Router } = require("express");
const favoriteController = require("../controllers/FavoriteController");

const router = Router();

router.get("/GetAll", favoriteController.GetAllFavorites);
router.get("/GetById/:id", favoriteController.GetByIdFavorite);
router.post("/Insert", favoriteController.InsertFavorite);
router.put("/Update", favoriteController.UpdateFavorite);
router.delete("/Delete/:id", favoriteController.DeleteFavorite);

module.exports = router;
