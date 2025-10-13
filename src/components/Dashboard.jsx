import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faChartLine, faCheckToSlot, faCircleUser, faGaugeSimple, faGear, faHandshake, faPersonBooth, faSquarePollVertical, faUsers, faUserTie } from '@fortawesome/free-solid-svg-icons';
import Nav from "./Nav";
import Dash from "./Dash";
import Party from './Party';
import Message from './Message';
import Result from './Result';
import Agent from './Agent';
import Password from './Password';
import Ward from './Ward';
import '../css/dashboard.css';  
import 'animate.css';
import axios from 'axios';
import Alarm from './Alarm';

const Dashboard = () => {
    const [toggleKey, setToggleKey] = useState("");
    const [showHideBar, setShowHideBar] = useState(true);// means hide bar is not hidden 
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [propData, setPropData] = useState("");
    const [loginDet, setLoginDet] = useState(localStorage.getItem('subadmin'));
    const navigate = useNavigate();

    const api = 'https://naijavote.esbatech.org';//API endpoint
    const img = 'https://naijavote.esbatech.org/images';//image directory

    const toggleDashboard = (e) => {
        let dashMenu = document.querySelector("#"+e.target.id);
        let defaultDash = document.querySelector("#d1");

        const resetDash = (whichDash) => {
            
        }
        
        if (toggleKey === "") {
            resetDash(defaultDash);
            dashMenu.style.backgroundColor = "black";
            dashMenu.style.borderLeft = '2px solid rgb(0, 255, 0)';
            dashMenu.style.transition = "all 0.5s ease-in-out";
        }
        else {
            let dashKey = document.querySelector("#"+toggleKey);
            resetDash(dashKey);
            dashMenu.style.backgroundColor = "black";
            dashMenu.style.borderLeft = '2px solid rgb(0, 255, 0)';
            dashMenu.style.transition = "all 0.5s ease-in-out";
        }
        
        setToggleKey(e.target.id);
    }

    const getPropData = (data) => {
        setToggleKey(data);
    }

    useEffect(() => {
        let defaultDash = document.querySelector("#d1");    

        if (toggleKey === "") {
            defaultDash.style.backgroundColor = "black";
            defaultDash.style.borderLeft = '2px solid rgb(0, 255, 0)';
            defaultDash.style.transition = "all 0.5s ease-in-out";
        }
    }, [toggleKey]);

    const toggleSideBar = (e) => {
        let toggleId = e.target.id;
        let sideBar = document.querySelector(".dashSidebar");
        let mainDash = document.querySelector("#mainDash");
        let dashMainMain = document.querySelector(".dashMainMain");
        let dashToggleBar = document.querySelector(".dashToggle");

        let dashOpen = document.querySelector("#dashOpen");
        let dashClose = document.querySelector("#dashClose");

        if (showHideBar === true) {
            //means sidebar is open
            mainDash.style.display = "flex";
            sideBar.classList.add('animate__animated', 'animate__slideOutLeft');
            dashMainMain.classList.add('animate__animated', 'animate__fadeInRight');

            dashToggleBar.classList.add('animate__animated', 'animate__fadeInLeft');
            dashMainMain.style.marginLeft = '-20px';
            dashClose.style.display = "block";
            dashOpen.style.display ="none";
            sideBar.style.width = "0";
            sideBar.marginLeft = "-10px";
        }
        else {
            sideBar.style.width = "0";
            dashToggleBar.classList.add('animate__animated', 'animate__fadeInLeft');
            dashMainMain.style.marginLeft = '-20px';
            dashClose.style.display = "block";
            dashOpen.style.display ="none";
        }
    }

    const getAlarm = (data) => {
        setToggleKey(data);
    }

  return (
    <div>
      <Nav api={api} onClick={getAlarm}></Nav>

        <main id="mainDash" className='dashMain fixed'>
            <section className='dashSidebar text-white p-3 relative'>
                <div className='flex flex-row align-center justify-left mb-10'>
                    <FontAwesomeIcon icon={faCircleUser} className='text-white text-5xl'/>
                    <div className='mt-1'>
                        <p className='text-sm ml-3'>Admin</p>
                        <div className='adminStat'>
                            <p className='text ml-3 mr-3'>Online</p>
                            <p className='animate__animated animate__bounce bg-green-300 w-3 h-2 rounded-full'></p>
                        </div>
                    </div>
                </div>

                <p id='d1' className='dashMenu'onClick={toggleDashboard}>
                    <FontAwesomeIcon icon={faChartLine} className='mr-3'/>
                    Dashboard
                </p>

                <p id='d2' className='dashMenu'onClick={toggleDashboard}>
                    <FontAwesomeIcon icon={faGaugeSimple} className='mr-3'/>
                    Manage Agents
                </p>

                <p id='d3' className='dashMenu'onClick={toggleDashboard}>
                    <FontAwesomeIcon icon={faSquarePollVertical} className='mr-3'/>
                    Manage Messages
                </p>

                <p id='d4' className='dashMenu'onClick={toggleDashboard}>
                    <FontAwesomeIcon icon={faPersonBooth} className='mr-3'/>
                    Manage Parties
                </p>

                {/* <p id='d5' className='dashMenu'onClick={toggleDashboard}>
                    <FontAwesomeIcon icon={faHandshake} className='mr-3'/>
                    Results
                </p> */}

            </section>

            <section className='dashMainMain pl-12 m-1 mr-4 relative bg-white z-2'>
                 <div className='dashToggle animate__animated animate__fadeInLeft absolute top-0 left-0 -ml-1 -mt-1 py-2 pl-3 pr-3 z-1'>
                    <FontAwesomeIcon onClick={toggleSideBar} icon={faAngleLeft} id='dashOpen' className='cursor-pointer text-white'/>
                    <FontAwesomeIcon onClick={toggleSideBar} icon={faAngleRight} id='dashClose' className='cursor-pointer text-white'/>
                </div>

                {toggleKey === "" ?
                    <Dash api={api} trigger={"dash"} img={img} onClick={getPropData}/>
                :
                    toggleKey === "d1" ?
                        <Dash api={api} trigger={"dash"} img={img} onClick={getPropData}/>
                    :
                        toggleKey === "d2" ?
                            <Agent api={api} trigger={"party"} img={img} onClick={getPropData}/>
                        :
                            toggleKey === "d3" ?
                                <Message api={api} trigger={"poll"} img={img} onClick={getPropData}/>
                            :
                                toggleKey === "d4" ?
                                    <Party api={api} trigger={"ward"} img={img} onClick={getPropData}/>
                                :
                                    toggleKey === "d5" ?
                                        <Result api={api} trigger={"consti"} img={img} onClick={getPropData}/>
                                    :
                                        toggleKey === "d6" ?
                                            <Alarm api={api} trigger={"election"} img={img} onClick={getPropData}/>
                                        :
                                            toggleKey === "d7" ?
                                                <Password api={api} trigger={"subadmin"} img={img} onClick={getPropData}/>
                                            :
                                                <Dash api={api} trigger={"dash"} img={img} onClick={getPropData}/>
            }
            </section>
        </main>
    </div>
  )
}

export default Dashboard
