const express = require("express")
const { addCourse, removeCourse, listCourse, updateCourse } = require("../controllers/coursecontroller")

const courseRouter = express.Router()

courseRouter.post("/add", addCourse)
courseRouter.post("/remove", removeCourse)
courseRouter.get("/list,", listCourse)
courseRouter.put("/update/:id", updateCourse)

module.exports = courseRouter