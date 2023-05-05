const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user');

async function signup(req, res) {
  try {
    // get the username and password off of req body
    const {username, password} = req.body;

    // hash the password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // create a user with the data
    await User.create({ username, password: hashedPassword});

    // respond
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}

async function login(req, res) {
  try {
    // get the email and password from req body
    const { username, password} = req.body;

    // find the user with the requested username
    const user = await User.findOne({ username });
    if (!user) return res.sendStatus(401);

    // compare the sent in password with the found user password hash
    const passwordMatch = bcrypt.compareSync(password, user.password)
    if (!passwordMatch) return res.sendStatus(401);

    // create a jwt token
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

    // set the cookie
    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === "production"
    })

    // send the jwt token
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }

}

function logout(req, res) {
  try {
    // delete the cookie
    res.clearCookie("Authorization");
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400)
  }
}

function checkAuth(req, res) {
  res.sendStatus(200);
}

module.exports = {
  signup, login, logout, checkAuth
};