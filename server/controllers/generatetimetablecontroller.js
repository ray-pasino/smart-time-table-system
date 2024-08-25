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

// Generate timetable
function generateTimetable({ lecturers, courses, lectureRooms, timeSlots, setClasses}, daysOfWeek) {
  if (!Array.isArray(daysOfWeek) || daysOfWeek.some(day => typeof day !== 'string')) {
    console.error('Invalid daysOfWeek array:', daysOfWeek);
    return [];
  }

  const timetable = Array.from({ length: daysOfWeek.length }, () => 
    Array.from({ length: timeSlots.length }).fill(null)
  );

  // Generate the timetable using fetched data
  timeSlots.forEach((slot, timeIndex) => {
    daysOfWeek.forEach((day, dayIndex) => {
      
      const randomLecturer = lecturers[Math.floor(Math.random() * lecturers.length)]
      const randomRoom = lectureRooms[Math.floor(Math.random() * lectureRooms.length)];
      const randomClass = setClasses[Math.floor(Math.random() * setClasses.length)]
      
      // Find the lecturer for the selected class
      const lecturer = lecturers.find(lecturer => lecturer.course === randomClass.course);
      const lecturerName = lecturer ? lecturer.name : 'Unknown Lecturer';

      // Include the slot time in the timetable
      timetable[dayIndex][timeIndex] = {
        Semester: randomClass.semester,
        className: randomClass.className,
        course: randomClass.course,
        room: randomRoom ? randomRoom.roomname : 'Unknown Room',
        time: slot ? `${slot.startTime} - ${slot.endTime}` : 'Unknown Time', // Add time information from the slot
        lecturer: lecturerName // Use the lecturer associated with the course
      };
    });
  });

  console.log('Generated timetable with time:', timetable);
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

module.exports = { addTimetable, collectData, generateTimetable, getTimetable };
