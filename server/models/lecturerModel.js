const mongoose = require('mongoose')

const lecturerSchema = new mongoose.Schema({
    name:{type:String, required:true},
    id:{type:Number, required:true, unique:true},
    password:{type:String},
    email:{type:String, required:true, unique:true},
    phone:{type:Number,required:true},
    faculty:{type:String},
    department:{type:String},
    campus:{type:String},
    course:{type:String,required:true}
})

const lecturerModel = mongoose.models.lecturer || mongoose.model("lecturer", lecturerSchema)

module.exports = lecturerModel