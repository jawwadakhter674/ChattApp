const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
// var crypto = require("crypto-js");
const crypto = require('crypto');
require('dotenv').config();
const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const signup = async (req, res) => {
  try {
    const { fullName, username, password, phoneNumber } = req.body;

    const userId = crypto.randomBytes(16).toString('hex');

    const serverClient = connect(api_key, api_secret, app_id); //! TO CONNECTION TO STREAM AND SERVER

    const hashedPassword = await bcrypt.hash(password, 10); //! TO HASH THE PASSWORD

    const token = serverClient.createUserToken(userId);

    res.status(200).json({
      status: true,
      fullName: fullName,
      username: username,
      userId: userId,
      hashedPassword: hashedPassword,
      phoneNumber: phoneNumber,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error,
    });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const serverClient = connect(api_key, api_secret, app_id); //! TO CONNECTION TO STREAM AND SERVER

    const Client = StreamChat.getInstance(api_key, api_secret); //! TO QUERY ALL THE USER FROM DATABASE THAT MATCH THIS SEPECIFIC USERNAME

    const { users } = await Client.queryUsers({ name: username });

    if (!users.length)
      return res.status(400).json({ message: 'User Not Found' });

    const succes = await bcrypt.compare(password, users[0].hashedPassword);

    const token = await serverClient.createUserToken(users[0].id);

    if (succes) {
      res.status(200).json({
        status: true,
        token,
        fullName: users[0].fullName,
        username: username,
        userId: users[0].id,
      });
    } else {
      res.status(500).json({
        status: false,
        message: 'Incorrect Password',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error,
    });
  }
};

module.exports = { login, signup };
