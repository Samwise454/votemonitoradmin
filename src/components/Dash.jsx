import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import 'animate.css';
import '../css/dash.css';
import axios from 'axios';

const Dash = () => {
  const [whichDiv, setWhichDiv] = useState("poLga");

  const [whichParty, setWhichParty] = useState([
    "All Progressive Grand Alliance", "Action Alliance", "African Action Congress",
    "African Democratic Congress", "All Progressive Congress",
    "Accord", "Action People's Party", 
    "Allied Peoples Movement", "Boot Party", "Labour Party",
    "New Nigeria People's Party", "National Rescue Movement",
    "People's Democratic Party", "Social Democratic Party",
    "Young Progressive Party", "Zenith Labour Party"
  ]);

  const [partyBg, setPartyBg] = useState({
    A: 'flex flex-row shadow-md p-2 rounded-sm mr-5 bg-green-700 text-white text-sm',
    AA: 'flex flex-row shadow-md p-2 rounded-sm mr-5 bg-white text-black text-sm',
    AAC: 'flex flex-row shadow-md p-2 rounded-sm mr-5 bg-yellow-800 text-white text-sm',
    ADC: 'flex flex-row shadow-md p-2 rounded-sm mr-5 bg-green-950 text-white text-sm',
    ADP: 'flex flex-row shadow-md p-2 rounded-sm mr-5 bg-blue-700 text-white text-sm',
    APC: 'flex flex-row shadow-md p-2 rounded-sm mr-5 bg-red-200 text-black text-sm',
    APGA: 'flex flex-row shadow-md p-2 rounded-sm mr-5 bg-yellow-900 text-white text-sm',
    APM: 'flex flex-row shadow-md p-2 rounded-sm mr-5 bg-white text-black text-sm',
    APP: 'flex flex-row shadow-md p-2 rounded-sm mr-5 bg-red-100 text-black text-sm',
    BP: 'flex flex-row shadow-md p-2 rounded-sm mr-5 bg-green-800 text-white text-sm',
    LP: 'flex flex-row shadow-md p-2 rounded-sm mr-5 bg-white text-green-800 text-sm',
    NNPP: 'flex flex-row shadow-md p-2 rounded-sm mr-5 bg-red-200 text-black text-sm',
    NRM: 'flex flex-row shadow-md p-2 rounded-sm mr-5 bg-yellow-200 text-black text-sm',
    PDP: 'flex flex-row shadow-md p-2 rounded-sm mr-5 bg-green-200 text-black text-sm',
    PRP: 'flex flex-row shadow-md p-2 rounded-sm mr-5 bg-black text-white text-sm',
    SDP: 'flex flex-row shadow-md p-2 rounded-sm mr-5 bg-yellow-300 text-black text-sm',
    YPP: 'flex flex-row shadow-md p-2 rounded-sm mr-5 bg-white text-black text-sm',
    ZLP: 'flex flex-row shadow-md p-2 rounded-sm mr-5 bg-white text-black text-sm',
  });

  const [partyAcronym, setPartyAcronym] = useState(["ADC", "APC", "APGA", "LP", "PDP", "YPP"]);

  const [partyPercent, setPartyPercent] = useState([2, 20, 40, 10, 20, 8]);

  useEffect(() => {
    let numParty = partyPercent.length;
    for (let i = 0; i < numParty; i++) {
      //looping through the number of parties
      let bar = document.querySelector("#bar_"+i);
      let barTableHeight = document.querySelector("#barTable").clientHeight;//eg 460px
      
      //let's now calculate the height of each bar
      let eachBar = Math.floor((partyPercent[i] / 100) * 425);
      bar.style.height = eachBar+"px"; 
      bar.style.transition = "height 2s ease-in-out";
    }
  }, [partyPercent]);


  return (
    <div>
      <div className="eachParty flex flex-row mt-10 align-center justify-center">
        <section className='flex flex-row shadow-md p-2 rounded-sm mr-5'>
          <div className='text-l'>
            <table>
                <tbody className='text-sm text-nowrap leading-8'>
                    <tr>
                        <td className='pl-1'>Accredited Voters:</td>
                        <td className='text-left pl-3 pr-1 font-bold text-blue-700'>100,000,000</td>
                    </tr>

                    <tr>
                        <td className='pl-1'>Valid Votes Cast:</td>
                        <td className='text-left pl-3 pr-1 font-bold text-green-700'>200</td>
                    </tr>

                    <tr>
                        <td title='Awaiting Results' className='pl-1'>AWR</td>
                        <td className='text-left pl-3 pr-1 font-bold'><span className='text-red-700'>200</span> / <span>1,000</span></td>
                    </tr>
                </tbody>
            </table>
          </div>
        </section>

        <section className={partyBg.ADC}>
          <div>
            <div className='flex flex-row'>
                <img src="/party/ADC.jpeg" id="logo1" className='cursor-pointer rounded-sm w-10 h-10 mt-1 mr-2' alt="Party logo" />
                <p className='text-sm mt-4 pr-2'>ADC</p>
            </div>
            
            <section className='mt-2 shadow-md p-1 animate__animated animate__slideInDown text-center'>
                Total Votes 
                <p className='font-bold text-md'>2,000</p>
            </section>
          </div>
        </section>

        <section className={partyBg.APC}>
          <div>
            <div className='flex flex-row'>
                <img src="/party/APC.jpeg" id="logo1" className='cursor-pointer rounded-sm w-10 h-10 mt-1 mr-2' alt="Party logo" />
                <p className='text-sm mt-4 pr-2'>APC</p>
            </div>
            
            <section className='mt-2 shadow-md p-1 animate__animated animate__slideInDown text-center'>
                Total Votes 
                <p className='font-bold text-md'>16,000</p>
            </section>
          </div>
        </section>

        <section className={partyBg.APGA}>
          <div>
            <div className='flex flex-row'>
                <img src="/party/APGA.jpeg" id="logo1" className='cursor-pointer rounded-sm w-10 h-10 mt-1 mr-2' alt="Party logo" />
                <p className='text-sm mt-4 pr-2'>APGA</p>
            </div>
            
            <section className='mt-2 shadow-md p-1 animate__animated animate__slideInDown text-center'>
                Total Votes 
                <p className='font-bold text-md'>156,000</p>
            </section>
          </div>
        </section>

        <section className={partyBg.LP}>
          <div>
            <div className='flex flex-row'>
                <img src="/party/LP.jpeg" id="logo1" className='cursor-pointer rounded-sm w-10 h-10 mt-1 mr-2' alt="Party logo" />
                <p className='text-sm mt-4 pr-2'>LP</p>
            </div>
            
            <section className='mt-2 shadow-md p-1 animate__animated animate__slideInDown text-center'>
                Total Votes 
                <p className='font-bold text-md'>6,000</p>
            </section>
          </div>
        </section>

        <section className={partyBg.PDP}>
          <div>
            <div className='flex flex-row'>
                <img src="/party/PDP.jpeg" id="logo1" className='cursor-pointer rounded-sm w-10 h-10 mt-1 mr-2' alt="Party logo" />
                <p className='text-sm mt-4 pr-2'>PDP</p>
            </div>
            
            <section className='mt-2 shadow-md p-1 animate__animated animate__slideInDown text-center'>
                Total Votes 
                <p className='font-bold text-md'>60,000</p>
            </section>
          </div>
        </section>

        <section className={partyBg.YPP}>
          <div>
            <div className='flex flex-row'>
                <img src="/party/YPP.jpeg" id="logo1" className='cursor-pointer rounded-sm w-10 h-10 mt-1 mr-2' alt="Party logo" />
                <p className='text-sm mt-4 pr-2'>YPP</p>
            </div>
            
            <section className='mt-2 shadow-md p-1 animate__animated animate__slideInDown text-center'>
                Total Votes 
                <p className='font-bold text-md'>1,560</p>
            </section>
          </div>
        </section>
      </div>

      <div className='relative'>
          <table id='barTable' className='resultTable relative mt-5'>
            <tbody className=''>
                <tr><td className='text-sm'>100<hr className='tableHr'/></td></tr>
                <tr><td className='text-sm '>90<hr className='tableHr'/></td></tr>
                <tr><td className='text-sm '>80<hr className='tableHr'/></td></tr>
                <tr><td className='text-sm '>70<hr className='tableHr'/></td></tr>
                <tr><td className='text-sm '>60<hr className='tableHr'/></td></tr>
                <tr><td className='text-sm'>50<hr className='tableHr'/></td></tr>
                <tr><td className='text-sm '>40<hr className='tableHr'/></td></tr>
                <tr><td className='text-sm '>20<hr className='tableHr'/></td></tr>
                <tr><td className='text-sm '>20<hr className='tableHr'/></td></tr>
                <tr><td className='text-sm'>10<hr className='tableHr'/></td></tr>
                <tr><td className='text-sm'>0<hr className='tableHr'/></td></tr>
            </tbody>
          </table>

          <div className='partyDiv absolute bottom-0 -mb-11 ml-10 w-full'>
              {partyAcronym.map((data, dataIndex) => {
                return (
                  <section key={dataIndex} className='barDiv flex align-center justify-center flex-col relative'>
                    <div id={"bar_"+dataIndex} className="barMain w-full mb-6 bg-blue-600 ml-1">
                      <div className="barVal absolute -mt-5 rounded-full bg-black text-white shadow-sm top-0 w-fit p-1 px-1.5 text-center text-sm">
                        {partyPercent[dataIndex]}
                      </div>
                    </div>  

                    <div className="pLogo w-full h-auto absolute bottom-0 -mb-13">
                      <img src={"/party/"+partyAcronym[dataIndex]+".jpeg"} id={"p"+dataIndex} className='cursor-pointer rounded-sm h-13 w-15 border-1' alt="Party logo" />

                      <p className='text-center text-sm mt-1'>{partyAcronym[dataIndex]}</p>
                    </div>
                  </section>
                );
              })}
            </div>
      </div>
    </div>
  )
}

export default Dash
