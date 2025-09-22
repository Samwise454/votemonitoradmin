import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCircleXmark, faGear } from '@fortawesome/free-solid-svg-icons';
import '../css/nav.css';
import 'animate.css';

const Nav = (props) => {
  const [toggleMenu, setToggleMenu] = useState(false);//menu hidden by default
  const navigate = useNavigate(); 

  const hideShowMenu = () => {
    let open = document.querySelector("#openMenu");
    let close = document.querySelector("#closeMenu");
    let menu = document.querySelector("#menuList");

    if (toggleMenu === false) {
      close.classList.remove('animate__animated', 'animate__rollOut');
      open.classList.remove('animate__animated', 'animate__rollIn');
      menu.classList.remove('animate__animated', 'animate__slideOutDown');
      close.classList.remove('hidden');
      menu.classList.remove('hidden');

      open.classList.add('animate__animated', 'animate__rollOut');
      close.classList.add('animate__animated', 'animate__rollIn');
      menu.classList.add('animate__animated', 'animate__slideInDown');
      setToggleMenu(true);
    }
    else if (toggleMenu === true) {
      open.classList.remove('animate__animated', 'animate__rollOut');
      close.classList.remove('animate__animated', 'animate__rollIn');
      menu.classList.remove('animate__animated', 'animate__slideInDown');
      close.classList.add('hidden');

      close.classList.add('animate__animated', 'animate__rollOut');
      open.classList.add('animate__animated', 'animate__rollIn');
      menu.classList.add('animate__animated', 'animate__zoomOut');
      setToggleMenu(false);
    }
  }

  const passProp = (e) => {
    let data = e.currentTarget.id.split("_");
    if (data[0] === "d7") {
      hideShowMenu();
    }
    props.onClick(data[0]);
  }

  const logout = () => {
    localStorage.removeItem('subadmin');
    navigate("/");
  }


  return (
   <div className='navMain bg-green-950 p-2 py-3'>
      <section className='flex flex-row align-left justify-left'>
        <img src="/logo1.png" alt="Page Logo" className='w-15 cursor-pointer' />
        <p className='mt-4 text-green-400 cursor-pointer'><b>Vote Monitor</b></p>
      </section>

      <section className='flex pt-2.5 align-center justify-center-safe'>
        <div className='relative'>
          <FontAwesomeIcon onClick={passProp} id="d6_nav" icon={faBell} className='text-yellow-400 text-3xl cursor-pointer'/>
          <span className='bg-green-950 text-white rounded-full absolute top-0 right-0 -mr-2 -mt-2 px-2 py-0 text-md cursor-pointer'>
            3
          </span>
        </div>

        <div className='relative border-1 border-white rounded-md ml-8 px-4 pt-1 cursor-pointer'>
          <span className='text-white' id="d2_nav" onClick={passProp}>Agents</span>
          <span className='absolute top-0 right-0 -mt-3 -mr-3 text-sm bg-green-950 text-white rounded-full px-1.5 py-1'>
            10
          </span>
        </div>

        <div className='relative border-1 border-white rounded-md ml-8 px-4 pt-1 cursor-pointer'>
          <span className='text-white' id="d3_nav" onClick={passProp}>Messages</span>
          <span className='absolute top-0 right-0 -mt-3 -mr-3 text-sm bg-green-950 text-white rounded-full px-1.5 py-1'>
            5
          </span>
        </div>

        <div className='relative border-1 border-white rounded-md ml-8 px-4 pt-1 cursor-pointer'>
          <span className='text-white' id="d4_nav" onClick={passProp}>Parties</span>
          <span className='absolute top-0 right-0 -mt-3 -mr-3 text-sm bg-green-950 text-white rounded-full px-1.5 py-1'>
            6
          </span>
        </div>
      </section>

      <section className='text-right mt-2 mr-5 text-white relative z-2'>
        <div className='flex align-right justify-end-safe'>
            <section id='openMenu'>
              <FontAwesomeIcon onClick={hideShowMenu} icon={faGear} className='cursor-pointer text-3xl text-white'/>
            </section>
          
            <section id='closeMenu' className='hidden'>
              <FontAwesomeIcon onClick={hideShowMenu} icon={faCircleXmark} className='cursor-pointer text-3xl text-white'/>
            </section>
        </div>


        <div id="menuList" className='hidden absolute mt-13 shadow-sm bg-white top-0 right-0 text-black'>
          <section id="d7_nav" onClick={passProp} className='shadow-sm pt-5 pb-5 text-center cursor-pointer px-10'>Manage Password</section>
          <section onClick={logout} className='shadow-sm pt-5 pb-5 text-center cursor-pointer px-10'>Sign Out</section>
        </div>
      </section>
   </div>
  )
}

export default Nav
