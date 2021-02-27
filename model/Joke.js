const mongoose = require('mongoose');

var jokeSchema = new mongoose.Schema({
        title : { type:String, required:true},
        date_created:{ type: Date, default: Date.now },
        ratings: {
                like: { type:Number, default:0 },
                dislike: { type:Number, default:0 }
        }
});

module.exports = mongoose.model('Jokes', jokeSchema);