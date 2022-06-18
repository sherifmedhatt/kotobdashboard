import React, { Component } from 'react';
import './App.css';
import Teachers from "./pages/Teachers";
import Students from "./pages/Students";
import Messages from "./pages/Messages";
import Navebar from "./components/Navbar/Navbar";
import Login from "./pages/Login";
import {Route , Switch} from 'react-router-dom';
import {useState} from "react";
function App() {
  return (  
       <>
 <Switch>
  <Route exact path="/" component={Login}/>
  <Route exact path="/home" component={Teachers}/>
  <Route exact path="/students" component={Students}/>
  <Route exact path="/messages" component={Messages}/>

   </Switch> 
    </>
     ) 
}
export default App;
