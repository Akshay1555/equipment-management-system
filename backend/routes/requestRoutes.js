const express = require("express");
const db = require("../config/database");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// 🔹 User creates request
router.post("/", verifyToken, (req, res) => {
  const { equipment_id } = req.body;

  db.run(
    `INSERT INTO requests (user_id, equipment_id, status)
     VALUES (?, ?, 'Pending')`,
    [req.user.id, equipment_id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.status(201).json({
        success: true,
        message: "Request submitted",
      });
    }
  );
});

// 🔹 Admin views all requests
router.get("/", verifyToken, verifyAdmin, (req, res) => {
  db.all(
    `SELECT r.id, r.status, u.name as user, e.name as equipment
     FROM requests r
     JOIN users u ON r.user_id = u.id
     JOIN equipment e ON r.equipment_id = e.id`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ success: true, data: rows });
    }
  );
});

// 🔹 Admin updates request status
router.put("/:id", verifyToken, verifyAdmin, (req, res) => {
  const { status } = req.body;

  db.run(
    `UPDATE requests SET status = ? WHERE id = ?`,
    [status, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ success: true, message: "Status updated" });
    }
  );
});

module.exports = router;