const { Router } = require("express");
const roleController = require("../controllers/RoleController");

const router = Router();

router.get("/GetAll", roleController.GetAllRoles);
router.get("/GetById/:id", roleController.GetByIdRole);
router.post("/Insert", roleController.InsertRole);
router.put("/Update", roleController.UpdateRole);
router.delete("/Delete/:id", roleController.DeleteRole);

module.exports = router;
