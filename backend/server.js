require("dotenv").config();
const express = require("express");
const cors = require("cors");

 require("./initDatabase");

const app = express();

app.use(cors());
app.use(express.json());



app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/equipment", require("./routes/equipmentRoutes"));
app.use("/api/requests", require("./routes/requestRoutes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});