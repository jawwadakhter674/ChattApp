const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const AppError = require("./util/error");

const app = express();

const PORT = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded());
app.use(helmet());
app.use(compression());

app.use("/Auth", require("./routes/auth"));

app.all("*", (req, res, next) => {
  next(new AppError(`Catn't Find ${req.originalUrl} on This Server!`));
});
// //

app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});
