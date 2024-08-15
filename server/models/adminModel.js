const mongoose = require('mongoose')


const adminSchema = new mongoose.Schema({
    name:{type:String, required:true},
    id:{type:Number, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    phone:{type:Number, required:true},
    team:{type:String, requied:true},
    campus:{type:String, requied:true},
    password:{type:String, required:true}
})

const adminModel = mongoose.models.admin || mongoose.model("admin", adminSchema)

module.exports = adminModel