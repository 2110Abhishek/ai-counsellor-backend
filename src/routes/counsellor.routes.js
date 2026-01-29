const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const controller = require("../controllers/counsellor.controller");

router.post("/chat", auth, controller.chat);

module.exports = router;
