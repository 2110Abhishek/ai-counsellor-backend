const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const controller = require("../controllers/onboarding.controller");

router.post("/complete", auth, controller.completeOnboarding);

module.exports = router;
