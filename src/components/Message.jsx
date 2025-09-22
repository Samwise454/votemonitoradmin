import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faArrowCircleLeft, faLock, faPen, faUnlock } from '@fortawesome/free-solid-svg-icons';
// import '../css/tables.css';
import '../css/message.css';

const Message = () => {
    const [openForm, setOpenForm] = useState(false);
    const [activeInactive, setActiveInactive] = useState("active");
    const [messages, setMessages] = useState({
        message1: "Materials have not arrived here",
        message2: "Our result sheets are missing",
        message3: "Thugs have attacked our polling unit",
        message4: "Please call now",
        message5: "Shots fired right now!!",
        message6: "",
        message7: "",
        message8: "",
        message9: "",
        message10: ""
    });

  return (
    <div>
      <h2 className='mt-3 text-xl mb-3'>Manage Messages</h2>

        <div id="messageDiv" className='bg-gray-200 p-10'>
            <section className='shadow-sm rounded-sm bg-white p-3 relative'>
                <p>
                    {messages.message1}
                </p>
                <span className='absolute top-0 right-0 -mt-3 bg-green-950 rounded-full px-1.5 text-white'>1</span>
            </section>

            <section className='shadow-sm rounded-sm bg-white p-3 relative'>
                <p>
                    {messages.message2}
                </p>
                <span className='absolute top-0 right-0 -mt-3 bg-green-950 rounded-full px-1.5 text-white'>2</span>
            </section>

            <section className='shadow-sm rounded-sm bg-white p-3 relative'>
                <p>
                    {messages.message3}
                </p>
                <span className='absolute top-0 right-0 -mt-3 bg-green-950 rounded-full px-1.5 text-white'>3</span>
            </section>

            <section className='shadow-sm rounded-sm bg-white p-3 relative'>
                <p>
                    {messages.message4}
                </p>
                <span className='absolute top-0 right-0 -mt-3 bg-green-950 rounded-full px-1.5 text-white'>4</span>
            </section>

            <section className='shadow-sm rounded-sm bg-white p-3 relative'>
                <p>
                    {messages.message5}
                </p>
                <span className='absolute top-0 right-0 -mt-3 bg-green-950 rounded-full px-1.5 text-white'>5</span>
            </section>
        </div>

        <div className='mt-8 bg-gray-100 p-10'>
            <h2 className='p-2 bg-white shadow-sm w-fit'>Edit Messages</h2>

            <section className='messageEditDiv mt-4 bg-gray-100 shadow-sm p-4'>
                <div>
                    <p>Select message to edit by number:</p>
                    <select name="messageEdit" id="messageEdit" className='mt-2 outline-0 border-0 bg-white shadow-sm rounded-sm p-3 cursor-pointer'>
                        <option value="" hidden>Select Number</option>
                        <option value="message1">1</option>
                        <option value="message2">2</option>
                        <option value="message3">3</option>
                        <option value="message4">4</option>
                        <option value="message5">5</option>
                    </select>
                </div>

                <div>
                    <p>Type in your message below:</p>
                    <textarea name="enterMessage" id='enterMessage' className='bg-white mt-4 outline-0 border-0 shadow-sm rounded-sm w-full p-2' placeholder='Type in message...'></textarea>
                    <div className='text-right mt-4 cursor-pointer'>
                        <button className='bg-green-950 text-white px-3 py-2 rounded-sm'>Submit</button>
                    </div>
                </div>
            </section>
        </div>
     
    </div>
  )
}

export default Message
