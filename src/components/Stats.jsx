import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import 'animate.css';
import '../css/stat.css';
import axios from 'axios';

const Stats = (props) => {
    const userData = localStorage.getItem("subadmin");

    useEffect(() => {
        console.log(userData);
    }, []);

    return (
        <div>
            <h2 className='mt-3 text-xl mb-3'>Statistics</h2>

            <div>
                <h2 className='mt-4 font-semibold text-l mb-3 text-center'>Work In Progress...</h2>

                <section className="statContainer shadow-sm rounded-md bg-white">

                </section>
            </div>
        </div>
    );
}

export default Stats
