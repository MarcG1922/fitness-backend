const Training = require('../models/Training');

const createTraining = async (req, res) => {
  try {
    const training = await Training.create({
      user: req.user._id,
      type: req.body.type,
      exercises: req.body.exercises,
      notes: req.body.notes
    });

    res.status(201).json(training);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al crear entrenamiento' });
  }
};

const getMyTrainings = async (req, res) => {
  try {
    const trainings = await Training.find({ user: req.user._id }).sort({ date: -1 });
    res.json(trainings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener entrenamientos' });
  }
};

module.exports = {
  createTraining,
  getMyTrainings
};