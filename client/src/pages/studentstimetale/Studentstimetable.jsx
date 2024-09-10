import React, { useState, useEffect, useContext } from 'react';
import './studentstimetable.css';
import Studentheader from '../../components/studentheader/Studentheader';
import axios from 'axios';
import { StoreContext } from '../../context/Storecontext';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBellSlash, faBell} from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';


const Studentstimetable = () => {
  const { url, token } = useContext(StoreContext);
  const [timetable, setTimetable] = useState([]);
  const [StudentPhoneNumbers ,setStudentPhoneNumbers] = useState()
  const [data, setData] = useState({
    days: JSON.parse(localStorage.getItem('selectedDays')) || []
  });
  const [StudentProgram, setStudentProgram] = useState("")

  // Fetch timetable data
  const fetchTimetable = async () => {
    try {
      const response = await axios.get(`${url}/api/timetable/timetable`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send the JWT token for authentication
        },
      });
      console.log('Timetable data received:', response.data); // Log received data
      setTimetable(response.data.timetable || []);
  
      // Schedule SMS notifications 1 hour before each class
      response.data.timetable.forEach((entry) => {
        const timeDifference = calculateTimeDifference(entry.time);
        if (timeDifference) {
          setTimeout(() => {
            sendSMSNotification(entry.course, entry.time); // Send SMS 1 hour before the class starts
          }, timeDifference);
        }
      });
    } catch (error) {
      console.error('Error fetching timetable:', error);
    }
  };

  const fetchStudentInfo = async () => {
    try {
      const response = await axios.get(`${url}/api/student/info`, {
        headers: {
          Authorization: `Bearer ${token}` // Send the JWT token for authentication
        }
      });
      
      if (response.data.success) {
        setStudentProgram(response.data.data.program); // Store the student's program in state
      }
    } catch (error) {
      console.error('Error fetching student info:', error);
    }
  }



  
  //fetch student phone numbers
const fetchStudentPhoneNumbers = async () => {
  try {
    const response = await axios.get(`${url}/api/student/information`, {
    });
    
    if (response.data.success) {
      const phoneNumbers = response.data.data.map(student => student.phone); // Extract phone numbers from each student
      setStudentPhoneNumbers(phoneNumbers); // Store all student phone numbers in state
    }
  } catch (error) {
    console.error('Error fetching student phone numbers:', error);
  }
}


//calculate time difference

const calculateTimeDifference = (classTime) => {
  const currentTime = new Date();
  const [classHour, classMinute] = classTime.split(":").map(Number);

  const classDateTime = new Date(currentTime);
  classDateTime.setHours(classHour, classMinute, 0, 0);

  // Get time difference in milliseconds
  const timeDiff = classDateTime - currentTime;

  // If class is more than an hour away, return time difference minus 1 hour
  if (timeDiff > 3600000) {
    return timeDiff - 3600000; // 1 hour in milliseconds
  }
  return null;
};


//scheduled sms
const sendSMSNotification = (course, time) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "App cf978b239a4ad027dbf294e9dea2fb44-c898061c-788d-4efb-a992-3a81ef684be6")
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");

  const messages = StudentPhoneNumbers.map((phoneNumber) => ({
    destinations: [{ to: phoneNumber }],
    from: "GCTU",
    text: `Reminder: Your class ${course} starts at ${time}. Please be prepared.`,
  }));

  const raw = JSON.stringify({ messages });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://m32ew9.api.infobip.com/sms/2/text/advanced", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
};



  useEffect(() => {
    fetchTimetable(); // Initial fetch for timetable data
    fetchStudentInfo()
    fetchStudentPhoneNumbers()
  }, []);
  
  const [bellClicked, setbellClicked] = useState(false)

const handlebellClicked = () => {
  setbellClicked(!bellClicked)
}

if(bellClicked === true){
  toast.success("You will now receive SMS notifications on you time table schedule")


         // Trigger SMS notification after Student allows notifications

         const myHeaders = new Headers();
         myHeaders.append("Authorization", "App cf978b239a4ad027dbf294e9dea2fb44-c898061c-788d-4efb-a992-3a81ef684be6")
         myHeaders.append("Content-Type", "application/json");
         myHeaders.append("Accept", "application/json");
         


         const messages = StudentPhoneNumbers.map((phoneNumber) => ({
          destinations: [{ to: phoneNumber }],
          from: "GCTU",
          text: "Dear Student, you will now receive SMS notifications on your timetable schedule.",
        }));

        const raw = JSON.stringify({ messages });
   
         const requestOptions = {
           method: "POST",
           headers: myHeaders,
           body: raw,
           redirect: "follow"
         };
   
         fetch("https://m32ew9.api.infobip.com/sms/2/text/advanced", requestOptions)
           .then((response) => response.text())
           .then((result) => console.log(result))
           .catch((error) => console.error(error));

}

  const groupedTimetable = timetable.flat().reduce((acc, item) => {
    if (item.className === StudentProgram) { // Filter only the student's program
      const { Semester, className, ...rest } = item;
      if (!acc[Semester]) {
        acc[Semester] = {};
      }
      if (!acc[Semester][className]) {
        acc[Semester][className] = [];
      }
      acc[Semester][className].push(rest);
    }
    return acc;
  }, {});

  const filteredTimetable = Object.keys(groupedTimetable).reduce((acc, semester) => {
    acc[semester] = { [StudentProgram]: groupedTimetable[semester][StudentProgram] };
    return acc;
  }, {});



  return (
    <div className='studentstimetable'>
      <Studentheader />
      <div className='timetable-section'>

        {Object.keys(filteredTimetable).length === 0 ? (
          <div className="no-timetable text-center text-xl text-red-500 font-bold">
            No timetables available for {StudentProgram} course
          </div>
        ) : (
          Object.keys(filteredTimetable).map((semester, index) => (
            <div key={index} className="semester-timetable">
              <h2 className="text-xl font-bold">{semester}</h2>
              {Object.keys(filteredTimetable[semester]).map((className, idx) => (
                <div key={idx} className="class-timetable">
                  <h3 className="font-bold">{className}</h3>
                  <table className="timetable-table">
                    <thead>
                      <tr>
                        <th>Time</th>
                        {data.days.map((day, dayIndex) => (
                          <th key={dayIndex}>{day}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                    {filteredTimetable[semester][className].map((item, index) => {
    console.log(`Time: ${item.time}, Course: ${item.course}`); // Log time and course
    return (
      <tr key={index}>
        <td>{item.time}</td>
        {data.days.map((day, dayIndex) => (
          <td key={dayIndex}>
            {item.day === day ? (
              <>
                <p>{item.course}</p>
                <p>{item.room}</p>
                <p>{item.lecturer}</p>
              </>
            ) : null}
          </td>
        ))}
      </tr>
    );
  })}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ))
        )}
      </div>

<div className="notification-container ">

        <p className='font-bold text-b-blue text-xl'>Click on the bell icon to receive daily notifications on your Timetable Schedule
          {bellClicked ?
          <FontAwesomeIcon icon={faBell} className='cursor-pointer ms-4 text-blue-600' onClick={handlebellClicked} shake/>
          :
          <FontAwesomeIcon icon={faBellSlash} className='cursor-pointer ms-4 text-blue-600' onClick={handlebellClicked} />

        }
        </p>
</div>
    </div>
  );
};

export default Studentstimetable;