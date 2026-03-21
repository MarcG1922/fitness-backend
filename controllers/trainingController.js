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

const updateTraining = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);

    if (!training) {
      return res.status(404).json({ message: 'Entrenamiento no encontrado' });
    }

    if (training.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const updatedTraining = await Training.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTraining);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al actualizar entrenamiento' });
  }
};

const deleteTraining = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);

    if (!training) {
      return res.status(404).json({ message: 'Entrenamiento no encontrado' });
    }

    if (training.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    await training.deleteOne();

    res.json({ message: 'Entrenamiento eliminado correctamente' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al eliminar entrenamiento' });
  }
};

module.exports = {
  createTraining,
  getMyTrainings,
  updateTraining,
  deleteTraining
};