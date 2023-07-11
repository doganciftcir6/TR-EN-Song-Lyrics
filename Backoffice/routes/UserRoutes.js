const { Router } = require("express");
const userContoller = require("../controllers/UserController");
const upload = require("../middlewares/UserImageUpload");

const router = Router();

router.get("/GetAll", userContoller.GetAllUsers);
router.get("/GetById/:id", userContoller.GetByIdUser);
router.post("/Insert", upload.single("image_url"), userContoller.InsertUser);
router.put("/Update", upload.single("image_url"), userContoller.UpdateUser);
router.delete("/Delete/:id", userContoller.DeleteUser);

module.exports = router;