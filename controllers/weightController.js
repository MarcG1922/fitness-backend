const Weight = require("../models/Weight");

const addWeight = async (req, res) => {
  try {
    const weight = await Weight.create({
      user: req.user._id,
      weight: req.body.weight
    });
    res.status(201).json(weight);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al registrar peso" });
  }
};

const getWeights = async (req, res) => {
  try {
    const weights = await Weight.find({ user: req.user._id }).sort({ date: 1 });
    res.json(weights);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener pesos" });
  }
};

module.exports = { addWeight, getWeights };