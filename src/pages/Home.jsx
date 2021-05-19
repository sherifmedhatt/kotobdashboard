import React, { Component } from 'react';
import Hero from "../components/Hero";
import Banner from "../components/banner";
import {Link} from "react-router-dom";
import Services from "../components/Services";
import FeaturedRooms from "../components/FeaturedRooms";

const Home=()=>{
    return(
        <>
   <Hero>
       <Banner title="luxurious rooms" subtitle="deluxe rooms dtarting at 239$">
        <Link to="/room" className="btn-primary">
            our rooms
        </Link>
       </Banner>
   </Hero>
    )
    <Services/>
    <FeaturedRooms/>
    </>
    )
}

export default Home