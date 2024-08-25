const express = require("express")

const { addTimetable, collectData, generateTimetable, getTimetable } = require("../controllers/generatetimetablecontroller")


const timetableRouter = express.Router()


timetableRouter.post('/timetable', addTimetable);
timetableRouter.get('/timetable/data', collectData);
timetableRouter.post('/generate', generateTimetable);
timetableRouter.get('/timetable', getTimetable); // TO DO: implement getTimetable function



module.exports = timetableRouter