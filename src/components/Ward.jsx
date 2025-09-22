import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faArrowCircleLeft, faLock, faPen, faUnlock } from '@fortawesome/free-solid-svg-icons';
import '../css/tables.css';

const Ward = () => {
    const [openForm, setOpenForm] = useState(false);
    const [activeInactive, setActiveInactive] = useState("active");

      const handleAddParty = () => {
        if (openForm === false) {
          setOpenForm(true);
        }
        else {
          setOpenForm(false);
        }
      }
    
      const closeForm = () => {
        setOpenForm(false);
      }

  return (
    <div>
      <h2 className='mt-3 text-xl mb-3'>Manage Wards</h2>

      {openForm == false ?
        <div>
            <section className='text-center'>
            <button onClick={handleAddParty} className='border-0 outline-0 bg-green-700 text-white cursor-pointer px-5 py-2 rounded-sm mr-20'>
                    Add Ward
                </button>

            <input type="text" placeholder='Search...' className='outline-0 border-0 px-3 py-2 shadow-md rounded-sm'/>
            </section>

            <section className='partyTable border-t-2 border-t-gray-500 rounded-md mt-3 p-2 h-150 overflow-y-scroll'>
                <table className='w-full text-left'>
                    <thead className='text-sm'>
                        <tr>
                            <th>S/N0</th>
                            <th>
                                State
                                <span className='text-sm font-normal ml-2 p-1 rounded-sm bg-blue-100 shadow-sm cursor-pointer'>a-z</span> 
                                <span className='text-sm font-normal ml-2 p-1 rounded-sm bg-blue-100 shadow-sm cursor-pointer'>z-a</span>
                            </th>
                            <th>
                                LGA
                                <span className='text-sm font-normal ml-2 p-1 rounded-sm bg-blue-100 shadow-sm cursor-pointer'>a-z</span> 
                                <span className='text-sm font-normal ml-2 p-1 rounded-sm bg-blue-100 shadow-sm cursor-pointer'>z-a</span>
                            </th>
                            <th>Wards Name</th>
                            <th>Ward Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody className='partyTableBody text-sm'>
                        <tr>
                            <td className='partyTableTd'>1</td>
                            <td className='partyTableTd'>Abia</td>
                            <td className='partyTableTd'>Aba North</td>
                            <td className='partyTableTd'>Ariaria Market</td>
                            <td className='partyTableTd'>0</td>
                            <td className='relative'>
                                {activeInactive == "active" ?
                                    <FontAwesomeIcon icon={faUnlock} className='cursor-pointer text-green-700 bg-white border-1 p-1 rounded-sm'/>
                                :
                                    <FontAwesomeIcon icon={faLock} className='cursor-pointer text-yellow-400 bg-black border-1 p-1 rounded-sm'/>
                                }
                                <FontAwesomeIcon icon={faPen} className='ml-2 cursor-pointer text-red-600 border-1 border-red-200 p-1 rounded-sm'/>
                            </td>
                        </tr>

                        <tr>
                            <td className='partyTableTd'>2</td>
                            <td className='partyTableTd'>Abia</td>
                            <td className='partyTableTd'>Aba North</td>
                            <td className='partyTableTd'>Ariaria Market</td>
                            <td className='partyTableTd'>20</td>
                            <td className='relative'>
                                {activeInactive == "active" ?
                                    <FontAwesomeIcon icon={faUnlock} className='cursor-pointer text-green-700 bg-white border-1 p-1 rounded-sm'/>
                                :
                                    <FontAwesomeIcon icon={faLock} className='cursor-pointer text-yellow-400 bg-black border-1 p-1 rounded-sm'/>
                                }
                                <FontAwesomeIcon icon={faPen} className='ml-2 cursor-pointer text-red-600 border-1 border-red-200 p-1 rounded-sm'/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
      :
        <form id='extraForm' className='text-sm bg-gray-100 rounded-sm w-full py-3 px-50 text-left flex flex-col relative'>
            <FontAwesomeIcon onClick={closeForm} icon={faArrowCircleLeft} className='absolute top-0 right-0 mt-10 mr-10 text-3xl text-red-600 cursor-pointer'/>
            <label htmlFor="ourState" className='mb-1'>State:</label>
            <select name="ourState" id="ourState" className='mb-6 border-0 outline-0 rounded-md  shadow-sm px-4 py-3 bg-white'>
                <option value="" hidden>Select State</option>
                <option value="Abia">Abia</option>
            </select>

            <label htmlFor="ourLga" className='mb-1'>LGA:</label> 
            <select name="ourLga" id="ourLga" className='mb-6 border-0 outline-0 rounded-md  shadow-sm px-4 py-3 bg-white'>
                <option value="" hidden>Select LGA</option>
                <option value="Abia">Aba North</option>
            </select>

            <label htmlFor="ourWard" className='mb-1'>Ward:</label> 
            <select name="ourWard" id="ourWard" className='mb-6 border-0 outline-0 rounded-md  shadow-sm px-4 py-3 bg-white'>
                <option value="" hidden>Select Ward</option>
                <option value="Abia">Ariaria Market</option>
            </select>

            <label htmlFor="pollUnit" className='mb-1'>Name of Poll Unit:</label> 
            <input type="file" id='pollUnit' placeholder='Name of Poll Unit' className=' mb-6 border-0 outline-0 rounded-md shadow-sm px-4 py-3 bg-white' />

            <label htmlFor="pollUnitNum" className='mb-1'>Poll Unit Number:</label> 
            <input type="file" id='pollUnitNum' placeholder='Poll Unit Number' className=' mb-6 border-0 outline-0 rounded-md shadow-sm px-4 py-3 bg-white' />

            <label htmlFor="regPollUnit" className='mb-1'>Registered Voters:</label> 
            <input type="file" id='regPollUnit' placeholder='Registered Voters' className=' mb-6 border-0 outline-0 rounded-md shadow-sm px-4 py-3 bg-white' />

            <div className='relative top-0 right-0'>
                <span id="responseBar" className='ml-40 text-sm'>
                    Error processing!
                </span>

                <section className='loaderDiv absolute top-0 left-0'>
                    <span className='loader mr-5'>

                    </span>
                </section>
            </div>                

            <div className='text-right mt-5'>
                <button className='bg-green-700 rounded-sm px-5 py-2 cursor-pointer text-white'>Submit</button>
            </div>
        </form> 
      }
    </div>
  )
}

export default Ward
