import { render } from '@testing-library/react';
import React, { Component } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Table from "../components/Table";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {set,ref, onValue,get,child,remove} from "firebase/database"
import {db} from "../firebase-config";
import {useState,useEffect} from "react";
import { Button,Spinner} from 'react-bootstrap';

class Home extends Component{
    constructor(props){
        super(props);
        this.state={data:[],
        teachersKeys:[],
        loading:true
        }
    }
    
   

    getPapers = () => {
        const {teacher}=this.props.location;
        this.setState({loading:true});
        onValue(ref(db,'/teachers/'+teacher.ID+'/papers/classifiedms'),(snapshot)=>{
            this.setState({loading:false});
            var teachers=[]
            console.log(snapshot.val());
            const fetchedTeachers=snapshot.val();
            if (fetchedTeachers!=null){
                Object.values(fetchedTeachers).map((teachers1)=>{
                    teachers.push(teachers1)
                  })
                  console.log(teachers);
                  this.setState({data:teachers})
        
                  Object.keys(fetchedTeachers).map((newTeacherkkey)=>{
                    this.state.teachersKeys.push(newTeacherkkey)
                  })
                  console.log(this.state.teachersKeys);
            }
         
        }) ;
       
      }
      getPapers2=()=>{
        const {teacher}=this.props.location;
                  let papers=teacher.papers?.classifiedms;
                 if (papers!==undefined){
                  var papersArray=[]
                  for (const [paperID, paper] of Object.entries(papers)) {
                    paper.ID=paperID;
                     papersArray.push(paper);
                  }
                  this.setState({data:papersArray})
                }
      }

    componentDidMount() {
        console.log("dd");
        window.addEventListener('load', this.handleLoad);
        onAuthStateChanged(getAuth(),(user)=>{
            console.log(user);
            if (user){
                this.setState({loading:true});
              get(child(ref(db),"/adminuid")).then((snapshot)=>{
                console.log(snapshot.val());
                this.setState({loading:false});
                let uid=snapshot.val();
                if (user.uid===uid){ 
                  this.getPapers2();
                  
              }else{
                this.props.history.push({pathname:"/"});
              }
              })
            }
        })
     }
   
   render(){
    const {teacher}=this.props.location;

    const columns=[
        {title:"Title",field:"title"},
        {title:"Date",field:"date"},
        {title:"Price in EGP ",field:"price"},
        {title:"ID",field:"id"}
    ]
    const addPaper=()=>{
        //window.location = '/mypapers';
        this.props.history.push({pathname:"/addpaper",id:teacher.ID})
    }

    const openPaper=(e)=>{
      console.log(e.tableData.id);
      console.log(this.state.teachersKeys[e.tableData.id]);
      console.log(this.state.data[e.tableData.id].paperlink);
      this.props.history.push({pathname:"/pdfviewer",pdflink:this.state.data[e.tableData.id].paperlink,paperID:this.state.teachersKeys[e.tableData.id],teacherID:teacher.ID,isFromTeacher:true,teacher:teacher,paper:this.state.data[e.tableData.id]});
    }

    const deletePaper=(e)=>{
      console.log(e.tableData.id)
      console.log(this.state.data[e.tableData.id].ID);
      remove(ref(db,"/teachers/"+teacher.ID+"/papers/classifiedms/"+this.state.data[e.tableData.id].ID)).then((e1)=>{
        var newData=[]
       newData=this.state.data.filter(obj=>{
        return obj.ID!==this.state.data[e.tableData.id].ID;
       })
       this.setState({data:newData});
      });
    }
    

    return(
        <>
         <Navbar></Navbar>
         {this.state.loading ? <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
    <Spinner animation='border'></Spinner>
</div>:<Table title="Papers" data={this.state.data} columns={columns} addFunction={addPaper} selected={openPaper} delete={deletePaper} ></Table> }
       
        </>
      
    )
    }
}

export default Home