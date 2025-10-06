import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlock } from '@fortawesome/free-solid-svg-icons';
import '../css/password.css';

const Password = () => {
    const [agentPass, setAgentPass] = useState("");

    useEffect(() => {

    }, []);

    const getAgentPass = async () => {

    }

  return (
    <div>
      <h2 className='mt-3 text-xl mb-3'>Manage Passwords</h2>

        <div className='passContainer relative mt-10 p-8 rounded-sm shadow-sm h-150'>
            <section>
                <h2 className='text-green-700'>Update User Password</h2>

                <form className='flex flex-col'>
                    <input className='px-3 py-2 text-sm mt-6 rounded-sm outline-0 border-0 shadow-md' type="password" id='oldPass' placeholder='Enter Current Password' />
                    <input className='px-3 py-2 text-sm mt-6 rounded-sm outline-0 border-0 shadow-md' type="password" id='newPass1' placeholder='Enter New Password' />
                    <input className='px-3 py-2 text-sm mt-6 rounded-sm outline-0 border-0 shadow-md' type="password" id='newPass2' placeholder='Confirm New Password' />

                    <div className="text-right">
                        <button className="bg-green-800 text-white px-3 py-2 mt-8 cursor-pointer rounded-sm w-fit">Change Password</button>
                    </div>
                </form>
            </section>

            <section>
                <section>
                    <h2 className='text-green-700'>Update Agent Password</h2>

                    <div className='mt-8'>
                        Current Agent Password: <span className='ml-7 bg-green-950 text-white rounded-sm shadow-sm p-3'>{agentPass}</span>
                    </div>

                    <form className='flex flex-col'>
                        <input className='px-3 py-2 text-sm mt-6 rounded-sm outline-0 border-0 shadow-md' type="password" id='agentPass1' placeholder='Enter New Password' />
                        <input className='px-3 py-2 text-sm mt-6 rounded-sm outline-0 border-0 shadow-md' type="password" id='agentPass2' placeholder='Confirm New Password' />

                        <div className="text-right">
                            <button className="bg-green-800 text-white px-3 py-2 mt-8 cursor-pointer rounded-sm w-fit">Change Password</button>
                        </div>
                    </form>
                </section>  
            </section>
        </div>
    </div>
  )
}

export default Password
