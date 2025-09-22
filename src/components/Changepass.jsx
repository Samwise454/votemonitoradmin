import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css';
import 'animate.css';

const Changepass = () => {
    const url = 'https://collate.esbatech.org/home.php';
    let navigate = useNavigate();

    const loginAdmin = (e) => {
        e.preventDefault();
        navigate("/Dashboard");
    }
    
  return (
    <div className='mainForm1 relative w-full'>
      <div className='pageCover h-full w-full absolute top-0 z-0'>

        </div>

        <main className='homeMain relative flex align-center flex-col justify-center shadow-sm p-1 h-full rounded-sm'>
            <div className='main1'></div>

            <div className='homeMainFormCont'>
                <div className='text-center z-1 animate__animated animate__fadeInUp'>
                    <h1 className='text-2xl text-white'>
                        Control Panel
                    </h1>
                </div>

                <form onSubmit={loginAdmin} className='pageForm text-center flex flex-col z-1 h-fit mt-10 px-20 pt-8 pb-20 rounded-sm bg-gray-100'>
                    <p>Sign in to proceed</p>

                    <section className='inputSection pt-10 flex flex-col w-full px-20'>
                        <input type="text" id='username' placeholder='User Name'  className='formInput mb-5 bg-white p-2 text-sm shadow-sm'/>
                        <input type="password" id='password'placeholder='Password'  className='formInput mb-5 bg-white p-2 text-sm shadow-sm'/>
                    </section>

                    <section className='text-right pr-20 mt-2 relative'>
                        <span id="responseBar" className='mr-20 text-sm'>
                            Error processing!
                        </span>

                        <div className='loaderDiv absolute top-0 right-0'>
                            <span className='loader mr-5'>

                            </span>
                        </div>

                        <button type='submit' className='mt-4 bg-blue-800 text-white py-3 px-5 rounded-sm cursor-pointer'>
                            <span>
                                Sign In
                            </span>
                        </button>
                    </section>
                </form>
            </div>

            <div className='main2'></div>
        </main>
    </div>
  )
}

export default Changepass
