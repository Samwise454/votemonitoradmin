import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlock } from '@fortawesome/free-solid-svg-icons';
import '../css/alarm.css';
import '../css/tables.css';
import axios from 'axios';

const Alarm = (props) => {
    const api = props.api + '/managealarmdata.php';
    const addNum = props.api + '/addalarmnum.php';
    const moveward = props.api + '/moveward.php';
    const [resp, setResp] = useState("");
    const [loading, setLoading] = useState(false);
    const [alarmNum, setAlarmNum] = useState([]);
    const [dataState, setDataState] = useState(false);
    const userData = localStorage.getItem("subadmin");
    const [allMsg, setAllMsg] = useState([]);
    const [msgSet, setMsgSet] = useState(false);
    const [numData, setNumData] = useState({
        which: "",
        telNum: "",
        user: userData
    });

    const [alarmData, setAlarmData] = useState({
        action: "alarmData",
        user: userData
    });

    const [alarmMsg, setAlarmMsg] = useState({
        action: "getMsg",
        user: userData
    });

    const [lastCount, setLastCount] = useState(0);
    const eventSourceLink = props.api + `/getstream.php?subadmin=${userData}&lastcount=${lastCount}`;

    const handleInput = (e) => {
        let id = e.target.id;
        let val = e.target.value;

        switch(id) {
            case 'alarmNumSelect':
                setNumData({...numData, which: val});
                break;
            case 'alarmTel':
                setNumData({...numData, telNum: val});
                break;
        }
    }

    const showLoader = () => {
      let loader = document.querySelector(".loaderDiv");
      loader.style.display = "flex";
    }

    const hideLoader = () => {
        let loader = document.querySelector(".loaderDiv");
        loader.style.display = "none";
    }

    const submitNum = (e) => {
        e.preventDefault();
        let alarmTel = document.querySelector("#alarmTel");
        let alarmNumSelect = document.querySelector("#alarmNumSelect");
        showLoader();

        const hideResp = () => {
            setTimeout(() => {
                setResp("");
            }, 3000);
        }

        if (numData.which == "" || numData.tel == "") {
            setResp("Fill all inputs");
            hideResp();
            hideLoader();
        }
        else {
            const setAlarmNum = async () => {
                try {
                    const response = await axios.post(addNum, JSON.stringify(numData));
                    // console.log(response.data);
                    if (response.status === 200) {
                        setResp(response.data);
                        if (dataState === false) {
                            setDataState(true);
                        }
                        else {
                            setDataState(false);
                        }
                    }
                } catch(err) {
                    setDataState(false);
                    // setResp("Error processing");
                    setResp(err)
                } finally {
                    hideLoader();
                    alarmTel.value = "";
                    alarmNumSelect.value = "";
                    setNumData({
                        which: "",
                        telNum: "",
                        user: userData
                    });
                    hideResp();
                }
            }
            setAlarmNum();
        }
    }

    useEffect(() => {
        setLoading(true);

        const getAlarmNum = async () => {
            try {
                const response = await axios.post(api, JSON.stringify(alarmData));
                if (response.status === 200) {
                    setAlarmNum(response.data);
                }
                else {
                    setAlarmNum([]);
                }
            } catch(err) {
                setAlarmNum([]);
            } 
        }

        const getAlarmMsg = async () => {
            try {
                const response = await axios.post(api, JSON.stringify(alarmMsg));
                if (response.status === 200) {
                    // console.log(response.data);
                    setAllMsg(response.data);
                }
                else {
                    setAllMsg([]);
                }
            } catch(err) {
                setAllMsg([]);
            } finally {
                setLoading(false);
                setMsgSet(true);
            }
        }

        getAlarmNum();
        getAlarmMsg();
    }, [dataState]);

    //temporary settings code
    const runAction = () => {
        const perform  = async () => {
            try {
                const response = await axios.get(moveward);
                console.log(response.data)
                if (response.status === 200) {
                    setRespo("Done");
                }
                else {
                    setRespo("Wahala");
                }
            } catch(err) {
                setRespo(err);
            }
        }
        perform();
    }
    const [respo, setRespo] = useState("");

    //testing server sent event
    // useEffect(() => {
    //     // Create a new EventSource instance
    //     const eventSource = new EventSource(eventSourceLink);

    //     // Event listener for incoming messages
    //     eventSource.onmessage = (event) => {
    //         try {
    //             const newNotification = event.data;
    //             if (newNotification.error) {
    //                 setRespo(newNotification.error);
    //             } else {
    //                 setRespo(newNotification);
    //             }
    //         } catch (e) {   
    //             console.error("Error parsing SSE data:", e);
    //         }
    //     };

    //     // Event listener for errors
    //     eventSource.onerror = (error) => {
    //         console.error("EventSource error:", error);
    //         setRespo("Failed to connect to notification server.");
    //         eventSource.close(); // Close the connection on error
    //     };

    //     // Clean up the EventSource connection when the component unmounts
    //     return () => {
    //         eventSource.close();
    //     };
    // }, []);

  return (
    <div>
      <h2 className='mt-3 text-xl mb-3'>Manage Alarms</h2>

      {/* <button className="bg-green-950 text-white p-4" onClick={runAction}>Action</button>
      <div>
        {respo}
      </div> */}

        <div className='alarmContainer relative'>
            {loading == true ?
            <section id='page_loader' className='absolute top-0 right-0'>
                <span className='loader mr-5'>

                </span>
            </section>  
            :
            <></>
            }

            <section className='shadow-sm rounded-sm p-1 flex align-center justify-center h-160 overflow-y-auto'>
                <table className='text-sm h-fit'>
                    <thead>
                        <tr>
                            <th>S/N0</th>
                            <th>Agent</th>
                            <th>Location</th>
                            <th>Message</th>
                            <th>Time</th>
                        </tr>
                    </thead>

                    <tbody className='relative'>
                        {msgSet == true ?
                            allMsg.map((data, dataIndex) => {
                                return (
                                    data.msg == "nil" ?
                                        <tr key={dataIndex}></tr>
                                    :
                                        <tr key={dataIndex}>
                                            <td className='p-2'>{dataIndex + 1}</td>
                                            <td className='p-2'>{data.agent}</td>
                                            <td className='p-2'>{data.location}</td>
                                            <td className='p-2'>{data.msg}</td>
                                            <td className='p-2'>{data.time}</td>
                                        </tr>
                                );
                            })
                        :
                            <tr></tr>
                        }
                    </tbody>
                </table>
            </section>

            <section>
                <h3 className='mb-4 text-green-700'>Alarm Numbers</h3>
                <div className='flex flex-row'>
                    <section className='shadow-sm rounded-sm bg-green-800 text-white p-2 relative'>
                        <p>
                            {alarmNum.length == 0 ?
                                <></>
                            :
                                alarmNum[0].num1
                            }
                        </p>
                        <span className='absolute top-0 right-0 -mt-3.5 bg-white rounded-full px-1.5 text-black'>1</span>
                    </section>

                    <section className='shadow-sm rounded-sm bg-green-800 text-white p-2 relative mx-2'>
                        <p>
                            {alarmNum.length == 0 ?
                                <></>
                            :
                                alarmNum[0].num2
                            }
                        </p>
                        <span className='absolute top-0 right-0 -mt-3.5 bg-white rounded-full px-1.5 text-black'>2</span>
                    </section>

                    <section className='shadow-sm rounded-sm bg-green-800 text-white p-2 relative'>
                        <p>
                            {alarmNum.length == 0 ?
                                <></>
                            :
                                alarmNum[0].num3
                            }
                        </p>
                        <span className='absolute top-0 right-0 -mt-3.5 bg-white rounded-full px-1.5 text-black'>3</span>
                    </section>
                </div>

                <div>
                    <h3 className='text-green-700 mt-20'>Edit Alarm Numbers</h3>
                    
                    <select onChange={handleInput} name="alarmNumSelect" id="alarmNumSelect" className='mt-4 shadow-sm rounded-sm outline-0 border-0 px-3 py-2'>
                        <option value="" hidden>Select Number to Edit</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>

                    <form onSubmit={submitNum}>
                        <div className='mt-3 text-center'>
                            <section id="form_loader" className='loaderDiv mt-2'>
                                <span className='loader'>

                                </span>
                            </section>

                            {resp == "" ?
                                <></>
                            :
                                <p className='text-sm'>
                                    {resp}
                                </p>
                            }
                        </div>

                        <input onChange={handleInput} id='alarmTel' type="tel" placeholder='Enter Phone Number' className='py-2 px-3 mt-20 rounded-sm outline-0 border-0 shadow-sm mr-4'/>

                        <button className='bg-green-800 text-white py-2 px-3 rounded-sm cursor-pointer'>Submit</button>
                    </form>
                </div>
            </section>
        </div>
    </div>
  )
}

export default Alarm