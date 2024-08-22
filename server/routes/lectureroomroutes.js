const express = require('express')
const { addRoom, listRoom, removeRoom, updateRoom } = require('../controllers/lectureroomcontroller')


const roomRouter = express.Router()

roomRouter.post("/add", addRoom)
roomRouter.get("/list", listRoom)
roomRouter.post("/remove", removeRoom)
roomRouter.put("/update/:id", updateRoom)


module.exports = roomRouter