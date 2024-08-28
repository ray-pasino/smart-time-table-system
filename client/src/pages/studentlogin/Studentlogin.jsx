import React, { useState } from "react";
import { NavLink } from 'react-router-dom'
import "./Studentlogin.css";
import { assets } from "../../assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import BannerInfo from "../../components/bannerInfo/BannerInfo";
import Footer from "../../components/footer/Footer";
import Nfooter from "../../components/n-footer/Nfooter";

const Studentlogin = () => {

  const [isClicked, setIsClicked] = useState(false)
  const [isClicked2, setIsClicked2] = useState(false)
  const [seePassword, setSeePassword] = useState(false)

  const toggleclick = ()=> {
    setIsClicked(!isClicked)
    setIsClicked2(false)

  }

  const toggleclick2 = ()=> {
    setIsClicked2(!isClicked2)
    setIsClicked(false)

  }

  const toggleSeePassword = ()=>{
    setSeePassword(!seePassword)
  }


  return (
    <div className="studentlogin">
      <BannerInfo/>
      <div className="banner-border"></div>
        <div className="gradient h-64"></div>
      <img className="bannerImg object-cover h-64" src={assets.studygroup} />

      <div className="login-inner-container">

      

      <div className="login-form text-center my-6">
        <span>
          <p className="Title1 font-bold">STUDENT</p>
          <p className="title2">LOG IN</p>
        </span>
      </div>

      <form className="login-form text-center mx-16">
    <div onClick={toggleclick} className={isClicked ? 'active-input-box mb-4' : 'input-box mb-4'} id="input">
    <input type="number" name="id" placeholder='Index Number' required/>
    </div>

  <div onClick={toggleclick2} className={isClicked2 ? 'active-input-box mb-2' : 'input-box mb-2'} id="input">
    <input type={seePassword ? 'text' : 'password'} name='password' placeholder='Password' required/>
    <FontAwesomeIcon onClick={toggleSeePassword} icon={seePassword? faEyeSlash : faEye} className='my-3.5 lg:my-5 eyeslash-icon'/>
  </div>

  <div className='reset-text flex ms-6 mb-7'>
      <p className='me-2 forgot'>Forgot password?</p>
      <NavLink to='/verifystudentinfo' className='reset font-bold'>RESET</NavLink>
    </div>

    <input type="submit"  value='LOG IN' className='login-btn font-bold shadow-lg mb-10'/>


  </form>
  </div>
    </div>
  );
};

export default Studentlogin;
