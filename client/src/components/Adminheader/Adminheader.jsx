import React, {useEffect ,useContext, useState} from 'react'
import './Adminheader.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {adminstratorinfo} from '../../assets/assets'
import { StoreContext } from '../../context/Storecontext'
import axios from "axios"


const Adminheader = () => {

  const [adminName, setAdminName] = useState('');  // State to store the admin's name
  const { url, token } = useContext(StoreContext);

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
            </div>
         <FontAwesomeIcon icon={faUser} className='my-4 text-xl cursor-pointer'/>
        </div>
    </div>
    </div>
    </>
  )
}

export default Adminheader
