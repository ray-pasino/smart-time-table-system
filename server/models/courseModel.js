const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    code:{type:String, required:true, unique:true},
    name:{type:String, required:true},
    lecturer:{type:String, required:true},
    credithours:{type:Number, required:true}
})


const courseModel = mongoose.models.course || mongoose.model("course", courseSchema)

module.exports = courseModel