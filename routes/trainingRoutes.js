const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const { createTraining, getMyTrainings } = require('../controllers/trainingController');

router.post('/', protect, createTraining);
router.get('/', protect, getMyTrainings);

module.exports = router;