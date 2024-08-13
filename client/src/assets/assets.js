import lecturerImage from './businessman-with-chart.jpg'
import adminBlock from './adminblock.jpg'
import studygroup from './study-group-african-people.jpg'
import logo from './logo.png'
import admin from './sysadmin_03.jpg'
import adminprofile from './adminprofile.png'
import courseicon from './course-icon.png'
import timeicon from './time-icon.png'
import clockPhoto from './clockandbooks.png'
import dashboardvector from './dashboardvector.png'
import lecturerooms from './lectureroom.png'
import personicon from './person-icon.png'
import tiemtableicon from './tiemtable-icon.png'
import dashboardvectorwhite from './whiteVector.png'
import whitelectureroom from './whitelectureroom.png'
import courses from './courses.png'
import cap from './cap.png'
import classes from './classes.png'
import whiteTimetableIcon from './whiteTimetable Icon.png'
import dClasses from './d-classes.png'

export const assets = {
    lecturerImage,
    adminBlock,
    studygroup,
    logo,
    admin,
    clockPhoto,
    personicon,
    tiemtableicon,
    dashboardvectorwhite,
    whitelectureroom,
    courses,
    cap,
    classes,
    whiteTimetableIcon
}


export const studentInfo = 
    {
        name : "ALEX ASAMOAH",
        indexnumber : 4211231920,
        email : "asamoah.baffour@gmail.com",
        faculty: "FACULTY OF COMPUTING AND INFORMATION SYSTEMS",
        program : "COMPUTER SCIENCE",
        level : 200,
        session : "MORNING",
        phone : "0235498675",
        campus : "MAIN CAMPUS - ABEKA"
    }



export const lecturerInfo = 
    {
        name : "BENSON AMFO",
        email: "amfobenson@live.gctu.edu.gh",
        faculty: "FACULTY OF COMPUTING AND INFORMATION SYSTEMS",
        department : "COMPUTER SCIENCE",
        phone: "0238456789",
        campus : "MAIN CAMPUS - ABEKA"
    }


    export const adminstratorinfo = 
{
        name : "OBED EWUDZIE",
        email : "ewudzieobed@live.gctu.edu.gh",
        phone : "0239494316",
        team : "GENERAL STAFF",
        campus : "MAIN CAMPUS - ABEKA",
        profileImage : adminprofile
}   


export const sidebardata = [
    {
        title : "Dashboard",
        icon : dashboardvector,
        link : "/dashboard"
    },

    {
        title : "Lecture Rooms",
        icon : lecturerooms,
        link : "/lecturerooms"
    },

    {
        title : "Lecturers Available",
        icon : personicon,
        link : "/lecturersavailable"
    },

    {
        title : "Courses Available",
        icon : courseicon,
        link : "/coursesavailable"
    },

    {
        title : "Time & Schedule",
        icon : timeicon,
        link : "/timeandschedule"
    },

    {
        title : "Classes",
        icon : dClasses,
        link : "/classes"
    }
]