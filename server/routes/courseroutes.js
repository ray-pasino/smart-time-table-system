const express = require("express")
const { addCourse, removeCourse, listCourse, updateCourse, countCourses } = require("../controllers/coursecontroller")

const courseRouter = express.Router()

courseRouter.post("/add", addCourse)
courseRouter.post("/remove", removeCourse)
courseRouter.get("/list", listCourse)
courseRouter.put("/update/:id", updateCourse)
courseRouter.get("/count", countCourses)

module.exports = courseRouter