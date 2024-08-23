const timeModel = require('../models/timemodule')


//add schedule 
const addTime = async(req,res)=>{
    const time = new timeModel({
        startTime:req.body.startTime,
        endTime:req.body.endTime,
    })

    try {
        await time.save()
        res.json({success:true, message:"Schedule Added"})
    }catch(error){
        console.log(error)
        res.json({success:false, message:"Error Adding Schedule"})
    }
}


// list schedule
const listTime = async(req,res)=>{
    try{
        const time = await timeModel.find({})
        res.json({success:true, data:time})
    }catch(error){
        console.log(error)
        res.json({success:false, message:"Error Listing Schedule"})
    }
}


//remove schedule
const removeTime = async(req,res)=>{
    try{
        const time = await timeModel.findById(req.body.id)
        await timeModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:"Schedule Deleted"})
    }catch(error){
        console.log(error)
        res.json({success:true, message:"Error"})
    }
}


//update schedule
const updateTime = async(req,res)=>{
    try{
        const time = await timeModel.findByIdAndUpdate(req.params.id, {
            startTime:req.body.startTime,
            endTime:req.body.endTime,
        }, {new:true})
        res.json({success:true, message:"Schedule Updated"})
    }catch(error){
        console.log(error)
        res.json({success:false, message:"Error Updating Schedule"})
    }

}



module.exports = {addTime, listTime, removeTime, updateTime}