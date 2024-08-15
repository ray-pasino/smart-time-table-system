const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    name:{type:String, required:true},
    code:{type:String, required:true, unique:true}
})


const courseModel = mongoose.models.course || mongoose.model("course", courseSchema)

module.exports = courseModel