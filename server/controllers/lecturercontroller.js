const lecturerModel = require('../models/lecturerModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')


//login user
const loginLecturer = async(req,res)=>{
    const {id, password} = req.body

    try{
        const user = await lecturerModel.findOne({id})

        if (!user){
            return res.json({success:false, message:"ID is incorrect"})
        }

        const isMatcch = await bcrypt.compare(password,user.password)

        if(!isMatcch){
            return res.json({succes:false, message:"password is incorrect"})
        }

        const token = createToken(user._id)
        res.json({success:true,token})
    }catch(error){
        console.log(error)
        res.json({succes:false, message:"Error"})
    }
}


const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}



//register user
const registerLecturer = async(req,res)=>{
    const {name,id,email,password,phone,faculty,department,campus} = req.body

    try {
        //checking if user already exists
        const exist = await lecturerModel.findOne({email})

        if(exist){
            return res.json({success:false,message:"User already exists"})
        }

        //validating email format and strong password

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }

        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new lecturerModel({
            name:name,
            email:email,
            id:id,
            password:hashedPassword,
            phone:phone,
            faculty:faculty,
            department:department,
            campus:campus

        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})

    }catch(error){
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}


// add lecturer
const addLecturer = async(req,res)=>{
    const lecturer = new lecturerModel({
        name:req.body.name,
        id:req.body.id,
        course:req.body.course,
        phone:req.body.phone,
        email:req.body.email
    })

    try {
        await lecturer.save()
        res.json({success:true, message:"Lecturer Added"})
    }catch(error){
        console.log(error)
        res.json({success:false, message:"Error Adding Lecturer"})
    }
}


// list lecturers
const listLecturer = async(req,res)=>{
    try{
        const lecturer = await lecturerModel.find({})
        res.json({success:true, data:lecturer})
    }catch(error){
        console.log(error)
        res.json({success:false, message:"Error Listing Lecturers"})
    }
}

//remove lecturer
const removeLecturer = async(req,res)=>{
    try{
        const lecturer = await lecturerModel.findById(req.body.id)
        await lecturerModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:"Lecrurer Deleted"})
    }catch(error){
        console.log(error)
        res.json({success:true, message:"Error"})
    }
}


//update lecturer
const updateLecturer = async(req,res)=>{
    try{
        const lecturer = await lecturerModel.findByIdAndUpdate(req.params.id, {
            name:req.body.name,
            id:req.body.id,
            course:req.body.course,
            phone:req.body.phone,
            email:req.body.email
        }, {new:true})
        res.json({success:true, message:"Lecturer Info Updated"})
    }catch(error){
        console.log(error)
        res.json({success:false, message:"Error Updating Lecturer Info"})
    }

}


// Count lecturers
const countLecturers = async (req, res) => {
    try {
        const count = await lecturerModel.countDocuments({});
        res.json({ success: true, count });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error Counting Lecturers" });
    }
};




// Show specific logged-in user info
const showLecturerInfo = async (req, res) => {
    try {
        // Get user ID from the request (from JWT)
        const userId = req.user.id;

        // Find the user in the database by ID
        const user = await lecturerModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Send back the user data
        res.json({ success: true, data: user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error retrieving user info" });
    }
};



// Middleware to authenticate and extract user ID from JWT
const authenticateLecturer = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Authentication failed" });
    }
};


// logout user
const logoutLecturer = (req, res) => {
    // Clear the token on the client-side; no need to do much here
    res.json({ success: true, message: "Logged out successfully" });
};


module.exports = {loginLecturer, registerLecturer, addLecturer, listLecturer, removeLecturer, updateLecturer, countLecturers, showLecturerInfo, authenticateLecturer, logoutLecturer}

