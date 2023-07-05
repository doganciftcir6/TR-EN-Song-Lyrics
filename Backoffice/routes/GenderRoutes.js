const { Router } = require("express");
const genderController = require("../controllers/GenderController");

const router = Router();

router.get("/GetAll", genderController.GetAllGenders);
router.get("/GetById/:id", genderController.GetByIdGender);
router.post("/Insert", genderController.InsertGender);
router.put("/Update", genderController.UpdateGender);
router.delete("/Delete/:id", genderController.DeleteGender);

module.exports = router;
