const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const server = express();

const registerRouter = require("../control/registerRouter.js");
const loginRouter = require("../control/loginRouter.js");
const usersRouter = require("../control/usersRouter.js");
const restrictRouter = require("../control/restrictRouter.js");
const sessionConfig = require("../config/sessionConfig.js");

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig));

server.use("/api/register", registerRouter);
server.use("/api/login", loginRouter);
server.use("./api/users", usersRouter);
server.use("/api/restricted", restrictRouter);

module.exports = server;