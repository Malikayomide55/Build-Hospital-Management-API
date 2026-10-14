const express = require("express");
const { getStatistics } = require("../controllers/dashboardController");

const router = express.Router();

router.get("/stats", getStatistics);

// Optional alias for the old endpoint
router.get("/statistics", getStatistics);

module.exports = router;