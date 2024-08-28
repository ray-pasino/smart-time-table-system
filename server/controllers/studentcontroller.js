const studentModel = require('../models/studentModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')


//login studet
const loginStudent = async(req,res)=>{
    const {id, password} = req.body

    try{
        const user = await studentModel.findOne({id})

        if (!user){
            return res.json({success:false, message:"ID or password is incorrect"})
        }

        const isMatcch = await bcrypt.compare(password,user.password)

        if(!isMatcch){
            return res.json({succes:false, message:"ID or password is incorrect"})
        }

        const token = createToken(user._id)
        res.json({success:true,token})
    }catch(error){
        console.log(error)
        res.json({succes:false, message:error.message})
    }
}


const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}



//register user
const registerStudent = async(req,res)=>{
    const {name, password, id, email, program, phone, campus, level, faculty, session} = req.body

    try {
        //checking if user already exists
        const exist = await studentModel.findOne({email})

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

        const newUser = new studentModel({
            name:name,
            id:id,
            email:email,
            password:hashedPassword,
            program:program,
            phone:phone,
            campus:campus,
            level:level,
            session:session,
            faculty:faculty
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})

    }catch(error){
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}



// Middleware to authenticate and extract user ID from JWT
const authenticateStudent = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Authentication failed" });
    }
};



// Show specific logged-in user info
const showStudentInfo = async (req, res) => {
    try {
        // Get user ID from the request (from JWT)
        const userId = req.user.id;

        // Find the user in the database by ID
        const user = await studentModel.findById(userId);

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


// logout user
const logoutStudent = (req, res) => {
    // Clear the token on the client-side; no need to do much here
    res.json({ success: true, message: "Logged out successfully" });
};


module.exports = {loginStudent, registerStudent, showStudentInfo, authenticateStudent, logoutStudent}
