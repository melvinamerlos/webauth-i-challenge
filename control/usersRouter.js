const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/usersModel.js");

router.get("/", async (req, res) => {
  try {
    const users = await Users.findUser();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;