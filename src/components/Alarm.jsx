import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlock } from '@fortawesome/free-solid-svg-icons';
import '../css/alarm.css';
import '../css/tables.css';

const Alarm = () => {
    const [alarmNum, setAlarmNum] = useState({
        num1: "08034456556",
        num2: "08034456534",
        num3: "08034456545",
    });

  return (
    <div>
      <h2 className='mt-3 text-xl mb-3'>Manage Alarms</h2>

        <div className='alarmContainer relative'>
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
                        <tr>
                            <td className='p-2'>1</td>
                            <td className='p-2'>Okeke Dora</td>
                            <td className='p-2'>Central School Aguata</td>
                            <td className='p-2'>Our result sheets are missing</td>
                            <td className='p-2'>2025-08-23 10:22:22</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section>
                <h3 className='mb-4 text-green-700'>Alarm Numbers</h3>
                <div className='flex flex-row'>
                    <section className='shadow-sm rounded-sm bg-green-800 text-white p-2 relative'>
                        <p>
                            {alarmNum.num1}
                        </p>
                        <span className='absolute top-0 right-0 -mt-3.5 bg-white rounded-full px-1.5 text-black'>1</span>
                    </section>

                    <section className='shadow-sm rounded-sm bg-green-800 text-white p-2 relative mx-2'>
                        <p>
                            {alarmNum.num2}
                        </p>
                        <span className='absolute top-0 right-0 -mt-3.5 bg-white rounded-full px-1.5 text-black'>2</span>
                    </section>

                    <section className='shadow-sm rounded-sm bg-green-800 text-white p-2 relative'>
                        <p>
                            {alarmNum.num3}
                        </p>
                        <span className='absolute top-0 right-0 -mt-3.5 bg-white rounded-full px-1.5 text-black'>3</span>
                    </section>
                </div>

                <div>
                    <h3 className='text-green-700 mt-20'>Edit Alarm Numbers</h3>
                    
                    <select name="alarmNumSelect" id="alarmNumSelect" className='mt-4 shadow-sm rounded-sm outline-0 border-0 px-3 py-2'>
                        <option value="" hidden>Select Number to Edit</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>

                    <form>
                        <input type="tel" placeholder='Enter New Phone Num' className='py-2 px-3 mt-20 rounded-sm outline-0 border-0 shadow-sm mr-4'/>

                        <button className='bg-green-800 text-white py-2 px-3 rounded-sm cursor-pointer'>Submit</button>
                    </form>
                </div>
            </section>
        </div>
    </div>
  )
}

export default Alarm
