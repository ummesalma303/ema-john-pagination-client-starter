import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import Banner from '../banner/Banner';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <Banner></Banner>
            <Outlet></Outlet>
        </div>
    );
};

export default Home;