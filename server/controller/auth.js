const {connect} = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat');
var crypto = require('crypto-js');

const api_key = process.env.STREAM_API_KEY
const api_secret = process.env.STREAM_API_SECRET
const app_id = process.env.STREAM_APP_ID



const login = async (req , res)=>{
    try {
        const {fullName , username , password , phoneNumber} = req.body;
        const userId = crypto.SHA1().toString('hex');
        const serverClient = connect(api_key , api_secret , app_id);

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:false,
            message:error
        });        
    }
    const message = "hello";
 
}
const signup = async (req , res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:false,
            message:error
        })
    }
}


module.exports = {login , signup};