import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import 'animate.css';
import '../css/dash.css';
import axios from 'axios';

const Dash = (props) => {
  const [whichDiv, setWhichDiv] = useState("poLga");
  const [loading, setLoading] = useState(false);
  const [loginDet, setLoginDet] = useState(localStorage.getItem('subadmin'));
  const api = props.api;
  const img = 'https://naijavote.esbatech.org/images/partyLogo/';//image directory
  const trigger = props.trigger;
  const [allResult, setAllResult] = useState({
      accredVoter: "",
      awr: "",
      regVoter: "",
      validVoter: ""
  });

  const fetchGeneral = api + "/getresult.php";

  useEffect(() => {
      if (loginDet === null) {
          navigate("/");
      }
      else {
          setLoading(true);
          let data = {
              subadmin: loginDet
          }
          const getResult = async () => {
              try {
                  const response = await axios.post(fetchGeneral, JSON.stringify(data));
                  // console.log(response.data);
                  if (response.status === 200) {
                      setAllResult({
                          accredVoter: response.data.accred,
                          awr: response.data.awr,
                          regVoter: response.data.regVoter,
                          validVoter: response.data.validVote
                      });
                      setPartyAcronym([
                        response.data.partyAcro1,
                        response.data.partyAcro2,
                        response.data.partyAcro3,
                        response.data.partyAcro4,
                        response.data.partyAcro5,
                        response.data.partyAcro6,
                      ]);
                      setPartyPercent([
                        response.data.party1,
                        response.data.party2,
                        response.data.party3,
                        response.data.party4,
                        response.data.party5,
                        response.data.party6,
                      ]);
                  }
                  else {
                      setAllResult({
                          accredVoter: "",
                          awr: "",
                          regVoter: "",
                          validVoter: ""
                      });
                      setPartyAcronym(["","","","","",""]);
                      setPartyPercent([0,0,0,0,0,0]);
                  }
              } catch(err) {
                  setAllResult({
                      accredVoter: "",
                      awr: "",
                      regVoter: "",
                      validVoter: ""
                  });
                  setPartyAcronym(["","","","","",""]);
                  setPartyPercent([0,0,0,0,0,0]);
              } finally {
                  setLoading(false);
              }
          }
          getResult();
      }
  }, [trigger]);

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

  const [partyAcronym, setPartyAcronym] = useState(["","","","","",""]);

  const [partyPercent, setPartyPercent] = useState([0,0,0,0,0,0]);

  const [oldHeight, setOldHeight] = useState([15, 10, 40, 5, 10, 20]);

  const [hToggle, setHtoggle] = useState(false);

  useEffect(() => {
    let voteCount = document.querySelectorAll(".voteCount");
    if (hToggle === false) {
      voteCount.forEach((element) => {
        element.classList.add('animate__animated', 'animate__zoomIn');
      });
      setHtoggle(true);
    }
    // else {
    //   setHtoggle(false);
    // }
  }, []);

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    let numParty = partyPercent.length;
    const allChartData = [];
    
    for (let i = 0; i < numParty; i++) {
      //looping through the number of parties
      let bar = document.querySelector("#bar_"+i);
      let barTableHeight = document.querySelector("#barTable").clientHeight;//eg 460px
      let tableHeight = 425;
      let totalVotes = allResult.validVoter

      //let's now calculate the height of each bar
      let eachBar = Math.floor((partyPercent[i] / totalVotes) * 100).toFixed(0);//by how much each bar should grow
      let barGrowth = Math.floor((partyPercent[i] / totalVotes) * tableHeight).toFixed(0);
      allChartData.push(eachBar);
     
      bar.style.height = barGrowth+"px"; 
      bar.style.transition = "height 4s ease-in-out";
    }
    
    setChartData(allChartData)
  }, [partyPercent]);


  return (
    <div>
      {loading == true ?
          <section id='page_loader' className='absolute top-0 right-0'>
              <span className='loader mr-5'>

              </span>
          </section>  
      :
          <></>
      }
      <div className="eachParty flex flex-row mt-10 align-center justify-center">
        <section className='flex flex-row shadow-md p-2 rounded-sm mr-5'>
          <div className='text-l'>
            <table>
                <tbody className='text-sm text-nowrap leading-8'>
                    <tr>
                        <td className='pl-1'>Accredited Voters:</td>
                        <td className='text-left pl-3 pr-1 font-bold text-blue-700'>{allResult.accredVoter}</td>
                    </tr>

                    <tr>
                        <td className='pl-1'>Valid Votes Cast:</td>
                        <td className='text-left pl-3 pr-1 font-bold text-green-700'>{allResult.validVoter}</td>
                    </tr>

                    <tr>
                        <td title='Awaiting Results' className='pl-1'>AWR</td>
                        <td className='text-left pl-3 pr-1 font-bold'><span className='text-red-700'>{allResult.awr}</span> / <span>{allResult.regVoter}</span></td>
                    </tr>
                </tbody>
            </table>
          </div>
        </section>

        <section className={partyBg[partyAcronym[0]]}>
          <div>
            <div className='flex flex-row'>
                <img src={img + partyAcronym[0] + ".jpeg"} id="logo1" className='cursor-pointer rounded-sm w-10 h-10 mt-1 mr-2' alt="Party logo" />
                <p className='text-sm mt-4 pr-2'>{partyAcronym[0]}</p>
            </div>
            
            <section className='voteCount mt-2 shadow-md p-1 text-center'>
                Total Votes 
                <p className='font-bold text-md'>{partyPercent[0]}</p>
            </section>
          </div>
        </section>

        <section className={partyBg[partyAcronym[1]]}>
          <div>
            <div className='flex flex-row'>
                <img src={img + partyAcronym[1] + ".jpeg"} id="logo2" className='cursor-pointer rounded-sm w-10 h-10 mt-1 mr-2' alt="Party logo" />
                <p className='text-sm mt-4 pr-2'>{partyAcronym[1]}</p>
            </div>
            
            <section className='voteCount mt-2 shadow-md p-1 text-center'>
                Total Votes 
                <p className='font-bold text-md'>{partyPercent[1]}</p>
            </section>
          </div>
        </section>

        <section className={partyBg[partyAcronym[2]]}>
          <div>
            <div className='flex flex-row'>
                <img src={img + partyAcronym[2] + ".jpeg"} id="logo3" className='cursor-pointer rounded-sm w-10 h-10 mt-1 mr-2' alt="Party logo" />
                <p className='text-sm mt-4 pr-2'>{partyAcronym[2]}</p>
            </div>
            
            <section className='voteCount mt-2 shadow-md p-1 text-center'>
                Total Votes 
                <p className='font-bold text-md'>{partyPercent[2]}</p>
            </section>
          </div>
        </section>

        <section className={partyBg[partyAcronym[3]]}>
          <div>
            <div className='flex flex-row'>
                <img src={img + partyAcronym[3] + ".jpeg"} id="logo4" className='cursor-pointer rounded-sm w-10 h-10 mt-1 mr-2' alt="Party logo" />
                <p className='text-sm mt-4 pr-2'>{partyAcronym[3]}</p>
            </div>
            
            <section className='voteCount mt-2 shadow-md p-1 text-center'>
                Total Votes 
                <p className='font-bold text-md'>{partyPercent[3]}</p>
            </section>
          </div>
        </section>

        <section className={partyBg[partyAcronym[4]]}>
          <div>
            <div className='flex flex-row'>
                <img src={img + partyAcronym[4] + ".jpeg"} id="logo5" className='cursor-pointer rounded-sm w-10 h-10 mt-1 mr-2' alt="Party logo" />
                <p className='text-sm mt-4 pr-2'>{partyAcronym[4]}</p>
            </div>
            
            <section className='voteCount mt-2 shadow-md p-1 text-center'>
                Total Votes 
                <p className='font-bold text-md'>{partyPercent[4]}</p>
            </section>
          </div>
        </section>

        <section className={partyBg[partyAcronym[5]]}>
          <div>
            <div className='flex flex-row'>
                <img src={img + partyAcronym[5] + ".jpeg"} id="logo6" className='cursor-pointer rounded-sm w-10 h-10 mt-1 mr-2' alt="Party logo" />
                <p className='text-sm mt-4 pr-2'>{partyAcronym[5]}</p>
            </div>
            
            <section className='voteCount mt-2 shadow-md p-1 text-center'>
                Total Votes 
                <p className='font-bold text-md'>{partyPercent[5]}</p>
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
                        {chartData[dataIndex] + " %"}
                      </div>
                    </div>  

                    <div className="pLogo w-full h-auto absolute bottom-0 -mb-13">
                      <img src={img + partyAcronym[dataIndex]+".jpeg"} id={"p"+dataIndex} className='cursor-pointer rounded-sm h-13 w-15 border-1' alt="Party logo" />

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
