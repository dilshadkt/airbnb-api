const User = require("../model/User");
const bycrypt = require("bcrypt");

const Login = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const salt = await bycrypt.genSalt(10);
  const user = new User({
    firstName,
    lastName,
    email,
    password: await bycrypt.hash(password, salt),
  });
  try {
    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
};
const Sign = async (req, res) => {
  try {
    const { userName, password } = req.body;
    console.log(userName);
    console.log(password);

    let user = await User.findOne({ email: userName });
    if (!user) return res.status(400).send("invalid email or password");

    const validPassword = await bycrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send("invalid email or password");
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};
module.exports = { Login, Sign };
