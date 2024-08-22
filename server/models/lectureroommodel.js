const mongoose = require('mongoose')

const lectureroomSchema = new mongoose.Schema({
    roomname : {type:String, required:true, unique:true},
    capacity : {type:Number, required:true}
})

const lectureroommodel = mongoose.models.room || mongoose.model("room", lectureroomSchema)

module.exports = lectureroommodel