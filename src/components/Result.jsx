import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft,  faLock, faMinus, faPen, faPlus, faUnlock } from '@fortawesome/free-solid-svg-icons';
import '../css/result.css';
import Dash from './Dash';
import Statedata from './Statedata';
import Lgadata from './Lgadata';
import Warddata from './Warddata';
import Polldata from './Polldata';
import axios from 'axios';

const Result = () => {
    const [electionProfile, setElectionProfile] = useState("pres");
    const [allState, setAllState] = useState([]);
    const [allLga, setAllLga] = useState([]);
    const [allWard, setAllWard] = useState([]);
    const [allPoll, setAllPoll] = useState([]);
    const [loading, setLoading] = useState(false);

    const [what, setWhat] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedLg, setSelectedLg] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [selectedPoll, setSelectedPoll] = useState("");
    const [wardCode, setWardCode] = useState("");
    const userData = localStorage.getItem('subadmin');

    const api = 'https://naijavote.esbatech.org';//API endpoint
    const imgLink = 'https://naijavote.esbatech.org/images';//image directory
    const getstate = api + "/getadminstate.php";
    const getlga = api + "/getadminlga.php";
    const getward = api + "/getadminward.php";
    const getpoll = api + "/getadminpoll.php";
    const getprofile = api + "/getadminprofile.php";
    const fetchGeneral = api + "/getresult.php";
    const getresult = api + "/getadminresult.php";

    const [stateResult, setStateResult] = useState([]);
    const [lgaResult, setLgaResult] = useState([]);
    const [wardResult, setWardResult] = useState([]);
    const [pollResult, setPollResult] = useState([]); 
    const [whichResult, setWhichResult] = useState("");

    const [lgName, setLgName] = useState([]);
    
    // const [whichResult, setWhichResult] = useState("state");
    // const [whichLocation, setWhichLocation] = useState("");

    const fetchEachResult = (whichResult, location) => {
        let data = {
            result: whichResult,
            location: location,
            subadmin: userData
        }
        // console.log(data)
        const getRes = async () => {
            try {
                const response = await axios.post(getresult, JSON.stringify(data));
                if (response.status === 200) {
                    if (whichResult === "state") {
                        setStateResult(response.data);
                    }
                    else if (whichResult === "lga") {
                        setLgaResult(response.data);
                    }
                    else if (whichResult === "ward") {
                        setWardResult(response.data);
                    }
                    else if (whichResult === "poll") {
                        setPollResult(response.data);
                    }
                }
                else {
                    setStateResult([]);
                    setLgaResult([]);
                    setWardResult([]);
                    setPollResult([]);
                }
            } catch (err) {
                setStateResult([]);
                setLgaResult([]);
                setWardResult([]);
                setPollResult([]);
            }
        }
        getRes();
    }

    const [adminData, setAdminData] = useState([]);

    useEffect(() => { //let's fetch the election type pres, guber, sen or lga
        setLoading(true);

        let data = {
            user: userData
        }

        const fetchData = async () => {
            try {
                const response = await axios.post(getprofile, JSON.stringify(data));
                // console.log(response.data)
                if(response.status === 200) {
                    setAdminData(response.data);
                    setElectionProfile(response.data.eCode)
                    if (response.data.eCode !== "pres") {
                        setSelectedState(response.data.state);
                        setWardCode(response.data.wardCode);
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

    useEffect(() => {
        if (allLga.length !== 0) {
            let lg = [];
            allLga.map((data) => {
                let eachLg = data.lgName;
                let sortRes = lgaResult[eachLg];
                lg.push(sortRes);
            });

            let sorted = [];
            lg.forEach((element) => {
                if (element !== undefined) {
                    
                }
            })
            setLgName(sorted);
        }
    }, [allLga, whichResult]);

    const [trigger, setTrigger] = useState("");

    const [partyBg, setPartyBg] = useState({
        A: 'ml-5 shadow-md rounded-sm bg-green-700 text-white p-2 px-3',
        AA: 'ml-5 shadow-md rounded-sm bg-white text-black p-2 px-3',
        AAC: 'ml-5 shadow-md rounded-sm bg-yellow-800 text-white p-2 px-3',
        ADC: 'ml-5 shadow-md rounded-sm bg-green-950 text-white p-2 px-3',
        ADP: 'ml-5 shadow-md rounded-sm bg-blue-700 text-white p-2 px-3',
        APC: 'ml-5 shadow-md rounded-sm bg-red-200 text-black p-2 px-3',
        APGA: 'ml-5 shadow-md rounded-sm bg-yellow-900 text-white p-2 px-3',
        APM: 'ml-5 shadow-md rounded-sm bg-white text-black p-2 px-3',
        APP: 'ml-5 shadow-md rounded-sm bg-red-100 text-black p-2 px-3',
        BP: 'ml-5 shadow-md rounded-sm bg-green-800 text-white p-2 px-3',
        LP: 'ml-5 shadow-md rounded-sm bg-white text-green-800 p-2 px-3',
        NNPP: 'ml-5 shadow-md rounded-sm bg-red-200 text-black p-2 px-3',
        NRM: 'ml-5 shadow-md rounded-sm bg-yellow-200 text-black p-2 px-3',
        PDP: 'ml-5 shadow-md rounded-sm bg-green-200 text-black p-2 px-3',
        PRP: 'ml-5 shadow-md rounded-sm bg-black text-white p-2 px-3',
        SDP: 'ml-5 shadow-md rounded-sm bg-yellow-300 text-black p-2 px-3',
        YPP: 'ml-5 shadow-md rounded-sm bg-white text-black p-2 px-3',
        ZLP: 'ml-5 shadow-md rounded-sm bg-white text-black p-2 px-3',
    });

    const [goBack, setGoBack] = useState(false);

    const moveBack = () => {
        if (electionProfile === "lga" && what === "poll") {
            setWhat("");
            setGoBack(false);
        }
        else if (electionProfile === "sen" && what === "poll") {
            setWhat("ward");
        }
        else if (electionProfile === "sen" && what === "ward") {
            setWhat("");
            setGoBack(false);
        }
        else if (electionProfile === "guber" && what === "poll") {
            setWhat("ward");
        }
        else if (electionProfile === "guber" && what === "ward") {
            setWhat("lga");
        }
        else if (electionProfile === "guber" && what === "lga") {
            setWhat("");
            setGoBack(false);
        }
        else if (electionProfile === "pres" && what === "poll") {
            setWhat("ward");
        }
        else if (electionProfile === "pres" && what === "ward") {
            setWhat("lga");
        }
        else if (electionProfile === "pres" && what === "lga") {
            setWhat("state");
        }
        else if (electionProfile === "pres" && what === "state") {
            setWhat("");
            setGoBack(false);
        }
    }

    const switchMenu = (e) => {
        if (e.target.id.includes("_") && !e.target.id.includes("eachpoll")) {
            //let's split the id
            let idSplit = e.target.id.split("_");
            let idCode = idSplit[0];
            let idValue = idSplit[1];
            let btnVal = e.target.value;
            // console.log(btnVal)
            setWhat(idCode);
            setGoBack(true);
            switch(idCode) {
                case 'lga':
                    setSelectedState(idValue);
                    setWardCode(btnVal);
                    fetchEachResult("lga", btnVal);
                    setWhichResult("lga");
                    break;
                case 'ward':
                    setSelectedLg(idValue);
                    fetchEachResult("ward", btnVal);
                    setWhichResult("ward");
                    break;
                case 'poll':
                    setSelectedWard(idValue);
                    fetchEachResult("poll", btnVal);
                    setWhichResult("poll");
                    console.log(lgName)
                    break;
            }
        }
        else if (!e.target.id.includes("eachpoll")) {
            setWhichResult(e.target.id);
            fetchEachResult(e.target.id, "all");
            setWhat(e.target.id);
            setGoBack(true);
        }
    }

    //let's fetch all state and pass as prop to state
    useEffect(() => {
        // if (what === "") { //for state
            setLoading(true);

            const getState = async () => {
                try {
                    const response = await axios.get(getstate);
                    // console.log(response.data)
                    if (response.status === 200) {
                        setAllState(response.data);
                    }
                    else {
                        setAllState([]);
                    }
                } catch (err) {
                    setAllState([]);
                } finally {
                    setLoading(false);
                }
            }
            getState();
        // }
        if (what === "lga") {
            let data = {
                wardCode: wardCode
            };

            //fetch lga where state wardCode is what is passed in data
            setLoading(true);

            const getLg = async () => {
                try {
                    const response = await axios.post(getlga, JSON.stringify(data));
                    // console.log(response.data)
                    if (response.status === 200) {
                        setAllLga(response.data);
                    }
                    else {
                        setAllLga([]);
                    }
                } catch (err) {
                    setAllLga([]);
                } finally {
                    setLoading(false);
                }
            }
            getLg();
        }
        else if (what === "ward") {
            let data = {
                lga: selectedLg
            };
            
            //fetch lga where state wardCode is what is passed in data
            setLoading(true);

            const getWard = async () => {
                try {
                    const response = await axios.post(getward, JSON.stringify(data));
                    // console.log(response.data)
                    if (response.status === 200) {
                        setAllWard(response.data);
                    }
                    else {
                        setAllWard([]);
                    }
                } catch (err) {
                    setAllWard([]);
                } finally {
                    setLoading(false);
                }
            }
            getWard();
        }
        else if (what === "poll") {
            let data = {
                ward: selectedWard
            };
            
            //fetch lga where state wardCode is what is passed in data
            setLoading(true);

            const getWard = async () => {
                try {
                    const response = await axios.post(getpoll, JSON.stringify(data));
                    // console.log(response.data)
                    if (response.status === 200) {
                        setAllPoll(response.data);
                    }
                    else {
                        setAllPoll([]);
                    }
                } catch (err) {
                    setAllPoll([]);
                } finally {
                    setLoading(false);
                }
            }
            getWard();
        }
    }, [what]);

  return (
    <div className='relative'>
        <h2 className='mt-3 text-xl mb-2 w-full'>All Results for <b>{adminData.eProfile}</b></h2>
        
        {goBack === false ?
            <></>
        :
            <FontAwesomeIcon onClick={moveBack} icon={faArrowCircleLeft} className='absolute right-0 top-0 mr-5 text-3xl cursor-pointer'/>
        }

        <section id='allResult' className='h-164 overflow-y-auto shadow-sm rounded-sm'>
            {loading == true ?
                <section id='page_loader' className='absolute top-0 right-0'>
                    <span className='loader mr-5'>

                    </span>
                </section>  
            :
                <></>
            }
            <div className='px-2 text-sm'>
               {what === "" ?
                    electionProfile === "pres" ?
                        <section className='stateButton overflow-x-hidden leading-15 p-2'>
                            <div className="eachState">
                                <p>
                                    <button onClick={switchMenu} id='state' className='bg-red-800 rounded-sm text-white px-4 text-center cursor-pointer'>
                                        State
                                    </button>
                                </p>
                                <div className='-mt-9'>
                                    <Dash api={fetchGeneral}/>
                                </div>
                            </div>
                        </section>
                    :
                        electionProfile === "guber" ?
                            <section className='stateButton overflow-x-hidden leading-15 p-2'>
                                <div className="eachState">
                                    <p>
                                        <button onClick={switchMenu} id='lga' className='bg-red-800 rounded-sm text-white px-4 text-center cursor-pointer'>
                                            LGA
                                        </button>
                                    </p>
                                    <div className='-mt-9'>
                                        <Dash api={fetchGeneral}/>
                                    </div>
                                </div>
                            </section>
                        :
                            electionProfile === "sen" ?
                                <section className='stateButton overflow-x-hidden leading-15 p-2'>
                                    <div className="eachState">
                                        <p>
                                            <button onClick={switchMenu} id='ward' className='bg-red-800 rounded-sm text-white px-4 text-center cursor-pointer'>
                                                Ward
                                            </button>
                                        </p>
                                        <div className='-mt-9'>
                                            <Dash api={fetchGeneral}/>
                                        </div>
                                    </div>
                                </section>
                            :
                                electionProfile === "lga" ?
                                    <section className='stateButton overflow-x-hidden leading-15 p-2'>
                                        <div className="eachState">
                                            <p>
                                                <button onClick={switchMenu} id='poll' className='bg-red-800 rounded-sm text-white px-4 text-center cursor-pointer'>
                                                    Poll
                                                </button>
                                            </p>
                                            <div className='-mt-9'>
                                                <Dash api={fetchGeneral}/>
                                            </div>
                                        </div>
                                    </section>
                                :
                                    <></>

                :
                    what === "state" ?
                        <section className='stateButton leading-15 p-1'>
                            {allState.map((data, dataIndex) => {
                                return (
                                    <div key={dataIndex} className='eachState mb-10'>
                                        <p>
                                            <button onClick={switchMenu} id={"lga_"+data.stateName} value={data.wardCode} className='eachStateBtn bg-blue-950 text-white px-2 w-full cursor-pointer text-center rounded-sm mt-4'>
                                                {data.stateName}
                                            </button>
                                        </p>
                                        <Statedata partyBg={partyBg} api={api} imgLink={imgLink} whichState={selectedState}/>
                                    </div>
                                );
                            })}
                        </section>
                        :
                            what === "lga" ?
                                <section className='leading-15 p-2'>
                                    {allLga == null ?
                                        <></>
                                    :
                                        allLga.map((data, dataIndex) => {
                                            return (
                                                <div key={dataIndex} className='eachState mb-10'>
                                                    <p>
                                                        <button onClick={switchMenu} id={"ward_"+data.lgName} value={data.lgName} className='eachStateBtn bg-green-800 text-white px-2 w-full cursor-pointer text-center rounded-sm mt-4'>
                                                            {data.lgName}
                                                        </button>
                                                    </p>
                                                    <Lgadata partyBg={partyBg} api={api} imgLink={imgLink} whichState={selectedLg}/>
                                                </div>
                                            );
                                        })
                                    }

                                </section>
                                :
                                    what === "ward" ?
                                        <section className='leading-15 p-2'>
                                            {allWard.map((data, dataIndex) => {
                                                return (
                                                    <div key={dataIndex} className='eachState'>
                                                        <p>
                                                            <button onClick={switchMenu} id={"poll_"+data.ward} value={data.ward} className='eachStateBtn bg-black text-white px-2 w-full cursor-pointer text-center rounded-sm mt-4'>
                                                                {data.ward}
                                                            </button>
                                                        </p>
                                                        <Warddata partyBg={partyBg} api={api} imgLink={imgLink} whichState={selectedWard}/>
                                                    </div>
                                                );
                                            })}
                                        </section>
                                    :
                                        what === "poll" ?
                                            <section className='leading-15 p-2'>
                                                {allPoll.map((data, dataIndex) => {
                                                    return (
                                                        <div key={dataIndex} className='eachState'>
                                                            <p>
                                                                <button onClick={switchMenu} id={"eachpoll_"+data.id} className='eachStateBtn bg-yellow-950 text-white px-2 w-full cursor-pointer text-center rounded-sm mt-4'>
                                                                    {data.pollUnit}
                                                                </button>
                                                            </p>
                                                            <Polldata partyBg={partyBg} api={api} imgLink={imgLink} whichState={selectedPoll}/>
                                                        </div>
                                                    );
                                                })}
                                            </section>
                                        :
                                            <></>
                }
            </div>
        </section>
    </div>
  )
}

export default Result
