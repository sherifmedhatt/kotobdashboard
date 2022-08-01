import React, { Component } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Table from "../components/Table";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {set,ref, onValue,get,child,remove} from "firebase/database"
import {db} from "../firebase-config";
import { Button,Spinner} from 'react-bootstrap';

class Home extends Component{
    constructor(props){
        super(props);
        this.state={data:[],
         messagesKeys:[],
        loading:true
        }
    }
    

    getReceipts = () => {
        this.setState({loading:true});
        onValue(ref(db,'/receipts'),(snapshot)=>{
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
                this.state.messagesKeys.push(newTeacherkkey)
              })
              console.log(this.state.messagesKeys);
            }
          
        });
       
      }



    componentDidMount() {
        console.log("dd");
        window.addEventListener('load', this.handleLoad);
            onAuthStateChanged(getAuth(),(user)=>{
                this.setState({loading:true});
                if(user){
                get(child(ref(db),"/adminuid")).then((snapshot)=>{
                  console.log(snapshot.val());
                  this.setState({loading:false});
                  let uid=snapshot.val();
                  if (user.uid===uid){ 
                   this.getReceipts();
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
        {title:"Receipt ID",field:"receiptID"},
        {title:"Teacher ID",field:"teacherID"} ,
        {title:"Paper ID",field:"paperID"},
        {title:"teacher Name",field:"teacherName"} ,
        {title:"Subject",field:"subject"},
        {title:"Paper Title",field:"paperName"},
        {title:"Date",field:"date"},
        {title:"Used",field:"used"},
       
    ]
    
    const deleteReceipt=(e)=>{
    console.log(e.tableData.id)
    console.log(this.state.messagesKeys[e.tableData.id]);
    remove(ref(db,"/receipts/"+this.state.messagesKeys[e.tableData.id]));
    }

    return(
        <>
       <Navbar></Navbar>
       {this.state.loading ?<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
    <Spinner animation='border'></Spinner>
</div> : 
            <Table style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} title="Receipts" data={this.state.data} columns={columns}  delete={deleteReceipt} ></Table>
             }


        </>
      
    )
    }
}

export default Home