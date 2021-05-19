import React from 'react'
import RoomsList from "./RoomsList";
import RoomsFilter from "./Roomsfilter";
import {withRoomConsumer} from "../context";
import Loading from "./Loading";

function RoomContainer({context}){
const {loading,sortedRooms,rooms}=context;

if(loading){
    return <Loading></Loading>
}
 return(     
 <div>
     <RoomsFilter rooms={rooms}></RoomsFilter>
     <RoomsList rooms={sortedRooms}></RoomsList>
 </div>
 )}

 export default withRoomConsumer(RoomContainer);

