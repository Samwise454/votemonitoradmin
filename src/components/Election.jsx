import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faArrowCircleLeft, faLock, faPen, faPlus, faUnlock } from '@fortawesome/free-solid-svg-icons';
import '../css/tables.css';

const Election = () => {
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
      <h2 className='mt-3 text-xl mb-3'>Manage Elections</h2>
      
      {openForm == false ?
        <div>
            <section className='text-center'>
            <button onClick={handleAddParty} className='border-0 outline-0 bg-green-700 text-white cursor-pointer px-5 py-2 rounded-sm mr-20'>
                    Add Election
                </button>

            <input type="text" placeholder='Search...' className='outline-0 border-0 px-3 py-2 shadow-md rounded-sm'/>
            </section>

            <section className='partyTable border-t-2 border-t-gray-500 rounded-md mt-3 p-2 h-150 overflow-y-scroll'>
                <table className='w-full text-left'>
                <thead className='text-sm'>
                    <tr>
                    <th>S/N0</th>
                    <th>
                        Election Title
                        <span className='text-sm font-normal ml-2 p-1 rounded-sm bg-blue-100 shadow-sm cursor-pointer'>a-z</span> 
                        <span className='text-sm font-normal ml-2 p-1 rounded-sm bg-blue-100 shadow-sm cursor-pointer'>z-a</span>
                    </th>
                    <th>
                        Political Party
                        <span className='text-sm font-normal ml-2 p-1 rounded-sm bg-blue-100 shadow-sm cursor-pointer'>a-z</span> 
                        <span className='text-sm font-normal ml-2 p-1 rounded-sm bg-blue-100 shadow-sm cursor-pointer'>z-a</span>
                    </th>
                    <th>Candidate Name</th>
                    <th>Constituency</th>
                    <th>Date</th>
                    <th>Action</th>
                    </tr>
                </thead>

                <tbody className='partyTableBody text-sm'>
                    <tr>
                    <td className='partyTableTd'>1</td>
                    <td className='partyTableTd'>Election 1</td>
                    <td className='partyTableTd'>Peoples Democratic Party</td>
                    <td className='partyTableTd'>Fred Agbaje</td>
                    <td className='partyTableTd'>Lagos State</td>
                    <td className='partyTableTd'>6th Aug, 2025</td>
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
                    <td className='partyTableTd'>Onitsha Fed Const.</td>
                    <td className='partyTableTd'>Peoples Democratic Party</td>
                    <td className='partyTableTd'>Lyna Idu</td>
                    <td className='partyTableTd'>Onitsha North and South HOR</td>
                    <td className='partyTableTd'>8th Aug, 2025</td>
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
        <form id='extraForm' className='text-sm bg-gray-100 rounded-sm w-full py-17 px-50 text-left flex flex-col relative'>
            <FontAwesomeIcon onClick={closeForm} icon={faArrowCircleLeft} className='absolute top-0 right-0 mt-10 mr-10 text-3xl text-red-600 cursor-pointer'/>
            <label htmlFor="electionTitle" className='mb-1'>Party Name:</label>
            <input type="text" id='electionTitle' placeholder='Title of Election' className=' mb-6 border-0 outline-0 rounded-md  shadow-sm px-4 py-3 bg-white' />

            <label htmlFor="candidateName" className='mb-1'>Name of Candidate:</label> 
            <input type="text" id='candidateName' placeholder='Name of Candidate' className=' mb-6 border-0 outline-0 rounded-md shadow-sm px-4 py-3 bg-white' />

            <label htmlFor="polParty" className='mb-1'>Political Party:</label> 
            <select name="polParty" id="polParty" className='w-full cursor-pointer mb-6 border-0 outline-0 rounded-md shadow-sm px-4 py-3 bg-white'>
                <option value="" hidden>Select Political Party</option>
                <option value="Acoord">Accord</option>
            </select>

            <label htmlFor="polParty" className='mb-1'>Constituency:</label> 
            <select name="polParty" id="polParty" className='w-full cursor-pointer mb-6 border-0 outline-0 rounded-md shadow-sm px-4 py-3 bg-white'>
                <option value="" hidden>Select Election Constituency</option>
                <option value="Aba North/Aba South HOR">Aba North/Aba South HOR</option>
            </select>

            <label htmlFor="electDate" className='mb-1'>Date:</label> 
            <input type="date" id='electDate' placeholder='Name of Candidate' className=' mb-6 border-0 outline-0 rounded-md shadow-sm px-4 py-3 bg-white' />

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

export default Election
