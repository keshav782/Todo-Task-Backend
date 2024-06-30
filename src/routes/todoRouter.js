const express = require("express");
const router = express.Router();
const multer = require("multer");
const todoController = require("../controller/taskController");
const autheticateuser = require("../middleware/verifyAuthentic");
const Joi = require("joi");

const todoSchema = Joi.object({
  title: Joi.string().min(1).max(20).required(),
  description: Joi.string().max(100).required(),
  status: Joi.string().valid("pending", "completed").default("pending"),
});

function validateTodo(req, res, next) {
  const { error } = todoSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploadsFile");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

// filter
router.get("/filter", autheticateuser, todoController.filterTodos);

router.get("/download", autheticateuser, todoController.downloadFile);

router.get("/", autheticateuser, todoController.getAllTodo);
router.get("/:id", autheticateuser, todoController.getTodoById);
router.post("/", validateTodo, autheticateuser, todoController.createTodo);
router.put("/:id", autheticateuser, todoController.updateTodo);
router.delete("/:id", autheticateuser, todoController.deletetodo);

// upload

router.post(
  "/upload",
  upload.single("csvfile"),
  autheticateuser,
  todoController.uploadFile
);

module.exports = router;
