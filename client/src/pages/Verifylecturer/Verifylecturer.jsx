import React from 'react'
import './Verifylecturer.css'
import { lecturerInfo } from '../../assets/assets'
import Header from '../../components/Header/Header';
import Nfooter from '../../components/n-footer/Nfooter';


const Verifylecturer = ({isClicked, setIsClicked, isClicked2, setIsClicked2}) => {

  const toggleclick = () => {
    setIsClicked(!isClicked);
    setIsClicked2(false);
    
  };

  const toggleclick2 = () => {
    setIsClicked2(!isClicked2);
    setIsClicked(false);
  };


  return (
    <>
    <Header/>
    <div className='ms-6 mt-20 md:mt-48 container md:ms-0 md:ms-40'>
    <h2 className='md:text-3xl md:border-y md:py-4'>VERIFY ACCOUNT INFORMATION</h2>

    <div className='info mt-4 md:mt-16 md:flex'>
      <div className="info md:me-64 md:w-full">

      <p className='title'>NAME</p>
      <p className='attribute mb-4'>{lecturerInfo.name}</p>
  
      <p className='title'>EMAIL</p>
      <p className='attribute mb-4'>{lecturerInfo.email}</p>

      <p className='title'>FACULTY</p>
      <p className='attribute mb-4'>{lecturerInfo.faculty}</p>

      <p className='title'>DEPARTMENT</p>
      <p className='attribute mb-4'>{lecturerInfo.department}</p>

      <p className='title'>CANPUS</p>
      <p className='attribute mb-4'>{lecturerInfo.campus}</p>

      <p className='title'>TELEPHONE NUMBER</p>
      <p className='attribute mb-4'>{lecturerInfo.phone}</p>
      </div>

      <form className='reset-password-form'>
          <div className="reset-password-container mb-2">
              <div className='ms-4'>
              <div className='heading'>Create A New Password</div>

              <div className="input-container">
                  
              <div className="newpassword mb-4">
              <label htmlFor="newpassword" className='block mb-2'>New Password</label>
              <input onClick={toggleclick} type="password"  name="newpassword" className={isClicked ? 'active-input' : 'input-p'} placeholder='Enter new password' required/>
              </div>

              <div className="confirmpassword">
              <label htmlFor="confirmpassword" className='block m-2'>Confirm Password</label>
              <input onClick={toggleclick2} type="password" name="confirmpassword" className={isClicked2 ? 'active-input' : 'input-p'} placeholder='Confirm new password' required/>
              
              </div>


              </div>
              </div>

          </div>

          <input type="submit" value="Change Password" className='cp-btn font-semibold shadow-lg mb-12 md:mt-4'/>
      </form>
    </div>


  </div>
  <Nfooter/>
  </>
  )
}

export default Verifylecturer
