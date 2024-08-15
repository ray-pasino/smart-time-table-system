const express = require('express')
const {loginAdmin, registerAdmin} = require('../controllers/admincontroller')

const adminRouter = express.Router()


adminRouter.post("/administratorlogin", loginAdmin)
adminRouter.post("/administratorregister", registerAdmin)


module.exports = adminRouter