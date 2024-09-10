const express = require('express')

const { loginStudent, registerStudent, logoutStudent, authenticateStudent, showStudentInfo, getAllStudents } = require('../controllers/studentcontroller');

const studentRouter = express.Router()


studentRouter.post("/studentlogin", loginStudent)
studentRouter.post("/studentregister", registerStudent)
studentRouter.post("/studentlogout", logoutStudent)
studentRouter.get('/student/info', authenticateStudent, showStudentInfo);
studentRouter.post("/student/information", getAllStudents)


module.exports = studentRouter