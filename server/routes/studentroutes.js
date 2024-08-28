const express = require('express')

const { loginStudent, registerStudent, logoutStudent, authenticateStudent, showStudentInfo } = require('../controllers/studentcontroller');

const studentRouter = express.Router()


studentRouter.post("/studentlogin", loginStudent)
studentRouter.post("/studentregister", registerStudent)
studentRouter.post("/studentlogout", logoutStudent)
studentRouter.get('/student/info', authenticateStudent, showStudentInfo);

module.exports = studentRouter