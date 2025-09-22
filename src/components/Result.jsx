import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft,  faLock, faMinus, faPen, faPlus, faUnlock } from '@fortawesome/free-solid-svg-icons';
import '../css/result.css';
import Dash from './Dash';
import Statedata from './Statedata';
import Lgadata from './Lgadata';
import Warddata from './Warddata';
import Polldata from './Polldata';

const Result = () => {
    const [electionProfile, setElectionProfile] = useState("guber");
    const [allState, setAllState] = useState([]);
    const [allWard, setAllWard] = useState([]);
    const [allPoll, setAllPoll] = useState([]);

    const [what, setWhat] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [selectedPoll, setSelectedPoll] = useState("");

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
            setWhat(idCode);
            setGoBack(true);
            switch(idCode) {
                case 'lga':
                    setSelectedState(idValue);
                    break;
                case 'ward':
                    setSelectedWard(idValue);
                    break;
                case 'poll':
                    setSelectedPoll(idValue);
                    break;
            }
        }
        else if (!e.target.id.includes("eachpoll")) {
            setWhat(e.target.id);
            setGoBack(true);
        }
    }

  return (
    <div className='relative'>
        <h2 className='mt-3 text-xl mb-2 w-full'>All Results</h2>
        
        {goBack === false ?
            <></>
        :
            <FontAwesomeIcon onClick={moveBack} icon={faArrowCircleLeft} className='absolute right-0 top-0 mr-5 text-3xl cursor-pointer'/>
        }

        <section id='allResult' className='h-164 overflow-y-auto shadow-sm rounded-sm'>
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
                                    <Dash/>
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
                                        <Dash/>
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
                                            <Dash/>
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
                                                <Dash/>
                                            </div>
                                        </div>
                                    </section>
                                :
                                    <></>

                :
                    what === "state" ?
                        <section className='stateButton leading-15 p-2'>
                            <div className='eachState'>
                                <p>
                                    <button onClick={switchMenu} id='lga_Abia' className='eachStateBtn bg-blue-950 text-white px-2 w-full cursor-pointer text-center rounded-sm mt-4'>
                                        Abia
                                    </button>
                                </p>
                                <Statedata/>
                            </div>  

                            <div className='eachState'>
                                <p>
                                    <button onClick={switchMenu} id='lga_Adamawa' className='eachStateBtn bg-blue-950 text-white px-2 w-full cursor-pointer text-center rounded-sm mt-4'>
                                        Adamawa
                                    </button>
                                </p>
                                <Statedata/>
                            </div>                           
                            
                            <div className='eachState'>
                                <p>
                                    <button onClick={switchMenu} id='lga_Akwa Ibom' className='eachStateBtn bg-blue-950 text-white px-2 w-full cursor-pointer text-center rounded-sm mt-4'>
                                        Akwa Ibom
                                    </button>
                                </p>
                                <Statedata/>
                            </div>

                            <div className='eachState'>
                                <p>
                                    <button onClick={switchMenu} id='lga_Anambra' className='eachStateBtn bg-blue-950 text-white px-2 w-full cursor-pointer text-center rounded-sm mt-4'>
                                        Anambra
                                    </button>
                                </p>
                                <Statedata/>
                            </div>
                            
                            <div className='eachState'>
                                <p>
                                    <button onClick={switchMenu} id='lga_Bauchi' className='eachStateBtn bg-blue-950 text-white px-2 w-full cursor-pointer text-center rounded-sm mt-4'>
                                        Bauchi
                                    </button>
                                </p>
                                <Statedata/>
                            </div>
                        </section>
                        :
                            what === "lga" ?
                                <section className='leading-15 p-2'>
                                    <div className='eachState'>
                                        <p>
                                            <button onClick={switchMenu} id='ward_Aguata' className='eachStateBtn bg-green-800 text-white px-2 w-full cursor-pointer text-center rounded-sm mt-4'>
                                                Aguata
                                            </button>
                                        </p>
                                        <Lgadata/>
                                    </div>

                                    <div className='eachState'>
                                        <p>
                                            <button onClick={switchMenu} id='ward_Anambra East' className='eachStateBtn bg-green-800 text-white px-2 w-full cursor-pointer text-center rounded-sm mt-4'>
                                                Anambra East
                                            </button>
                                        </p>
                                        <Lgadata/>
                                    </div>
                                </section>
                                :
                                    what === "ward" ?
                                        <section className='leading-15 p-2'>
                                            <div className='eachState'>
                                                <p>
                                                    <button onClick={switchMenu} id='poll_Ekwulobia I' className='eachStateBtn bg-black text-white px-2 w-full cursor-pointer text-center rounded-sm mt-4'>
                                                        Ekwulobia I
                                                    </button>
                                                </p>
                                                <Warddata/>
                                            </div>

                                            <div className='eachState'>
                                                <p>
                                                    <button onClick={switchMenu} id='poll_Ekwulobia II' className='eachStateBtn bg-black text-white px-2 w-full cursor-pointer text-center rounded-sm mt-4'>
                                                        Ekwulobia II
                                                    </button>
                                                </p>
                                                <Warddata/>
                                            </div>
                                        </section>
                                    :
                                        what === "poll" ?
                                            <section className='leading-15 p-2'>
                                                <div className='eachState'>
                                                    <p>
                                                        <button onClick={switchMenu} id='eachpoll_St Christopher' className='eachStateBtn bg-yellow-950 text-white px-2 w-full cursor-pointer text-center rounded-sm mt-4'>
                                                            St Christopher
                                                        </button>
                                                    </p>
                                                    <Polldata/>
                                                </div>

                                                <div className='eachState'>
                                                    <p>
                                                        <button onClick={switchMenu} id='eachpoll_St John Poll' className='eachStateBtn bg-yellow-950 text-white px-2 w-full cursor-pointer text-center rounded-sm mt-4'>
                                                            St John Poll
                                                        </button>
                                                    </p>
                                                    <Polldata/>
                                                </div>
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
