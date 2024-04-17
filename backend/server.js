const express = require("express");
// const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");
const caseRoutes = require('./search/routes/caseRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// view engine setup
const port = process.env.PORT || 5000;

const MONGODB_URL = "mongodb://127.0.0.1:27017/judiciary-information-system";
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((e) => console.log("Something bad happened", e));

app.use("*", (req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});
app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);
app.use('/cases', caseRoutes);

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
