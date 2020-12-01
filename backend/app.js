// Creating connection with database
const { connectMongodb } = require("./database/connection");
connectMongodb();

//require chalk module to give colors to console text
const chalk = require("chalk");
const info = chalk.bold.cyan;
const exit = chalk.bold.red;

const express = require("express");
var cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const path = require('path')
require("dotenv").config();
const port = process.env.PORT ? process.env.PORT : 3000;
// For logging
const morgan = require('morgan');
// middlewares added
app
  .use(morgan(":method :url :status :res[content-length] - :response-time ms"))
  .use(cors())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json({ limit: "5mb" }))
  .use('/assets/images', express.static(path.join(__dirname, '/assets/images')))

const { verifyToken, HasRole } = require("./middlewares/Auth");

const authRoutes = require("./routes/Auth");
const clientRoutes = require("./routes/Client");
const petRoutes = require("./routes/Pet");

const clinicRoutes = require("./routes/Clinic");
const doctorRoutes = require("./routes/Doctor");

const adminRoutes = require("./routes/Admin");

const appointmentRoutes = require("./routes/Appointment");
const imageUploadRoutes = require("./routes/ImageUpload")

app.use("/auth", authRoutes);
app.use("/client", clientRoutes);
app.use("/pet", petRoutes);

app.use("/clinic", clinicRoutes);
app.use("/doctor", doctorRoutes);

app.use("/admin", adminRoutes);
app.use("/appointment", appointmentRoutes);

app.use(imageUploadRoutes);

app.get("/", verifyToken, HasRole(["Admin"]), (req, res) => {
  console.log(req.user);
  res.send("Hello World!!");
});

// If something broke in application
app.use((err, req, res, next) => {
  console.error("Error: ",err?.message);
  res.status(err.status || 500).send({ message: err?.message? err.message : "Something went wrong!" });
});

// if invalid endpoint is called
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const server = app.listen(port, () => {
  console.log(info(`Practice app listening at http://localhost:${port}`));
});

process.on("SIGTERM", () => {
  server.close(() => {
    console.log(exit("Process terminated"));
  });
});
