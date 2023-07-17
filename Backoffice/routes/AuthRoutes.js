const { Router } = require("express");
const authController = require("../controllers/AuthController");

const router = Router();

router.post("/SignUp", authController.SignUp);
router.post("/Login", authController.Login);

module.exports = router;