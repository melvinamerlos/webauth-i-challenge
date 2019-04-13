const router = require("express").Router();
const restrict = require("./middleware/restrict.js");
const Users = require("../users/usersModel.js");

router.get("/users", restrict, async (req, res) => {
  const { username, password } = req.headers;

  if (username && password) {
    try {
      const users = await Users.findUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(404).json({ message: "The credentials you have entered are invalid." });
  }
});

module.exports = router;