import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faLocationCrosshairs, faLock, faPen, faUnlock } from '@fortawesome/free-solid-svg-icons';
import '../css/tables.css';
import axios from 'axios';

const Agent = (props) => {
    const [openForm, setOpenForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const trigger = props.trigger;
    const updatepoll = props.api + '/updatedata.php';
    const api = props.api + '/getvotedata.php';
    const imgLink = props.img + '/agentImg/';
    const [allData, setAllData] = useState([]);
    const [searchTrigger, setSearchTrigger] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [sorted, setSorted] = useState("asc");
    const [sortedData, setSortedData] = useState([]);
    const [dataState, setDataState] = useState(false);
    const [what, setWhat] = useState("add");

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
                console.log(response.data)
                if (response.status === 200) {
                    // setAllData(response.data);
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

  return (
    <div>
      <h2 className='mt-3 text-xl mb-3'>Manage Agents</h2>

      <div>
        <section className='text-center'>
          {/* <button className='border-0 outline-0 bg-green-700 text-white cursor-pointer px-5 py-2 rounded-sm mr-20'>
                Add Agents
            </button> */}

          <input onChange={handleSearch} type="text" placeholder='Search...' className='searchBar outline-0 border-0 px-3 py-2 shadow-md rounded-sm'/>
        </section>

        <section className='partyTable border-t-2 border-t-gray-500 rounded-md mt-3 p-2 h-150 overflow-y-scroll'>
            {loading == true ?
                <section id='page_loader' className='absolute top-0 right-0'>
                  <span className='loader mr-5'>

                  </span>
                </section>  
            :
                <></>
            }
            <table className='w-full text-left'>
              <thead className='text-sm'>
                <tr>
                  <th>S/N0</th>
                  <th>
                    Agent Image
                  </th>
                  <th>
                    Name <br />
                    <span onClick={sortData} id='asc_name' className='text-sm font-normal ml-0 p-1 rounded-sm bg-blue-100 shadow-sm cursor-pointer'>a-z</span> 
                    <span onClick={sortData} id='desc_name' className='text-sm font-normal ml-1 p-1 rounded-sm bg-blue-100 shadow-sm cursor-pointer'>z-a</span>
                  </th>
                  <th>Tel</th>
                  <th>Sub Admin</th>
                  <th>Job</th>
                  <th>Location</th>
                  <th>Lat./Long.</th>
                  <th>Last Login</th>
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
                        <td className='partyTableTd'>{data.latLong}<FontAwesomeIcon icon={faLocationCrosshairs} className='border-1 rounded-sm p-1 ml-1 text-blue-600 cursor-pointer'/></td>
                        <td className='partyTableTd text-blue-600 cursor-pointer'>{data.lastLogin}</td>
                        <td className='partyTableTd'>{data.dateCreated}</td>
                        <td className='relative'>
                          {data.userState == "active" ?
                              <FontAwesomeIcon onClick={changeState} icon={faUnlock} className='cursor-pointer text-green-700 bg-white border-1 p-1 rounded-sm'/>
                          :
                              <FontAwesomeIcon onClick={changeState} icon={faLock} className='cursor-pointer text-yellow-400 bg-black border-1 p-1 rounded-sm'/>
                          }
                          {/* <FontAwesomeIcon icon={faPen} className=' cursor-pointer text-red-600 border-1 border-red-200 p-1 rounded-sm'/> */}
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
                        <td className='partyTableTd'>{data.latLong}<FontAwesomeIcon icon={faLocationCrosshairs} className='border-1 rounded-sm p-1 ml-1 text-blue-600 cursor-pointer'/></td>
                        <td className='partyTableTd text-blue-600 cursor-pointer'>{data.lastLogin}</td>
                        <td className='partyTableTd'>{data.dateCreated}</td>
                        <td className='relative'>
                          {data.userState == "active" ?
                              <FontAwesomeIcon onClick={changeState} icon={faUnlock} className='cursor-pointer text-green-700 bg-white border-1 p-1 rounded-sm'/>
                          :
                              <FontAwesomeIcon onClick={changeState} icon={faLock} className='cursor-pointer text-yellow-400 bg-black border-1 p-1 rounded-sm'/>
                          }
                          {/* <FontAwesomeIcon icon={faPen} className=' cursor-pointer text-red-600 border-1 border-red-200 p-1 rounded-sm'/> */}
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
