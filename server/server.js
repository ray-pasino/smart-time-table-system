const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const lecturerRouter = require('./routes/lecturerroutes')
const adminRouter = require('./routes/adminroutes')
require('dotenv/config');

//app config
const app = express()
const PORT = 3000


//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB()

//api endpoint 
app.use("/api/lecturer", lecturerRouter)
app.use("/api/admin", adminRouter)

app.get("/", (req,res)=>{
    res.send('gctu time table')
})

app.listen(PORT, ()=>{
    console.log(`Server is listening on Port ${PORT}`)
})