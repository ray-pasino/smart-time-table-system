const mongoose = require("mongoose")

const generatetimetableSchema = new mongoose.Schema({
    name:{type:String, required:true},
    semester:{type:String, required:true},
    days:{type:[String], required:true}
})

const generatetimetableModel = mongoose.models.timetable || mongoose.model("timetable", generatetimetableSchema)


module.exports = generatetimetableModel