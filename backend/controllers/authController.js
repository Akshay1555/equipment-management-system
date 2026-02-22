const db = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run(
    `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
    [name, email, hashedPassword, role],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: "User registered successfully" });
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.get(
    `SELECT * FROM users WHERE email = ?`,
    [email],
    (err, user) => {
      if (err || !user)
        return res.status(400).json({ message: "Invalid credentials" });

      const isValid = bcrypt.compareSync(password, user.password);
      if (!isValid)
        return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({ token });
    }
  );
};