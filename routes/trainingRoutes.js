const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');

const {
  createTraining,
  getMyTrainings,
  updateTraining,
  deleteTraining
} = require('../controllers/trainingController');

router.post('/', protect, createTraining);
router.get('/', protect, getMyTrainings);
router.put('/:id', protect, updateTraining);
router.delete('/:id', protect, deleteTraining);

module.exports = router;