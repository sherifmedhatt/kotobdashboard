import './App.css';
import Teachers from "./pages/Teachers";
import Students from "./pages/Students";
import Receipts from "./pages/Receipts";
import Messages from "./pages/Messages";
import AddTeacher from "./pages/AddTeacher";
import MyPapers from "./pages/MyPapers";
import Login from "./pages/Login";
import AddPaper from "./pages/AddPaper";
import StudentPapers from "./pages/StudentPapers";
import PdfViewer from "./pages/PdfViewer";
import Orders from "./pages/Orders"
import OrderPapers from "./pages/OrderPapers";
import {Route , Switch} from 'react-router-dom';
import React, { Component }  from 'react';

function App() {
 
  return (  
       <>
       <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/teachers" component={Teachers}/>
                <Route exact path="/students" component={Students}/>
                <Route exact path="/receipts" component={Receipts}/>
                <Route exact path="/messages" component={Messages}/>
                <Route exact path="/addteacher" component={AddTeacher}/>
                <Route exact path="/mypapers" component={MyPapers}/>
                <Route exact path="/addpaper" component={AddPaper}/>
                <Route exact path="/studentpapers" component={StudentPapers}/>
                <Route exact path="/pdfviewer" component={PdfViewer}/>
                <Route exact path="/orders" component={Orders}/>
                <Route exact path="/orderpapers" component={OrderPapers}/>
                 </Switch>
     
    </>
  )  
  }
  
export default App;


