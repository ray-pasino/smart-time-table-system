const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const lecturerRouter = require('./routes/lecturerroutes')
const adminRouter = require('./routes/adminroutes')
const { authenticateUser, showinfo } = require('./controllers/admincontroller')
const roomRouter = require('./routes/lectureroomroutes')
const courseRouter = require('./routes/courseroutes')
const timeModel = require('./models/timemodule')
const timeRouter = require('./routes/timeRouter')
const classRouter = require('./routes/classroutes')
require('dotenv/config');

//app config
const app = express()
const PORT = 3000


//middleware
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173'], // Allow requests from this origin
    credentials: true, // Allow credentials (e.g., cookies) to be sent in requests
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    headers: ['Content-Type', 'Authorization'] // Allow these headers
}))

//db connection
connectDB()

//api endpoint 
app.use("/api/lecturer", lecturerRouter)
app.use("/api/admin", adminRouter)
app.use("/api/admin/info", authenticateUser, showinfo)
app.use("/api/room", roomRouter)
app.use("/api/course", courseRouter)
app.use("/api/time", timeRouter)
app.use("/api/class", classRouter)

app.get("/", (req,res)=>{
    res.send('gctu time table')
})

app.listen(PORT, ()=>{
    console.log(`Server is listening on Port ${PORT}`)
})