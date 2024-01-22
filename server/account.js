const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const AccountSchema = new Schema({







username: String,
password: String,
messages: [
    {
        
        room:String,
        author: String,
        message: String 


    },


] 





});

const Account = mongoose.model('Account',AccountSchema);

module.exports = Account;