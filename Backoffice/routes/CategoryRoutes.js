const { Router } = require("express");
const categoryContoller = require("../controllers/CategoryContoller");

const router = Router();

router.get("/GetAll", categoryContoller.GetAllCategories);
router.get("/GetById/:id", categoryContoller.GetByIdCategories);
router.post("/Insert", categoryContoller.InsertCategory);
router.put("/Update", categoryContoller.UpdateCategory);
router.delete("/Delete/:id", categoryContoller.DeleteCategory);

module.exports = router;
