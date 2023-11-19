const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require("cors");
var cookieParser = require("cookie-parser");

const errorHandler = require("./middleware/error");

const authRoutes = require("./routes/authRoutes");
const postRoute = require("./routes/postRoutes");

// mongoose
//   .connect(process.env.DATABASE, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then(() => console.log("DB connected"))
//   .catch((err) => console.log(err));

mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb+srv://pavanraddi18:SR9CwRuZv21tF4wn@blogmerndb.yps7gsd.mongodb.net/test"
);
const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connecting to database");
});
db.on("open", () => {
  console.log("Connected to Database");
});

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);
app.use(cookieParser());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api", postRoute);

app.use(errorHandler);

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(` Server running on port ${port}`);
});
