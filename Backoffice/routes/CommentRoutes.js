const { Router } = require("express");
const commentController = require("../controllers/CommentController");

const router = Router();

router.get("/GetAll", commentController.GetAllComments);
router.get("/GetById/:id", commentController.GetByIdComment);
router.post("/Insert", commentController.InserComment);
router.put("/Update", commentController.UpdateComment);
router.delete("/Delete/:id", commentController.DeleteComment);

module.exports = router;