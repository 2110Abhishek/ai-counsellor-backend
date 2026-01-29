const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const controller = require("../controllers/task.controller");

router.get("/", auth, controller.getTasks);
router.patch("/:taskId/complete", auth, controller.completeTask);

module.exports = router;
