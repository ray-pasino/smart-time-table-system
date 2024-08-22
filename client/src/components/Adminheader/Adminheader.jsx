import React, {useEffect ,useContext, useState} from 'react'
import './Adminheader.css'
import {assets} from '../../assets/assets'
import { StoreContext } from '../../context/Storecontext'
import { useNavigate } from 'react-router'
import axios from "axios"


const Adminheader = () => {

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
    await axios.post(`${url}/api/admin/administratorlogout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Clear the token from the context (or localStorage/sessionStorage if you're using that)
    setToken(null);  // Update the StoreContext to clear the token
    localStorage.removeItem('token');  // If you use localStorage to store the token

    // Redirect the user to the login page
    navigate('/administratorlogin');
  } catch (error) {
    console.error('Error during logout:', error);
  }
}



  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const response = await axios.get(`${url}/api/admin/info`, {
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
          
    <div className="adminheadergradient">
        <div className='shield flex float-end'>
         <div className="progile-container flex space-x-1 text-black text-sm sm:my-2 md:font-semibold">
         <div className="admin-profile my-4">
            {adminName.toUpperCase()}
            <div className="text-xs ms-6 text-zinc-400">Administrator</div>
            <div className={`${drop ? 'block text-red-700 p-1.5 pl-12 w-36 logout-popover rounded-md cursor-default' : 'hidden'}`} onClick={handleLogout}>Logout</div>
            </div>
         <img src={assets.dropdown} className='h-4 my-4' onClick={toggleDropdown}/>
        </div>
    </div>
    </div>
    </>
  )
}

export default Adminheader


