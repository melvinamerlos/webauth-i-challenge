const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/usersModel.js");

router.post("/", async (req, res) => {
  let { username, password } = req.body;

  try {
    const user = await Users.findUserByUsername(username);
    console.log(user);

    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = user;

      res.status(200).json({ message: `Welcome ${user.username}!` });
    } else {
      res.status(401).json({ message: "Error 401: The credentials you entered do not match any account registered with us." });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({ message: "Error: 500: An error occured when logging out." });
      } else {
        res.status(200).json({ message: "Goodbye!" });
      }
    });
  } else {
    res.status(200).json({ message: "Please log in" });
  }
});

module.exports = router;