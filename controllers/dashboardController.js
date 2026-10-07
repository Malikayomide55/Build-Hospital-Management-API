const User = require("../models/User");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const Prescription = require("../models/Prescription");
const MedicalRecord = require("../models/MedicalRecord");

const getStatistics = async (req, res) => {
  try {
    const [
      users,
      patients,
      doctors,
      appointments,
      prescriptions,
      medicalRecords
    ] = await Promise.all([
      User.countDocuments(),
      Patient.countDocuments(),
      Doctor.countDocuments(),
      Appointment.countDocuments(),
      Prescription.countDocuments(),
      MedicalRecord.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: {
        users,
        patients,
        doctors,
        appointments,
        prescriptions,
        medicalRecords
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getStatistics
};
