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





module.exports = {loginLecturer, registerLecturer}