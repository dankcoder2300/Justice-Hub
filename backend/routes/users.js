const router = require("express").Router();
const User = require("../models/user.model");


router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const type = req.body.type;
  const newUser = new User({
    username,
    password,
    type,
  });
  newUser.save(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json("User added");
      // window.alert("Registration sucessful");
    }
  });
});

router.route("/login").post((req, res) => {
  User.findOne({ username: req.body.username, password: req.body.password })
    .then((doc) => {
      console.log(doc);
      if (doc) {
        res.status(200).json({ username: doc.username, success: true });
      } else {
        res.status(404).json({ success: false });
      }
    })
    .catch((err) => res.status(400).json("failed"));
});

module.exports = router;
