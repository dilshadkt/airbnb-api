const { User, validate } = require("../model/User");
const bycrypt = require("bcrypt");
const Joi = require("joi");
const _ = require("lodash");

//////////////  LOGIN (❁´◡`❁) ///////////////

const Login = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const salt = await bycrypt.genSalt(10);
  const user = new User(
    _.pick(req.body, ["firstName", "lastName", "email", "password"])
  );
  user.password = await bycrypt.hash(user.password.toString(), salt);

  const newUser = await user.save();
  const token = user.generateAuthToken();
  res.header("X-auth-token", token).send(newUser);
};

///////////// SIGN (✿◡‿◡) ////////////////

const Sign = async (req, res) => {
  const { userName, password } = req.body;

  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: userName });
  if (!user) return res.status(400).send("invalid email or password");

  const validPassword = await bycrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("invalid email or password");

  const token = user.generateAuthToken();
  res.status(200).json(token);
};

//////////// CURRENT USER .·´¯`(>▂<)´¯`·.   ///////////

const CurrentUser = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.status(200).send(user);
};

///////// joi validation  /////////////

function validateUser(user) {
  const Schema = Joi.object({
    userName: Joi.string().required().email(),
    password: Joi.string().required().min(5).max(100),
  });
  return Schema.validate(user);
}
module.exports = { Login, Sign, CurrentUser };
