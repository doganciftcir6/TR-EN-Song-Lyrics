const { Router } = require("express");
const songArtistController = require("../controllers/SongArtistController");

const router = Router();

router.get("/GetAll", songArtistController.GetAllSongArtists);
router.get("/GetById/:id", songArtistController.GetByIdArtist);
router.post("/Insert", songArtistController.InsertSongArtist);
router.put("/Update", songArtistController.UpdateSongArtist);
router.delete("/Delete/:id", songArtistController.DeleteSongArtist);

module.exports = router;