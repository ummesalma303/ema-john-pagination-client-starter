import React from 'react';
import banner from '../../assets/banner.jpg'
import '../banner/Banner.css'
const Banner = () => {
    return (
        <div>
           <img className='banner' src={banner} alt="" /> 
        </div>
    );
};

export default Banner;