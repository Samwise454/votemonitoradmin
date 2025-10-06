import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate, faUnlock } from '@fortawesome/free-solid-svg-icons';
import '../css/party.css';
import axios from 'axios';

const Party = (props) => {
  const api = props.api + '/getparty.php';
  const setparty = props.api + '/setparty.php';
  const getparty = props.api + '/getadminparty.php';
  const imgLink = props.img + '/partyLogo/';
  const [partyList, setPartyList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataState, setDataState] = useState(false);
  const [chosenParty, setChosenParty] = useState([]);
  const [partyCount, selectPartyCount] = useState(0);
  const [partyResp, setpartyResp] = useState("Max Number of 6 parties: ");
  const [electionStatus, setElectionStatus] = useState("Election Has Commenced!");
  const [submitedParty, setSubmittedParty] = useState([]);
  const [resp, setResp] = useState("");
  const [partyState, setPartyState] = useState(false);
  const userData = localStorage.getItem("subadmin");

  useEffect(() => {
    //fetch party data
    setLoading(true);
    const fetchParty = async () => {
      try {
        const response = await axios.get(api);
        // console.log(response.data)
        if (response.status === 200) {
          setPartyList(response.data);
        }
        else {
          setPartyList([]);
        }
      } catch (err) {
        setPartyList([]);
      } finally {
        setLoading(false);
      }
    }

    fetchParty();
  }, [dataState]);

  useEffect(() => {
    setLoading(true);

    let data = {
      user: userData
    }

    const fetchParty = async () => {
      try {
        const response = await axios.post(getparty, JSON.stringify(data));
        // console.log(response.data)
        if (response.status === 200) {
          setSubmittedParty(response.data);
        }
        else {
          setSubmittedParty([]);
        }
      } catch (err) {
        setSubmittedParty([]);
      } finally {
        setLoading(false);
      }
    }
    fetchParty();
  }, [partyState]);

  const chooseParty = (e) => {
    let id = e.target.id;
    let val = e.target.value;
    let partyCheckbox = document.querySelector("#"+id);

    if (partyCount > 5 && partyCheckbox.checked) {
      setpartyResp("Maximum party selected: ");
      partyCheckbox.checked = false;
    }
    else {
      setpartyResp("Max Number of 6 parties: ");
      if (partyCheckbox.checked) {
        selectPartyCount(partyCount + 1);
        chosenParty.push(val);
      }
      else {
        let index = chosenParty.indexOf(val);
        selectPartyCount(partyCount - 1);
        chosenParty.splice(index, 1);
      }
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

  const submitParty = () => {
    showLoader();
    let partyBox = document.querySelectorAll(".partyBox");

    const hideResp = () => {
      setTimeout(() => {
          setResp("");
        }, 3000);
    }

    let allData = {
      user: userData,
      party: chosenParty
    };

    if (chosenParty.length == 0 || chosenParty.length > 6) {
      setResp("No or Invalid Party Selection");
      hideLoader();
      hideResp();
    }
    else {
      const setParty = async () => {
        try {
          const response = await axios.post(setparty, JSON.stringify(allData));
          // console.log(response.data)
          if (response.status === 200) {
            if (response.data.code === "sw12") {
              setResp("Error processing");
            }
            else if (response.data.code === "sw001") {
              setResp(response.data.msg);
            }
            else if (response.data.code === "sw321") {
              setResp("Party Data Submitted");
              if (partyState === false) {
                setPartyState(true);
              }
              else {
                setPartyState(false);
              }
            }
          }
          else {
            setResp("Error Processing");
          }
        } catch (err) {
        } finally {
          hideLoader();
          hideResp();
          partyBox.forEach((element) => {
            element.checked = false;
          });
          setChosenParty([]);
          selectPartyCount(0);
          setpartyResp("Max Number of 6 parties: ");
        }
      }
      setParty();
    }
  }

  return (
    <div>
      <h2 className='mt-3 text-xl mb-3'>Manage Parties</h2>

      <section id='partyDiv' className='bg-gray-100 p-5 mt-3'>
        {loading == true ?
          <section id='page_loader' className='absolute top-0 right-0'>
              <span className='loader mr-5'>

              </span>
          </section>  
        :
          <></>
        }
        <div>
          <section className='partyList bg-white p-3 rounded-sm leading-10 relative'>
            <p className='shadow-sm px-2 py-1 bg-green-950 text-white sticky top-0'>
              <span id='partyResp'>{partyResp}</span> <span className='shadow-sm px-2 py-1 rounded-sm bg-white text-black'>{partyCount}</span>
            </p>
            {partyList.map((data, dataIndex) => {
              return (
                data.userState === "active" ?
                  <p key={dataIndex}><input onChange={chooseParty} type="checkbox" id={"party_"+dataIndex} value={data.partyName} className='partyBox w-4 h-4 cursor-pointer'/> <span className='ml-2'>{data.partyName}</span></p>
                :
                  <></>
              );
            })}
          </section>

          <section className='mt-4 bg-white p-3'>
            <p className='mb-3'>Selected Parties</p>

            <div className='leading-8'>
              <p>{chosenParty[0]}</p>
              <p>{chosenParty[1]}</p>
              <p>{chosenParty[2]}</p>
              <p>{chosenParty[3]}</p>
              <p>{chosenParty[4]}</p>
              <p>{chosenParty[5]}</p>
            </div>
          </section>

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

          <div className='mt-2 text-right'>
            <button onClick={submitParty} className='border-0 outline-0 bg-green-700 text-white rounded-sm cursor-pointer px-3 py-2'>
              Submit
            </button>
          </div>
        </div>

        <div>
          <p className='bg-white w-fit p-2'>Submitted Parties</p>

          <div className='submittedParty mt-6'>
            {submitedParty.length == 0 ? 
              <section className='flex flex-col relative align-center justify-center bg-white rounded-sm shadow-sm p-3'>
                <img src="/logo1.png" alt="Party logo" className='mb-6 rounded-sm'/>
                <p className='absolute bottom-0 mb-2'></p>
              </section>
            :
              submitedParty.map((data, dataIndex) => {
                return (
                  <section key={dataIndex} className='flex flex-col relative align-center justify-center bg-white rounded-sm shadow-sm p-3'>
                    <img src={imgLink + data.logo} alt="Party logo" className='mb-6 rounded-sm'/>
                    <p className='absolute bottom-0 mb-2'>{data.acronym}</p>                    
                  </section>
                );
              })
            }
          </div>
        </div>
      </section>
    </div>
  )
}

export default Party
