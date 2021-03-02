const mongoose = require('mongoose');
var User = new mongoose.Schema({
    username:{ type:String, required:true, unique:true, index:true },
    password:{ type:String, required:true },
    date_created:{ type: Date, default: Date.now },
});

module.exports = mongoose.model('User', User);