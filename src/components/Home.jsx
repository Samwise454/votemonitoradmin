import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css';
import 'animate.css';
import axios from 'axios';

const Home = () => {
    const api = 'https://naijavote.esbatech.org/loginadmin.php';
    let navigate = useNavigate();

    const [resp, setResp] = useState("");
    const [loginDet, setLoginDet] = useState(localStorage.getItem("subadmin"));

    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
        who: "subAdmin"
    });

    useEffect(() => {
        if (loginDet !== null) {
            navigate("/Dashboard");
        }

        return () => {

        }
    }, []);

    const handleInput = (e) => {
        let id = e.target.id;
        let value = e.target.value;

        switch(id) {
            case 'username':
                setLoginData({...loginData, username: value});
                break;
            case 'password':
                setLoginData({...loginData, password: value});
                break;
        }
    }

    const showResponse = () => {
        let responseBar = document.querySelector("#responseBar");
        responseBar.style.display = "flex";

        setTimeout(() => {
            responseBar.style.display = "none";
        }, 4000);
    }

    const showLoader = () => {
        let loader = document.querySelector(".loaderDiv");
        loader.style.display = "flex";
    }

    const hideLoader = () => {
        let loader = document.querySelector(".loaderDiv");
        loader.style.display = "none";
    }

    const loginAdmin = (e) => {
        e.preventDefault();
        showLoader();

        if (loginData.username == "" || loginData.password == "") {
            setResp("Enter Details!");
            showResponse();
            hideLoader();
        }
        else {
            const login = async () => {
                try {
                    const response = await axios.post(api, JSON.stringify(loginData));
                    if (response.status === 200) {
                        if (response.data.code === "sw12") {
                            setResp("Cannot Login Contact Dev!");
                            showResponse();
                        }
                        else if (response.data.code === "sw123") {
                            setResp(response.data.msg);
                            showResponse();
                        }
                        else if (response.data.code === "sw321") {
                            localStorage.setItem('subadmin', response.data.msg);
                            navigate("/Dashboard");
                        }
                    }
                } catch (err) {
                    setResp("Cannot Login Contact Dev!");
                    showResponse();
                } finally {
                    hideLoader();
                }
            }

            login();
        }
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
                        <input onChange={handleInput} type="text" id='username' placeholder='User Name'  className='formInput mb-5 bg-white p-2 text-sm shadow-sm'/>
                        <input onChange={handleInput} type="password" id='password' placeholder='Password'  className='formInput mb-5 bg-white p-2 text-sm shadow-sm'/>
                    </section>

                    <section className='text-center  mt-2 relative'>
                        <div className='flex align-center justify-center'>
                            <span id="responseBar" className='text-sm'>
                                {resp}
                            </span>

                            <div className='loaderDiv flex align-center justify-center'>
                                <p className='loader mr-5'>

                                </p>
                            </div>
                        </div>

                        <div>
                            <button type='submit' className='mt-4 bg-blue-800 text-white py-3 px-5 rounded-sm cursor-pointer'>
                                <span>
                                    Sign In
                                </span>
                            </button>
                        </div>
                    </section>
                </form>
            </div>

            <div className='main2'></div>
        </main>
    </div>
  )
}

export default Home
