const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/usersModel.js");
const restrict = require("./middleware/restrict.js");

router.get("/", restrict, async (req, res) => {
  try {
    const users = await Users.findUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  let user = req.body;

  const hash = await bcrypt.hashSync(user.password, 4);

  user.password = hash;

  try {
    const [id] = await Users.addUser(user);
    const userAdded = await Users.findUserById(id);

    if (!user.username || !user.password) {
      return res.status(400).json({
        message: "Please enter your username and password."
      });
    }

    res.status(201).json(userAdded);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;