const mongoose = require("mongoose");

const generatetimetableSchema = new mongoose.Schema({
    name: { type: String, required: true },
    semester: { type: String, required: true },
    timetable: { type: Array, default: [] } // Add timetable field
});

const generatetimetableModel = mongoose.models.timetable || mongoose.model("timetable", generatetimetableSchema);

module.exports = generatetimetableModel;
