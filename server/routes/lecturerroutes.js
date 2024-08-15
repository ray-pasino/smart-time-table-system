const express = require('express')
const {loginLecturer, registerLecturer} = require('../controllers/lecturercontroller')

const lecturerRouter = express.Router()

lecturerRouter.post("/lecturerlogin", loginLecturer)
lecturerRouter.post("/lecturerregister", registerLecturer)


module.exports = lecturerRouter