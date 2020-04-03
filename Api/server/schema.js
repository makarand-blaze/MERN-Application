const mongoose = require('mongoose');
// line to avoid error of model overwrite
var StudentSchema = mongoose.Schema;

var Student = new StudentSchema({
    StudentId: String,
    StudentName: String,
    StudentEmail:String,
    DateOfBirth: String,
    Course: String,
    University: String,
    Year: String,
    Description: String,
    FileName: String,
    File: Object,
    MimeType: String
});

module.exports = mongoose.model('Student', Student, 'Student');
