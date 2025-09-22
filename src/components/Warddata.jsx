import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import 'animate.css';
import '../css/miscdata.css';
import axios from 'axios';

const Warddata = () => {
    const [allState, setAllState] = useState({});
    const [partyBg, setPartyBg] = useState({
        A: 'ml-10 shadow-md rounded-sm bg-green-700 text-white p-1',
        AA: 'ml-10 shadow-md rounded-sm bg-white text-black p-1',
        AAC: 'ml-10 shadow-md rounded-sm bg-yellow-800 text-white p-1',
        ADC: 'ml-10 shadow-md rounded-sm bg-green-950 text-white p-1',
        ADP: 'ml-10 shadow-md rounded-sm bg-blue-700 text-white p-1',
        APC: 'ml-10 shadow-md rounded-sm bg-red-200 text-black p-1',
        APGA: 'ml-10 shadow-md rounded-sm bg-yellow-900 text-white p-1',
        APM: 'ml-10 shadow-md rounded-sm bg-white text-black p-1',
        APP: 'ml-10 shadow-md rounded-sm bg-red-100 text-black p-1',
        BP: 'ml-10 shadow-md rounded-sm bg-green-800 text-white p-1',
        LP: 'ml-10 shadow-md rounded-sm bg-white text-green-800 p-1',
        NNPP: 'ml-10 shadow-md rounded-sm bg-red-200 text-black p-1',
        NRM: 'ml-10 shadow-md rounded-sm bg-yellow-200 text-black p-1',
        PDP: 'ml-10 shadow-md rounded-sm bg-green-200 text-black p-1',
        PRP: 'ml-10 shadow-md rounded-sm bg-black text-white p-1',
        SDP: 'ml-10 shadow-md rounded-sm bg-yellow-300 text-black p-1',
        YPP: 'ml-10 shadow-md rounded-sm bg-white text-black p-1',
        ZLP: 'ml-10 shadow-md rounded-sm bg-white text-black p-1',
      });

  return (
    <div className='stateData ml-10'>
        <section className='misc1 flex flex-row mb-1'>
            <div className="shadow-sm rounded-sm p-1">
                <section className='text-sm text-nowrap bg-gray-100 p-1 flex flex-row'>
                    <p className='partyText'>Total Accredited Voters: </p>
                    <p className='partyText font-bold w-full text-right ml-1 text-blue-700'>200,000</p>
                </section>
                <section className='text-sm text-nowrap p-1 flex flex-row'>
                    <p className='partyText'>Valid Votes Cast: </p>
                    <p className='partyText font-bold w-full text-right ml-1 text-green-700'>3,000</p>
                </section>
                <section className='text-sm text-nowrap bg-gray-100 p-1 flex flex-row'>
                    <p className='partyText' title='Awaiting Results'>AWR: </p>
                    <p className='partyText font-bold w-full text-right ml-1'><span className='text-red-700'>200</span> / <span>3,000</span></p>
                </section>
            </div>

            <div className={partyBg.ADC}>
                <section className='partyImgDiv text-sm'>
                    <img src="/party/ADC.jpeg" alt="Party" className='w-8 h-7 mb-1' />
                    <p>ADC</p>
                </section>
                <section className='text-sm'>
                    <p className='partyTextVote'>Total Votes</p>
                    <p className='font-bold text-center'>200</p>
                </section>
            </div>

            <div className={partyBg.APC}>
                <section className='partyImgDiv text-sm'>
                    <img src="/party/APC.jpeg" alt="Party" className='w-8 h-7 mb-1' />
                    <p>APC</p>
                </section>
                <section className='text-sm'>
                    <p className='partyTextVote'>Total Votes</p>
                    <p className='font-bold text-center'>500</p>
                </section>
            </div>

            <div className={partyBg.APGA}>
                <section className='partyImgDiv text-sm'>
                    <img src="/party/APGA.jpeg" alt="Party" className='w-8 h-7 mb-1' />
                    <p>APGA</p>
                </section>
                <section className='text-sm'>
                    <p className='partyTextVote'>Total Votes</p>
                    <p className='font-bold text-center'>2,000</p>
                </section>
            </div>

            <div className={partyBg.LP}>
                <section className='partyImgDiv text-sm'>
                    <img src="/party/LP.jpeg" alt="Party" className='w-8 h-7 mb-1' />
                    <p>LP</p>
                </section>
                <section className='text-sm'>
                    <p className='partyTextVote'>Total Votes</p>
                    <p className='font-bold text-center'>150</p>
                </section>
            </div>

            <div className={partyBg.PDP}>
                <section className='partyImgDiv text-sm'>
                    <img src="/party/PDP.jpeg" alt="Party" className='w-8 h-7 mb-1' />
                    <p>PDP</p>
                </section>
                <section className='text-sm'>
                    <p className='partyTextVote'>Total Votes</p>
                    <p className='font-bold text-center'>800</p>
                </section>
            </div>
            
            <div className={partyBg.YPP}>
                <section className='partyImgDiv text-sm'>
                    <img src="/party/YPP.jpeg" alt="Party" className='w-8 h-7 mb-1' />
                    <p>YPP</p>
                </section>
                <section className='text-sm'>
                    <p className='partyTextVote'>Total Votes</p>
                    <p className='font-bold text-center'>50</p>
                </section>
            </div>
        </section>
    </div>
  )
}

export default Warddata
