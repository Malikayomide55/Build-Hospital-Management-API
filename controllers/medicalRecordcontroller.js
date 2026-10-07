const MedicalRecord = require("../models/MedicalRecord");

const createMedicalRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.create(req.body);

    const populated = await MedicalRecord.findById(record._id)
      .populate("patient")
      .populate("doctor");

    res.status(201).json({
      success: true,
      message: "Medical record created successfully",
      data: populated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getMedicalRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find()
      .populate("patient")
      .populate("doctor");

    res.status(200).json({
      success: true,
      count: records.length,
      data: records
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getMedicalRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.id)
      .populate("patient")
      .populate("doctor");

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Medical record not found"
      });
    }

    res.status(200).json({
      success: true,
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const updateMedicalRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("patient")
      .populate("doctor");

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Medical record not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Medical record updated successfully",
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const deleteMedicalRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.findByIdAndDelete(
      req.params.id
    );

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Medical record not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Medical record deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createMedicalRecord,
  getMedicalRecords,
  getMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord
};
