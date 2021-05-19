import React from "react";
import Hero from '../components/Hero';
import Banner from "../components/banner";
import {Link} from "react-router-dom";
import RoomsContainer from "../components/RoomsContainer";
const Rooms=()=>{
 
    return(
      <>
      <Hero Hero="roomsHero">
           <Banner title="our rooms">
              <Link to="/" className="btn-primary">
                return home
              </Link>
           </Banner>
      </Hero>
      <RoomsContainer>
        
      </RoomsContainer>
      </>
    )
  
}

export default Rooms