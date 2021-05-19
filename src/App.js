import React, { Component } from 'react';
import './App.css';
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import SingleRoom from "./pages/SingleRoom";
import Error from "./pages/Error";
import Navebar from "./components/Navbar/Navbar";
import {Route , Switch} from 'react-router-dom';

function App() {
  return (
    <>
    <Navebar/>
   <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/room/" component={Rooms}/>
    <Route exact path="/room/:slug" component={SingleRoom}/>
     <Route component={Error} />
     </Switch>
    </>
  );
}

export default App;
