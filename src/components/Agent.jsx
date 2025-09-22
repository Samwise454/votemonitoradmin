import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCircleXmark, faLocationCrosshairs, faLock, faPen, faUnlock } from '@fortawesome/free-solid-svg-icons';
import '../css/tables.css';
import '../css/agent.css';
import axios from 'axios';

const Agent = (props) => {
    const [openForm, setOpenForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resp, setResp] = useState("");
    const trigger = props.trigger;
    const updatepoll = props.api + '/updatedata.php';
    const api = props.api + '/getvotedata.php';
    const admin = props.api + '/handleadmin.php';
    const getstateco = props.api + '/getadminlist.php';
    const imgLink = props.img + '/agentImg/';
    const [allData, setAllData] = useState([]);
    const [searchTrigger, setSearchTrigger] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [sorted, setSorted] = useState("asc");
    const [sortedData, setSortedData] = useState([]);
    const [dataState, setDataState] = useState(false);
    const [addAgent, setAddAgent] = useState(false);
    const [whichAgent, setWhichAgent] = useState("");

    const [allState, setAllState] = useState([]);
    const [allLga, setAllLga] = useState([]);
    const [allWard, setAllWard] = useState([]);
    const [allPoll, setAllPoll] = useState([]);
    const [subadmin, setSubadmin] = useState(localStorage.getItem("subadmin"));

    const [whichState, setWhichState] = useState({
      state: ""
    });

    const [whichLga, setWhichLga] = useState({
      lga: ""
    });
    
    const [whichWard, setWhichWard] = useState({
      ward: ""
    });

    const [formData, setFormData] = useState({
      // img: "",
      fname: "",
      mname: "",
      lname: "",
      gender: "",
      tel: "",
      state: "",
      lga: "",
      ward: "",
      poll: "",
      agent: "",
      action: "addAgent",
      admin: subadmin
    });

    const [getData, setGetData] = useState({
        action: "getAgent",
        limit: 50
    });

    const [searchParam, setSearchParam] = useState({
        param: ""
    });

    //fetching of all data
    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            try {
                const response = await axios.post(api, JSON.stringify(getData));
                // console.log(response.data)
                if (response.status === 200) {
                    setAllData(response.data);  
                }
                else {
                    setAllData([]);
                }
            } catch (err) {
                setAllData([]);
            } finally {
                setLoading(false);
            }
        }   

        fetchData();
    }, [trigger, dataState, openForm, getData.limit]);

    //searching list of items
    useEffect(() => {
        let filteredData = [];
        allData.map((data) => {
        let filterData = data.name.toLowerCase();
        if (filterData.includes(searchParam.param)) {
            filteredData.push(data);
        }
        });

        setSearchResult(filteredData);
    }, [searchTrigger, dataState, searchParam.param]);

    const changeState = (e) => {
      let id = e.currentTarget.id;
      let idNum = {
      dataId: id.split("_")[1],
      table: "agent"
      };//this is the id of each party

      let data = JSON.stringify(idNum);

      const updateData = async () => {
        try {
            const response = await axios.post(updatepoll, data);
            if (response.status === 200) {
              if (response.data.code === "sw12") {
                  setDataState(dataState);
              }
              else if (response.data.code === "sw321") {
                  if (dataState === false) {
                      setDataState(true);
                  }
                  else if (dataState === true) {
                      setDataState(false);
                  }
              }
            }
        } catch (err) {
            setDataState(dataState);
        } 
      }

      updateData();
    }

    const handleSearch = (e) => {
        setSearchParam({...searchParam, param: e.target.value.toLowerCase()});
        if (searchTrigger === false) {
            setSearchTrigger(true);
        }
    }

    const sortData = (e) => {
        let idSplit = e.target.id.split("_");
        let sortMode = idSplit[0];//eg asc or desc
        let sortBy = idSplit[1];//eg state or lga

        if (sortBy === "name") {
            if (sortMode === "asc") {
                allData.sort((a, b) => a.name.localeCompare(b.name));//ascending order
            }
            else if (sortMode === "desc") {
                allData.sort((a, b) => b.name.localeCompare(a.name));//descending order
            }
        }
        
        setSortedData(allData);
        setSorted(sortMode);
    }

    const handleAgentAdd = () => {
      setAddAgent(true);
    }

    const closeAddAgent = () => {
      setAddAgent(false);
      setWhichAgent("");
    }

    const handleWhichAgent = (e) => {
      setWhichAgent(e.target.id);
      setFormData({...formData, agent: e.target.id});

      //fetching state data
      let table = "state";
      let column = "";
      let whichData = "";
      stateLgaWardPoll(table, column, whichData);
    }

    const handleFormInput = (e) => {
      let id = e.target.id;
      let val = e.target.value.split("_");
      let value = val[0];
      let wardCode = val[1];

      let table = "";
      let column = "";
      let whichData = "";

      switch(id) {
        case 'fName': 
          setFormData({...formData, fname: value});
          break;
        case 'mName':
          setFormData({...formData, mname: value});
          break;
        case 'lName':
          setFormData({...formData, lname: value});
          break;
        case 'gender':
          setFormData({...formData, gender: value});
          break;
        case 'tel':
          setFormData({...formData, tel: value});
          break;
        case 'state':
          //fetching lga data
          table = "lga";
          column = "wardCode";
          whichData = wardCode;
          stateLgaWardPoll(table, column, whichData);
          setFormData({...formData, state: value});
          break;
        case 'lga':
          //fetching ward data
          table = "ward";
          column = "lga";
          whichData = value;
          stateLgaWardPoll(table, column, whichData);
          setFormData({...formData, lga: value});
          break;
        case 'ward':
          //fetching poll data
          table = "poll";
          column = "ward";
          whichData = value;
          stateLgaWardPoll(table, column, whichData);
          setFormData({...formData, ward: value});
          break;
        case 'punit':
          setFormData({...formData, poll: value});
          break;
      }
    }

    const editItem = (e) => {

    }

    const showLoader = () => {
        let loader = document.querySelector(".loaderDiv");
        loader.style.display = "flex";
    }

    const hideLoader = () => {
        let loader = document.querySelector(".loaderDiv");
        loader.style.display = "none";
    }

    const stateLgaWardPoll = (table, column, whichData) => {
      let d = {
        key: table,
        column: column,
        item: whichData
      }
      
      let data = JSON.stringify(d);
      const fetchAll = async () => {
          try {
            const response = await axios.post(getstateco, data);
            if (response.status === 200) {
              if (table === "state") {
                setAllState(response.data);
              }
              else if (table === "lga") {
                setAllLga(response.data);
              }
              else if (table === "ward") {
                setAllWard(response.data);
              }
              else if (table === "poll") {
                setAllPoll(response.data);
              }
            }
          } catch (err) {

          } 
      }
      fetchAll();
    }

    const submitForm = (e) => {
      e.preventDefault();
      showLoader();

      let fname = formData.fname;
      let mname = formData.mname;
      let lname = formData.lname;
      let gender = formData.gender;
      let tel = formData.tel;
      let state = formData.state;
      let lga = formData.lga;
      let ward = formData.ward;
      let poll = formData.poll;
      let agent = formData.agent;
    
      let allow = "yes";

      if (agent === "ca") {
        //no polling unit
        if (fname == "" || mname == "" || lname == "" || gender == "" || tel == "" || state == "" || lga == ""
            || ward == "") {
            setResp("Fill all form input!");
            allow = "no";
        }
      }
      else if (agent === "pa") {
        if (fname == "" || mname == "" || lname == "" || gender == "" || tel == "" || state == "" || lga == ""
            || ward == "" || poll == "") {
            setResp("Fill all form input!");
            allow = "no";
        }
      }
      if (allow === "yes") {
        let data = JSON.stringify(formData);
        console.log(data)
        hideLoader();
        const setData = async () => {
          try {
            const response = await axios.post(admin, data);
            if (response.status === 200) {
              setResp(response.data.msg);
            }
            else {
              setResp("Error processing!");
            }
          } catch (err) {
            setResp("Error processing!");
          } finally {
            hideLoader();
          }
        }

        // setData();
      }
    }

  return (
    <div>
      <h2 className='mt-3 text-xl mb-3'>Manage Agents</h2>

      <div>
        {addAgent === false ?
          <section className='text-center relative'>
            <button onClick={handleAgentAdd} className='border-0 outline-0 bg-green-700 text-white cursor-pointer px-5 py-2 rounded-sm mr-20'>
                Add Agents
            </button>

            <input onChange={handleSearch} type="text" placeholder='Search...' className='searchBar outline-0 border-0 px-3 py-2 shadow-md rounded-sm'/>
          </section>
        :
          <></>
        }

        {addAgent === true ?
          <div className='text-center mt-5 relative'>
            {whichAgent === "" ?
              <FontAwesomeIcon icon={faCircleXmark} onClick={closeAddAgent} className='absolute text-2xl text-red-500 right-0 cursor-pointer'/>
            :
              <></>
            }

            <button onClick={handleWhichAgent} id='ca' className='border-0 outline-0 bg-blue-800 text-white cursor-pointer px-5 py-2 rounded-sm mr-20'>
              Collation Agents
            </button>

            <button onClick={handleWhichAgent} id='pa' className='border-0 outline-0 bg-blue-800 text-white cursor-pointer px-5 py-2 rounded-sm mr-20'>
              Polling Agents
            </button>
          </div>
        :
          <></>
        }

        {whichAgent === "ca" ?
          <>
            <div>
              <h2 className='bg-gray-100 w-fit p-2 mt-2'>Add Collation Agent</h2>

              <form onSubmit={submitForm} className='agentForm bg-gray-100 mt-4 mb-4 shadow-sm p-4 text-sm relative'>
                <FontAwesomeIcon icon={faCircleXmark} onClick={closeAddAgent} className='absolute top-0 right-0 mt-2 mr-2 text-2xl text-red-500 cursor-pointer'/>
                <section className='flex flex-col'>
                  {/* <label htmlFor="agentImg">Upload Image</label>
                  <input onChange={handleFormInput} className='bg-white shadow-md rounded-md mb-8 px-3 py-2 cursor-pointer w-fit' type="file" id="agentImg"/> */}

                  <label htmlFor="fName">First Name: </label>
                  <input onChange={handleFormInput} className='bg-white outline-0 border-0 mb-8 shadow-md rounded-md px-3 py-2 w-fit' type="text" id='fName' placeholder='First Name' />

                  <label htmlFor="tel">Phone Number: </label>
                  <input onChange={handleFormInput} className='bg-white outline-0 border-0 mb-8 shadow-md rounded-md px-3 py-2 w-fit' type="tel" id='tel' placeholder='Phone Number' />

                  <select onChange={handleFormInput} name="lga" id="lga" className='w-fit px-3 outline-0 border-0 py-2 rounded-md shadow-md bg-white cursor-pointer'>
                    <option value="" hidden>Select LGA</option>
                    {allLga.map((data, dataIndex) => {
                      return (
                        <option key={dataIndex} value={data.lgName+"_"+dataIndex}>{data.lgName}</option>
                      );
                    })}
                  </select>

                </section>

                <section className='flex flex-col'>
                  <label htmlFor="mName">Middle Name: </label>
                  <input onChange={handleFormInput} className='bg-white outline-0 border-0 mb-8 shadow-md rounded-md px-3 py-2 w-fit' type="text" id='mName' placeholder='Middle Name' />

                  <p>Choose Gender: </p>
                  <select onChange={handleFormInput} name="gender" id="gender" className='w-fit px-3 mb-8 outline-0 border-0 py-2 rounded-md shadow-md bg-white cursor-pointer'>
                    <option value="" hidden>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>

                  <select onChange={handleFormInput} name="ward" id="ward" className='w-fit px-3 outline-0 border-0 py-2 rounded-md shadow-md bg-white cursor-pointer'>
                    <option value="" hidden>Select Ward</option>
                    {allWard.map((data, dataIndex) => {
                      return (
                        <option key={dataIndex} value={data.ward+"_"+dataIndex}>{data.ward}</option>
                      );
                    })}
                  </select>

                  <div className="text-center">
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

                    <button type='submit' className='mt-4 bg-green-800 text-white w-fit px-4 py-2 rounded-sm cursor-pointer'>
                      Submit
                    </button>  
                  </div> 
                </section>

                <section className='flex flex-col'>
                  <label htmlFor="lName">Last Name: </label>
                  <input onChange={handleFormInput} className='bg-white outline-0 border-0 mb-8 shadow-md rounded-md px-3 py-2 w-fit' type="text" id='lName' placeholder='Last Name' />

                  <select onChange={handleFormInput} name="state" id="state" className='w-fit px-3 mb-8 mt-5 outline-0 border-0 py-2 rounded-md shadow-md bg-white cursor-pointer'>
                    <option value="" hidden>Select State</option>
                    {allState.map((data, dataIndex) => {
                      return (
                        <option key={dataIndex} value={data.stateName +"_"+data.wardCode}>{data.stateName}</option>
                      );
                    })}
                  </select>
                </section>
              </form>
            </div>
          </>
        :
          whichAgent === "pa" ?
            <>
              <div>
                <h2 className='bg-gray-100 w-fit p-2 mt-2'>Add Polling Agent</h2>

                <form onSubmit={submitForm} className='agentForm bg-gray-100 mt-4 mb-4 shadow-sm p-4 text-sm relative'>
                  <FontAwesomeIcon icon={faCircleXmark} onClick={closeAddAgent} className='absolute top-0 right-0 mt-2 mr-2 text-2xl text-red-500 cursor-pointer'/>
                  <section className='flex flex-col'>
                    {/* <label htmlFor="agentImg">Upload Image</label>
                    <input onChange={handleFormInput} className='bg-white shadow-md rounded-md mb-8 px-3 py-2 cursor-pointer w-fit' type="file" id="agentImg"/> */}

                    <label htmlFor="fName">First Name: </label>
                    <input onChange={handleFormInput} className='bg-white outline-0 border-0 mb-8 shadow-md rounded-md px-3 py-2 w-fit' type="text" id='fName' placeholder='First Name' />

                    <label htmlFor="tel">Phone Number: </label>
                    <input onChange={handleFormInput} className='bg-white outline-0 border-0 mb-8 shadow-md rounded-md px-3 py-2 w-fit' type="tel" id='tel' placeholder='Phone Number' />

                    <select onChange={handleFormInput} name="lga" id="lga" className='w-fit px-3 outline-0 border-0 py-2 rounded-md shadow-md bg-white cursor-pointer'>
                      <option value="" hidden>Select LGA</option>
                      {allLga.map((data, dataIndex) => {
                        return (
                          <option key={dataIndex} value={data.lgName+"_"+dataIndex}>{data.lgName}</option>
                        );
                      })}
                    </select>
                  </section>

                  <section className='flex flex-col'>
                    <label htmlFor="mName">Middle Name: </label>
                    <input onChange={handleFormInput} className='bg-white outline-0 border-0 mb-8 shadow-md rounded-md px-3 py-2 w-fit' type="text" id='mName' placeholder='Middle Name' />

                    <p>Choose Gender: </p>
                    <select onChange={handleFormInput} name="gender" id="gender" className='w-fit px-3 mb-8 outline-0 border-0 py-2 rounded-md shadow-md bg-white cursor-pointer'>
                      <option value="" hidden>Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>

                    <select onChange={handleFormInput} name="ward" id="ward" className='w-fit px-3 outline-0 border-0 py-2 rounded-md shadow-md bg-white cursor-pointer'>
                      <option value="" hidden>Select Ward</option>
                      {allWard.map((data, dataIndex) => {
                        return (
                          <option key={dataIndex} value={data.ward+"_"+dataIndex}>{data.ward}</option>
                        );
                      })}
                    </select>

                    <div className="text-center">
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

                      <button type='submit' className='mt-10 bg-green-800 text-white w-fit px-4 py-2 rounded-sm cursor-pointer'>
                        Submit
                      </button>  
                    </div> 
                  </section>

                  <section className='flex flex-col'>
                    <label htmlFor="lName">Last Name: </label>
                    <input onChange={handleFormInput} className='bg-white outline-0 border-0 mb-8 shadow-md rounded-md px-3 py-2 w-fit' type="text" id='lName' placeholder='Last Name' />

                    <select onChange={handleFormInput} name="state" id="state" className='w-fit px-3 mt-5 mb-8 outline-0 border-0 py-2 rounded-md shadow-md bg-white cursor-pointer'>
                      <option value="" hidden>Select State</option>
                      {allState.map((data, dataIndex) => {
                        return (
                          <option key={dataIndex} value={data.stateName +"_"+data.wardCode}>{data.stateName}</option>
                        );
                      })}
                    </select>

                    <select onChange={handleFormInput} name="punit" id="punit" className='w-fit px-3 outline-0 border-0 py-2 rounded-md shadow-md bg-white cursor-pointer'>
                      <option value="" hidden>Select Polling Unit</option>
                      {allPoll.map((data, dataIndex) => {
                        return (
                          <option key={dataIndex} value={data.pollUnitName}>{data.pollUnitName}</option>
                        );
                      })}
                    </select>
                  </section>
                </form>
              </div>
            </>
          :
            <></>
        }

        <section className='partyTable border-t-2 border-t-gray-500 rounded-md mt-3 p-2 h-150 overflow-y-scroll'>
            <table className='w-full text-left'>
              <thead className='text-sm'>
                <tr>
                  <th>S/N0</th>
                  <th>
                    Agent Image
                  </th>
                  <th>
                    Name <br />
                    <span className='text-sm font-normal ml-0 p-1 rounded-sm bg-blue-100 shadow-sm cursor-pointer'>a-z</span> 
                    <span className='text-sm font-normal ml-1 p-1 rounded-sm bg-blue-100 shadow-sm cursor-pointer'>z-a</span>
                  </th>
                  <th>Tel</th>
                  <th>Sub Admin</th>
                  <th>Job</th>
                  <th>Location</th>
                  {/* <th>Lat./Long.</th> */}
                  <th>Time of Last Upload</th>
                  <th>Date Added</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody className='partyTableBody text-sm'>
                {searchTrigger === false ?
                  allData.map((data, dataIndex) => {
                    return (
                      <tr key={dataIndex}>
                        <td className='partyTableTd'>{dataIndex + 1}</td>
                        <td className='partyTableTd'><img src={imgLink + data.img} alt="Img" className='w-10 h-auto rounded-md' /></td>
                        <td className='partyTableTd'>{data.name}</td>
                        <td className='partyTableTd'>{data.tel}</td>
                        <td className='partyTableTd'>{data.subadmin}</td>
                        <td className='partyTableTd'>{data.job}</td>
                        <td className='partyTableTd'>{data.location}</td>
                        {/* <td className='partyTableTd'>26.8558853, 80.9445347 <FontAwesomeIcon icon={faLocationCrosshairs} className='border-1 rounded-sm p-1 ml-1 text-blue-600 cursor-pointer'/></td> */}
                        <td className='partyTableTd text-blue-600 cursor-pointer'>{data.lastLogin}</td>
                        <td className='partyTableTd'>{data.dateCreated}</td>
                        <td className='relative'>
                          {data.userState == "active" ?
                              <FontAwesomeIcon onClick={changeState} icon={faUnlock} className='cursor-pointer text-green-700 bg-white border-1 p-1 rounded-sm'/>
                          :
                              <FontAwesomeIcon onClick={changeState} icon={faLock} className='cursor-pointer text-yellow-400 bg-black border-1 p-1 rounded-sm'/>
                          }
                          <FontAwesomeIcon onClick={editItem} icon={faPen} className=' cursor-pointer text-red-600 border-1 border-red-200 p-1 rounded-sm'/>
                        </td>
                      </tr>
                    );
                  })
                :
                  searchResult.map((data, dataIndex) => {
                    return (
                      <tr key={dataIndex}>
                        <td className='partyTableTd'>{dataIndex + 1}</td>
                        <td className='partyTableTd'><img src={imgLink + data.img} alt="Img" className='w-10 h-auto rounded-md' /></td>
                        <td className='partyTableTd'>{data.name}</td>
                        <td className='partyTableTd'>{data.tel}</td>
                        <td className='partyTableTd'>{data.subadmin}</td>
                        <td className='partyTableTd'>{data.job}</td>
                        <td className='partyTableTd'>{data.location}</td>
                        {/* <td className='partyTableTd'>26.8558853, 80.9445347 <FontAwesomeIcon icon={faLocationCrosshairs} className='border-1 rounded-sm p-1 ml-1 text-blue-600 cursor-pointer'/></td> */}
                        <td className='partyTableTd text-blue-600 cursor-pointer'>{data.lastLogin}</td>
                        <td className='partyTableTd'>{data.dateCreated}</td>
                        <td className='relative'>
                          {data.userState == "active" ?
                              <FontAwesomeIcon onClick={changeState} icon={faUnlock} className='cursor-pointer text-green-700 bg-white border-1 p-1 rounded-sm'/>
                          :
                              <FontAwesomeIcon onClick={changeState} icon={faLock} className='cursor-pointer text-yellow-400 bg-black border-1 p-1 rounded-sm'/>
                          }
                          <FontAwesomeIcon onClick={editItem} icon={faPen} className=' cursor-pointer text-red-600 border-1 border-red-200 p-1 rounded-sm'/>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
        </section>
      </div>
    </div>
  )
}

export default Agent
