const express = require('express')
const {loginAdmin, registerAdmin} = require('../controllers/admincontroller')
const { showinfo, authenticateUser } = require('../controllers/admincontroller');

const adminRouter = express.Router()


adminRouter.post("/administratorlogin", loginAdmin)
adminRouter.post("/administratorregister", registerAdmin)
adminRouter.get('/admin/info', authenticateUser, showinfo);

module.exports = adminRouter