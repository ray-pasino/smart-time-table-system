import React, {useContext, useState } from 'react'
import './Administratorlogin.css'
import { assets } from "../../assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {useNavigate, NavLink } from 'react-router-dom'
import { StoreContext } from '../../context/Storecontext'
import axios from "axios"


const Administratorlogin = ({isClicked, setIsClicked, isClicked2, setIsClicked2, seePassword, setSeePassword}) => {

  const {url, setToken} = useContext(StoreContext)

  const [data, setData] = useState({
      id:"",
      password:""
  })

  const [errorMessage, setErrorMessage] = useState("");


  const navigate = useNavigate()

  const onChangeHandler = (event)=> {
      const name = event.target.name
      const value = event.target.value
      setData(data=>({...data,[name]:value}))
  }

  const onLogin = async (event)=>{
      event.preventDefault()
      let newUrl = url
  
      newUrl += "/api/admin/administratorlogin"
    

      const response = await axios.post(newUrl,data)

      if (response.data.success){
          setToken(response.data.token)
          localStorage.setItem("token",response.data.token)
          navigate('/dashboard')
      }

      else{
          setErrorMessage(response.data.message);
      }
  }
  


    const toggleclick = () => {    
        setIsClicked(!isClicked);
        setIsClicked2(false);
      };
    
      const toggleclick2 = () => {
        setIsClicked2(!isClicked2);
        setIsClicked(false);
      };
    
      const toggleSeePassword = ()=>{
        setSeePassword(!seePassword)
      }


  return (
    <div className='adminstratorlogin'>
         <div className="banner-border"></div>
        <div className="gradient h-64"></div>
      <img className="bannerImg object-cover h-64" src={assets.admin} />

      <div className="login-inner-container">

      

      <div className="login-form text-center my-6">
        <span>
          <p className="title1 font-bold">ADMINISTRATOR</p>
          <p className="title2">LOG IN</p>
        </span>
      </div>

      <form onSubmit={onLogin} className="login-form text-center mx-14">
    <div onClick={toggleclick} className={isClicked ? 'active-input-box mb-4' : 'input-box mb-4'} id="input">
    <input type="number" name="id" placeholder='Administrator ID' value={data.id} onChange={onChangeHandler} required/>
    </div>

  <div onClick={toggleclick2} className={isClicked2 ? 'active-input-box mb-2' : 'input-box mb-2'} id="input">
    <input type={seePassword ? 'text' : 'password'} name='password' placeholder='Password' onChange={onChangeHandler} value={data.password} required/>
    <FontAwesomeIcon onClick={toggleSeePassword} icon={seePassword? faEyeSlash : faEye} className='my-3.5 lg:my-5 eyeslash-icon'/>
  </div>

  {errorMessage && <p className=" text-left text-red-500">{errorMessage}</p>} {/* Display the error message here */}

  <div className='reset-text flex ms-6 mb-7'>
      <p className='me-2 forgot'>Forgot password?</p>
      <NavLink to='/verifyadministratorinfo' className='reset font-bold'>RESET</NavLink>
    </div>

  
    <input type="submit"  value='LOG IN' className='login-btn font-bold shadow-lg mb-10 cursor-pointer'/>
    

  </form>
  </div>
    </div>
  )
}

export default Administratorlogin
