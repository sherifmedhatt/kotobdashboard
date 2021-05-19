import React, { Component } from 'react';
import defaultBcg from "../images/room-1.jpeg";
import Hero from "../components/Hero";
import Banner from "../components/banner";
import {Link} from "react-router-dom";
import {RoomContext} from "../context";
import StyledHero from "../components/StyledHero";

class SingleRoom extends Component {
    constructor(props){
        super(props);
        
        this.state={
            slug:this.props.match.params.slug,
            defaultBcg
        };
    }
    static contextType=RoomContext;

    componentDidMount(){

    }
    render() { 
    const { getRoom } = this.context;
    const room = getRoom(this.state.slug);
    if(!room){
        return(
         <div className="error">
              <h3>no such room could be found</h3>
              <Link to="/room" className="btn-primary">back to rooms</Link>
        </div>
        )
    }
    const {name,description,capacity,size,price,extras,breakfast,pets,images}=room
        return ( 
            <>
            <Hero hero="roomsHero">
           <Banner title={`${name} room`}>
           <Link to="/room" className="btn-primary">back to rooms</Link>
           </Banner>
           </Hero>
           <section className="single-room">
               <div className="single-room-images">
             {images.map((item,index)=>(
                <img key={index} src={item} alt={name}></img>   
             ))}
             </div>  
             <div className="single-room-info">
                 <article className="desc">
                    <h3>details</h3>
             <p>{description}</p>
                 </article>
                 <article className="info">
                     <h3>info</h3>
                        <h6>price: ${price}</h6>
                       <h6>size: ${size} SQFT</h6>
                       
                 </article>
             </div>
           </section>
           </>
         );
    }
}
 
export default SingleRoom;