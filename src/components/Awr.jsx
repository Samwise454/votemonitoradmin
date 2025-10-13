import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import 'animate.css';
import '../css/miscdata.css';
import axios from 'axios';

const Awr = (props) => {
const moveBack = () => {

}

  return (
    <div className='stateData ml-5'>
        <FontAwesomeIcon onClick={moveBack} icon={faArrowCircleLeft} className='absolute right-0 top-0 mr-5 text-3xl cursor-pointer'/>
        How far
    </div>
  )
}

export default Awr
