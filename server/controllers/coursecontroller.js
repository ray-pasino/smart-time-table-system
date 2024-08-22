const courseModel = require('../models/courseModel')

//add course 
const addCourse = async(req,res)=>{
    const course = new courseModel({
        code:req.body.code,
        name:req.body.name,
        lecturer:req.body.lecturer,
        credithours:req.body.credithours
    })

    try {
        await course.save()
        res.json({success:true, message:"Course Added"})
    }catch(error){
        console.log(error)
        res.json({success:false, message:"Error Adding Course"})
    }
}


// list course
const listCourse = async(req,res)=>{
    try{
        const course = await courseModel.find({})
        res.json({success:true, data:course})
    }catch(error){
        console.log(error)
        res.json({success:false, message:"Error Listing Courses"})
    }
}


//remove course
const removeCourse = async(req,res)=>{
    try{
        const course = await courseModel.findById(req.body.id)
        await courseModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:"Course Deleted"})
    }catch(error){
        console.log(error)
        res.json({success:true, message:"Error"})
    }
}


//update course
const updateCourse = async(req,res)=>{
    try{
        const course = await courseModel.findByIdAndUpdate(req.params.id, {
            code:req.body.code,
            name:req.body.name,
            lecturer:req.body.lecturer,
            credithours:req.body.credithours
        }, {new:true})
        res.json({success:true, message:"Course Info Updated"})
    }catch(error){
        console.log(error)
        res.json({success:false, message:"Error Updating Course Info"})
    }

}


module.exports = {addCourse, listCourse, removeCourse, updateCourse}