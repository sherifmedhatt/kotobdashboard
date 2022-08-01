import { render } from '@testing-library/react';
import React, { Component } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Table from "../components/Table";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {set,ref, onValue,get,child,remove} from "firebase/database"
import {db} from "../firebase-config";
import {useState,useEffect} from "react";
import { Button,Spinner} from 'react-bootstrap';
import {useHistory} from "react-router-dom";

class Home extends Component{
    constructor(props){
        super(props);
        this.state={data:[],
        teachersKeys:[],
        loading:true
        }
    }
    

    getStudents = () => {
        console.log("teachers");
        this.setState({loading:true});
        onValue(ref(db,'/clientsdata'),(snapshot)=>{
          this.setState({loading:false});
            var students=[]
            console.log(snapshot.val());
            const fetchedStudents=snapshot.val();
            if (fetchedStudents!=null){
              for (const [studentID,student] of Object.entries(fetchedStudents)) {
                student.ID=studentID
                students.push(student);
              }
          this.setState({data:students})
            }
          
        });
       
      }

    componentDidMount() {
        console.log("dd");
        window.addEventListener('load', this.handleLoad);
            onAuthStateChanged(getAuth(),(user)=>{
              this.setState({loading:true});
              if (user){
              get(child(ref(db),"/adminuid")).then((snapshot)=>{
                console.log(snapshot.val());
                this.setState({loading:false});
                let uid=snapshot.val();
                if (user.uid===uid){ 
                  this.getStudents();
              }else{
                this.props.history.push({pathname:"/"});
              }
              })
            }else{
              this.props.history.push({pathname:"/"});
            }
          });
      
     }
     
   render(){
    const columns=[
        {title:"Profile Picture",field:"image",render:item=><img src={item.image} alt="" border="3" height="100" width="100"/>},
        {title:"Name",field:"name"},
        {title:"Phone No.",field:"phoneno"},
        {title:"Email",field:"email"},
        {title:"School",field:"school"},
        {title:"Role",field:"type"},
    ]
    const addFunction=()=>{
        console.log("add");
       
    }
      const openPapers=(e)=>{
      console.log(e.tableData.id);
      console.log(this.state.teachersKeys[e.tableData.id]);
      this.props.history.push({pathname:"/studentpapers",student:this.state.data[e.tableData.id]})
    }

    const deleteStudent=(e)=>{
      console.log(e.tableData.id)
      console.log(this.state.teachersKeys[e.tableData.id]);
      remove(ref(db,"/clientsdata/"+this.state.data[e.tableData.id].ID));
    }
    

    return(
        <>
         <Navbar></Navbar>
         {this.state.loading ? <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
    <Spinner animation='border'></Spinner>
</div> : <Table title="Students" data={this.state.data} columns={columns} addFunction={addFunction} delete={deleteStudent} selected={openPapers} ></Table> }
      
        </>
      
    )
    }
}

export default Home