const db = require("../config/database");

exports.createRequest = (req, res) => {
  const { equipment_id } = req.body;

  db.run(
    `INSERT INTO requests (user_id, equipment_id)
     VALUES (?, ?)`,
    [req.user.id, equipment_id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: "Request submitted" });
    }
  );
};

exports.getAllRequests = (req, res) => {
  db.all(
    `SELECT r.*, u.name as user_name, e.name as equipment_name
     FROM requests r
     JOIN users u ON r.user_id = u.id
     JOIN equipment e ON r.equipment_id = e.id`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
};

exports.updateRequestStatus = (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  db.run(
    `UPDATE requests SET status = ? WHERE id = ?`,
    [status, id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: "Status updated successfully" });
    }
  );
};