const express = require("express");
const router = express.Router();

const { addWeight, getWeights } = require("../controllers/weightController");

const { protect } = require("../middlewares/authMiddleware");

router.post("/", protect, addWeight);
router.get("/", protect, getWeights);

module.exports = router;