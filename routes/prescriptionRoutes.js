const express = require("express");

const {
  createPrescription,
  getPrescriptions,
  getPrescription,
  updatePrescription,
  deletePrescription
} = require("../controllers/prescriptionController");

const router = express.Router();

router.post("/", createPrescription);
router.get("/", getPrescriptions);
router.get("/:id", getPrescription);
router.put("/:id", updatePrescription);
router.delete("/:id", deletePrescription);

module.exports = router;
