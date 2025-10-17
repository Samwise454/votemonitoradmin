import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import 'animate.css';
import '../css/miscdata.css';
import axios from 'axios';

const Awr = (props) => {
    const [loading, setLoading] = useState(false);

    //contains - electionProfile eg guber, lga eg all or the lga, state eg Anambra
    const awrData = props.awrData;
    const api = props.api;
    const getawr = api + '/fetchawr.php';
    const geteachawr = api + '/fetcheachawr.php';
    const getpollawr = api + '/fetchpollawr.php';
    const userData = localStorage.getItem('subadmin');

    const [allState, setAllState] = useState([]);
    const [stateAwr, setStateAwr] = useState([]);
    
    const [allLga, setAllLga] = useState([]);
    const [lgaAwr, setLgaAwr] = useState([]);

    const [allWard, setAllWard] = useState([]);
    const [wardAwr, setWardAwr] = useState([]);

    const [allPoll, setAllPoll] = useState([]);
    const [pollAwr, setPollAwr] = useState([]);

    const [whichWard, setWhichWard] = useState("");
    const [whichPoll, setWhichPoll] = useState("");

    const [displayAwrState, setDisplayAwrState] = useState("");
    const [displayAwrLga, setDisplayAwrLga] = useState("");
    const [displayAwrWard, setDisplayAwrWard] = useState("");
    const [displayAwrPoll, setDisplayAwrPoll] = useState("");

    const [loadAwr, setLoadAwr] = useState(false);

    useEffect(() => {
        let from = awrData.from;//which page it's coming from, dash, state, lga, ward or poll
        let column = "";
        // console.log(awrData);

        if (from === "dash") {
            if (awrData.electionProfile === "pres") {
                column = "state";
            }
            else if (awrData.electionProfile === "guber" || awrData.electionProfile === "sen") {
                column = "lga";
            }
            else if (awrData.electionProfile === "hoa" || awrData.electionProfile === "hor" || awrData.electionProfile === "lga") {
                column = "ward";
            }   
        }
        else {
            column = from;
        }

        setLoading(true);
        let data = {
            electionProfile: awrData.electionProfile,
            lga: awrData.lga,
            state: awrData.state,
            subadmin: userData,
            column: column //eg state or ward or lga or poll
        };

        const fetchAwr = async () => {
            try {
                const response = await axios.post(getawr, JSON.stringify(data));
                if (response.status === 200) {
                    // console.log(response.data)
                    if (column === "state") {
                        setAllState(response.data.state)
                        setStateAwr(response.data.awr);
                        setDisplayAwrState(column);
                        setDisplayAwrPoll("");
                    }
                    else if (column === "lga") {
                        setAllLga(response.data.lga)
                        setLgaAwr(response.data.awr);
                        setDisplayAwrLga(column);
                        setDisplayAwrPoll("");
                    }
                    else if (column === "ward") {
                        setAllWard(response.data.ward)
                        setWardAwr(response.data.awr);
                        setDisplayAwrWard(column);
                    }
                }
            } catch (err) {

            } finally {
                setLoading(false);
            }
        }

        fetchAwr();

        return () => {

        }
    }, []);

    const handleEachAwr = async (e) => {
        //fetch awr based on selected item 
        let id = e.target.id;
        let location = id.split("_")[0];
        let column = id.split("_")[1];
        setWhichWard(location);
        setLoadAwr(true);
        let data = {
            column: column,//ward or state or lga
            location: location, //particualar state or lga that we wish to fetch its ward data
            subadmin: userData
        };

        //run axios to fetch data using the api: geteachawr
        try {
            const response = await axios.post(geteachawr, JSON.stringify(data));
            if (response.status === 200) {
                // console.log(response.data);
                setAllWard(response.data.ward);
                setWardAwr(response.data.awr);
            }
        } catch(err) {
            setAllWard([]);
            setWardAwr([]);
        } finally {
            setLoadAwr(false);
            setDisplayAwrWard("ward");
        }
    }

    const showPollAwr = async (e) => {
        // console.log(e.target.id);
        let id = e.target.id;
        let location = id.split("_")[0];
        let column = id.split("_")[1];
        setWhichPoll(location);
        setLoadAwr(true);

        let data = {
            column: column,//ward or state or lga
            location: location, //particualar state or lga that we wish to fetch its ward data
            subadmin: userData
        };

        try {
            const response = await axios.post(getpollawr, JSON.stringify(data));
            if (response.status === 200) {
                setAllPoll(response.data);
                // console.log(response.data)
            }
        } catch (err) {
            setAllPoll([]);
        } finally {
            setLoadAwr(false);
            setDisplayAwrPoll("poll");
        }
    }

    const moveBack = () => {
        props.onClick(awrData.from);
    }

  return (
    <div className='stateData ml-5'>
        {loading == true ?
            <section id='page_loader' className='absolute top-0 right-0'>
                <span className='loader mr-5'>

                </span>
            </section>  
        :
            <></>
        }
        <FontAwesomeIcon onClick={moveBack} icon={faArrowCircleLeft} className='absolute right-0 top-0 mr-5 text-3xl cursor-pointer'/>

        {loadAwr === true ?
            <section id='awrLoad' className='absolute mr-120 top-0 right-0'>
                <span className='loader mr-5'>

                </span>
            </section>     
        :
            <></>
        }

        <div className='awrMain'>
            {/* Contains names of either state, lga, ward or poll units */}
            {displayAwrState === "state" ?
                <section className='bg-purple-800 h-160 w-full rounded-sm my-2 p-2'>
                    <p className='text-white text-center p-2 font-semibold'>State AWR</p>

                    <table className='w-full overflow-y-auto'>
                        <thead>
                            <tr>
                                <th className='text-blue-600 border-1 border-gray-200'>State</th>
                                <th className='text-blue-600 border-1 border-gray-200'>AWR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allState.map((data, dataIndex) => {
                                return (
                                    <tr className='text-center' key={dataIndex}>
                                        <td title='Click to select' className='eachAwr pl-5 text-blue-600 cursor-pointer bg-white border-1 border-gray-200 text-left'>{data.lgName}</td>
                                        <td className='py-2 px-4 bg-white border-1 border-gray-200'><span className='bg-white p-1 rounded-sm text-red-600'>{stateAwr[dataIndex]["awrNumer"]}</span> / <span>{stateAwr[dataIndex]["awrDenom"]}</span></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </section>
            :
                <></>
            }

            {displayAwrLga === "lga" ? 
                <section className='bg-orange-800 h-160 w-full overflow-y-auto outline-0 border-1 border-orange-800 rounded-sm my-2 p-2'>
                    <p className='text-white text-center p-2 font-semibold sticky -top-2 bg-orange-800'>LGA AWR</p>

                    <table className='w-full overflow-y-auto'>
                        <thead>
                            <tr>
                                <th className='text-blue-600 border-1 border-gray-200'>LGA</th>
                                <th className='text-blue-600 border-1 border-gray-200'>AWR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allLga.map((data, dataIndex) => {
                                return (
                                    <tr className='text-center' key={dataIndex}>
                                        <td onClick={handleEachAwr} id={data.lgName + "_lga"} title='Click to select' className='eachAwr pl-5 text-blue-600 cursor-pointer bg-white border-1 border-gray-200 text-left'>{data.lgName}</td>
                                        <td className='py-2 px-4 bg-white border-1 border-gray-200'><span className='bg-white p-1 rounded-sm text-red-600'>{lgaAwr[dataIndex]["awrNumer"]}</span> / <span>{lgaAwr[dataIndex]["awrDenom"]}</span></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </section>
            :
                <></>
            }

            {displayAwrWard === "ward" ?
                <section className='bg-blue-800 h-160 w-full overflow-y-auto rounded-sm my-2 outline-0 border-1 border-blue-800 p-2 animate__animated animate__zoomIn'>
                    <p className='text-white text-center p-2 font-semibold sticky -top-2 bg-blue-800'>Ward AWR for {whichWard}</p>

                    <table className='w-full overflow-y-auto'>
                        <thead>
                            <tr>
                                <th className='text-blue-600 border-1 border-gray-200'>Ward</th>
                                <th className='text-blue-600 border-1 border-gray-200'>AWR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allWard.map((data, dataIndex) => {
                                return (
                                    <tr className='text-center' key={dataIndex}>
                                        <td title='Click to select' onClick={showPollAwr} id={data.ward + "_ward"} className='eachAwr pl-5 text-blue-600 cursor-pointer bg-white border-1 border-gray-200 text-left'>{data.ward}</td>
                                        <td className='py-2 px-4 bg-white border-1 whitespace-nowrap border-gray-200'><span className='bg-white p-1 rounded-sm text-red-600'>{wardAwr[dataIndex]["awrNumer"]}</span> / <span>{wardAwr[dataIndex]["awrDenom"]}</span></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </section>
            :
                <></>
            }

            {displayAwrPoll === "poll" ?
                <section className='bg-purple-800 h-160 w-full overflow-y-auto rounded-sm my-2 outline-0 border-1 border-blue-800 p-2 animate__animated animate__zoomIn'>
                    <p className='text-white text-center p-2 font-semibold sticky -top-2 bg-purple-800'>Poll AWR for {whichPoll}</p>

                    <table className='w-full overflow-y-auto'>
                        <thead>
                            <tr>
                                {/* <th className='text-blue-600 border-1 border-gray-200'>S/N0</th> */}
                                <th className='text-blue-600 border-1 border-gray-200'>Poll Unit</th>
                                <th className='text-blue-600 border-1 border-gray-200'>Poll Num</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allPoll.map((data, dataIndex) => {
                                return (
                                    <tr className='text-center' key={dataIndex}>
                                        {/* <td className='px-2 py-2 text-black bg-white border-1 border-gray-200 text-left'>{dataIndex + 1}</td>                                         */}
                                        <td title='Click to select' className='px-2 py-2 text-black cursor-pointer bg-white border-1 text-[13px] border-gray-200 text-left'>{data.poll}</td>
                                        <td className='px-2 py-2 text-black bg-white border-1 border-gray-200 text-left'>{data.num}</td>                                        
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </section>
            :
                <></>
            }
        </div>
    </div>
  )
}

export default Awr
