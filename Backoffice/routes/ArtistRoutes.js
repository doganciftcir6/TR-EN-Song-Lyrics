const { Router } = require("express");
const artistController = require("../controllers/ArtistController");

const router = Router();

router.get("/GetAll", artistController.GetAllArtists);
router.get("/GetById/:id", artistController.GetByIdArtist);
router.post("/Insert", artistController.InsertArtist);
router.put("/Update", artistController.UpdateArtist);
router.delete("/Delete/:id", artistController.DeleteArtist);

module.exports = router;