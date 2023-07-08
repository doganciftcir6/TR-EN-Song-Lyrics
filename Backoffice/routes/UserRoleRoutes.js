const { Router } = require("express");
const userRoleController = require("../controllers/UserRoleController");

const router = Router();

router.get("/GetAll", userRoleController.GetAllUserRoles);
router.get("/GetById/:id", userRoleController.GetByIdUserRole);
router.post("/Insert", userRoleController.InsertUserRole);
router.put("/Update", userRoleController.UpdateUserRole);
router.delete("/Delete/:id", userRoleController.DeleteUserRole);

module.exports = router;
