const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    type: {
      type: String,
      required: true
    },
    exercises: [
      {
        name: String,
        sets: Number,
        reps: Number,
        weight: Number
      }
    ],
    notes: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Training', trainingSchema);