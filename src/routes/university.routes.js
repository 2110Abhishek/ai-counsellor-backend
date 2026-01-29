const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const controller = require("../controllers/university.controller");

router.get("/recommendations", auth, controller.getRecommendations);
router.post("/lock/:universityId", auth, controller.lockUniversity);

module.exports = router;
