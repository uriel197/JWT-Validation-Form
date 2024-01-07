const CustomAPIError = require("../errors/custom-error");
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) {
        throw new CustomAPIError('Please provide user name and passwrd', 400);
    }

    // just for Demo, normally provided by DB!!
    const id = new Date().getDate();

    // keep payload small, and ommit sensitive info like passwrd!
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '30d'})
    res.status(200).json({ msg: 'user created', token });
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({ msg: `Hello Boss`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}`});
}

module.exports = {
    login, dashboard
}