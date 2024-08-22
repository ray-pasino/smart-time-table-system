import React, {useState, useContext, useEffect} from 'react'
import './Lecturersavailabe.css'
import Sidebar from '../../components/sidebar/Sidebar'
import Adminheader from '../../components/Adminheader/Adminheader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTrash, faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import { StoreContext } from '../../context/Storecontext'
import axios from 'axios'
import {toast} from 'react-toastify'


const Lecturersavailabe = () => {

  const {url} = useContext(StoreContext)
  const [edit, setEdit] = useState(false)
  const [editLecturerId, seteditLecturerId] = useState(null);

  const [data, setData] = useState({
    id:"",
    name:"",
    course:"",
    phone:"",
    email:""
})


const handleEdit = (id) => {
  const selectedLecturer = list.find(lecturer => lecturer._id === id);
  if (selectedLecturer) {
    setData({
      id: selectedLecturer.id,
      name: selectedLecturer.name,
      course: selectedLecturer.course,
      phone: selectedLecturer.phone,
      email:selectedLecturer.email
    });
    // Set the clicked room ID in the state (you can track it for update purposes)
    seteditLecturerId(id);
    // Open the edit modal
    setEdit(true);
  }
}

const handleCloseEdit = () => setEdit(false)


const onChangeHandler = (event)=>{
  const name = event.target.name 
  const value = event.target.value 
  setData(data => ({...data,[name]:value}))
}

const onSubmitHandler = async (event) =>{
  event.preventDefault()

  const response = await axios.post(`${url}/api/lecturer/add`, data, {
    headers: {
        'Content-Type': 'application/json'
    }
});

  if (response.data.success){
      setData({
        id:"",
        name:"",
        course:"",
        phone:"",
        email:""
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
  const response = await axios.get(`${url}/api/lecturer/list`)

  if(response.data.success){
    setList(response.data.data)
  }else{
    toast.error("Error")
  }
}

// submitting edited info
const oneditsubmitHandler = async (event)=>{
  event.preventDefault()
  const response = await axios.put(`${url}/api/lecturer/update/${editLecturerId}`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
})

if (response.data.success) {
  toast.success(response.data.message);
  setData({
    id:"",
    name:"",
    course:"",
    phone:"",
    email:""
  });
  fetchList();
  handleCloseEdit();
} else {
  toast.error(response.data.message);
}

}


//remove item
const removeItem = async (lecturerId)=>{
  const response = await axios.post(`${url}/api/lecturer/remove`, {id:lecturerId})
  await fetchList()
  if(response.data.success){
    toast.success(response.data.message)
  }else{
    toast.error("Error")
  }
}

useEffect(()=>{
  fetchList()
},[])

  const [Lclicked, setLClicked] = useState(false)

  const handleClicked = ()=>{
    setLClicked(true)
  }

    const handleClosed = () =>  setLClicked(false)

  return (
    <div className='Lecturersavailabe'>
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
              <p>Add New Lecturer</p>
            </div>
          </div>

          {/* list lecturers available */}
          <div className="lectuter-list flex flex-col mt-4">
          <p className='text-2xl mb-4'>LECTURES AVAILABLE</p>
          <div className="list-table">
            <div className="list-title flex justify-between text-left">
            <b className="w-2/12">Lect. ID</b>
            <b className="w-2/12">Name</b>
            <b className="w-2/12">Course</b>
            <b className="w-2/12">Telephone No.</b>
            <b className="w-2/12">Email</b>
            <b className="w-1/12">Action</b>
            </div>
            {list.map((lecturer ,index)=>{
          return(
            <div key={index}  className='list-table-format flex justify-between border-b border-gray-400 py-4'>
                <p className="w-2/12">{lecturer.id}</p>
                <p className="w-2/12">{lecturer.name}</p>
                <p className="w-2/12">{lecturer.course}</p>
                <p className="w-2/12">{lecturer.phone}</p>
                <p className="w-2/12">{lecturer.email}</p>
                <p className='flex space-x-4 text-gray-400 cursor-pointer w-1/12'>
                <FontAwesomeIcon icon={faTrash} onClick={()=>removeItem(lecturer._id)}/>
                <FontAwesomeIcon icon={faPenToSquare} onClick={() => handleEdit(lecturer._id)}/>
                </p>
            </div>
          )
        })}
          </div>
        </div>




        </div>
        </div>

        {Lclicked &&
      
      
      <>
      <div className='modal-shadow' onClick={handleClosed}></div>
      <div className="add-lecturer-modal rounded-md">
      <div className="add-lecturer-modal-title font-bold text-center text-2xl text-white p-4">ADD LECTURER</div>
      <form className="modal-body p-6 space-y-10" onSubmit={onSubmitHandler}>

        <div className="lecturer-id flex flex-col text-xl">
          <label htmlFor="lecturer-id">Lecturer ID</label>
          <input type="text" className='lecturer-input bg-inherit rounded-xl' name='id' onChange={onChangeHandler} value={data.id}/>
        </div>

        <div className="Name flex flex-col text-xl">
          <label htmlFor="Name">Name</label>
          <input type="text" className='lecturer-input bg-inherit rounded-xl' name='name' onChange={onChangeHandler} value={data.name}/>
        </div>

        <div className="Course flex flex-col text-xl">
          <label htmlFor="Course">Course</label>
          <input type="text" className='lecturer-input bg-inherit rounded-xl' name='course' onChange={onChangeHandler} value={data.course}/>
        </div>

        <div className="Telephone-No flex flex-col text-xl">
          <label htmlFor="Telephone-No">Telephone-No</label>
          <input type="number" className='lecturer-input bg-inherit rounded-xl' name='phone' onChange={onChangeHandler} value={data.phone}/>
        </div>

        <div className="Email flex flex-col text-xl">
          <label htmlFor="Email">Email</label>
          <input type="text" className='lecturer-input bg-inherit rounded-xl' name='email' onChange={onChangeHandler} value={data.email}/>
        </div>



        <div className="flex mx-20 space-x-40 text-white font-bold button-case">
                  <button className='cancel rounded-md p-2 w-40'onClick={handleClosed} >Cancel</button>
                  <button className='generate rounded-md p-2 w-40' type='submit'>Add Lecturer</button>
        </div>

      </form>
      </div>
      </>
  }



  {edit && 
  <>
       <div className='modal-shadow' onClick={handleCloseEdit}></div>
      <div className="add-lecturer-modal rounded-md">
      <div className="add-lecturer-modal-title font-bold text-center text-2xl text-white p-4">UPDATE LECTURER INFO</div>
      <form className="modal-body p-6 space-y-10" onSubmit={oneditsubmitHandler}>

        <div className="lecturer-id flex flex-col text-xl">
          <label htmlFor="lecturer-id">Lecturer ID</label>
          <input type="text" className='lecturer-input bg-inherit rounded-xl' name='id' onChange={onChangeHandler} value={data.id}/>
        </div>

        <div className="Name flex flex-col text-xl">
          <label htmlFor="Name">Name</label>
          <input type="text" className='lecturer-input bg-inherit rounded-xl' name='name' onChange={onChangeHandler} value={data.name}/>
        </div>

        <div className="Course flex flex-col text-xl">
          <label htmlFor="Course">Course</label>
          <input type="text" className='lecturer-input bg-inherit rounded-xl' name='course' onChange={onChangeHandler} value={data.course}/>
        </div>

        <div className="Telephone-No flex flex-col text-xl">
          <label htmlFor="Telephone-No">Telephone-No</label>
          <input type="number" className='lecturer-input bg-inherit rounded-xl' name='phone' onChange={onChangeHandler} value={data.phone}/>
        </div>

        <div className="Email flex flex-col text-xl">
          <label htmlFor="Email">Email</label>
          <input type="text" className='lecturer-input bg-inherit rounded-xl' name='email' onChange={onChangeHandler} value={data.email}/>
        </div>



        <div className="flex mx-20 space-x-40 text-white font-bold button-case">
                  <button className='cancel rounded-md p-2 w-40'onClick={handleCloseEdit} >Cancel</button>
                  <button className='generate rounded-md p-2 w-40' type='submit'>Save Changes</button>
        </div>

      </form>
      </div>
  </>

  }
      </div>
    </div>
  )
}

export default Lecturersavailabe
