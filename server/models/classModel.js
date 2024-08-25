const mongoose = require("mongoose")

const classSchema = new mongoose.Schema({
    className:{type:String, required:true},
    course:{type:String, required:true},
    semester:{type:String, required:true},
    meetings:{type:Number, required:true},
    population:{type:Number, require:true},
    unavailablerooms:{type:[String]}
})

const classModel = mongoose.models.class ||  mongoose.model("class", classSchema)


module.exports = classModel