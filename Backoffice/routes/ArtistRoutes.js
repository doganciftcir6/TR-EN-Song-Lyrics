const { Router } = require("express");
const artistController = require("../controllers/ArtistController");
const upload = require("../middlewares/ArtistImageUpload");

const router = Router();

router.get("/GetAll", artistController.GetAllArtists);
router.get("/GetById/:id", artistController.GetByIdArtist);
router.post("/Insert", upload.single("image_url"), artistController.InsertArtist);
router.put("/Update", upload.single("image_url"), artistController.UpdateArtist);
router.delete("/Delete/:id", artistController.DeleteArtist);

module.exports = router;