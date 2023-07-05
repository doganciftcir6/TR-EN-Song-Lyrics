const { Router } = require("express");
const songController = require("../controllers/SongController");

const router = Router();

router.get("/GetAll", songController.GetAllSongs);
router.get("/GetById/:id", songController.GetByIdSong);
router.post("/Insert", songController.InsertSong);
router.put("/Update", songController.UpdateSong);
router.delete("/Delete/:id", songController.DeleteSong);

module.exports = router;
