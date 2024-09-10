const mongoose= require("mongoose")

const studentSchema = new mongoose.Schema({
    name:{type:String, required:true},
    id:{type:Number, required:true, unique:true},
    password:{type:String, required:true},
    email:{type:String},
    faculty:{type:String},
    session:{type:String},
    level:{type:Number},
    program:{type:String},
    phone:{type:String},
    campus:{type:String},
    faculty:{type:String},
    session:{type:String}
})


const studentModel = mongoose.models.student || mongoose.model("student", studentSchema)

module.exports = studentModel


