import React, { useState, useContext, useEffect } from 'react';
import './Dashboard.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Adminheader from '../../components/Adminheader/Adminheader';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/Storecontext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { url } = useContext(StoreContext);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [lecturerCount, setLecturerCount] = useState(0);
  const [roomCount, setRoomCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [classCount, setClassCount] = useState(0);
  const [timetable, setTimetable] = useState([]);
  const [data, setData] = useState({
    name: "",
    semester: "",
    days: []
  });

  // Fetch data from API
  const fetchCounts = async () => {
    try {
      const [lecturerRes, roomRes, courseRes, classRes] = await Promise.all([
        axios.get(`${url}/api/lecturer/count`),
        axios.get(`${url}/api/room/count`),
        axios.get(`${url}/api/course/count`),
        axios.get(`${url}/api/class/count`)
      ]);

      setLecturerCount(lecturerRes.data.count);
      setRoomCount(roomRes.data.count);
      setCourseCount(courseRes.data.count);
      setClassCount(classRes.data.count);
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };

  // Fetch timetable data
  const fetchTimetable = async () => {
    try {
      const response = await axios.get(`${url}/api/timetable/timetable`);
      console.log('Timetable data received:', response.data); // Log received data
      setTimetable(response.data.timetable || []);
    } catch (error) {
      console.error('Error fetching timetable:', error);
    }
  };
  
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDayChange = (event) => {
    const { value, checked } = event.target;
    setData((prevData) => {
      if (checked) {
        return {
          ...prevData,
          days: [...prevData.days, value]
        };
      } else {
        return {
          ...prevData,
          days: prevData.days.filter((day) => day !== value)
        };
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!data.name || !data.semester || data.days.length === 0) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post(`${url}/api/timetable/timetable`, data, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        toast.success("Timetable generated successfully!");
        setButtonClicked(false);
        fetchTimetable(); // Refresh timetable data
      } else {
        toast.error("Failed to generate timetable.");
        setButtonClicked(false);
      }
    } catch (error) {
      console.error('Error generating timetable:', error);
      toast.error("Error occurred while generating timetable.");
    }
  };

  useEffect(() => {
    fetchCounts();
    fetchTimetable(); // Initial fetch for timetable data
  }, []);

  const handleButtonClicked = () => {
    setButtonClicked(true);
  };

  const closeModal = () => {
    setButtonClicked(false);
  };

  return (
    <div className='dashboard'>
      <div className='flex'>
        <Sidebar />
        <div className="right">
          <Adminheader />
          <div className="dashboard-info m-5">
            <div className="dashboard-title text-b-blue font-bold text-3xl mb-8">WELCOME ADMINISTRATOR</div>
            <div className="small-title-container p-3 rounded-xl">
              <div className="small-title flex bg-b-blue text-white w-60 p-4 space-x-2 rounded-xl">
                <img src={assets.dashboardvectorwhite} className='h-8' />
                <p className='font-bold text-2xl'>Dashboard</p>
              </div>
            </div>
            <div className="dashboard-stat flex mt-12 md:space-x-2 lg:space-x-24 justify-center">
              <div className="lecture-rooms text-white font-bold rounded-xl h-48 w-64 p-2 showdow-xl">
                <div className='flex mb-8'>
                  <span className='text-md lg:text-2xl'>LECTURE ROOMS</span>
                  <img src={assets.whitelectureroom} className='h-12 w-16' />
                </div>
                <div className="number font-bold text-6xl">{roomCount}</div>
              </div>
              <div className="courses text-white font-bold rounded-md w-64 p-2 showdow-xl">
                <div className='flex space-x-8 mb-8'>
                  <span className='text-md lg:text-2xl'>COURSES</span>
                  <img src={assets.courses} className='h-12 w-16' />
                </div>
                <div className="number font-bold text-6xl">{courseCount}</div>
              </div>
              <div className="lecturers text-white font-bold rounded-md w-64 p-2 showdow-xl">
                <div className='flex space-x-8 mb-8'>
                  <span className='text-2xl'>LECTURERS</span>
                  <img src={assets.cap} className='h-12 w-16' />
                </div>
                <div className="number font-bold text-6xl">{lecturerCount}</div>
              </div>
              <div className="classes text-white font-bold rounded-md w-64 p-2 showdow-xl">
                <div className='flex space-x-8 mb-8'>
                  <span className='text-2xl'>CLASSES</span>
                  <img src={assets.classes} className='h-12 w-16' />
                </div>
                <div className="number font-bold text-6xl">{classCount}</div>
              </div>
            </div>
            <div className="button-container flex justify-center">
              <button className='bg-b-blue mt-40 flex flex-col items-center p-4 rounded-lg space-y-2' onClick={handleButtonClicked}>
                <img src={assets.whiteTimetableIcon} />
                <p className='font-bold text-white text-xl'>GENERATE NEW TIMETABLE</p>
              </button>
            </div>

          <div className="timetable-container mt-10">
  {timetable.length > 0 ? (
    timetable.map((row, rowIndex) => (
      <div key={rowIndex} className="timetable-row mb-10">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Lecturer</th>
              <th className="px-4 py-2">Course</th>
              <th className="px-4 py-2">Room</th>
              <th className="px-4 py-2">Class</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Semester</th>
            </tr>
          </thead>
          <tbody>
            {row.map((cell, cellIndex) => (
              <tr key={cellIndex}>
                <td className="border px-4 py-2">{cell.lecturer}</td>
                <td className="border px-4 py-2">{cell.course}</td>
                <td className="border px-4 py-2">{cell.room}</td>
                <td className="border px-4 py-2">{cell.className}</td>
                <td className="border px-4 py-2">{cell.time}</td>
                <td className="border px-4 py-2">{cell.Semester}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))
  ) : (
    <p>No timetable data available</p>
  )}
</div>


          </div>
        </div>
        {buttonClicked && (
          <>
            <div className='generate-timetable-modal-shadow' onClick={closeModal}></div>
            <div className='generate-timetable-modal rounded-2xl'>
              <div className="modal-title text-center text-2xl p-4 text-white font-bold">CREATE NEW TIMETABLE</div>
              <form className="modal-body space-y-10" onSubmit={handleSubmit}>
                <div className="timetable-name mx-20 flex flex-col mt-10">
                  <label htmlFor="time-table-name" className='text-2xl'>Timetable Name</label>
                  <input type="text" id='time-table-name' className='bg-inherit rounded-md' name='name' value={data.name} onChange={onChangeHandler} />
                </div>
                <div className="academic-period mx-20">
                  <label htmlFor="semester" className='block text-2xl'>Academic Period</label>
                  <select name="semester" id="semester" className='rounded-md' value={data.semester} onChange={onChangeHandler}>
                    <option value="">Select Academic Period</option>
                    <option value="Semester 1">Semester 1</option>
                    <option value="Semester 2">Semester 2</option>
                  </select>
                </div>
                <div className="week-days mx-20">
                  <h2 className='text-2xl'>Select Days</h2>
                </div>
                <div className="flex flex-col mx-20">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                    <div key={day} className='flex'>
                      <input type="checkbox" value={day} className='day-box h-4 mt-1' onChange={handleDayChange} />
                      <label htmlFor={day} className='ml-2'>{day}</label>
                    </div>
                  ))}
                </div>
                <div className="flex mx-20 space-x-40 text-white font-bold button-case">
                  <button type='button' className='cancel rounded-md p-2 w-40 mb-8' onClick={closeModal}>Cancel</button>
                  <button type='submit' className='generate rounded-md p-2 w-40 mb-8'>Generate</button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
