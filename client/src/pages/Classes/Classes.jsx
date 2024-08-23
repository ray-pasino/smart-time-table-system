import React, {useState, useContext, useEffect} from 'react'
import './Classes.css'
import Sidebar from '../../components/sidebar/Sidebar'
import './Classes.css'
import Adminheader from '../../components/Adminheader/Adminheader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTrash, faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import { StoreContext } from '../../context/Storecontext'
import axios from 'axios'
import {toast} from 'react-toastify'

const Classes = () => {

  const {url} = useContext(StoreContext)
  const [Clclicked, setClClicked] = useState(false)
  const [edit, setEdit] = useState(false)
  const [editClassId, seteditClassId] = useState(null);

  const [data, setData] = useState({
    className:"",
    course:"",
    semester:"",
    meetings:"",
    population:"",
    unavailablerooms: []
})


const onChangeHandler = (event)=>{
  const name = event.target.name 
  const value = event.target.value 
  setData(data => ({...data,[name]:value}))
}

const handleRoomsChange = (event) => {
  const selectedRooms = Array.from(event.target.selectedOptions, option => option.value);
  setData(data => ({ ...data, unavailablerooms: selectedRooms }));
};

const onSubmitHandler = async (event) =>{
  event.preventDefault()

  const response = await axios.post(`${url}/api/class/add`, data, {
    headers: {
        'Content-Type': 'application/json'
    }
});

  if (response.data.success){
      setData({
        className:"",
        course:"",
        semester:"",
        meetings:"",
        population:"",
        unavailablerooms: []
      })
      toast.success(response.data.message)
      //refresh table
      fetchList()
      //close modal
      handleClosed()
  }else{
      toast.error(response.data.message)
  }
}


const [list, setList] = useState([])

///fetching list from the database
const fetchList = async ()=> {
  const response = await axios.get(`${url}/api/class/list`)

  if(response.data.success){
    setList(response.data.data)
  }else{
    toast.error("Error")
  }
}

// submitting edited info
const oneditsubmitHandler = async (event)=>{
  event.preventDefault()
  const response = await axios.put(`${url}/api/course/update/${editClassId}`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
})

if (response.data.success) {
  toast.success(response.data.message);
  setData({
    className:"",
    course:"",
    semester:"",
    meetings:"",
    population:"",
    unavailablerooms: []
  });
  fetchList();
  handleCloseEdit();
} else {
  toast.error(response.data.message);
}

}

const handleCloseEdit = () => setEdit(false)

//remove item
const removeItem = async (classId)=>{
  const response = await axios.post(`${url}/api/class/remove`, {id:classId})
  await fetchList()
  if(response.data.success){
    toast.success(response.data.message)
  }else{
    toast.error("Error")
  }
}

const handleEdit = (id) => {
  const selectedClass = list.find(lecturer => lecturer._id === id);
  if (selectedClass) {
    setData({
      className:selectedClass.className,
      course:selectedClass.course,
      semester:selectedClass.semester,
      meetings:selectedClass.meetings,
      population:selectedClass.population,
      unavailablerooms:selectedClass.unavailablerooms
    });
    // Set the clicked course ID in the state (you can track it for update purposes
    seteditClassId(id);
    // Open the edit modal
    setEdit(true);
  }
}

  const handleClicked = ()=>{
    setClClicked(true)
  }

    const handleClosed = () =>{
        setClClicked(false)
      }

const [courses, setCourses] = useState([]);


    // fetch course
const fetchCourses = async () => {
  try {
    const response = await axios.get(`${url}/api/course/list`);
    if (response.data.success) {
      // Map through the array to get only the course names
         const courseNames = response.data.data.map(course => course.name);
         setCourses(courseNames);
    } else {
      toast.error("Failed to fetch courses.");
    }
  } catch (error) {
    toast.error("Error fetching courses.");
  }
};

const [rooms, setRooms] = useState([])
    // fetch lecture rooms
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`${url}/api/room/list`);
        if (response.data.success) {
          setRooms(response.data.data);
          console.log(rooms)
        } else {
          toast.error("Failed to fetch rooms.");
        }
      } catch (error) {
        toast.error("Error fetching rooms.");
      }
    };

useEffect(() => {
  fetchList();
  fetchCourses()
  fetchRoom()
}, []);
  return (
    <div>
       <div className='flex'>
        <Sidebar/>
        <div className="right">
        <Adminheader/>           
        <div className="dashboard-info m-5">
          <div className="dashboard-title text-b-blue font-bold text-3xl mb-8">WELCOME ADMINISTRATOR</div>

          <div className="small-title-container p-3 rounded-xl flex justify-between">
            <div className="search-container flex text-white w-60 p-1 space-x-2 rounded-xl">
                  <input type="text" placeholder='Search' className='search-input w-60 h-10 bg-inherit text-xl' />
                 <FontAwesomeIcon icon={faSearch} className='mt-2 search-icon text-2xl'/>
            </div>

            <div className="add-room rounded-xl text-white text-xl font-bold p-2 shadow-md cursor-pointer" onClick={handleClicked}>
              <p>Add New Class</p>
            </div>
          </div>

          {/* list classes */}
          <div className="lectuter-list flex flex-col mt-4">
          <p className='text-2xl mb-4'>CLASSES AVAILABLE</p>
          <div className="list-table">
            <div className="list-title flex justify-between text-left">
            <b className="w-2/12">Name</b>
            <b className="w-2/12">Population</b>
            <b className="w-2/12">Courses</b>
            <b className="w-2/12">Unavailable Rooms</b>
            <b className="w-1/12">Action</b>
            </div>
            {list.map((sclass ,index)=>{
          return(
            <div key={index}  className='list-table-format flex justify-between border-b border-gray-400 py-4'>
                <p className="w-2/12">{sclass.className}</p>
                <p className="w-2/12">{sclass.population}</p>
                <div className="w-2/12">
                <p>{sclass.semester}</p>
                <p>{sclass.course}</p>
                </div>
                <p className="w-2/12">{sclass.unavailablerooms}</p>
                <p className='flex space-x-4 text-gray-400 cursor-pointer w-1/12'>
                <FontAwesomeIcon icon={faTrash} onClick={()=>removeItem(sclass._id)}/>
                <FontAwesomeIcon icon={faPenToSquare} onClick={() => handleEdit(sclass._id)}/>
                </p>
            </div>
          )
        })}
          </div>
        </div>

        </div>
        </div>
       


        {Clclicked &&
      
      
      <>
      <div className='modal-shadow' onClick={handleClosed}></div>
      <div className="add-room-modal rounded-md">
      <div className="add-room-modal-title font-bold text-center text-2xl text-white p-4">ADD NEW CLASS</div>
      <form className="modal-body p-6 space-y-10" onSubmit={onSubmitHandler}>

        <div className="room-name flex flex-col text-xl">
          <label htmlFor="room-name">Class Name</label>
          <input type="text" className='room-input bg-inherit rounded-md h-6' name='className' onChange={onChangeHandler} value={data.className}/>
        </div>

        <div>
          <h2 className='text-2xl'>Courses</h2>
        </div>

                      
                  <div className="flex space-x-4">
                    <div className="flex flex-col">
                      <p>Course</p>
                      <select className="bg-inherit border border-black rounded-md p-2" name='course' onChange={onChangeHandler} value={data.course}>
                      <option value="">Select a course</option>
      {courses.map((course, i) => (
    <option key={i} value={course}>{course}</option> // Use course directly as it's now just the name
  ))}
                      </select>
                    </div>

                    <div className="flex flex-col">
                      <p>Academic Period</p>
                      <select className="bg-inherit border border-black rounded-md p-2" name='semester' onChange={onChangeHandler} value={data.semester}>
                        <option value="">Select an academic period</option>
                        <option value="First Semester">First Semester</option>
                        <option value="Second Semester">Second Semester</option>
                      </select>
                    </div>

                    <div className="flex flex-col">
                      <p>Meetings Per Week</p>
                      <select className="bg-inherit border border-black rounded-md p-2" name='meetings' onChange={onChangeHandler} value={data.meetings}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select>
                    </div>
                  </div>
          

            <div className='flex flex-col'>
            <label htmlFor="population">Population</label>
            <input type="text" className='room-input bg-inherit rounded-md h-6' name='population' onChange={onChangeHandler} value={data.population}/>
            </div>

            <div className='flex flex-col'>
                  <label htmlFor="unavailablerooms">Unavailable Lecture Rooms</label>
                  <select name="unavailablerooms" className="room-input bg-inherit rounded-md" onChange={handleRoomsChange} value={data.unavailablerooms} multiple>
                    {rooms.map((room, i) => (
                      <option key={i} value={room.name}>{room.name}</option>
                    ))}
                  </select>
                </div>

    <div className="flex space-x-40 text-white font-bold button-case">
              <button className='cancel rounded-md p-2 w-40'onClick={handleClosed} >Cancel</button>
              <button className='generate rounded-md p-2 w-40'>Add Class</button>
    </div>


      </form>
      </div>
      </>
  }

      </div>
    </div>
  )
}

export default Classes
