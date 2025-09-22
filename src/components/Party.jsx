import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate, faUnlock } from '@fortawesome/free-solid-svg-icons';
import '../css/party.css';
import axios from 'axios';

const Party = () => {
  const [openForm, setOpenForm] = useState(true);
  const [activeInactive, setActiveInactive] = useState("active");
  const [partyList, setPartyList] = useState([]);

  return (
    <div>
      <h2 className='mt-3 text-xl mb-3'>Manage Parties</h2>

      <section id='partyDiv' className='bg-gray-100 p-5 mt-3'>
        <div>
          <section className='partyList bg-white p-3 rounded-sm leading-10'>
            <p><input type="checkbox" value={"A"} className='w-4 h-4 cursor-pointer'/> <span className='ml-2'>Accord</span></p>
            <p><input type="checkbox" value={"AA"} className='w-4 h-4 cursor-pointer'/> <span className='ml-2'>Action Alliance</span></p>
            <p><input type="checkbox" value={"AAC"} className='w-4 h-4 cursor-pointer'/> <span className='ml-2'>African Democratic Congress</span></p>
            <p><input type="checkbox" value={"AA"} className='w-4 h-4 cursor-pointer'/> <span className='ml-2'>Action Alliance</span></p>
            <p><input type="checkbox" value={"AA"} className='w-4 h-4 cursor-pointer'/> <span className='ml-2'>Action Alliance</span></p>
            <p><input type="checkbox" value={"AA"} className='w-4 h-4 cursor-pointer'/> <span className='ml-2'>Action Alliance</span></p>
            <p><input type="checkbox" value={"AA"} className='w-4 h-4 cursor-pointer'/> <span className='ml-2'>Action Alliance</span></p>
            <p><input type="checkbox" value={"AA"} className='w-4 h-4 cursor-pointer'/> <span className='ml-2'>Action Alliance</span></p>
            <p><input type="checkbox" value={"AA"} className='w-4 h-4 cursor-pointer'/> <span className='ml-2'>Action Alliance</span></p>
            <p><input type="checkbox" value={"AA"} className='w-4 h-4 cursor-pointer'/> <span className='ml-2'>Action Alliance</span></p>
            <p><input type="checkbox" value={"AA"} className='w-4 h-4 cursor-pointer'/> <span className='ml-2'>Action Alliance</span></p>
            <p><input type="checkbox" value={"AA"} className='w-4 h-4 cursor-pointer'/> <span className='ml-2'>Action Alliance</span></p>
            <p><input type="checkbox" value={"AA"} className='w-4 h-4 cursor-pointer'/> <span className='ml-2'>Action Alliance</span></p>
            <p><input type="checkbox" value={"AA"} className='w-4 h-4 cursor-pointer'/> <span className='ml-2'>Action Alliance</span></p>
            <p><input type="checkbox" value={"AA"} className='w-4 h-4 cursor-pointer'/> <span className='ml-2'>Action Alliance</span></p>
            <p><input type="checkbox" value={"AA"} className='w-4 h-4 cursor-pointer'/> <span className='ml-2'>Action Alliance</span></p>
            <p><input type="checkbox" value={"AA"} className='w-4 h-4 cursor-pointer'/> <span className='ml-2'>Action Alliance</span></p>
            <p><input type="checkbox" value={"AA"} className='w-4 h-4 cursor-pointer'/> <span className='ml-2'>Action Alliance</span></p>
          </section>

          <section className='mt-4 bg-white p-3'>
            <p className='mb-3'>Selected Parties</p>

            <div className='leading-8'>
              <p>Accord</p>
              <p>All Progressive Congress</p>
              <p>All Progressive Congress</p>
              <p>All Progressive Congress</p>
              <p>All Progressive Congress</p>
              <p>All Progressive Congress</p>
            </div>
          </section>

          <div className='mt-2 text-right'>
            <button className='border-0 outline-0 bg-green-700 text-white rounded-sm cursor-pointer px-3 py-2'>
              Submit
            </button>
          </div>
        </div>

        <div>
          <p className='bg-white w-fit p-2'>Submitted Parties</p>

          <div className='submittedParty mt-6'>
            <section className='flex flex-col relative align-center justify-center bg-white rounded-sm shadow-sm p-3'>
              <img src="/party/A.jpeg" alt="Party logo" className='mb-6 rounded-sm'/>
              <p className='absolute bottom-0 mb-2'>Accord</p>
            </section>

            <section className='flex flex-col relative align-center justify-center bg-white rounded-sm shadow-sm p-3'>
              <img src="/party/APC.jpeg" alt="Party logo" className='mb-6 rounded-sm'/>
              <p className='absolute bottom-0 mb-2'>APC</p>
            </section>

            <section className='flex flex-col relative align-center justify-center bg-white rounded-sm shadow-sm p-3'>
              <img src="/party/ADC.jpeg" alt="Party logo" className='mb-6 rounded-sm'/>
              <p className='absolute bottom-0 mb-2'>ADC</p>
            </section>

            <section className='flex flex-col relative align-center justify-center bg-white rounded-sm shadow-sm p-3'>
              <img src="/party/APGA.jpeg" alt="Party logo" className='mb-6 rounded-sm'/>
              <p className='absolute bottom-0 mb-2'>APGA</p>
            </section>

            <section className='flex flex-col relative align-center justify-center bg-white rounded-sm shadow-sm p-3'>
              <img src="/party/PDP.jpeg" alt="Party logo" className='mb-6 rounded-sm'/>
              <p className='absolute bottom-0 mb-2'>PDP</p>
            </section>

            <section className='flex flex-col relative align-center justify-center bg-white rounded-sm shadow-sm p-3'>
              <img src="/party/LP.jpeg" alt="Party logo" className='mb-6 rounded-sm'/>
              <p className='absolute bottom-0 mb-2'>LP</p>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Party
