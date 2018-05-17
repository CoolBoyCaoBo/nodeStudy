import {times} from "../../../AppData/Local"

var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    userName:String,
    password:String,
    rank:Number,
    regTime:times,
    updatetime:times
});

var User = mongoose.model("User",userSchema);

module.exports = User;