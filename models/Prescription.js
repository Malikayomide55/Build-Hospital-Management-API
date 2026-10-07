const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true
    },

    medication: {
      type: String,
      required: true,
      trim: true
    },

    dosage: {
      type: String,
      required: true,
      trim: true
    },

    frequency: {
      type: String,
      required: true,
      trim: true
    },

    duration: {
      type: String,
      required: true,
      trim: true
    },

    instructions: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Prescription = mongoose.model(
  "Prescription",
  prescriptionSchema
);

module.exports = Prescription;
