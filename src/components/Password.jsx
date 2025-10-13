import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlock } from '@fortawesome/free-solid-svg-icons';
import '../css/password.css';
import axios from 'axios';

const Password = () => {
    const userData = localStorage.getItem('subadmin');
    const api = 'https://naijavote.esbatech.org'; //API endpoint
    const fetchpass = api + '/getagentpass.php';
    const setagentpass = api + '/setagentpass.php';
    const setuserpass = api + '/setuserpass.php';
    const [respAgent, setRespAgent] = useState("");
    const [respUser, setRespUser] = useState("");

    const [agentPass, setAgentPass] = useState("");
    const [toggleAgent, setToggleAgent] = useState(false);

    const [agentNewpass, setAgentNewPass] = useState({
        pass1: "",
        pass2: "",
        subadmin: userData
    });

    const [userNewpass, setUserNewPass] = useState({
        pass1: "",
        pass2: "",
        pass3: "",
        subadmin: userData
    });

    useEffect(() => {
        const fetchPassword = async () => {
            let data = {
                subadmin: userData
            }
            try {
                const response = await axios.post(fetchpass, JSON.stringify(data));
                if (response.status === 200) {
                    if (response.data.code === "sw12") {
                        setAgentPass("");
                    }
                    else if (response.data.code === "sw321") {
                        setAgentPass(response.data.msg);
                    }
                }
            } catch(err) {
                setAgentPass("");
            }
        }

        fetchPassword();
    }, [toggleAgent]);

    const handleAgentPass = (e) => {
        let id = e.target.id;
        switch(id) {
            case "agentPass1":
                setAgentNewPass({...agentNewpass, pass1: e.target.value});
                break;
            case "agentPass2":
                setAgentNewPass({...agentNewpass, pass2: e.target.value});
                break;
        }
    }

    const handleUserPass = (e) => {
        let id = e.target.id;
        switch(id) {
            case "oldPass":
                setUserNewPass({...userNewpass, pass1: e.target.value});
                break;
            case "newPass1":
                setUserNewPass({...userNewpass, pass2: e.target.value});
                break;
            case "newPass2":
                setUserNewPass({...userNewpass, pass3: e.target.value});
                break;
        }
    }

    const showLoader = (loader) => {
        loader.style.display = "flex";
    }

    const hideLoader = (loader) => {
        loader.style.display = "none";
    }

    const submitUserPass = async (e) => {
        e.preventDefault();
        let pass1Input = document.querySelector("#oldPass");
        let pass2Input = document.querySelector("#newPass1");
        let pass3Input = document.querySelector("#newPass2");
        let loader = document.querySelector("#form_loader1");

        showLoader(loader);
        const clearResp = () => {
            setTimeout(() => {
                setRespUser("");
            }, 3000);
        }

        if (userNewpass.pass1 == "" || userNewpass.pass2 == "" || userNewpass.pass3 == "") {
            setRespUser("Inputs cannot be empty!");
            clearResp();
        }
        else if (userNewpass.pass2 !== userNewpass.pass3) {
            setRespUser("Inputs cannot be empty!");
            clearResp();
        }
        else {
            try {
                const response = await axios.post(setuserpass, JSON.stringify(userNewpass));
                if (response.status === 200) {
                    setRespUser(response.data.msg);
                    clearResp();
                }
            } catch (err) {
                setRespUser(response.data.msg);
                clearResp();
            } finally {
                hideLoader(loader);
                pass1Input.value = "";
                pass2Input.value = "";
                pass3Input.value = "";

                setAgentNewPass({
                    pass1: "",
                    pass2: "",
                    pass3: "",
                    subadmin: userData
                });
            }
        }
    }

    const setNewAgentPass = async (e) => {
        let pass1Input = document.querySelector("#agentPass1");
        let pass2Input = document.querySelector("#agentPass2");
        let loader = document.querySelector("#form_loader2");

        e.preventDefault();
        showLoader(loader);
        const clearResp = () => {
            setTimeout(() => {
                setRespAgent("");
            }, 3000);
        }

        if (agentNewpass.pass1 === "" || agentNewpass.pass2 === "") {
            setRespAgent("Inputs cannot be empty!");
            clearResp();
        }
        else if (agentNewpass.pass1 !== agentNewpass.pass2) {
            setRespAgent("Passwords do not match");
            clearResp();
        }
        try {
            const response = await axios.post(setagentpass, JSON.stringify(agentNewpass));
            if (response.status === 200) {
                setRespAgent(response.data.msg);
                clearResp();
            }
        } catch (err) {
            setRespAgent(response.data.msg);
            clearResp();
        } finally {
            if (toggleAgent === false) {
                setToggleAgent(true);
            }
            else {
                setToggleAgent(false);
            }
            hideLoader(loader);
            pass1Input.value = "";
            pass2Input.value = "";

            setAgentNewPass({
                pass1: "",
                pass2: "",
                subadmin: userData
            })
        }
    }

  return (
    <div>
      <h2 className='mt-3 text-xl mb-3'>Manage Passwords</h2>

        <div className='passContainer relative mt-10 p-8 rounded-sm shadow-sm h-150'>
            <section>
                <h2 className='text-green-700'>Update User Password</h2>

                <form onSubmit={submitUserPass} className='flex flex-col'>
                    <input onChange={handleUserPass} className='px-3 py-2 text-sm mt-6 rounded-sm outline-0 border-0 shadow-md' type="password" id='oldPass' placeholder='Enter Current Password' />
                    <input onChange={handleUserPass} className='px-3 py-2 text-sm mt-6 rounded-sm outline-0 border-0 shadow-md' type="password" id='newPass1' placeholder='Enter New Password' />
                    <input onChange={handleUserPass} className='px-3 py-2 text-sm mt-6 rounded-sm outline-0 border-0 shadow-md' type="password" id='newPass2' placeholder='Confirm New Password' />

                    <div className="text-right">
                        <section id="form_loader1" className='loaderDiv mt-1'>
                            <span className='loader'>

                            </span>
                        </section>

                        <div className='mt-2'>
                            {respUser}
                        </div>
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

                    <form onSubmit={setNewAgentPass} className='flex flex-col'>
                        <input onChange={handleAgentPass} className='px-3 py-2 text-sm mt-6 rounded-sm outline-0 border-0 shadow-md' type="password" id='agentPass1' placeholder='Enter New Password' />
                        <input onChange={handleAgentPass} className='px-3 py-2 text-sm mt-6 rounded-sm outline-0 border-0 shadow-md' type="password" id='agentPass2' placeholder='Confirm New Password' />

                        <div className="text-right">
                            <section id="form_loader2" className='loaderDiv mt-1'>
                                <span className='loader'>

                                </span>
                            </section>

                            <div className='mt-2'>
                                {respAgent}
                            </div>
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
