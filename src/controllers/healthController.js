const { db } = require("../services/db");

const healthCheck = async (req, res) => {
  try {
    await db.raw("SELECT 1");
    return res.json({ status: "ok" });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = { healthCheck };
