import React, {useEffect ,useContext, useState} from 'react'
import './studentheader.css'
import {assets} from '../../assets/assets'
import { StoreContext } from '../../context/Storecontext'
import { useNavigate} from 'react-router'
import { NavLink } from 'react-router-dom'
import axios from "axios"

const Studentheader = () => {
    const [adminName, setAdminName] = useState('');  // State to store the admin's name
    const { url, token, setToken} = useContext(StoreContext);
    const [drop, setDrop] = useState(false)
    const navigate = useNavigate()
  
    const toggleDropdown = ()=>{
      setDrop(!drop)
    }
  
  //handle logout function goes here
  const handleLogout = async () => {
    try {
      // Call the logout API to notify the server (optional)
      await axios.post(`${url}/api/student/studentlogout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      // Clear the token from the context (or localStorage/sessionStorage if you're using that)
      setToken(null);  // Update the StoreContext to clear the token
      localStorage.removeItem('token');  // If you use localStorage to store the token
  
      // Redirect the user to the login page
      navigate('/studentlogin');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
  
  
  
    useEffect(() => {
      const fetchAdminInfo = async () => {
        try {
          const response = await axios.get(`${url}/api/student/info`, {
            headers: {
              Authorization: `Bearer ${token}` // Send the JWT token for authentication
            }
          });
  
          if (response.data.success) {
            setAdminName(response.data.data.name); // Store the admin's name in state
          }
        } catch (error) {
          console.error('Error fetching admin info:', error);
        }
      };
  
      fetchAdminInfo();
    }, [url, token]);
    return (
      <>
            
      <div className="studentheader">
      <div className="head flex md:mt-0">
        <NavLink to='/'>
        <img className='logo md:ms-6 mt-2' src={assets.logo} alt="gctulogo"/> 
        </NavLink>
         <NavLink to ='/' className='mt-4 md:text-b-blue'>
            <h2 className='h1 font-bold'>GCTU TIMETABLE</h2>
            <h2 className='h2'>MANAGEMENT SYSTEM</h2>
        </NavLink>
      </div>
      
          <div className='shield flex float-end'>
           <div className="progile-container flex space-x-1 text-black text-sm sm:my-2 md:font-semibold">
           <div className="admin-profile my-4">
              {adminName.toUpperCase()}
              <div className="text-xs ms-6 text-zinc-400">Student</div>
              <div className={`${drop ? 'block text-red-700 p-1.5 pl-12 w-36 logout-popover rounded-md cursor-default' : 'hidden'}`} onClick={handleLogout}>Logout</div>
              </div>
           <img src={assets.dropdown} className='h-4 my-4' onClick={toggleDropdown}/>
          </div>
      </div>
      </div>
      </>
    )
}

export default Studentheader
