const express = require("express")

const { addTimetable, collectData, generateTimetable, getTimetable, removeTimeTable } = require("../controllers/generatetimetablecontroller")


const timetableRouter = express.Router()


timetableRouter.post('/timetable', addTimetable);
timetableRouter.get('/data', collectData);
timetableRouter.post('/generate', generateTimetable);
timetableRouter.get('/timetable', getTimetable); // TO DO: implement getTimetable function
timetableRouter.post('/remove', removeTimeTable)



module.exports = timetableRouter