const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const cors = require("cors");
const { VERSION } = require("./config");
const { verifyToken } = require("./middlewares/verifyToken");
require("./db");

var app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("images"));

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const publicRoutes = require("./routes/public");
const indexRouter = require("./routes/index");
app.use(`/${VERSION.PREFIX}/${VERSION.API}/`, publicRoutes);
//rutas protegidas
app.use(`/${VERSION.PREFIX}/${VERSION.API}/`, [verifyToken], indexRouter);
// app.use(`/${VERSION.PREFIX}/${VERSION.API}/`, indexRouter);

module.exports = app;
