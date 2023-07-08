const { Router } = require("express");
const userContoller = require("../controllers/UserController");

const router = Router();

router.get("/GetAll", userContoller.GetAllUsers);
router.get("/GetById/:id", userContoller.GetByIdUser);
router.post("/Insert", userContoller.InsertUser);
router.put("/Update", userContoller.UpdateUser);
router.delete("/Delete/:id", userContoller.DeleteUser);

module.exports = router;