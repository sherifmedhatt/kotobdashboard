import React, { Component } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Table from "../components/Table";

const Home=()=>{
    return(
        <>
        <Navbar></Navbar>
        <Table title="Messages"></Table>
    </>
    )
}

export default Home