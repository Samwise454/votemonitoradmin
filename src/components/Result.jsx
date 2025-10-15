import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import '../css/result.css';
import Statedata from './Statedata';
import axios from 'axios';
import Awr from './Awr';

const Result = (props) => {
    const [electionProfile, setElectionProfile] = useState("pres");
    const [allState, setAllState] = useState([]);
    const [allLga, setAllLga] = useState([]);
    const [allWard, setAllWard] = useState([]);
    const [allPoll, setAllPoll] = useState([]);
    const [loading, setLoading] = useState(false);

    const [what, setWhat] = useState(props.what);
    const [selectedState, setSelectedState] = useState("");
    const [selectedLg, setSelectedLg] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [selectedPoll, setSelectedPoll] = useState("");
    const [wardCode, setWardCode] = useState(props.wardCode);
    const userData = localStorage.getItem('subadmin');

    const api = 'https://naijavote.esbatech.org';//API endpoint
    const partyLogo = 'https://naijavote.esbatech.org/images/partyLogo/';//image directory
    const getstate = api + "/getadminstate.php";
    const getlga = api + "/getadminlga.php";
    const getward = api + "/getadminward.php";
    const getpoll = api + "/getadminpoll.php";
    const getprofile = api + "/getadminprofile.php";
    const fetchGeneral = api + "/getresult.php";
    const getresult = api + "/getadminresult.php";

    const [lastCount, setLastCount] = useState(0);
    const eventSourceLink = api + `/getstream.php?subadmin=${userData}&lastcount=${lastCount}`;

    const [stateResult, setStateResult] = useState([]);
    const [lgaResult, setLgaResult] = useState([]);
    const [wardResult, setWardResult] = useState([]);
    const [pollResult, setPollResult] = useState([]); 
    const [logo, setLogo] = useState([]);
    const [acronym, setAcronym] = useState([]);
    
    const [whichResult, setWhichResult] = useState(props.what); //send
    const [location, setLocation] = useState(props.location); //send

    const [isStateSet, stateIsSet] = useState(false);
    const [isLgaSet, lgaIsSet] = useState(false);
    const [isWardSet, wardIsSet] = useState(false);
    const [isPollSet, pollIsSet] = useState(false);
    const [awr, setAwr] = useState([]);
    const [wardAwr, setWardAwr] = useState([]);
    const [pollAwr, setPollAwr] = useState([]);
    const awrState = useState(props.state);

    const [awrDataDash, setAwrDataDash] = useState(props.awrData);

    //fetch individual lga or state or ward results at first load
    useEffect(() => {
        let data = {
            result: whichResult,
            location: location.toUpperCase(),
            subadmin: userData
        }
        setLoading(true);

        const initialFetch = async () => {
            try {
                const response = await axios.post(getresult, JSON.stringify(data));
                if (response.status === 200) {
                    if (whichResult === "state") {
                        setStateResult(response.data);
                        stateIsSet(true);
                    }
                    else if (whichResult === "lga") {
                        // console.log(response.data);
                        setLgaResult(response.data.lgaResult);
                        setAwr(response.data.awr)
                        lgaIsSet(true);
                    }
                    else if (whichResult === "ward") {
                        // console.log(response.data);
                        setWardResult(response.data.wardResult);
                        setWardAwr(response.data.awr);
                        wardIsSet(true);
                    }
                    else if (whichResult === "poll") {
                        // console.log(response.data);
                        setPollResult(response.data);
                        // setPollAwr(response.data.awr);
                        pollIsSet(true);
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
            } finally {
                setLoading(false);
            }
        }
        initialFetch();
    }, []);

    const fetchEachResult = (whichResult, location) => {//pass this whichResult and location to Lgadata as prop
        let data = {
            result: whichResult,
            location: location.toUpperCase(),
            subadmin: userData
        }
        
        const getRes = async () => {
            try {
                const response = await axios.post(getresult, JSON.stringify(data));
                if (response.status === 200) {
                    if (whichResult === "state") {
                        setStateResult(response.data);
                        stateIsSet(true);
                    }
                    else if (whichResult === "lga") {
                        // console.log(response.data);
                        setLgaResult(response.data.lgaResult);
                        setAwr(response.data.awr)
                        lgaIsSet(true);
                    }
                    else if (whichResult === "ward") {
                        // console.log(response.data);
                        setWardResult(response.data.wardResult);
                        setWardAwr(response.data.awr);
                        wardIsSet(true);
                    }
                    else if (whichResult === "poll") {
                        // console.log(response.data);
                        setPollResult(response.data);
                        // setPollAwr(response.data.awr);
                        pollIsSet(true);
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
        // setLoading(true);

        let data = {
            user: userData
        }

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
                    }
                }
                else {
                    setAdminData([]);
                    setElectionProfile("pres");
                }
            } catch (err) {
                setAdminData([]);
                setElectionProfile("pres");
            } 
        }
        fetchData();
    }, []);

    const [trigger, setTrigger] = useState("");

    // const [partyBg, setPartyBg] = useState({
    //     A: 'ml-5 shadow-md rounded-sm bg-green-700 text-white p-2 px-3',
    //     AA: 'ml-5 shadow-md rounded-sm bg-white text-black p-2 px-3',
    //     AAC: 'ml-5 shadow-md rounded-sm bg-yellow-800 text-white p-2 px-3',
    //     ADC: 'ml-5 shadow-md rounded-sm bg-green-950 text-white p-2 px-3',
    //     ADP: 'ml-5 shadow-md rounded-sm bg-blue-700 text-white p-2 px-3',
    //     APC: 'ml-5 shadow-md rounded-sm bg-red-200 text-black p-2 px-3',
    //     APGA: 'ml-5 shadow-md rounded-sm bg-yellow-900 text-white p-2 px-3',
    //     APM: 'ml-5 shadow-md rounded-sm bg-white text-black p-2 px-3',
    //     APP: 'ml-5 shadow-md rounded-sm bg-red-100 text-black p-2 px-3',
    //     BP: 'ml-5 shadow-md rounded-sm bg-green-800 text-white p-2 px-3',
    //     LP: 'ml-5 shadow-md rounded-sm bg-white text-green-800 p-2 px-3',
    //     NNPP: 'ml-5 shadow-md rounded-sm bg-red-200 text-black p-2 px-3',
    //     NRM: 'ml-5 shadow-md rounded-sm bg-yellow-200 text-black p-2 px-3',
    //     PDP: 'ml-5 shadow-md rounded-sm bg-green-200 text-black p-2 px-3',
    //     PRP: 'ml-5 shadow-md rounded-sm bg-black text-white p-2 px-3',
    //     SDP: 'ml-5 shadow-md rounded-sm bg-yellow-300 text-black p-2 px-3',
    //     YPP: 'ml-5 shadow-md rounded-sm bg-white text-black p-2 px-3',
    //     ZLP: 'ml-5 shadow-md rounded-sm bg-white text-black p-2 px-3',
    // });

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
            setGoBack(false);
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
            // setGoBack(false);
        }
        else if (electionProfile === "pres" && what === "lga") {
            setWhat("state");
        }
        else if (electionProfile === "pres" && what === "state") {
            setWhat("");
            setGoBack(false);
        }
    }

    const closeResult = () => {
        props.onClick("true");
    }

    const switchMenu = (e) => {
        if (e.target.id.includes("_") && !e.target.id.includes("eachpoll")) {
            //let's split the id
            let idSplit = e.target.id.split("_");
            let idCode = idSplit[0];
            let idValue = idSplit[1];
            let btnVal = e.target.value;
            
            setWhat(idCode);
            setGoBack(true);
            switch(idCode) {
                case 'lga':
                    setSelectedState(idValue);
                    setWardCode(btnVal);
                    fetchEachResult("lga", btnVal);
                    setWhichResult("lga");
                    setLocation(btnVal);
                    // setAwrDataDash({
                    //     electionProfile: electionProfile,
                    //     lga: btnVal,
                    //     state: awrState,
                    //     form: "dash"
                    // });
                    break;
                case 'ward':
                    setSelectedLg(idValue);
                    fetchEachResult("ward", btnVal);
                    setWhichResult("ward");
                    setLocation(btnVal);
                    // setAwrDataDash({
                    //     electionProfile: electionProfile,
                    //     lga: btnVal,
                    //     state: awrState,
                    //     form: "dash"
                    // });
                    break;
                case 'poll':
                    setSelectedWard(idValue);
                    fetchEachResult("poll", btnVal);
                    setWhichResult("poll");
                    setLocation(btnVal);
                    break;
            }
        }
        else if (!e.target.id.includes("eachpoll")) {
            setWhichResult(e.target.id);
            setLocation("all");
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

    //handle what clicking awr button does
    const showAwr = (e) => {
        setWhat("awr");
        setAwrDataDash({
            electionProfile: electionProfile,
            lga: "AGUATA",
            state: "Anambra",
            from: "dash"
        })
        console.log(awrDataDash);
    }

  return (
    <div className='relative'>
        {what === "awr" ?
            <h2 className='mt-3 text-xl mb-2 w-full'><b>Awaiting Results</b></h2>
        :
            <h2 className='mt-3 text-xl mb-2 w-full'>All Results for <b>{adminData.eProfile}</b></h2>
        }
        
        {goBack === false ?
            <FontAwesomeIcon onClick={closeResult} icon={faArrowCircleLeft} className='absolute right-0 top-0 mr-5 text-3xl cursor-pointer'/>
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
               {what === "state" ?
                    <section className='stateButton leading-15 p-1'>
                        {allState.map((data, dataIndex) => {
                            return (
                                <div key={dataIndex} className='eachState mb-10'>
                                    <p>
                                        <button onClick={switchMenu} id={"lga_"+data.stateName} value={data.wardCode} className='eachStateBtn bg-purple-900 text-white px-2 w-full cursor-pointer text-center rounded-sm mt-4'>
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
                                                <div className='relative'>
                                                    <button onClick={switchMenu} id={"ward_"+data.lgName} value={data.lgName} className='eachStateBtn bg-purple-900 text-white px-2 w-full cursor-pointer text-center rounded-sm mt-4'>
                                                        {data.lgName}
                                                    </button>
                                                </div>
                                                <div className='stateData ml-10'>
                                                    <section className='misc1 flex flex-row mb-1'>
                                                        <div className="shadow-sm rounded-sm p-1">
                                                            <section className='text-sm text-nowrap bg-gray-100 p-1 flex flex-row'>
                                                                <p className='partyText'>Registered Voters: </p>
                                                                {isLgaSet == false ?
                                                                    <p className='partyText font-bold w-full text-right ml-1 text-purple-700'>Nil</p>
                                                                :
                                                                    <p className='partyText font-bold w-full text-right ml-1 text-purple-700'>{lgaResult[dataIndex]["regVoter"]}</p>
                                                                }
                                                            </section>
                                                            <section className='text-sm text-nowrap bg-gray-100 p-1 flex flex-row'>
                                                                <p className='partyText'>Accredited Voters: </p>
                                                                {isLgaSet == false ?
                                                                    <p className='partyText font-bold w-full text-right ml-1 text-green-700'>Nil</p>
                                                                :
                                                                    <p className='partyText font-bold w-full text-right ml-1 text-green-700'>{lgaResult[dataIndex]["accredVoter"]}</p>
                                                                }
                                                            </section>
                                                            <section className='text-sm text-nowrap p-1 flex flex-row'>
                                                                <p className='partyText'>Total Votes Cast: </p>
                                                                {isLgaSet == false ?
                                                                    <p className='partyText font-bold w-full text-right ml-1 text-blue-700'>Nil</p>
                                                                :
                                                                    <p className='partyText font-bold w-full text-right ml-1 text-blue-700'>{lgaResult[dataIndex]["totalVote"]}</p>
                                                                }
                                                            </section>
                                                            <section className='text-sm text-nowrap p-1 flex flex-row'>
                                                                <p className='partyText'>Invalid Votes: </p>
                                                                {isLgaSet == false ?
                                                                    <p className='partyText font-bold w-full text-right ml-1 text-yellow-700'>Nil</p>
                                                                :
                                                                    <p className='partyText font-bold w-full text-right ml-1 text-yellow-700'>{lgaResult[dataIndex]["invalidVote"]}</p>
                                                                }
                                                            </section>
                                                            <section className='text-sm text-nowrap bg-gray-100 p-1 flex flex-row'>
                                                                <p className='partyText' onClick={showAwr} title='Click to View Awaiting Results'><span className='bg-red-700 text-white rounded-sm p-1 cursor-pointer'>AWR</span> </p>
                                                                {isLgaSet == false ?
                                                                    <p className='partyText font-bold w-full text-right ml-1'><span className='text-red-700'>Nil</span> / <span>0</span></p>
                                                                :
                                                                    <p className='partyText font-bold w-full text-right ml-1'><span className='text-red-700'>{awr[dataIndex]["awrNumer"]}</span> / <span>{awr[dataIndex]["awrDenom"]}</span></p>
                                                                }
                                                            </section>
                                                        </div>

                                                        <div className='flex flex-row bg-gray-200 shadow-md rounded-sm py-2 items-center jusify-items-center relative'>
                                                            <div className={partyBg[acronym[0]]}>
                                                                <div className='flex flex-col my-4 w-full text-center'>
                                                                    <section className='partyImgDiv text-sm'>
                                                                        {/* <img src={partyLogo + logo[0]} alt="Party" className='w-8 h-7 mb-1' /> */}
                                                                        <p className='text-sm'><span className='bg-yellow-200 rounded-sm text-black px-2 py-1 font-semibold'>{acronym[0]}</span></p>
                                                                    </section>
                                                                    <section className='voteCount mt-3 shadow-md p-1 text-center'>
                                                                        {isLgaSet == false ?
                                                                            <p className='font-bold text-lg'>0</p>
                                                                        :
                                                                            <p className='font-bold text-lg'>{lgaResult[dataIndex]["party1"]}</p>
                                                                        }
                                                                    </section>
                                                                </div>
                                                            </div>

                                                            <div className={partyBg[acronym[1]]}>
                                                                <div className='flex flex-col my-4 w-full text-center'>
                                                                    <section className='partyImgDiv text-sm'>
                                                                        {/* <img src={partyLogo + logo[0]} alt="Party" className='w-8 h-7 mb-1' /> */}
                                                                        <p className='text-sm'><span className='bg-green-300 rounded-sm text-black px-2 py-1 font-semibold'>{acronym[1]}</span></p>
                                                                    </section>
                                                                    <section className='voteCount mt-3 shadow-md p-1 text-center'>
                                                                        {isLgaSet == false ?
                                                                            <p className='font-bold text-lg'>0</p>
                                                                        :
                                                                            <p className='font-bold text-lg'>{lgaResult[dataIndex]["party2"]}</p>
                                                                        }
                                                                    </section>
                                                                </div>
                                                            </div>

                                                            <div className={partyBg[acronym[2]]}>
                                                                <div className='flex flex-col my-4 w-full text-center'>
                                                                    <section className='partyImgDiv text-sm'>
                                                                        {/* <img src={partyLogo + logo[0]} alt="Party" className='w-8 h-7 mb-1' /> */}
                                                                        <p className='text-sm'><span className='bg-red-200 rounded-sm text-black px-2 py-1 font-semibold'>{acronym[2]}</span></p>
                                                                    </section>
                                                                    <section className='voteCount mt-3 shadow-md p-1 text-center'>
                                                                        {isLgaSet == false ?
                                                                            <p className='font-bold text-lg'>0</p>
                                                                        :
                                                                            <p className='font-bold text-lg'>{lgaResult[dataIndex]["party3"]}</p>
                                                                        }
                                                                    </section>
                                                                </div>
                                                            </div>

                                                            <div className={partyBg[acronym[3]]}>
                                                                <div className='flex flex-col my-4 w-full text-center'>
                                                                    <section className='partyImgDiv text-sm'>
                                                                        {/* <img src={partyLogo + logo[0]} alt="Party" className='w-8 h-7 mb-1' /> */}
                                                                        <p className='text-sm'><span className='bg-blue-200 rounded-sm text-black px-2 py-1 font-semibold'>{acronym[3]}</span></p>
                                                                    </section>
                                                                    <section className='voteCount mt-3 shadow-md p-1 text-center'>
                                                                        {isLgaSet == false ?
                                                                            <p className='font-bold text-lg'>0</p>
                                                                        :
                                                                            <p className='font-bold text-lg'>{lgaResult[dataIndex]["party4"]}</p>
                                                                        }
                                                                    </section>
                                                                </div>
                                                            </div>

                                                            <div className={partyBg[acronym[4]]}>
                                                                <div className='flex flex-col my-4 w-full text-center'>
                                                                    <section className='partyImgDiv text-sm'>
                                                                        {/* <img src={partyLogo + logo[0]} alt="Party" className='w-8 h-7 mb-1' /> */}
                                                                        <p className='text-sm'><span className='bg-gray-200 rounded-sm text-black px-2 py-1 font-semibold'>{acronym[4]}</span></p>
                                                                    </section>
                                                                    <section className='voteCount mt-3 shadow-md p-1 text-center'>
                                                                        {isLgaSet == false ?
                                                                            <p className='font-bold text-lg'>0</p>
                                                                        :
                                                                            <p className='font-bold text-lg'>{lgaResult[dataIndex]["party5"]}</p>
                                                                        }
                                                                    </section>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className={partyBg[acronym[5]]}>
                                                                <div className='flex flex-col my-4 w-full text-center'>
                                                                    <section className='partyImgDiv text-sm'>
                                                                        {/* <img src={partyLogo + logo[0]} alt="Party" className='w-8 h-7 mb-1' /> */}
                                                                        <p className='text-sm'><span className='bg-purple-200 rounded-sm text-black px-2 py-1 font-semibold'>{acronym[5]}</span></p>
                                                                    </section>
                                                                    <section className='voteCount mt-3 shadow-md p-1 text-center'>
                                                                        {isLgaSet == false ?
                                                                            <p className='font-bold text-lg'>0</p>
                                                                        :
                                                                            <p className='font-bold text-lg'>{lgaResult[dataIndex]["party6"]}</p>
                                                                        }
                                                                    </section>
                                                                </div>
                                                            </div>

                                                            {isLgaSet == false ?
                                                                <></>
                                                            :
                                                                lgaResult[dataIndex]["overVote"] == 0 ?
                                                                    <></>
                                                                :
                                                                    <p className='absolute top-0 h-2 w-40 bg-red-600 ml-70 -mt-2 rounded-tr-full rounded-tl-full animate__animated animate__zoomIn'></p>
                                                            }
                                                        </div>
                                                    </section>
                                                </div>
                                                {/* <Lgadata partyBg={partyBg} lgaResult={lgaResult} api={api} imgLink={imgLink} whichState={selectedLg}/> */}
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
                                                <div key={dataIndex} className='eachState mb-10'>
                                                    <p>
                                                        <button onClick={switchMenu} id={"poll_"+data.ward} value={data.ward} className='eachStateBtn bg-purple-900 text-white px-2 w-full cursor-pointer text-center rounded-sm mt-4'>
                                                            {data.ward}
                                                        </button>
                                                    </p>
                                                    <div className='stateData ml-10'>
                                                        <section className='misc1 flex flex-row mb-1'>
                                                            <div className="shadow-sm rounded-sm p-1">
                                                                <section className='text-sm text-nowrap bg-gray-100 p-1 flex flex-row'>
                                                                    <p className='partyText'>Registered Voters: </p>
                                                                    {isWardSet == false ?
                                                                        <p className='partyText font-bold w-full text-right ml-1 text-purple-700'>Nil</p>
                                                                    :
                                                                        <p className='partyText font-bold w-full text-right ml-1 text-purple-700'>{wardResult[dataIndex]["regVoter"]}</p>
                                                                    }
                                                                </section>
                                                                <section className='text-sm text-nowrap bg-gray-100 p-1 flex flex-row'>
                                                                    <p className='partyText'>Accredited Voters: </p>
                                                                    {isWardSet == false ?
                                                                        <p className='partyText font-bold w-full text-right ml-1 text-green-700'>Nil</p>
                                                                    :
                                                                        <p className='partyText font-bold w-full text-right ml-1 text-green-700'>{wardResult[dataIndex]["accredVoter"]}</p>
                                                                    }
                                                                </section>
                                                                <section className='text-sm text-nowrap p-1 flex flex-row'>
                                                                    <p className='partyText'>Total Votes Cast: </p>
                                                                    {isWardSet == false ?
                                                                        <p className='partyText font-bold w-full text-right ml-1 text-blue-700'>Nil</p>
                                                                    :
                                                                        <p className='partyText font-bold w-full text-right ml-1 text-blue-700'>{wardResult[dataIndex]["totalVote"]}</p>
                                                                    }
                                                                </section>
                                                                <section className='text-sm text-nowrap p-1 flex flex-row'>
                                                                    <p className='partyText'>Invalid Votes: </p>
                                                                    {isWardSet == false ?
                                                                        <p className='partyText font-bold w-full text-right ml-1 text-yellow-700'>Nil</p>
                                                                    :
                                                                        <p className='partyText font-bold w-full text-right ml-1 text-yellow-700'>{wardResult[dataIndex]["invalidVote"]}</p>
                                                                    }
                                                                </section>
                                                                <section className='text-sm text-nowrap bg-gray-100 p-1 flex flex-row'>
                                                                    <p className='partyText' onClick={showAwr} title='Click to View Awaiting Results'><span className='bg-red-700 text-white rounded-sm p-1 cursor-pointer'>AWR</span> </p>
                                                                    {isWardSet == false ?
                                                                        <p className='partyText font-bold w-full text-right ml-1'><span className='text-red-700'>Nil</span> / <span>0</span></p>
                                                                    :
                                                                        <p className='partyText font-bold w-full text-right ml-1'><span className='text-red-700'>{wardAwr[dataIndex]["awrNumer"]}</span> / <span>{wardAwr[dataIndex]["awrDenom"]}</span></p>
                                                                    }
                                                                </section>
                                                            </div>

                                                            <div className='flex flex-row bg-gray-200 shadow-md rounded-sm py-2 items-center jusify-items-center relative'>
                                                                <div className={partyBg[acronym[0]]}>
                                                                    <div className='flex flex-col my-4 w-full text-center'>
                                                                        <section className='partyImgDiv text-sm'>
                                                                            {/* <img src={partyLogo + logo[0]} alt="Party" className='w-8 h-7 mb-1' /> */}
                                                                            <p className='text-sm'><span className='bg-yellow-200 rounded-sm text-black px-2 py-1 font-semibold'>{acronym[0]}</span></p>
                                                                        </section>
                                                                        <section className='voteCount mt-3 shadow-md p-1 text-center'>
                                                                            {isWardSet == false ?
                                                                                <p className='font-bold text-lg'>0</p>
                                                                            :
                                                                                <p className='font-bold text-lg'>{wardResult[dataIndex]["party1"]}</p>
                                                                            }
                                                                        </section>
                                                                    </div>
                                                                </div>

                                                                <div className={partyBg[acronym[1]]}>
                                                                    <div className='flex flex-col my-4 w-full text-center'>
                                                                        <section className='partyImgDiv text-sm'>
                                                                            {/* <img src={partyLogo + logo[0]} alt="Party" className='w-8 h-7 mb-1' /> */}
                                                                            <p className='text-sm'><span className='bg-green-300 rounded-sm text-black px-2 py-1 font-semibold'>{acronym[1]}</span></p>
                                                                        </section>
                                                                        <section className='voteCount mt-3 shadow-md p-1 text-center'>
                                                                            {isWardSet == false ?
                                                                                <p className='font-bold text-lg'>0</p>
                                                                            :
                                                                                <p className='font-bold text-lg'>{wardResult[dataIndex]["party2"]}</p>
                                                                            }
                                                                        </section>
                                                                    </div>
                                                                </div>

                                                                <div className={partyBg[acronym[2]]}>
                                                                    <div className='flex flex-col my-4 w-full text-center'>
                                                                        <section className='partyImgDiv text-sm'>
                                                                            {/* <img src={partyLogo + logo[0]} alt="Party" className='w-8 h-7 mb-1' /> */}
                                                                            <p className='text-sm'><span className='bg-red-200 rounded-sm text-black px-2 py-1 font-semibold'>{acronym[2]}</span></p>
                                                                        </section>
                                                                        <section className='voteCount mt-3 shadow-md p-1 text-center'>
                                                                            {isWardSet == false ?
                                                                                <p className='font-bold text-lg'>0</p>
                                                                            :
                                                                                <p className='font-bold text-lg'>{wardResult[dataIndex]["party3"]}</p>
                                                                            }
                                                                        </section>
                                                                    </div>
                                                                </div>

                                                                <div className={partyBg[acronym[3]]}>
                                                                    <div className='flex flex-col my-4 w-full text-center'>
                                                                        <section className='partyImgDiv text-sm'>
                                                                            {/* <img src={partyLogo + logo[0]} alt="Party" className='w-8 h-7 mb-1' /> */}
                                                                            <p className='text-sm'><span className='bg-blue-200 rounded-sm text-black px-2 py-1 font-semibold'>{acronym[3]}</span></p>
                                                                        </section>
                                                                        <section className='voteCount mt-3 shadow-md p-1 text-center'>
                                                                            {isWardSet == false ?
                                                                                <p className='font-bold text-lg'>0</p>
                                                                            :
                                                                                <p className='font-bold text-lg'>{wardResult[dataIndex]["party4"]}</p>
                                                                            }
                                                                        </section>
                                                                    </div>
                                                                </div>

                                                                <div className={partyBg[acronym[4]]}>
                                                                    <div className='flex flex-col my-4 w-full text-center'>
                                                                        <section className='partyImgDiv text-sm'>
                                                                            {/* <img src={partyLogo + logo[0]} alt="Party" className='w-8 h-7 mb-1' /> */}
                                                                            <p className='text-sm'><span className='bg-gray-200 rounded-sm text-black px-2 py-1 font-semibold'>{acronym[4]}</span></p>
                                                                        </section>
                                                                        <section className='voteCount mt-3 shadow-md p-1 text-center'>
                                                                            {isWardSet == false ?
                                                                                <p className='font-bold text-lg'>0</p>
                                                                            :
                                                                                <p className='font-bold text-lg'>{wardResult[dataIndex]["party5"]}</p>
                                                                            }
                                                                        </section>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className={partyBg[acronym[5]]}>
                                                                    <div className='flex flex-col my-4 w-full text-center'>
                                                                        <section className='partyImgDiv text-sm'>
                                                                            {/* <img src={partyLogo + logo[0]} alt="Party" className='w-8 h-7 mb-1' /> */}
                                                                            <p className='text-sm'><span className='bg-purple-200 rounded-sm text-black px-2 py-1 font-semibold'>{acronym[5]}</span></p>
                                                                        </section>
                                                                        <section className='voteCount mt-3 shadow-md p-1 text-center'>
                                                                            {isWardSet == false ?
                                                                                <p className='font-bold text-lg'>0</p>
                                                                            :
                                                                                <p className='font-bold text-lg'>{wardResult[dataIndex]["party6"]}</p>
                                                                            }
                                                                        </section>
                                                                    </div>
                                                                </div>

                                                                {isWardSet == false ?
                                                                    <></>
                                                                :
                                                                    wardResult[dataIndex]["overVote"] == 0 ?
                                                                        <></>
                                                                    :
                                                                        <p className='absolute top-0 h-2 w-40 bg-red-600 ml-70 -mt-2 rounded-tr-full rounded-tl-full animate__animated animate__zoomIn'></p>
                                                                }
                                                            </div>
                                                        </section>
                                                    </div>
                                                    {/* <Warddata partyBg={partyBg} api={api} imgLink={partyLogo} whichState={selectedWard}/> */}
                                                </div>
                                            );
                                        })}
                                    </section>
                                :
                                    what === "poll" ?
                                        <section className='leading-15 p-2'>
                                            {allPoll.map((data, dataIndex) => {
                                                return (
                                                    <div key={dataIndex} className='eachState mb-10'>
                                                        <p>
                                                            <button onClick={switchMenu} id={"eachpoll_"+data.id} className='eachStateBtn bg-purple-900 text-white px-2 py-1 w-full cursor-pointer text-center rounded-sm mt-4 '>
                                                                {data.pollUnit}
                                                            </button>
                                                        </p>
                                                        <div className='stateData ml-10'>
                                                            <section className='misc1 flex flex-row mb-1'>
                                                                <div className="shadow-sm rounded-sm p-1">
                                                                    <section className='text-sm text-nowrap bg-gray-100 p-1 flex flex-row'>
                                                                        <p className='partyText'>Registered Voters: </p>
                                                                        {isPollSet == false ?
                                                                            <p className='partyText font-bold w-full text-right ml-1 text-purple-700'>Nil</p>
                                                                        :
                                                                            <p className='partyText font-bold w-full text-right ml-1 text-purple-700'>{pollResult[dataIndex]["regVoter"]}</p>
                                                                        }
                                                                    </section>
                                                                    <section className='text-sm text-nowrap bg-gray-100 p-1 flex flex-row'>
                                                                        <p className='partyText'>Accredited Voters: </p>
                                                                        {isPollSet == false ?
                                                                            <p className='partyText font-bold w-full text-right ml-1 text-green-700'>Nil</p>
                                                                        :
                                                                            <p className='partyText font-bold w-full text-right ml-1 text-green-700'>{pollResult[dataIndex]["accredVoter"]}</p>
                                                                        }
                                                                    </section>
                                                                    <section className='text-sm text-nowrap p-1 flex flex-row'>
                                                                        <p className='partyText'>Total Votes Cast: </p>
                                                                        {isPollSet == false ?
                                                                            <p className='partyText font-bold w-full text-right ml-1 text-blue-700'>Nil</p>
                                                                        :
                                                                            <p className='partyText font-bold w-full text-right ml-1 text-blue-700'>{pollResult[dataIndex]["totalVote"]}</p>
                                                                        }
                                                                    </section>
                                                                    <section className='text-sm text-nowrap p-1 flex flex-row'>
                                                                        <p className='partyText'>Invalid Votes: </p>
                                                                        {isPollSet == false ?
                                                                            <p className='partyText font-bold w-full text-right ml-1 text-yellow-700'>Nil</p>
                                                                        :
                                                                            <p className='partyText font-bold w-full text-right ml-1 text-yellow-700'>{pollResult[dataIndex]["invalidVote"]}</p>
                                                                        }
                                                                    </section>
                                                                    <section className='text-sm text-nowrap bg-gray-100 p-1 flex flex-row'>
                                                                        <p className='partyText' onClick={showAwr} title='Click to View Awaiting Results'><span className='bg-red-700 text-white rounded-sm p-1 cursor-pointer'>AWR</span> </p>
                                                                        {isPollSet == false ?
                                                                            <p className='partyText font-bold w-full text-right ml-1'><span className='text-red-700'>Nil</span> / <span>0</span></p>
                                                                        :
                                                                            <p className='partyText font-bold w-full text-right ml-1'><span className='text-red-700'>{wardAwr[dataIndex]["awrNumer"]}</span> / <span>{wardAwr[dataIndex]["awrDenom"]}</span></p>
                                                                        }
                                                                    </section>
                                                                </div>

                                                                <div className='flex flex-row bg-gray-200 shadow-md rounded-sm py-2 items-center jusify-items-center relative'>
                                                                    <div className={partyBg[acronym[0]]}>
                                                                        <div className='flex flex-col my-4 w-full text-center'>
                                                                            <section className='partyImgDiv text-sm'>
                                                                                {/* <img src={partyLogo + logo[0]} alt="Party" className='w-8 h-7 mb-1' /> */}
                                                                                <p className='text-sm'><span className='bg-yellow-200 rounded-sm text-black px-2 py-1 font-semibold'>{acronym[0]}</span></p>
                                                                            </section>
                                                                            <section className='voteCount mt-3 shadow-md p-1 text-center'>
                                                                                {isPollSet == false ?
                                                                                    <p className='font-bold text-lg'>0</p>
                                                                                :
                                                                                    <p className='font-bold text-lg'>{pollResult[dataIndex]["party1"]}</p>
                                                                                }
                                                                            </section>
                                                                        </div>
                                                                    </div>

                                                                    <div className={partyBg[acronym[1]]}>
                                                                        <div className='flex flex-col my-4 w-full text-center'>
                                                                            <section className='partyImgDiv text-sm'>
                                                                                {/* <img src={partyLogo + logo[0]} alt="Party" className='w-8 h-7 mb-1' /> */}
                                                                                <p className='text-sm'><span className='bg-green-300 rounded-sm text-black px-2 py-1 font-semibold'>{acronym[1]}</span></p>
                                                                            </section>
                                                                            <section className='voteCount mt-3 shadow-md p-1 text-center'>
                                                                                {isPollSet == false ?
                                                                                    <p className='font-bold text-lg'>0</p>
                                                                                :
                                                                                    <p className='font-bold text-lg'>{pollResult[dataIndex]["party2"]}</p>
                                                                                }
                                                                            </section>
                                                                        </div>
                                                                    </div>

                                                                    <div className={partyBg[acronym[2]]}>
                                                                        <div className='flex flex-col my-4 w-full text-center'>
                                                                            <section className='partyImgDiv text-sm'>
                                                                                {/* <img src={partyLogo + logo[0]} alt="Party" className='w-8 h-7 mb-1' /> */}
                                                                                <p className='text-sm'><span className='bg-red-200 rounded-sm text-black px-2 py-1 font-semibold'>{acronym[2]}</span></p>
                                                                            </section>
                                                                            <section className='voteCount mt-3 shadow-md p-1 text-center'>
                                                                                {isPollSet == false ?
                                                                                    <p className='font-bold text-lg'>0</p>
                                                                                :
                                                                                    <p className='font-bold text-lg'>{pollResult[dataIndex]["party3"]}</p>
                                                                                }
                                                                            </section>
                                                                        </div>
                                                                    </div>

                                                                    <div className={partyBg[acronym[3]]}>
                                                                        <div className='flex flex-col my-4 w-full text-center'>
                                                                            <section className='partyImgDiv text-sm'>
                                                                                {/* <img src={partyLogo + logo[0]} alt="Party" className='w-8 h-7 mb-1' /> */}
                                                                                <p className='text-sm'><span className='bg-blue-200 rounded-sm text-black px-2 py-1 font-semibold'>{acronym[3]}</span></p>
                                                                            </section>
                                                                            <section className='voteCount mt-3 shadow-md p-1 text-center'>
                                                                                {isPollSet == false ?
                                                                                    <p className='font-bold text-lg'>0</p>
                                                                                :
                                                                                    <p className='font-bold text-lg'>{pollResult[dataIndex]["party4"]}</p>
                                                                                }
                                                                            </section>
                                                                        </div>
                                                                    </div>

                                                                    <div className={partyBg[acronym[4]]}>
                                                                        <div className='flex flex-col my-4 w-full text-center'>
                                                                            <section className='partyImgDiv text-sm'>
                                                                                {/* <img src={partyLogo + logo[0]} alt="Party" className='w-8 h-7 mb-1' /> */}
                                                                                <p className='text-sm'><span className='bg-gray-200 rounded-sm text-black px-2 py-1 font-semibold'>{acronym[4]}</span></p>
                                                                            </section>
                                                                            <section className='voteCount mt-3 shadow-md p-1 text-center'>
                                                                                {isPollSet == false ?
                                                                                    <p className='font-bold text-lg'>0</p>
                                                                                :
                                                                                    <p className='font-bold text-lg'>{pollResult[dataIndex]["party5"]}</p>
                                                                                }
                                                                            </section>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    <div className={partyBg[acronym[5]]}>
                                                                        <div className='flex flex-col my-4 w-full text-center'>
                                                                            <section className='partyImgDiv text-sm'>
                                                                                {/* <img src={partyLogo + logo[0]} alt="Party" className='w-8 h-7 mb-1' /> */}
                                                                                <p className='text-sm'><span className='bg-purple-200 rounded-sm text-black px-2 py-1 font-semibold'>{acronym[5]}</span></p>
                                                                            </section>
                                                                            <section className='voteCount mt-3 shadow-md p-1 text-center'>
                                                                                {isPollSet == false ?
                                                                                    <p className='font-bold text-lg'>0</p>
                                                                                :
                                                                                    <p className='font-bold text-lg'>{pollResult[dataIndex]["party6"]}</p>
                                                                                }
                                                                            </section>
                                                                        </div>
                                                                    </div>

                                                                    {isPollSet == false ?
                                                                        <></>
                                                                    :
                                                                        pollResult[dataIndex]["overVote"] == 0 ?
                                                                            <></>
                                                                        :
                                                                            <p className='absolute top-0 h-2 w-40 bg-red-600 ml-70 -mt-2 rounded-tr-full rounded-tl-full animate__animated animate__zoomIn'></p>
                                                                    }
                                                                </div>
                                                            </section>
                                                        </div>
                                                        {/* <Polldata partyBg={partyBg} api={api} imgLink={partyLogo} whichState={selectedPoll}/> */}
                                                    </div>
                                                );
                                            })}
                                        </section>
                                    :
                                        what === "awr" ?
                                            <Awr onClick={closeResult} awrData={awrDataDash} api={api}/>
                                        :
                                            <></>
                }
            </div>
        </section>
    </div>
  )
}

export default Result
