import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faArrowCircleLeft, faLock, faPen, faUnlock } from '@fortawesome/free-solid-svg-icons';
import '../css/message.css';
import axios from 'axios';

const Message = (props) => {
    const [openForm, setOpenForm] = useState(false);
    const [resp, setResp] = useState("");
    const [dataState, setDataState] = useState(false);
    const api = props.api + '/managemessage.php';
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const [getMessage, setGetMessage] = useState({
        action: "getMessage"
    });

    useEffect(() => {
        //let's fetch messages
        setLoading(true);

        const fetchAlarm = async () => {
            try {
                const response = await axios.post(api, JSON.stringify(getMessage));
                if (response.status === 200) {
                    setMessages(response.data);
                }
            } catch (err) {
                setMessages({
                    message1: "",
                    message2: "",
                    message3: "",
                    message4: "",
                    message5: ""
                })
            } finally {
                setLoading(false);
            }
        }

        fetchAlarm();
    }, [dataState]);

    const [formData, setFormData] = useState({
        msgNum: "",
        msg: "",
        action: "setMessage"
    })

    const handleInput = (e) => {
        let id = e.target.id;
        let value = e.target.value;

        switch(id) {
            case 'messageEdit':
                setFormData({...formData, msgNum: value});
                break;
            case 'enterMessage':
                setFormData({...formData, msg: value});
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

    const submitMessage = (e) => {
        e.preventDefault();
        let data = JSON.stringify(formData);
        let msgInput = document.querySelector("#enterMessage");
        showLoader();

        const resetResp = () => {
            setTimeout(() => {
                setResp("");
            }, 3000);
        }

        if (formData.msgNum == "" || formData.msg == "") {
            setResp("Message box/number cannot be empty!");
            resetResp();
            hideLoader();
        }
        else {
            const sendMessage = async () => {
                try {
                    const response = await axios.post(api, data);
                    if (response.status === 200) {
                        setResp(response.data.msg);
                    }
                } catch (err) {
                    setResp("Error processing!");
                } finally {
                    setTimeout(() => {
                        if (dataState == false) {
                            setDataState(true);
                        }
                        else {
                            setDataState(false);
                        }
                    }, 2000);

                    resetResp();
                    document.querySelector("#messageEdit").value = "";
                    hideLoader();
                    msgInput.value = "";
                    setFormData({
                        msgNum: "",
                        msg: "",
                        action: "setMessage"
                    });
                }
            }
            sendMessage();
        }
    }

  return (
    <div>
      <h2 className='mt-3 text-xl mb-3'>Manage Messages</h2>

        <div id="messageDiv" className='bg-gray-200 p-10'>
            {loading == true ?
                <section id='page_loader' className='absolute top-0 right-0'>
                    <span className='loader mr-5'>

                    </span>
                </section>  
            :
                <></>
            }
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

            <form onSubmit={submitMessage} className='messageEditDiv mt-4 bg-gray-100 shadow-sm p-4'>
                <div>
                    <p>Select message to edit by number:</p>
                    <select onChange={handleInput} name="messageEdit" id="messageEdit" className='mt-2 outline-0 border-0 bg-white shadow-sm rounded-sm p-3 cursor-pointer'>
                        <option value="" hidden>Select Number</option>
                        <option value="alarm1">1</option>
                        <option value="alarm2">2</option>
                        <option value="alarm3">3</option>
                        <option value="alarm4">4</option>
                        <option value="alarm5">5</option>
                    </select>
                </div>

                <div>
                    <p>Type in your message below:</p>
                    <textarea onChange={handleInput} name="enterMessage" id='enterMessage' className='bg-white mt-4 outline-0 border-0 shadow-sm rounded-sm w-full p-2' placeholder='Type in message...'></textarea>

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

                    <div className='text-right mt-4'>
                        <button className='bg-green-950 text-white px-3 py-2 rounded-sm cursor-pointer'>Submit</button>
                    </div>
                </div>
            </form>
        </div>
     
    </div>
  )
}

export default Message
