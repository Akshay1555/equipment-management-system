const express = require("express");
const db = require("../config/database");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Admin can add equipment
router.post("/", verifyToken, verifyAdmin, (req, res) => {
  const { name, description, quantity } = req.body;

  db.run(
    `INSERT INTO equipment (name, description, quantity, available)
     VALUES (?, ?, ?, ?)`,
    [name, description, quantity, 1],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ message: "Equipment added", id: this.lastID });
    }
  );
});

// All users can view equipment
router.get("/", verifyToken, (req, res) => {
  db.all(`SELECT * FROM equipment`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;