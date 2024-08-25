const express = require('express')
const { addRoom, listRoom, removeRoom, updateRoom, countRoom } = require('../controllers/lectureroomcontroller')


const roomRouter = express.Router()

roomRouter.post("/add", addRoom)
roomRouter.get("/list", listRoom)
roomRouter.post("/remove", removeRoom)
roomRouter.put("/update/:id", updateRoom)
roomRouter.get("/count", countRoom)

module.exports = roomRouter