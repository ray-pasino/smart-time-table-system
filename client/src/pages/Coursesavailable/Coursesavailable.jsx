import React, {useState, useContext, useEffect} from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import './Coursesavailable.css'
import Adminheader from '../../components/Adminheader/Adminheader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTrash, faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import { StoreContext } from '../../context/Storecontext'
import axios from 'axios'
import {toast} from 'react-toastify'


const Coursesavailable = () => {


  const {url} = useContext(StoreContext)
  const [edit, setEdit] = useState(false)
  const [editCourseId, seteditCourseId] = useState(null);

  const [data, setData] = useState({
    code:"",
    name:"",
    credithours:""
})

const onChangeHandler = (event)=>{
  const name = event.target.name 
  const value = event.target.value 
  setData(data => ({...data,[name]:value}))
}

const onSubmitHandler = async (event) =>{
  event.preventDefault()

  const response = await axios.post(`${url}/api/course/add`, data, {
    headers: {
        'Content-Type': 'application/json'
    }
});

  if (response.data.success){
      setData({
        code:"",
        name:"",
        credithours:""
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
  const response = await axios.get(`${url}/api/course/list`)

  if(response.data.success){
    setList(response.data.data)
  }else{
    toast.error("Error")
  }
}


// submitting edited info
const oneditsubmitHandler = async (event)=>{
  event.preventDefault()
  const response = await axios.put(`${url}/api/course/update/${editCourseId}`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
})

if (response.data.success) {
  toast.success(response.data.message);
  setData({
    code:"",
    name:"",
    credithours:""
  });
  fetchList();
  handleCloseEdit();
} else {
  toast.error(response.data.message);
}

}


//remove item
const removeItem = async (courseId)=>{
  const response = await axios.post(`${url}/api/course/remove`, {id:courseId})
  await fetchList()
  if(response.data.success){
    toast.success(response.data.message)
  }else{
    toast.error("Error")
  }
}

const handleEdit = (id) => {
  const selectedCourse = list.find(lecturer => lecturer._id === id);
  if (selectedCourse) {
    setData({
      code: selectedCourse.code,
      name: selectedCourse.name,
      credithours: selectedCourse.credithours,
    });
    // Set the clicked course ID in the state (you can track it for update purposes
    seteditCourseId(id);
    // Open the edit modal
    setEdit(true);
  }
}

const handleCloseEdit = () => setEdit(false)

useEffect(()=>{
  fetchList()
},[])


  const [Cclicked, setCclicked] = useState(false)

  const handleClicked = ()=>{
    setCclicked(true)
  }

    const handleClosed = () =>  setCclicked(false)
  return (
    <div className='Coursesavailable'>
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
              <p>Add New Course</p>
            </div>
          </div>

          {/* list courses */}
          <div className="lectuter-list flex flex-col mt-4">
          <p className='text-2xl mb-4'>COURSES AVAILABLE</p>
          <div className="list-table">
            <div className="list-title flex justify-between text-left">
            <b className="w-2/12">Course Code</b>
            <b className="w-2/12">Course</b>
            <b className="w-2/12">Credit Hours</b>
            <b className="w-1/12">Action</b>
            </div>
            {list.map((course ,index)=>{
          return(
            <div key={index}  className='list-table-format flex justify-between border-b border-gray-400 py-4'>
                <p className="w-2/12">{course.code}</p>
                <p className="w-2/12">{course.name}</p>
                <p className="w-2/12">{course.credithours}</p>
                <p className='flex space-x-4 text-gray-400 cursor-pointer w-1/12'>
                <FontAwesomeIcon icon={faTrash} onClick={()=>removeItem(course._id)}/>
                <FontAwesomeIcon icon={faPenToSquare} onClick={() => handleEdit(course._id)}/>
                </p>
            </div>
          )
        })}
          </div>
        </div>

        </div>
        </div>
       

        {Cclicked &&
      
      
      <>
      <div className='modal-shadow' onClick={handleClosed}></div>
      <div className="add-course-modal rounded-md">
      <div className="add-course-modal-title font-bold text-center text-2xl text-white p-4">ADD COURSE</div>
      <form className="modal-body p-6 space-y-10" onSubmit={onSubmitHandler}>

        <div className="lecturer-id flex flex-col text-xl">
          <label htmlFor="course-id">Course Code</label>
          <input type="text" className='course-input bg-inherit rounded-xl' name='code' onChange={onChangeHandler} value={data.code}/>
        </div>

        <div className="Course flex flex-col text-xl">
          <label htmlFor="course">Course</label>
          <input type="text" className='course-input bg-inherit rounded-xl' name='name' onChange={onChangeHandler} value={data.name}/>
        </div>

        <div className="Credit-hours flex flex-col text-xl">
          <label htmlFor="credit-hours">Credit Hours</label>
          <input type="number" className='course-input bg-inherit rounded-xl' name='credithours' onChange={onChangeHandler} value={data.credithours}/>
        </div>



        <div className="flex mx-20 space-x-40 text-white font-bold button-case">
                  <button className='cancel rounded-md p-2 w-40'onClick={handleClosed} >Cancel</button>
                  <button type='submit' className='generate rounded-md p-2 w-40'>Add Course</button>
        </div>

      </form>
      </div>
      </>
  }



  {edit &&
    <>
     <div className='modal-shadow' onClick={handleCloseEdit}></div>
      <div className="add-course-modal rounded-md">
      <div className="add-course-modal-title font-bold text-center text-2xl text-white p-4">UPDATE COURSE INFO</div>
      <form className="modal-body p-6 space-y-10" onSubmit={oneditsubmitHandler}>

        <div className="lecturer-id flex flex-col text-xl">
          <label htmlFor="course-id">Course Code</label>
          <input type="text" className='course-input bg-inherit rounded-xl' name='code' onChange={onChangeHandler} value={data.code}/>
        </div>

        <div className="Course flex flex-col text-xl">
          <label htmlFor="course">Course</label>
          <input type="text" className='course-input bg-inherit rounded-xl' name='name' onChange={onChangeHandler} value={data.name}/>
        </div>

        <div className="Credit-hours flex flex-col text-xl">
          <label htmlFor="credit-hours">Credit Hours</label>
          <input type="number" className='course-input bg-inherit rounded-xl' name='credithours' onChange={onChangeHandler} value={data.credithours}/>
        </div>



        <div className="flex mx-20 space-x-40 text-white font-bold button-case">
                  <button className='cancel rounded-md p-2 w-40'onClick={handleCloseEdit} >Cancel</button>
                  <button type='submit' className='generate rounded-md p-2 w-40'>SAVE CHANGES</button>
        </div>

      </form>
      </div>
    </>
  }
      </div>
    </div>
  )
}

export default Coursesavailable
