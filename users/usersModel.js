const db = require("../config/knexConfig.js");

module.exports = {
  findUsers,
  findUserById,
  findUserByUsername,
  addUser
};

function findUsers() {
  return db("users");
}

function findUserById(id) {
  return db("users")
    .where({ id })
    .first();
}

function findUserByUsername(username) {
  return db("users")
    .where({ username })
    .first();
}

function addUser(user) {
  return db("users").insert(user);
}