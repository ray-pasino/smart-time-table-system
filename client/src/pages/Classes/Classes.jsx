import React, { useState, useContext, useEffect } from 'react';
import './Classes.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Adminheader from '../../components/Adminheader/Adminheader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { StoreContext } from '../../context/Storecontext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Classes = () => {
  const { url } = useContext(StoreContext);
  const [Clclicked, setClClicked] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editClassId, setEditClassId] = useState(null);

  const [data, setData] = useState({
    className: "",
    course: "",
    semester: "",
    meetings: "",
    population: "",
    unavailablerooms: []
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoomsChange = (event) => {
    const selectedRooms = Array.from(event.target.selectedOptions, option => option.value).filter(room => room !== "");
    setData(data => ({ ...data, unavailablerooms: selectedRooms }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const response = await axios.post(`${url}/api/class/add`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data.success) {
      setData({
        className: "",
        course: "",
        semester: "",
        meetings: "",
        population: "",
        unavailablerooms: []
      });
      toast.success(response.data.message);
      fetchList();
      handleClosed();
    } else {
      toast.error(response.data.message);
    }
  };

  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/class/list`);

    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const onEditSubmitHandler = async (event) => {
    event.preventDefault();
    const response = await axios.put(`${url}/api/class/update/${editClassId}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data.success) {
      toast.success(response.data.message);
      setData({
        className: "",
        course: "",
        semester: "",
        meetings: "",
        population: "",
        unavailablerooms: []
      });
      fetchList();
      handleCloseEdit();
    } else {
      toast.error(response.data.message);
    }
  };

  const handleCloseEdit = () => setEdit(false);

  const removeItem = async (classId) => {
    const response = await axios.post(`${url}/api/class/remove`, { id: classId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  const handleEdit = (id) => {
    const selectedClass = list.find(lecture => lecture._id === id);
    if (selectedClass) {
      setData({
        className: selectedClass.className,
        course: selectedClass.course,
        semester: selectedClass.semester,
        meetings: selectedClass.meetings,
        population: selectedClass.population,
        unavailablerooms: selectedClass.unavailablerooms
      });
      setEditClassId(id);
      setEdit(true);
    }
  };

  const handleClicked = () => {
    setClClicked(true);
  };

  const handleClosed = () => {
    setClClicked(false);
  };

  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${url}/api/course/list`);
      if (response.data.success) {
        const courseNames = response.data.data.map(course => course.name);
        setCourses(courseNames);
      } else {
        toast.error("Failed to fetch courses.");
      }
    } catch (error) {
      toast.error("Error fetching courses.");
    }
  };

  const [rooms, setRooms] = useState([]);

  const fetchRoom = async () => {
    try {
      const response = await axios.get(`${url}/api/room/list`);
      if (response.data.success) {
        setRooms(response.data.data);
      } else {
        toast.error("Failed to fetch rooms.");
      }
    } catch (error) {
      toast.error("Error fetching rooms.");
    }
  };

  useEffect(() => {
    fetchList();
    fetchCourses();
    fetchRoom();
  }, []);

  return (
    <div>
      <div className='flex'>
        <Sidebar />
        <div className="right">
          <Adminheader />
          <div className="dashboard-info m-5">
            <div className="dashboard-title text-b-blue font-bold text-3xl mb-8">WELCOME ADMINISTRATOR</div>

            <div className="small-title-container p-3 rounded-xl flex justify-between">
              <div className="search-container flex text-white w-60 p-1 space-x-2 rounded-xl">
                <input type="text" placeholder='Search' className='search-input w-60 h-10 bg-inherit text-xl' />
                <FontAwesomeIcon icon={faSearch} className='mt-2 search-icon text-2xl' />
              </div>

              <div className="add-room rounded-xl text-white text-xl font-bold p-2 shadow-md cursor-pointer" onClick={handleClicked}>
                <p>Add New Class</p>
              </div>
            </div>

            {/* list classes */}
            <div className="lecturer-list flex flex-col mt-4">
              <p className='text-2xl mb-4'>CLASSES AVAILABLE</p>
              <div className="list-table">
                <div className="list-title flex justify-between text-left">
                  <b className="w-2/12">Name</b>
                  <b className="w-2/12">Population</b>
                  <b className="w-2/12">Courses</b>
                  <b className="w-2/12">Unavailable Rooms</b>
                  <b className="w-1/12">Action</b>
                </div>
                {list.map((sclass, index) => (
                  <div key={index} className='list-table-format flex justify-between border-b border-gray-400 py-4'>
                    <p className="w-2/12">{sclass.className}</p>
                    <p className="w-2/12">{sclass.population}</p>
                    <div className="w-2/12">
                      <p>{sclass.semester}</p>
                      <p>{sclass.course}</p>
                    </div>
                    <p className="w-2/12">{sclass.unavailablerooms.join(', ')}</p>
                    <p className='flex space-x-4 text-gray-400 cursor-pointer w-1/12'>
                      <FontAwesomeIcon icon={faTrash} onClick={() => removeItem(sclass._id)} />
                      <FontAwesomeIcon icon={faPenToSquare} onClick={() => handleEdit(sclass._id)} />
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>


        {Clclicked && (
          <>
            <div className='modal-shadow' onClick={handleClosed}></div>
            <div className="add-room-modal rounded-md">
              <div className="add-room-modal-title font-bold text-center text-2xl text-white p-4">ADD NEW CLASS</div>
              <form className="modal-body p-6 space-y-10" onSubmit={onSubmitHandler}>

                <div className="room-name flex flex-col text-xl">
                  <label htmlFor="className">Class Name</label>
                  <input type="text" className='room-input bg-inherit rounded-md h-6' name='className' onChange={onChangeHandler} value={data.className} />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="course">Course</label>
                  <select className="bg-inherit border border-black rounded-md p-2" name='course' onChange={onChangeHandler} value={data.course}>
                    <option value="">Select a course</option>
                    {courses.map((course, i) => (
                      <option key={i} value={course}>{course}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="semester">Academic Period</label>
                  <select className="bg-inherit border border-black rounded-md p-2" name='semester' onChange={onChangeHandler} value={data.semester}>
                    <option value="">Select an academic period</option>
                    <option value="First Semester">First Semester</option>
                    <option value="Second Semester">Second Semester</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="meetings">Meetings Per Week</label>
                  <select className="bg-inherit border border-black rounded-md p-2" name='meetings' onChange={onChangeHandler} value={data.meetings}>
                    <option value="">Select number of meetings</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>

                <div className='flex flex-col'>
                  <label htmlFor="population">Population</label>
                  <input type="text" className='room-input bg-inherit rounded-md h-6' name='population' onChange={onChangeHandler} value={data.population} />
                </div>

                <div className='flex flex-col'>
                  <label htmlFor="unavailablerooms">Unavailable Lecture Rooms</label>
                  <select
                    className="bg-inherit border border-black rounded-md p-2"
                    name='unavailablerooms'
                    onChange={handleRoomsChange}
                    value={data.unavailablerooms}
                    multiple
                  >
                    <option value="">Select unavailable rooms</option>
                    {rooms.map((room, i) => (
                      <option key={i} value={room.roomname}>
                        {room.roomname}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-40 text-white font-bold button-case">
                  <button type="button" className='cancel rounded-md p-2 w-40' onClick={handleClosed}>Cancel</button>
                  <button type="submit" className='generate rounded-md p-2 w-40'>Add Class</button>
                </div>

              </form>
            </div>
          </>
        )}





        {edit && 
        
        <>
           <div className='modal-shadow' onClick={handleCloseEdit}></div>
            <div className="add-room-modal rounded-md">
              <div className="add-room-modal-title font-bold text-center text-2xl text-white p-4">ADD NEW CLASS</div>
              <form className="modal-body p-6 space-y-10" onSubmit={onEditSubmitHandler}>

                <div className="room-name flex flex-col text-xl">
                  <label htmlFor="className">Class Name</label>
                  <input type="text" className='room-input bg-inherit rounded-md h-6' name='className' onChange={onChangeHandler} value={data.className} />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="course">Course</label>
                  <select className="bg-inherit border border-black rounded-md p-2" name='course' onChange={onChangeHandler} value={data.course}>
                    <option value="">Select a course</option>
                    {courses.map((course, i) => (
                      <option key={i} value={course}>{course}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="semester">Academic Period</label>
                  <select className="bg-inherit border border-black rounded-md p-2" name='semester' onChange={onChangeHandler} value={data.semester}>
                    <option value="">Select an academic period</option>
                    <option value="First Semester">First Semester</option>
                    <option value="Second Semester">Second Semester</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="meetings">Meetings Per Week</label>
                  <select className="bg-inherit border border-black rounded-md p-2" name='meetings' onChange={onChangeHandler} value={data.meetings}>
                    <option value="">Select number of meetings</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>

                <div className='flex flex-col'>
                  <label htmlFor="population">Population</label>
                  <input type="text" className='room-input bg-inherit rounded-md h-6' name='population' onChange={onChangeHandler} value={data.population} />
                </div>

                <div className='flex flex-col'>
                  <label htmlFor="unavailablerooms">Unavailable Lecture Rooms</label>
                  <select
                    className="bg-inherit border border-black rounded-md p-2"
                    name='unavailablerooms'
                    onChange={handleRoomsChange}
                    value={data.unavailablerooms}
                    multiple
                  >
                    <option value="">Select unavailable rooms</option>
                    {rooms.map((room, i) => (
                      <option key={i} value={room.roomname}>
                        {room.roomname}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-40 text-white font-bold button-case">
                  <button type="button" className='cancel rounded-md p-2 w-40' onClick={handleCloseEdit}>Cancel</button>
                  <button type="submit" className='generate rounded-md p-2 w-40'>Save Changes</button>
                </div>

              </form>
            </div>
        </>
        }
      </div>
    </div>
  );
}

export default Classes;
