const lectureroommodel = require("../models/lectureroommodel")


// add room 
const addRoom = async(req,res)=>{
    const room = new lectureroommodel({
        roomname:req.body.roomname,
        capacity:req.body.capacity
    })

    try {
        await room.save()
        res.json({success:true, message:"Room Added"})
    }catch(error){
        console.log(error)
        res.json({success:false, message:"Error Adding Room"})
    }
}


//list rooms
const listRoom = async(req,res)=>{
    try{
        const rooms = await lectureroommodel.find({})
        res.json({success:true, data:rooms})
    }catch(error){
        console.log(error)
        res.json({success:false, message:"Error Listing Rooms"})
    }
}


// delete room
const removeRoom = async(req,res)=>{
    try{
        const room = await lectureroommodel.findById(req.body.id)
        await lectureroommodel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:"Lecrure Room Deleted"})
    }catch(error){
        console.log(error)
        res.json({success:true, message:"Error"})
    }
}


//update room
const updateRoom = async(req,res)=>{
    try{
        const room = await lectureroommodel.findByIdAndUpdate(req.params.id, {
            roomname:req.body.roomname,
            capacity:req.body.capacity
        }, {new:true})
        res.json({success:true, message:"Room Updated"})
    }catch(error){
        console.log(error)
        res.json({success:false, message:"Error Updating Room"})
    }

}


// Count Room
const countRoom = async (req, res) => {
    try {
        const count = await lectureroommodel.countDocuments({});
        res.json({ success: true, count });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error Counting Rooms" });
    }
};

module.exports = {addRoom, listRoom, removeRoom, updateRoom, countRoom}


