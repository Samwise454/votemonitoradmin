import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import 'animate.css';
import '../css/dash.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Result from '../components/Result';

const Dash = (props) => {
  const [whichDiv, setWhichDiv] = useState("poLga");
  const [loading, setLoading] = useState(false);
  const [loginDet, setLoginDet] = useState(localStorage.getItem('subadmin'));
  const api = props.api;
  const img = 'https://naijavote.esbatech.org/images/partyLogo/';//image directory
  const trigger = props.trigger;
  const [allResult, setAllResult] = useState({
      accredVoter: "",
      invalidVote: "",
      regVoter: "",
      validVoter: "",
      awrNumer: "",
      awrDenom: ""
  });
  const navigate = useNavigate();

  const userData = localStorage.getItem("subadmin");

  const fetchGeneral = api + "/getresult.php";
  const [lastCount, setLastCount] = useState(0);
  const eventSourceLink = api + `/getstream.php?subadmin=${userData}&lastcount=${lastCount}`;

  const [partyAcronym, setPartyAcronym] = useState(["","","","","",""]);

  const [partyPercent, setPartyPercent] = useState([0,0,0,0,0,0]);
  const [winner, setWinner] = useState(0);

  useEffect(() => {
      if (loginDet === null) {
          navigate("/");
      }
      else {
          // setLoading(true);
          let data = {
              subadmin: loginDet
          }
          const getResult = async () => {
              try {
                  const response = await axios.post(fetchGeneral, JSON.stringify(data));
                  // console.log(response.data);
                  if (response.status === 200) {
                      setPartyAcronym([
                        response.data.partyAcro1,
                        response.data.partyAcro2,
                        response.data.partyAcro3,
                        response.data.partyAcro4,
                        response.data.partyAcro5,
                        response.data.partyAcro6,
                      ]);
                  }
                  else {
                      setPartyAcronym(["","","","","",""]);
                  }
              } catch(err) {
                  setPartyAcronym(["","","","","",""]);
              } finally {
                  // setLoading(false);
              }
          }
          getResult();
      }

      return () => {
      
      };
  }, [trigger]);

  //this useEffect fetches the result at intervals of 3 seconds using SSE
  useEffect(() => {
    let retryTimeout;
    let eventSource;

      const connect = () => {
        // Create a new EventSource instance
        eventSource = new EventSource(eventSourceLink);

        // Event listener for incoming messages
        eventSource.onmessage = (event) => {
            try {
                const dashData = event.data;

                if (dashData.error) {
                    setAllResult({
                      accredVoter: "",
                      invalidVote: "",
                      regVoter: "",
                      validVoter: "",
                      awrNumer: "",
                      awrDenom: ""
                    });
                    setPartyPercent([0,0,0,0,0,0]);
                } else {
                    // $allData = 'regVoter-'.$allRegVoter.'_accred-'.$allAccred.'_validVote-'.$allValidVote.'_awr-'.$allAwr.'_party1-'.$party1Res.'_party2-'.$party2Res.'_party3'.$party3Res.'_party4-'.$party4Res.'_party5-'.$party5Res.'_party6-'.$party6Res.'_lastcount-'.$trackCount;
                    //let's break the data
                    let splitData = dashData.split("_");

                    let regVoter = splitData[0].split("-")[1];//eg regVoter-4000, we now split and get 4000;
                    let accredVoter = splitData[1].split("-")[1];
                    let validVote = splitData[2].split("-")[1];
                    let invalidVote = splitData[3].split("-")[1];
                    let party1 = splitData[4].split("-")[1];
                    let party2 = splitData[5].split("-")[1];
                    let party3 = splitData[6].split("-")[1];
                    let party4 = splitData[7].split("-")[1];
                    let party5 = splitData[8].split("-")[1];
                    let party6 = splitData[9].split("-")[1];
                    let lastcount = splitData[10].split("-")[1];
                    let awrNumer = splitData[11].split("-")[1];
                    let awrDenom = splitData[12].split("-")[1];

                    setAllResult({
                        accredVoter: accredVoter,
                        invalidVote: invalidVote,
                        regVoter: regVoter,
                        validVoter: validVote,
                        awrNumer: awrNumer,
                        awrDenom: awrDenom
                    });
                    setPartyPercent([party1, party2, party3, party4, party5, party6,]);
                    let partyArray = [party1, party2, party3, party4, party5, party6,];
                    let maxPercent = Math.max(...partyArray);
                    setWinner(maxPercent);
                    setLastCount(lastcount);
                    // console.log(dashData);
                }
            } catch (e) {   
              //add something here later
            }
        };

        // Event listener for errors
        eventSource.onerror = (error) => {
            // console.error("EventSource error:", error);
            eventSource.close(); // Close the connection on error

            // Try reconnecting in 3 seconds
            retryTimeout = setTimeout(() => {
              // console.log("Reconnecting SSE...");
              connect();
            }, 5000);
        };
      }

      connect();

      // Clean up the EventSource connection when the component unmounts
      return () => {
        if (retryTimeout) clearTimeout(retryTimeout);
        if(eventSource) eventSource.close();
      };
  }, [trigger]);

  const [partyBg, setPartyBg] = useState({
    A: 'flex flex-row shadow-md p-2 rounded-sm w-full mx-3 bg-white text-sm items-center min-w-25 relative',
    AA: 'flex flex-row shadow-md p-2 rounded-sm w-full mx-3 bg-white text-sm items-center min-w-25 relative',
    AAC: 'flex flex-row shadow-md p-2 rounded-sm w-full mx-3 bg-white text-sm items-center min-w-25 relative',
    ADC: 'flex flex-row shadow-md p-2 rounded-sm w-full mx-3 bg-white text-sm items-center min-w-25 relative',
    ADP: 'flex flex-row shadow-md p-2 rounded-sm w-full mx-3 bg-white text-sm items-center min-w-25 relative',
    APC: 'flex flex-row shadow-md p-2 rounded-sm w-full mx-3 bg-white text-sm items-center min-w-25 relative',
    APGA: 'flex flex-row shadow-md p-2 rounded-sm w-full mx-3 bg-white text-sm items-center min-w-25 relative',
    APM: 'flex flex-row shadow-md p-2 rounded-sm w-full mx-3 bg-white text-sm items-center min-w-25 relative',
    APP: 'flex flex-row shadow-md p-2 rounded-sm w-full mx-3 bg-white text-sm items-center min-w-25 relative',
    BP: 'flex flex-row shadow-md p-2 rounded-sm w-full mx-3 bg-white text-sm items-center min-w-25 relative',
    LP: 'flex flex-row shadow-md p-2 rounded-sm w-full mx-3 bg-white text-sm items-center min-w-25 relative',
    NNPP: 'flex flex-row shadow-md p-2 rounded-sm w-full mx-3 bg-white text-sm items-center min-w-25 relative',
    NRM: 'flex flex-row shadow-md p-2 rounded-sm w-full mx-3 bg-white text-sm items-center min-w-25 relative',
    PDP: 'flex flex-row shadow-md p-2 rounded-sm w-full mx-3 bg-white text-sm items-center min-w-25 relative',
    PRP: 'flex flex-row shadow-md p-2 rounded-sm w-full mx-3 bg-white text-sm items-center min-w-25 relative',
    SDP: 'flex flex-row shadow-md p-2 rounded-sm w-full mx-3 bg-white text-sm items-center min-w-25 relative',
    YPP: 'flex flex-row shadow-md p-2 rounded-sm w-full mx-3 bg-white text-sm items-center min-w-25 relative',
    ZLP: 'flex flex-row shadow-md p-2 rounded-sm w-full mx-3 bg-white text-sm items-center min-w-25 relative',
  });

  const [resultStat, setResultState] = useState(false);

  const [hToggle, setHtoggle] = useState(false);

  //this controls animation effect
  useEffect(() => {
    let voteCount = document.querySelectorAll(".voteCount");
    if (hToggle === false) {
      voteCount.forEach((element) => {
        element.classList.add('animate__animated', 'animate__zoomIn');
      });
      setHtoggle(true);
    }

    return () => {
      
    };
  }, []);

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    let numParty = partyPercent.length;
    const allChartData = [];
    
    for (let i = 0; i < numParty; i++) {
      //looping through the number of parties
      let bar = document.querySelector("#bar_"+i);
      // let barTableHeight = document.querySelector("#barTable").clientHeight;//eg 460px
      let tableHeight = 425;
      let totalVotes = allResult.validVoter
      // console.log(totalVotes)
      //let's now calculate the height of each bar
      let eachBar = ((partyPercent[i] / totalVotes) * 100).toFixed(1);//by how much each bar should grow
      let barGrowth = Math.floor((partyPercent[i] / totalVotes) * tableHeight).toFixed(1);
      allChartData.push(eachBar);
     
      if (resultStat === false) {
        bar.style.height = barGrowth+"px"; 
        bar.style.transition = "height 4s ease-in-out";
      }
    }
    
    setChartData(allChartData);

    return () => {
      
    };
  }, [partyPercent]);


  //result breakdown
  const [electionProfile, setElectionProfile] = useState("pres");
  const [what, setWhat] = useState("");
  const [allState, setAllState] = useState([]);
  const [allLga, setAllLga] = useState([]);
  const [allWard, setAllWard] = useState([]);
  const [allPoll, setAllPoll] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedLg, setSelectedLg] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedPoll, setSelectedPoll] = useState("");
  const [wardCode, setWardCode] = useState("");

  const [stateResult, setStateResult] = useState([]);
  const [lgaResult, setLgaResult] = useState([]);
  const [wardResult, setWardResult] = useState([]);
  const [pollResult, setPollResult] = useState([]); 
  const [logo, setLogo] = useState([]);
  const [acronym, setAcronym] = useState([]);

  const partyLogo = 'https://naijavote.esbatech.org/images/partyLogo/';//image directory
  const getstate = api + "/getadminstate.php";
  const getlga = api + "/getadminlga.php";
  const getward = api + "/getadminward.php";
  const getpoll = api + "/getadminpoll.php";
  const getprofile = api + "/getadminprofile.php";
  const getresult = api + "/getadminresult.php";

  const [adminData, setAdminData] = useState([]);
  const [location, setLocation] = useState("");

  const [awrData, setAwrData] = useState({
    electionProfile: "",
    lga: "",
    state: ""
  });

  useEffect(() => { //let's fetch the election type pres, guber, sen or lga
        let data = {
            user: userData
        }
        setLoading(true);

        const fetchData = async () => {
            try {
                const response = await axios.post(getprofile, JSON.stringify(data));
                if(response.status === 200) {
                    setAdminData(response.data);
                    // console.log(response.data)
                    setElectionProfile(response.data.eCode)
                    if (response.data.eCode !== "pres") {
                        setSelectedState(response.data.state);
                        setWardCode(response.data.wardCode);
                        setLogo(response.data.logo);
                        setAcronym(response.data.party);
                        setLocation(response.data.state);
                    }
                }
                else {
                    setAdminData([]);
                    setElectionProfile("pres");
                }
            } catch (err) {
                setAdminData([]);
                setElectionProfile("pres");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

  //let's fetch all state and pass as prop to state
  useEffect(() => {
      // if (what === "") { //for state
          const getState = async () => {
              try {
                  const response = await axios.get(getstate);
                  if (response.status === 200) {
                      setAllState(response.data);
                  }
                  else {
                      setAllState([]);
                  }
              } catch (err) {
                  setAllState([]);
              } 
          }
          getState();
      // }
      if (what === "lga") {
          let data = {
              wardCode: wardCode
          };

          //fetch lga where state wardCode is what is passed in data
          const getLg = async () => {
              try {
                  const response = await axios.post(getlga, JSON.stringify(data));
                  if (response.status === 200) {
                      setAllLga(response.data);
                  }
                  else {
                      setAllLga([]);
                  }
              } catch (err) {
                  setAllLga([]);
              }
          }
          getLg();
      }
      else if (what === "ward") {
          let data = {
              lga: selectedLg
          };
          
          //fetch lga where state wardCode is what is passed in data
          const getWard = async () => {
              try {
                  const response = await axios.post(getward, JSON.stringify(data));
                  if (response.status === 200) {
                      setAllWard(response.data);
                  }
                  else {
                      setAllWard([]);
                  }
              } catch (err) {
                  setAllWard([]);
              }
          }
          getWard();
      }
      else if (what === "poll") {
          let data = {
              ward: selectedWard
          };
          
          //fetch lga where state wardCode is what is passed in data
          const getWard = async () => {
              try {
                  const response = await axios.post(getpoll, JSON.stringify(data));
                  if (response.status === 200) {
                      setAllPoll(response.data);
                  }
                  else {
                      setAllPoll([]);
                  }
              } catch (err) {
                  setAllPoll([]);
              }
          }
          getWard();
      }
  }, [what]);

  const handleStatShow = (e) => {
    let id = e.target.id;
    setWhat(id);
    setResultState(true);
  }

  const closeResult = (data) => {
    if (data == "true" || data == "dash") {
      setResultState(false);
      setWhat("");
    }
  }

  const showAwr = (e) => {
    setWhat("awr");
    setAwrData({
      electionProfile: electionProfile,
      lga: adminData.lga,
      state: selectedState,
      from: "dash"
    })
    setResultState(true);
  }


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
      {resultStat === false ?
        <div>
          <div className="eachParty flex flex-row mt-7 items-center">
          <section className='flex flex-row shadow-md p-2 rounded-sm mr-5'>
            <div className='flex items-center'>
              {electionProfile === "pres" ?
                <button onClick={handleStatShow} id='state' className='px-4 py-2 cursor-pointer bg-purple-800 text-white rounded-sm h-fit outline-0 border-0 mt-1 mr-2'>
                  State
                </button>
              :
                electionProfile === "guber" ?
                  <button onClick={handleStatShow} id='lga' className='px-4 py-2 cursor-pointer bg-purple-800 text-white rounded-sm h-fit outline-0 border-0 mt-1 mr-2'>
                    LGA
                  </button>
                :
                  electionProfile === "sen" ?
                    <button onClick={handleStatShow} id='lga' className='px-4 py-2 cursor-pointer bg-purple-800 text-white rounded-sm h-fit outline-0 border-0 mt-1 mr-2'>
                      LGA
                    </button>
                  :
                    electionProfile === "hor" ?
                      <button onClick={handleStatShow} id='lga' className='px-4 py-2 cursor-pointer bg-purple-800 text-white rounded-sm h-fit outline-0 border-0 mt-1 mr-2'>
                        LGA
                      </button>
                    :
                      electionProfile === "hoa" ?
                        <button onClick={handleStatShow} id='lga' className='px-4 py-2 cursor-pointer bg-purple-800 text-white rounded-sm h-fit outline-0 border-0 mt-1 mr-2'>
                          LGA
                        </button>
                      :
                        electionProfile === "lga" ?
                          <button onClick={handleStatShow} id='ward' className='px-4 py-2 cursor-pointer bg-purple-800 text-white rounded-sm h-fit outline-0 border-0 mt-1 mr-2'>
                            Ward
                          </button>
                        :
                          <></>
              }
            </div>

            <div className='text-l'>
              <table>
                  <tbody className='text-sm text-nowrap leading-7'>
                      <tr>
                          <td className='pl-1 text-sm'>Registered Voters:</td>
                          <td className='text-right pl-3 pr-1 font-bold text-[16px] text-purple-700'>{allResult.regVoter}</td>
                      </tr>

                      <tr>
                          <td className='pl-1 text-sm'>Accredited Voters:</td>
                          <td className='text-right pl-3 pr-1 font-bold text-[16px] text-green-700'>{allResult.accredVoter}</td>
                      </tr>

                      <tr>
                          <td className='pl-1 text-sm'>Total Votes Cast:</td>
                          <td className='text-right pl-3 pr-1 font-bold text-[16px] text-blue-700'>{allResult.validVoter}</td>
                      </tr>

                      <tr>
                          <td className='pl-1 text-sm'>Invalid Votes:</td>
                          <td className='text-right pl-3 pr-1 font-bold text-[16px] text-yellow-700'>{allResult.invalidVote}</td>
                      </tr>

                      <tr>
                          <td title='Click to View Awaiting Results' onClick={showAwr} className='pl-1'><button className='bg-red-700 text-white rounded-sm px-2 mt-1 cursor-pointer outline-0 border-0'>AWR</button></td>
                          <td className='text-right pl-3 pr-1 font-bold text-[16px]'><span className='text-red-700'>{allResult.awrNumer}</span> / <span>{allResult.awrDenom }</span></td>
                      </tr>
                  </tbody>
              </table>
            </div>
          </section>

          <div className='flex flex-row bg-gray-200 shadow-md rounded-sm py-2 items-center jusify-items-center'>
            <section className={partyBg[partyAcronym[0]]}>
              <div className='flex flex-col my-4 w-full text-center'>
                {partyAcronym[0] == null || partyAcronym[0] == "" ?
                  <div>
                      {/* <img src="/logo1.png" alt="Party logo" className='cursor-pointer rounded-sm w-10 h-10 mt-1 mr-2'/> */}
                      <p className='text-sm pr-2'>{partyAcronym[0]}</p>
                  </div>  
                :
                  <div>
                      {/* <img src={img + partyAcronym[0] + ".jpeg"} id="logo1" className='cursor-pointer rounded-sm w-10 h-10 mt-1 mr-2' alt="Party logo" /> */}
                      <p className='text-sm'><span className='bg-[#FFD700] rounded-sm text-black px-2 py-1 font-semibold'>{partyAcronym[0]}</span></p>
                  </div>
                }
                <section className='voteCount mt-3 shadow-md p-1 text-center'>
                    <p className='font-bold text-lg'>{partyPercent[0]}</p>
                </section>
              </div>

              {winner == partyPercent[0] ?
                <div className='absolute bottom-0 h-2 w-15 ml-3 mb-0 bg-red-600 animate__animated animate__zoomIn rounded-full'></div>
              :
                <div className='absolute bottom-0 h-2 w-15 ml-3 mb-0 bg-red-600 animate__animated animate__zoomOut rounded-full'></div>
              }
            </section>

            <section className={partyBg[partyAcronym[1]]}>
              <div className='flex flex-col my-4 w-full text-center'>
                {partyAcronym[1] == null || partyAcronym[1] == "" ?
                  <div>
                      {/* <img src="/logo1.png" alt="Party logo" className='cursor-pointer rounded-sm w-10 h-10 mt-1 mr-2'/> */}
                      <p className='text-sm pr-2'>{partyAcronym[1]}</p>
                  </div>  
                :
                  <div>
                      {/* <img src={img + partyAcronym[0] + ".jpeg"} id="logo1" className='cursor-pointer rounded-sm w-10 h-10 mt-1 mr-2' alt="Party logo" /> */}
                      <p className='text-sm'><span className='bg-green-300 rounded-sm text-black px-2 py-1 font-semibold'>{partyAcronym[1]}</span></p>
                  </div>
                }
                <section className='voteCount mt-3 shadow-md p-1 text-center'>
                    <p className='font-bold text-lg'>{partyPercent[1]}</p>
                </section>
              </div>

              {winner == partyPercent[1] ?
                <div className='absolute bottom-0 h-2 w-15 ml-3 mb-0 bg-red-600 animate__animated animate__zoomIn rounded-full'></div>
              :
                <div className='absolute bottom-0 h-2 w-15 ml-3 mb-0 bg-red-600 animate__animated animate__zoomOut rounded-full'></div>
              }
            </section>

            <section className={partyBg[partyAcronym[2]]}>
              <div className='flex flex-col my-4 w-full text-center'>
                {partyAcronym[2] == null || partyAcronym[2] == "" ?
                  <div>
                      {/* <img src="/logo1.png" alt="Party logo" className='cursor-pointer rounded-sm w-10 h-10 mt-1 mr-2'/> */}
                      <p className='text-sm pr-2'>{partyAcronym[2]}</p>
                  </div>  
                :
                  <div>
                      {/* <img src={img + partyAcronym[0] + ".jpeg"} id="logo1" className='cursor-pointer rounded-sm w-10 h-10 mt-1 mr-2' alt="Party logo" /> */}
                      <p className='text-sm'><span className='bg-blue-200 rounded-sm text-black px-2 py-1 font-semibold'>{partyAcronym[2]}</span></p>
                  </div>
                }
                <section className='voteCount mt-3 shadow-md p-1 text-center'>
                    <p className='font-bold text-lg'>{partyPercent[2]}</p>
                </section>
              </div>

              {winner == partyPercent[2] ?
                <div className='absolute bottom-0 h-2 w-15 ml-3 mb-0 bg-red-600 animate__animated animate__zoomIn rounded-full'></div>
              :
                <div className='absolute bottom-0 h-2 w-15 ml-3 mb-0 bg-red-600 animate__animated animate__zoomOut rounded-full'></div>
              }
            </section>

            <section className={partyBg[partyAcronym[3]]}>
              <div className='flex flex-col my-4 w-full text-center'>
                {partyAcronym[3] == null || partyAcronym[3] == "" ?
                  <div>
                      {/* <img src="/logo1.png" alt="Party logo" className='cursor-pointer rounded-sm w-10 h-10 mt-1 mr-2'/> */}
                      <p className='text-sm pr-2'>{partyAcronym[3]}</p>
                  </div>  
                :
                  <div>
                      {/* <img src={img + partyAcronym[0] + ".jpeg"} id="logo1" className='cursor-pointer rounded-sm w-10 h-10 mt-1 mr-2' alt="Party logo" /> */}
                      <p className='text-sm'><span className='bg-gradient-to-r from-red-300 via-white to-red-300 rounded-sm text-black px-2 py-1 font-semibold'>{partyAcronym[3]}</span></p>
                  </div>
                }
                <section className='voteCount mt-3 shadow-md p-1 text-center'>
                    <p className='font-bold text-lg'>{partyPercent[3]}</p>
                </section>
              </div>

              {winner == partyPercent[3] ?
                <div className='absolute bottom-0 h-2 w-15 ml-3 mb-0 bg-red-600 animate__animated animate__zoomIn rounded-full'></div>
              :
                <div className='absolute bottom-0 h-2 w-15 ml-3 mb-0 bg-red-600 animate__animated animate__zoomOut rounded-full'></div>
              }
            </section>

            <section className={partyBg[partyAcronym[4]]}>
              <div className='flex flex-col my-4 w-full text-center'>
                {partyAcronym[4] == null || partyAcronym[4] == "" ?
                  <div>
                      {/* <img src="/logo1.png" alt="Party logo" className='cursor-pointer rounded-sm w-10 h-10 mt-1 mr-2'/> */}
                      <p className='text-sm pr-2'>{partyAcronym[4]}</p>
                  </div>  
                :
                  <div>
                      {/* <img src={img + partyAcronym[0] + ".jpeg"} id="logo1" className='cursor-pointer rounded-sm w-10 h-10 mt-1 mr-2' alt="Party logo" /> */}
                      <p className='text-sm'><span className='bg-red-200 rounded-sm text-black px-2 py-1 font-semibold'>{partyAcronym[4]}</span></p>
                  </div>
                }
                <section className='voteCount mt-3 shadow-md p-1 text-center'>
                    <p className='font-bold text-lg'>{partyPercent[4]}</p>
                </section>
              </div>

              {winner == partyPercent[4] ?
                <div className='absolute bottom-0 h-2 w-15 ml-3 mb-0 bg-red-600 animate__animated animate__zoomIn rounded-full'></div>
              :
                <div className='absolute bottom-0 h-2 w-15 ml-3 mb-0 bg-red-600 animate__animated animate__zoomOut rounded-full'></div>
              }
            </section>

            <section className={partyBg[partyAcronym[5]]}>
              <div className='flex flex-col my-4 w-full text-center'>
                {partyAcronym[5] == null || partyAcronym[5] == "" ?
                  <div>
                      {/* <img src="/logo1.png" alt="Party logo" className='cursor-pointer rounded-sm w-10 h-10 mt-1 mr-2'/> */}
                      <p className='text-sm pr-2'>{partyAcronym[5]}</p>
                  </div>  
                :
                  <div>
                      {/* <img src={img + partyAcronym[0] + ".jpeg"} id="logo1" className='cursor-pointer rounded-sm w-10 h-10 mt-1 mr-2' alt="Party logo" /> */}
                      <p className='text-sm'><span className='bg-yellow-200 rounded-sm text-black px-2 py-1 font-semibold'>{partyAcronym[5]}</span></p>
                  </div>
                }
                <section className='voteCount mt-3 shadow-md p-1 text-center'>
                    <p className='font-bold text-lg'>{partyPercent[5]}</p>
                </section>
              </div>

              {winner == partyPercent[5] ?
                <div className='absolute bottom-0 h-2 w-15 ml-3 mb-0 bg-red-600 animate__animated animate__zoomIn rounded-full'></div>
              :
                <div className='absolute bottom-0 h-2 w-15 ml-3 mb-0 bg-red-600 animate__animated animate__zoomOut rounded-full'></div>
              }
            </section>
          </div>
          </div>

          <div className='relative '>
              <table id='barTable' className='resultTable relative mt-5'>
                <tbody className=''>
                    <tr><td className='text-[13px]'>100<hr className='tableHr'/></td></tr>
                    <tr><td className='text-[13px]'>90<hr className='tableHr'/></td></tr>
                    <tr><td className='text-[13px]'>80<hr className='tableHr'/></td></tr>
                    <tr><td className='text-[13px]'>70<hr className='tableHr'/></td></tr>
                    <tr><td className='text-[13px]'>60<hr className='tableHr'/></td></tr>
                    <tr><td className='text-[13px]'>50<hr className='tableHr'/></td></tr>
                    <tr><td className='text-[13px]'>40<hr className='tableHr'/></td></tr>
                    <tr><td className='text-[13px]'>30<hr className='tableHr'/></td></tr>
                    <tr><td className='text-[13px]'>20<hr className='tableHr'/></td></tr>
                    <tr><td className='text-[13px]'>10<hr className='tableHr'/></td></tr>
                    <tr><td className='text-[13px]'>0<hr className='tableHr'/></td></tr>
                </tbody>
              </table>

              <div className='partyDiv absolute bottom-0 -mb-11 ml-10 w-full'>
                  {partyAcronym.map((data, dataIndex) => {
                    return (
                      <section key={dataIndex} className='barDiv flex align-center justify-center flex-col relative'>
                        <div id={"bar_"+dataIndex} className="barMain w-full mb-6 bg-gradient-to-t from-blue-600 to-cyan-400 ml-1">
                          <div className="barVal absolute -mt-8 rounded-full bg-black text-white shadow-sm top-0 w-fit p-1 px-1.5 text-center text-sm">
                            {chartData[dataIndex] + " %"}
                          </div>
                        </div>  

                        <div className="pLogo w-full h-auto absolute bottom-0 -mb-10">
                          {partyAcronym[dataIndex] == null || partyAcronym[dataIndex] == "" ?
                            <img src="/logo1.png" alt="Party logo" className='cursor-pointer rounded-sm h-10 w-12 border-1 border-gray-200'/>
                          :
                            <img src={img + partyAcronym[dataIndex]+".jpeg"} id={"p"+dataIndex} className='cursor-pointer rounded-sm h-10 w-12 border-1 border-gray-200' alt="Party logo" />
                          }

                          <p className='text-center text-sm mt-1'>{partyAcronym[dataIndex]}</p>
                        </div>
                      </section>
                    );
                  })}
              </div>
          </div>
        </div>
      :
        <Result what={what} wardCode={wardCode} onClick={closeResult} state={selectedState} isSet={true} location={location} awrData={awrData}/>
      }
    </div>
  )
}

export default Dash
