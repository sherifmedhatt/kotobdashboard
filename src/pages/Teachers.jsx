import { render } from '@testing-library/react';
import React, { Component } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Table from "../components/Table";
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import {set,ref, onValue, get,child,remove} from "firebase/database"
import {auth, db} from "../firebase-config";
import { Button,Spinner} from 'react-bootstrap';
import {Trash} from 'react-bootstrap-icons'

class Home extends Component{
    constructor(props){
        super(props);
        this.state={data:[],
        teachersKeys:[],
        loading:true,
        loggedIn:false
        }
    }
    

    getTeachers = () => {
        console.log("teachers");
        this.setState({loading:true});
        onValue(ref(db,'/teachers'),(snapshot)=>{
          this.setState({loading:false});
            var teachers=[]
            console.log(snapshot.val());
            const fetchedTeachers=snapshot.val();
            if (fetchedTeachers!=null){
              for (const [teacherID, teacher] of Object.entries(fetchedTeachers)) {
                teacher.ID=teacherID
                teachers.push(teacher);
              }
          this.setState({data:teachers})
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
                  this.setState({loggedIn:true})
                  this.getTeachers();
              }else{
                this.props.history.push({pathname:"/"});
              }
             
            
            }
            )
        }else{
          this.props.history.push({pathname:"/"});
        }
        });
     }
     
   render(){
    const columns=[
        {title:"Profile Picture",field:"profilepicture",render:item=><img src={item.profilepicture} alt="" border="3" height="100" width="100"/>},
        {title:"Title",field:"title"},
        {title:"Name",field:"name"},
        {title:"Subject",field:"subject"},
        {title:"ID",field:"id"},
        {title:"Biography",field:"bio"},
    ]
    const addFunction=()=>{
        console.log("add teacher");
        window.location = '/addteacher';
    }

    const deleteTeacher=(e)=>{
      console.log(e.tableData.id)
      console.log(this.state.teachersKeys[e.tableData.id]);
      remove(ref(db,"/teachers/"+this.state.data[e.tableData.id].ID));
    }
    
      const openPapers=(e)=>{
        console.log(e.tableData.id);
        console.log(this.state.teachersKeys[e.tableData.id]);
        this.props.history.push({pathname:"/mypapers",teacher:this.state.data[e.tableData.id]})
    }

    const logOut=()=>{
      console.log("logout");
      const auth = getAuth();
      signOut(auth).then(() => {
        this.props.history.push({pathname:"/"})
    }).catch((error) => {
  
        });
    }

    const logIn=()=>{
     
    }

    return(
        <>
        {this.state.loggedIn ? <Navbar logAction={logOut} signing="Logout"></Navbar>: <Navbar logAction={logIn} signing="Login"></Navbar>}

       {this.state.loading ?<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
    <Spinner animation='border'></Spinner>
</div> : 
            <Table style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} title="Teachers" data={this.state.data} columns={columns} addFunction={addFunction} selected={openPapers} delete={deleteTeacher} ></Table>
             }
  
        </>
      
    )
    }
}

export default Home