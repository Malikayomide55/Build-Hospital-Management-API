const Prescription = require("../models/Prescription");

const createPrescription = async (req, res) => {
  try {
    const prescription = await Prescription.create(req.body);

    const populated = await Prescription.findById(
      prescription._id
    )
      .populate("patient")
      .populate("doctor");

    res.status(201).json({
      success: true,
      message: "Prescription created successfully",
      data: populated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .populate("patient")
      .populate("doctor");

    res.status(200).json({
      success: true,
      count: prescriptions.length,
      data: prescriptions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getPrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findById(
      req.params.id
    )
      .populate("patient")
      .populate("doctor");

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found"
      });
    }

    res.status(200).json({
      success: true,
      data: prescription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const updatePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("patient")
      .populate("doctor");

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Prescription updated successfully",
      data: prescription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const deletePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(
      req.params.id
    );

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Prescription deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createPrescription,
  getPrescriptions,
  getPrescription,
  updatePrescription,
  deletePrescription
};
