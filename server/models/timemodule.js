const mongoose = require("mongoose")

const timeSchema = new mongoose.Schema({
    startTime:{type:String, required:true},
    endTime:{type:String, required:true}
})


const timeModel = mongoose.models.time ||  mongoose.model("time", timeSchema)

module.exports = timeModel