
import React, {useContext, useState, useEffect} from 'react'
import './lecturerooms.css'
import Sidebar from '../../components/sidebar/Sidebar'
import Adminheader from '../../components/Adminheader/Adminheader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTrash, faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import { StoreContext } from '../../context/Storecontext'
import axios from 'axios'
import {toast} from 'react-toastify'

const Lecturerooms = () => {

  const [clicked, setClicked] = useState(false)
  const [edit, setEdit] = useState(false)
  const [editRoomId, setEditRoomId] = useState(null);

  const handleClicked = ()=>{
    setClicked(true)
  }

  const handleEdit = (id) => {
    const selectedRoom = list.find(room => room._id === id);
    if (selectedRoom) {
      setData({
        roomname: selectedRoom.roomname,
        capacity: selectedRoom.capacity,
      });
      // Set the clicked room ID in the state (you can track it for update purposes)
      setEditRoomId(id);
      // Open the edit modal
      setEdit(true);
    }
  }
  
  
  const handleClosed = () =>  setClicked(false)

  const handleCloseEdit = () => setEdit(false)

  const {url} = useContext(StoreContext)


  const [data, setData] = useState({
    roomname : "",
    capacity : "",
})


const onChangeHandler = (event)=>{
  const name = event.target.name 
  const value = event.target.value 
  setData(data => ({...data,[name]:value}))
}


const onSubmitHandler = async (event) =>{
  event.preventDefault()

  const response = await axios.post(`${url}/api/room/add`, data, {
    headers: {
        'Content-Type': 'application/json'
    }
});

  if (response.data.success){
      setData({
          roomname : "",
          capacity : "",
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
  const response = await axios.get(`${url}/api/room/list`)

  if(response.data.success){
    setList(response.data.data)
  }else{
    toast.error("Error")
  }
}

// submitting edited info
const oneditsubmitHandler = async (event)=>{
  event.preventDefault()
  const response = await axios.put(`${url}/api/room/update/${editRoomId}`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
})

if (response.data.success) {
  toast.success(response.data.message);
  setData({
    roomname: "",
    capacity: "",
  });
  fetchList();
  handleCloseEdit();
} else {
  toast.error(response.data.message);
}

}

//remove item
const removeItem = async (itemId)=>{
  const response = await axios.post(`${url}/api/room/remove`, {id:itemId})
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

  return (
    <div className='lecturerooms'>
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
              <p>Add New Room</p>
            </div>

          </div>

        {/* lecture rooms list */}

        <div className="room-list flex flex-col mt-4">
          <p className='text-2xl mb-4'>LECTURE ROOMS</p>
          <div className="list-table">
            <div className="list-title flex justify-between">
            <b className="w-2/12">Room Name</b>
            <b className="w-2/12">Capacity</b>
            <b className="w-1/12">Action</b>
            </div>
            {list.map((room ,index)=>{
          return(
            <div key={index}  className='list-table-format flex justify-between border-b border-gray-400 py-4'>
                <p className="w-2/12">{room.roomname}</p>
                <p className="w-2/12">{room.capacity}</p>
                <p className='flex space-x-4 text-gray-400 cursor-pointer w-1/12'>
                <FontAwesomeIcon icon={faTrash} onClick={()=>removeItem(room._id)}/>
                <FontAwesomeIcon icon={faPenToSquare} onClick={() => handleEdit(room._id)}/>
                </p>
            </div>
          )
        })}
          </div>
        </div>

        </div>
        </div>





      {clicked &&
      
      
          <>
          <div className='modal-shadow' onClick={handleClosed}></div>
          <div className="add-room-modal rounded-md">
          <div className="add-room-modal-title font-bold text-center text-2xl text-white p-4">ADD LECTURE ROOM</div>
          <form className="modal-body p-6 space-y-10" onSubmit={onSubmitHandler}>

            <div className="room-name flex flex-col text-xl">
              <label htmlFor="room-name">Room Name</label>
              <input type="text" className='room-input bg-inherit rounded-xl' name='roomname' onChange={onChangeHandler} value={data.roomname}/>
            </div>

            <div className="room-name flex flex-col text-xl">
              <label htmlFor="capiacity">Capacity</label>
              <input type="text" className='capacity bg-inherit rounded-xl' name='capacity' onChange={onChangeHandler} value={data.capacity}/>
            </div>

        <div className="flex space-x-40 text-white font-bold button-case">
                  <button className='cancel rounded-md p-2 w-40'onClick={handleClosed} >Cancel</button>
                  <button type='submit' className='generate rounded-md p-2 w-40'>Add Room</button>
        </div>


          </form>
          </div>
          </>
      }


      {edit && 
      
      <>
           <div className='modal-shadow' onClick={handleCloseEdit}></div>
          <div className="add-room-modal rounded-md">
          <div className="add-room-modal-title font-bold text-center text-2xl text-white p-4">EDIT LECTURE ROOM</div>
          <form className="modal-body p-6 space-y-10" onSubmit={oneditsubmitHandler}>

            <div className="room-name flex flex-col text-xl">
              <label htmlFor="room-name">Room Name</label>
              <input type="text" className='room-input bg-inherit rounded-xl' name='roomname' onChange={onChangeHandler} value={data.roomname}/>
            </div>

            <div className="room-name flex flex-col text-xl">
              <label htmlFor="capiacity">Capacity</label>
              <input type="text" className='capacity bg-inherit rounded-xl' name='capacity' onChange={onChangeHandler} value={data.capacity}/>
            </div>

        <div className="flex space-x-40 text-white font-bold button-case">
                  <button className='cancel rounded-md p-2 w-40'onClick={handleCloseEdit} >Cancel</button>
                  <button type='submit' className='generate rounded-md p-2 w-40'>Save Changes</button>
        </div>


          </form>
          </div>
      </>
      }
       
      </div>
    </div>
  )
}

export default Lecturerooms
