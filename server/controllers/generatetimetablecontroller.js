const generatetimetableModel = require("../models/generatetimetablemodel");
const lecturerModel = require('../models/lecturerModel');
const courseModel = require('../models/courseModel');
const lectureroommodel = require("../models/lectureroommodel");
const timeModel = require('../models/timemodule');
const classModel = require("../models/classModel")


// Add timetable info
const addTimetable = async (req, res) => {
  const { name, semester, days } = req.body;

  // Create a new timetable entry
  const info = new generatetimetableModel({
    name,
    semester,
  });

  try {
    // Collect data for timetable generation
    const data = await collectData();
    if (!data) {
      return res.status(500).json({ success: false, message: "Error collecting data" });
    }

    console.log('Data for timetable generation:', data);

    // Generate timetable
    const timetable = generateTimetable(data, days);

    // Save the generated timetable
    info.timetable = timetable;
    await info.save();

    res.json({ success: true, message: "Timetable generated successfully", timetable });
  } catch (error) {
    console.error('Error Compiling Details For Timetable:', error);
    res.status(500).json({ success: false, message: "Error Compiling Details For Timetable" });
  }
};

// Collect data for timetable generation
async function collectData() {
  try {
    const lecturers = await lecturerModel.find().exec();
    console.log(`Fetched ${lecturers.length} lecturers`, lecturers);

    const courses = await courseModel.find().exec();
    console.log(`Fetched ${courses.length} courses`, courses);

    const lectureRooms = await lectureroommodel.find().exec();
    console.log(`Fetched ${lectureRooms.length} lecture rooms`, lectureRooms);

    const timeSlots = await timeModel.find().exec();
    console.log(`Fetched ${timeSlots.length} time slots`, timeSlots);

    const setClasses = await classModel.find().exec();
    console.log(`Fetched ${setClasses.length} classes `, setClasses);

    // Return data for timetable generation
    return { lecturers, courses, lectureRooms, timeSlots, setClasses};
  } catch (error) {
    console.error('Error collecting data:', error);
    return null;
  }
}

//Generate time table fuction
function generateTimetable({ lecturers, courses, lectureRooms, timeSlots, setClasses }, daysOfWeek) {
  const timetable = [];
  const assignedCourses = new Set(); // Track assigned courses
  const assignedSlots = new Array(timeSlots.length).fill().map(() => new Array(daysOfWeek.length).fill(0)); // Track assigned slots

  // Iterate through each day and each time slot
  daysOfWeek.forEach((day) => {
    timeSlots.forEach((slot, slotIndex) => {
      // Filter courses that haven't been assigned yet and haven't been assigned to this time slot and day
      const availableCourses = setClasses.filter(
        (cls) => !assignedCourses.has(cls.course) && assignedSlots[slotIndex][daysOfWeek.indexOf(day)] === 0
      );

      if (availableCourses.length === 0) return; // No more courses available

      // Pick a random course, lecturer, and room
      const randomLecturer = lecturers[Math.floor(Math.random() * lecturers.length)];
      const randomRoom = lectureRooms[Math.floor(Math.random() * lectureRooms.length)];
      const randomClass = availableCourses[Math.floor(Math.random() * availableCourses.length)];

      const lecturerName = randomLecturer ? randomLecturer.name : 'Unknown Lecturer';

      // Add the timetable entry
      timetable.push({
        Semester: randomClass.semester,
        className: randomClass.className,
        course: randomClass.course,
        room: randomRoom ? randomRoom.roomname : 'Unknown Room',
        time: `${timeSlots[slotIndex].startTime} - ${timeSlots[slotIndex].endTime}`,
        lecturer: lecturerName,
        day: day, // Add the day to the timetable entry
      });

      // Mark the course as assigned and mark the time slot and day as assigned
      assignedCourses.add(randomClass.course);
      assignedSlots[slotIndex][daysOfWeek.indexOf(day)] = 1;
    });
  });

  return timetable;
}




// Retrieve timetable info
async function getTimetable(req, res) {
  try {
    const timetable = await generatetimetableModel.findOne({}).exec();
    if (!timetable) {
      return res.status(404).json({ success: false, message: "Timetable not found" });
    }
    console.log('Returning timetable:', timetable.timetable); // Log the timetable
    res.json({ success: true, timetable: timetable.timetable });
  } catch (error) {
    console.error('Error retrieving timetable:', error);
    res.status(500).json({ success: false, message: "Error retrieving timetable" });
  }
}



//remove timetable
const removeTimeTable = async(req,res)=>{
  try{
      const timetable = await courseModel.generatetimetableModel(req.body.id)
      await timetable.findByIdAndDelete(req.body.id)
      res.json({success:true, message:"Timetable Deleted"})
  }catch(error){
      console.log(error)
      res.json({success:true, message:"Error"})
  }
}

module.exports = { addTimetable, collectData, generateTimetable, getTimetable, removeTimeTable};