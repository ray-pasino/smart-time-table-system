const express = require('express')
const {loginLecturer, registerLecturer, addLecturer, listLecturer, removeLecturer, updateLecturer, countLecturers, showLecturerInfo, authenticateLecturer, logoutLecturer} = require('../controllers/lecturercontroller')

const lecturerRouter = express.Router()

lecturerRouter.post("/lecturerlogin", loginLecturer)
lecturerRouter.post("/lecturer/logout", logoutLecturer)
lecturerRouter.post("/lecturerregister", registerLecturer)
lecturerRouter.post("/add", addLecturer)
lecturerRouter.get("/list", listLecturer)
lecturerRouter.post("/remove", removeLecturer)
lecturerRouter.put("/update/:id", updateLecturer)
lecturerRouter.get("/count", countLecturers)
lecturerRouter.get('/lecturer/info', authenticateLecturer, showLecturerInfo);

module.exports = lecturerRouter