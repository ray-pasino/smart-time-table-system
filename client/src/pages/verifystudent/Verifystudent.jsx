import React from 'react'
import './Verifystudent.css'
import { studentInfo } from '../../assets/assets'
import Header from '../../components/Header/Header';
import Nfooter from '../../components/n-footer/Nfooter';

const Verifystudent = ({isClicked, setIsClicked, isClicked2, setIsClicked2}) => {


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
        <p className='attribute mb-4'>{studentInfo.name}</p>
    
        <p className='title'>INDEX NUMBER</p>
        <p className='attribute mb-4'>{studentInfo.indexnumber}</p>

        <p className='title'>EMAIL</p>
        <p className='attribute mb-4'>{studentInfo.email}</p>

        <p className='title'>FACULTY</p>
        <p className='attribute mb-4'>{studentInfo.faculty}</p>

        <p className='title'>PROGRAMME</p>
        <p className='attribute mb-4'>{studentInfo.program}</p>

        <p className='title'>LEVEL</p>
        <p className='attribute mb-4'>{studentInfo.campus}</p>

        <p className='title'>CAMPUS</p>
        <p className='attribute mb-4'>{studentInfo.program}</p>

        <p className='title'>SESSION</p>
        <p className='attribute mb-4'>{studentInfo.session}</p>

        <p className='title'>TELEPHONE NUMBER</p>
        <p className='attribute mb-4'>{studentInfo.phone}</p>

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

export default Verifystudent
