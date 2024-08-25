const express = require("express")
const { addClass, listClass, removeClass, updateClass, countClasses } = require("../controllers/classcontroller")


const classRouter = express.Router()

classRouter.post("/add", addClass)
classRouter.get("/list", listClass)
classRouter.post("/remove", removeClass)
classRouter.put("/update/:id", updateClass)
classRouter.get("/count", countClasses)

module.exports = classRouter