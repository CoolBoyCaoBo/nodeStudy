const mongoose = require('mongoose');

let studentSchema = new mongoose.Schema({
    sid:Number,
    name:String,
    age:Number,
    sex:String
});
//基于sid设置索引

studentSchema.index({"sid":1});

let Student = mongoose.model('Student',studentSchema);

module.exports = Student;