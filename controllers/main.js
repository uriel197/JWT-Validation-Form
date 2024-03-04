const { BadRequestError } = require("../errors");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || password === "") {
    throw new BadRequestError("Please provide user name and passwrd");
  }

  // just for Demo, normally provided by DB!!
  const id = new Date().getDate();

  // keep payload small, and ommit sensitive info like passwrd!
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
