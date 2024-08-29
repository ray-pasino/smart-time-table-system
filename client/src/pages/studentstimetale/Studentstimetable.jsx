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
  const [data, setData] = useState({
    days: JSON.parse(localStorage.getItem('selectedDays')) || []
  });
  const [StudentProgram, setStudentProgram] = useState("")

  // Fetch timetable data
  const fetchTimetable = async () => {
    try {
      const response = await axios.get(`${url}/api/timetable/timetable`, {
        headers: {
          Authorization: `Bearer ${token}` // Send the JWT token for authentication
        }
      });
      console.log('Timetable data received:', response.data); // Log received data
      setTimetable(response.data.timetable || []);
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

  useEffect(() => {
    fetchTimetable(); // Initial fetch for timetable data
    fetchStudentInfo()
  }, []);
  
  const [bellClicked, setbellClicked] = useState(false)

const handlebellClicked = () => {
  setbellClicked(!bellClicked)
}

if(bellClicked === false){
  toast.success("You will now receive SMS notifications on you time table schedule")
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
                      {filteredTimetable[semester][className].map((item, index) => (
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
                      ))}
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
          <FontAwesomeIcon icon={faBellSlash} className='cursor-pointer ms-4 text-blue-600' onClick={handlebellClicked}/>
          :
          <FontAwesomeIcon icon={faBell} className='cursor-pointer ms-4 text-blue-600' onClick={handlebellClicked} shake/>

        }
        </p>
</div>
    </div>
  );
};

export default Studentstimetable;