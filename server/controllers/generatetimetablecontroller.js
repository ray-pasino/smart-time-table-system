const generatetimetableModel = require("../models/generatetimetablemodel")

const lecturerModel = require('../models/lecturerModel')
const courseModel = require('../models/courseModel')
const classModel = require("../models/classModel")
const lectureroommodel = require("../models/lectureroommodel")
const timeModel = require('../models/timemodule')


// add timetable infor
const addTimetable = async(req,res)=>{
    const info = new generatetimetableModel({
        name:req.body.name,
        semester:req.body.semester,
        days:req.body.days,
    })

    try {
        await info.save()
        res.json({success:true, message:"Time Table Generation In Preparation"})
    }catch(error){
        console.log(error)
        res.json({success:false, message:"Error Compiling Details For Timetable"})
    }
}



async function collectData() {
    try {
      // Fetch lecturers
      const lecturers = await lecturerModel.find().exec();
      console.log(`Fetched ${lecturers.length} lecturers`);
  
      // Fetch courses
      const courses = await courseModel.find().exec();
      console.log(`Fetched ${courses.length} courses`);
  
      // Fetch classes
      const classes = await classModel.find().exec();
      console.log(`Fetched ${classes.length} classes`);
  
      // Fetch lecture rooms
      const lectureRooms = await lectureroommodel.find().exec();
      console.log(`Fetched ${lectureRooms.length} lecture rooms`);
  
       // Fetch time
       const timeSlots = await timeModel.find().exec();
       console.log(`Fetched ${timeSlots.length} time`);

      // Return the collected data
      return { lecturers, courses, classes, lectureRooms, timeSlots };
    } catch (error) {
      console.error('Error collecting data:', error);
      return null;
    }
  }


  function generateTimetable(data) {
    const { classes, lecturers, lectureRooms, timeSlots } = data;
    const timetable = initializeTimetable(timeSlots, daysOfWeek);
  
    // Sort classes by priority
    classes.sort((a, b) => b.population - a.population);
  
    // Assign classes to time slots and lecture rooms
    for (const classObj of classes) {
      let assigned = false;
      for (const timeSlot of timeSlots) {
        for (const lectureRoom of lectureRooms) {
          if (isLecturerAvailable(lecturers, classObj, timeSlot) &&
              isLectureRoomAvailable(lectureRooms, timeSlot) &&
              !isTimeSlotConflict(timetable, timeSlot, lectureRoom)) {
            assignClassToTimetable(timetable, classObj, timeSlot, lectureRoom);
            assigned = true;
            break;
          }
        }
        if (assigned) break;
      }
    }
  
    // Resolve conflicts
    resolveConflicts(timetable);
  
    return timetable;
  }
  
  function initializeTimetable(timeSlots, daysOfWeek) {
    const timetable = [];
    for (let i = 0; i < timeSlots.length; i++) {
      timetable.push([]);
      for (let j = 0; j < daysOfWeek.length; j++) {
        timetable[i].push(null);
      }
    }
    return timetable;
  }
  
  function isLecturerAvailable(lecturers, classObj, timeSlot) {
    // Check if the lecturer is available at the current time slot
    const lecturer = lecturers.find((lecturer) => lecturer.id === classObj.lecturer);
    return lecturer && !lecturer.unavailable.includes(timeSlot);
  }
  
  function isLectureRoomAvailable(lectureRooms, timeSlot) {
    // Check if the lecture room is available at the current time slot
    return lectureRooms.find((room) => room.unavailable.includes(timeSlot)) === undefined;
  }
  
  function isTimeSlotConflict(timetable, timeSlot, lectureRoom) {
    // Check if there's a conflict at the current time slot and lecture room
    return timetable[timeSlot].find((classObj) => classObj && classObj.lectureRoom === lectureRoom) !== undefined;
  }
  
  function assignClassToTimetable(timetable, classObj, timeSlot, lectureRoom) {
    // Assign the class to the time slot and lecture room
    timetable[timeSlot][lectureRoom] = classObj;
  }
  
  function resolveConflicts(timetable) {
    // Resolve conflicts by swapping classes with alternative time slots and lecture rooms
    // TO DO: implement conflict resolution logic
  }
  


  async function getTimetable(req, res) {
    try {
      const timetable = await generatetimetableModel.findOne({}).exec();
      if (!timetable) {
        return res.status(404).json({ success: false, message: "Timetable not found" });
      }
      res.json({ success: true, timetable: timetable.timetable });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error retrieving timetable" });
    }
  }

module.exports = {addTimetable, collectData, generateTimetable, getTimetable}