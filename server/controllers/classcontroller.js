const classModel = require("../models/classModel")


//add class 
const addClass = async(req,res)=>{
    const setclass = new classModel({
        className:req.body.className,
        course:req.body.course,
        semester:req.body.semester,
        meetings:req.body.meetings,
        population:req.body.population,
        unavailablerooms:req.body.unavailablerooms
    })

    try {
        await setclass.save()
        res.json({success:true, message:"Class Added"})
    }catch(error){
        console.log(error)
        res.json({success:false, message:"Error Adding Class"})
    }
}


//list class
const listClass = async(req,res)=>{
    try{
        const setclass = await classModel.find({})
        res.json({success:true, data:setclass})
    }catch(error){
        console.log(error)
        res.json({success:false, message:"Error Listing Classes"})
    }
}


//remove lecturer
const removeClass = async(req,res)=>{
    try{
        const setclass = await classModel.findById(req.body.id)
        await classModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:"Class Deleted"})
    }catch(error){
        console.log(error)
        res.json({success:true, message:"Error"})
    }
}


//update lecturer
const updateClass = async(req,res)=>{
    try{
        const setclass = await classModel.findByIdAndUpdate(req.params.id, {
        className:req.body.className,
        course:req.body.course,
        semester:req.body.semester,
        meetings:req.body.meetings,
        population:req.body.population,
        unavailablerooms:req.body.unavailablerooms
        }, {new:true})
        res.json({success:true, message:"Class Info Updated"})
    }catch(error){
        console.log(error)
        res.json({success:false, message:"Error Updating Class Info"})
    }

}

module.exports = {addClass, listClass, removeClass, updateClass}