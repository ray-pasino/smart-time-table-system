const express = require("express")
const { listTime, addTime, removeTime, updateTime } = require("../controllers/timecontroller")

const timeRouter = express.Router()

timeRouter.get("/list", listTime)
timeRouter.post("/add", addTime)
timeRouter.post("/remove", removeTime)
timeRouter.put("/update/:id", updateTime)

module.exports = timeRouter