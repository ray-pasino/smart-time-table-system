const mongoose = require('mongoose')

const connectDB = async ()=> {
    await mongoose.connect('mongodb+srv://raypasino:iogygGFCHV8649877@cluster0.xcqyu.mongodb.net/Smarttimetablesystem')
    .then(()=> console.log('DB Connected'))
}

module.exports = connectDB

