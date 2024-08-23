import React, { useState, useContext, useEffect} from 'react'
import './Timeandschedule.css'
import Sidebar from '../../components/sidebar/Sidebar'
import Adminheader from '../../components/Adminheader/Adminheader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTrash, faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import { StoreContext } from '../../context/Storecontext'
import axios from 'axios'
import {toast} from 'react-toastify'

const Timeandschedule = () => {

  const {url} = useContext(StoreContext)
  const [edit, setEdit] = useState(false)
  const [editTimeId, seteditTimeId] = useState(null);


  const [data, setData] = useState({
    startTime:"",
    endTime:""
})

const onChangeHandler = (event)=>{
  const name = event.target.name 
  const value = event.target.value 
  setData(data => ({...data,[name]:value}))
}

const onSubmitHandler = async (event) =>{
  event.preventDefault()

  const response = await axios.post(`${url}/api/time/add`, data, {
    headers: {
        'Content-Type': 'application/json'
    }
});

  if (response.data.success){
      setData({
        startTime:"",
        endTime:""
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
  const response = await axios.get(`${url}/api/time/list`)

  if(response.data.success){
    setList(response.data.data)
  }else{
    toast.error("Error")
  }
}

// submitting edited info
const oneditsubmitHandler = async (event)=>{
  event.preventDefault()
  const response = await axios.put(`${url}/api/time/update/${editTimeId}`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
})

if (response.data.success) {
  toast.success(response.data.message);
  setData({
    startTime:"",
    endTime:""
  });
  fetchList();
  handleCloseEdit();
} else {
  toast.error(response.data.message);
}

}

//remove item
const removeItem = async (timeId)=>{
  const response = await axios.post(`${url}/api/time/remove`, {id:timeId})
  await fetchList()
  if(response.data.success){
    toast.success(response.data.message)
  }else{
    toast.error("Error")
  }
}

const handleEdit = (id) => {
  const selectedTime = list.find(time => time._id === id);
  if (selectedTime) {
    setData({
       startTime:selectedTime.startTime,
        endTime:selectedTime.endTime
    });
    // Set the clicked Time ID in the state (you can track it for update purposes
    seteditTimeId(id);
    // Open the edit modal
    setEdit(true);
  }
}

const handleCloseEdit = () => setEdit(false)

useEffect(()=>{
  fetchList()
},[])


  const [Tclicked, setTClicked] = useState(false)

  const handleClicked = ()=>{
    setTClicked(true)
  }

    const handleClosed = () =>  setTClicked(false)


    const generateTimeOptions = () => {
      const Times = [];
      for (let i = 7; i <= 21; i++) {
        const time = i < 12 ? `${i}:00 AM` : `${i - 12 === 0 ? 12 : i - 12}:00 PM`;
        Times.push(time);
      }
      return Times;
    };
    
    const generateTimeOptions2 = () => {
      const times = [];
      for (let i = 8; i <= 22; i++) {
        const time = i < 12 ? `${i}:00 AM` : `${i - 12 === 0 ? 12 : i - 12}:00 PM`;
        times.push(time);
      }
      return times;
    };
    

  return (
    <div className='Timeandschedule'>
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
              <p>Add New Schedule</p>
            </div>
          </div>
        {/* list schedule */}
        <div className="lecturer-list flex flex-col mt-4">
            <p className="text-2xl mb-4">Time & Schedule</p>
            <div className="list-table">
              <div className="list-title flex justify-between text-left bg-gray-200 p-2 rounded-t-lg">
                <b className="w-10/12">Period</b>
                <b className="w-1/12 text-center">Action</b>
              </div>
              {list.map((period, index) => (
                <div key={index} className="list-table-format flex justify-between items-center border-b border-gray-400 py-4">
                  <div className="period w-10/12 flex items-center">
                    <p className="text-lg">{period.startTime}</p>
                    <span className="mx-4">TO</span>
                    <p className="text-lg">{period.endTime}</p>
                  </div>
                  <div className="actions w-1/12 flex space-x-4 text-gray-400 cursor-pointer justify-center">
                    <FontAwesomeIcon icon={faTrash} onClick={() => removeItem(period._id)} />
                    <FontAwesomeIcon icon={faPenToSquare} onClick={() => handleEdit(period._id)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>



        {Tclicked &&
      
      
      <>
      <div className='modal-shadow' onClick={handleClosed}></div>
      <div className="add-room-modal rounded-md">
      <div className="add-room-modal-title font-bold text-center text-2xl text-white p-4">ADD TIME SLOT</div>
      <form className="modal-body p-6 space-y-10" onSubmit={onSubmitHandler}>

        <div className="room-name flex flex-col text-xl">
          <label htmlFor="room-name">Time</label>
          <div className='flex space-x-8 ms-24'>
          <select name="startTime" id="time-select" className="w-22" onChange={onChangeHandler} value={data.startTime}>
          <option>-</option>
                      {generateTimeOptions().map((time, i) => (
                        <option key={i} value={time}>{time}</option>
                      ))}
                    </select>

                  <div>TO</div>

                  <select name="endTime" id="time-select" className="w-22" onChange={onChangeHandler} value={data.endTime}>
                    <option>-</option>
                      {generateTimeOptions2().map((time, i) => (
                        <option key={i} value={time}>{time}</option>
                      ))}
                    </select>
          </div>
        </div>


    <div className="flex space-x-40 text-white font-bold button-case">
              <button className='cancel rounded-md p-2 w-40'onClick={handleClosed} >Cancel</button>
              <button type='submit' className='generate rounded-md p-2 w-40'>Add</button>
    </div>


      </form>
      </div>
      </>
  }
   

   {edit && 
    <>
       <div className='modal-shadow' onClick={handleCloseEdit}></div>
      <div className="add-room-modal rounded-md">
      <div className="add-room-modal-title font-bold text-center text-2xl text-white p-4">EDIT TIME SLOT</div>
      <form className="modal-body p-6 space-y-10" onSubmit={oneditsubmitHandler}>

        <div className="room-name flex flex-col text-xl">
          <label htmlFor="room-name">Time</label>
          <div className='flex space-x-8 ms-24'>
          <select name="startTime" id="time-select" className="w-22" onChange={onChangeHandler} value={data.startTime}>
          <option>-</option>
                      {generateTimeOptions().map((time, i) => (
                        <option key={i} value={time}>{time}</option>
                      ))}
                    </select>

                  <div>TO</div>

                  <select name="endTime" id="time-select" className="w-22" onChange={onChangeHandler} value={data.endTime}>
                  <option>-</option>
                      {generateTimeOptions2().map((time, i) => (
                        <option key={i} value={time}>{time}</option>
                      ))}
                    </select>
          </div>
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

export default Timeandschedule
