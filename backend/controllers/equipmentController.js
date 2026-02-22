const db = require("../config/database");

exports.getAllEquipment = (req, res) => {
  db.all(`SELECT * FROM equipment`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.addEquipment = (req, res) => {
  const { name, description, quantity } = req.body;

  db.run(
    `INSERT INTO equipment (name, description, quantity, available)
     VALUES (?, ?, ?, ?)`,
    [name, description, quantity, quantity],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: "Equipment added successfully" });
    }
  );
};