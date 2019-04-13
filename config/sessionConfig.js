const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const configKnex = require("./knexConfig.js");

module.exports = {
  name: "godzilla",
  secret: "rawwwr!!",
  cookie: {
    maxAge: 1000 * 60 * 1, 
    secure: false,
  },
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    knex: configKnex,
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 30 
  })
};