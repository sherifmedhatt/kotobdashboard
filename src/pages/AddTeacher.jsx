import { render } from '@testing-library/react';
import React, { Component } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Table from "../components/Table";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {ref as ref_db,set,push, onValue,child,get} from "firebase/database"
import {db} from "../firebase-config";
import { Col, Container, Row,Form ,Button,Spinner} from 'react-bootstrap';
import { Input } from '@material-ui/core';
import {storage} from "../firebase-config"
import {ref,uploadBytes,getDownloadURL} from "firebase/storage"



class Home extends Component{
    constructor(props){
        super(props);
        this.state={data:[]}
        this.state={image:null}
        this.state={name:""}
        this.state={subject:""}
        this.state={loading:true}
        this.state={teacherID:""}
        this.state={teacherBio:""}
        this.state={teacherTitle:""}
    }
    

    componentDidMount() {
        console.log("dd");
        window.addEventListener('load', this.handleLoad);
        onAuthStateChanged(getAuth(),(user)=>{
          this.setState({loading:true});
          if(user){
          get(child(ref_db(db),"/adminuid")).then((snapshot)=>{
            console.log(snapshot.val());
            this.setState({loading:false});
            let uid=snapshot.val();
            if (user.uid===uid){ 
              
          }else{
            this.props.history.push({pathname:"/"});
          }
          })
        }else{
          this.props.history.push({pathname:"/"});
        }
      });
     
     }
   
     addTeacher = () => {
        console.log("teacher");
        this.setState({loading:true});
        const imageRef=ref(storage,'teacherimages/'+this.state.name);
        uploadBytes(imageRef,this.state.image).then(()=>{
            getDownloadURL(imageRef).then((url)=>{
             
                console.log(url)
                push(ref_db(db,"/teachers"),{
                  profilepicture:url,
                  name:this.state.name,
                  subject:this.state.subject,
                  id:this.state.teacherID,
                  bio:this.state.teacherBio,
                  title:this.state.teacherTitle
                }).then(()=>{
                  this.setState({loading:false});
                 alert("Teacher has been added successfully");
                });
            }).catch(error=>{
                console.log(error)
            })
        })
       
      }


   render(){

    const handleImageChange=(e)=>{
        if(e.target.files[0]){
           this.setState({image:e.target.files[0]})
        }
    }
    
    const handleNameChange=(e)=>{
      this.setState({name:e.target.value})
      console.log(e.target.value)
    }

    const handleSubjectChange=(e)=>{
      this.setState({subject:e.target.value})
      console.log(e.target.value)
    }

    const handleIDChange=(e)=>{
      this.setState({teacherID:e.target.value})
      console.log(e.target.value)
    }

    const handleTeacherTitleChange=(e)=>{
      this.setState({teacherTitle:e.target.value})
      console.log(e.target.value)
    }

    const handleTeacherBioChange=(e)=>{
      this.setState({teacherBio:e.target.value})
      console.log(e.target.value)
    }


    return(
        <>

         <Navbar></Navbar>
        {this.state.loading ? <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
    <Spinner animation='border'></Spinner>
</div> : 

<Container>
<Col>
<h1>Please Enter Teacher Info</h1>

<Form>
<Form.Group className="mb-3">
<Form.Label>Teacher's Title</Form.Label>
<Form.Control type="name" onChange={e=>handleTeacherTitleChange(e)} placeholder="Enter Teacher's Title" />
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Teacher's Name</Form.Label>
<Form.Control type="name" onChange={e=>handleNameChange(e)} placeholder="Enter Teacher's Name" />
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Subject</Form.Label>
<Form.Control type="name" onChange={e=>handleSubjectChange(e)} placeholder="Enter Teacher's Subject" />
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Teacher ID</Form.Label>
<Form.Control type="name" onChange={e=>handleIDChange(e)} placeholder="Enter Teacher's ID" />
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Teacher Biography</Form.Label>
<Form.Control type="name" onChange={e=>handleTeacherBioChange(e)} placeholder="Enter Teacher's Biography" />
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicCheckbox">
</Form.Group>

<Form.Group>
<Input type='file' onChange={handleImageChange}>
</Input>
</Form.Group>

<Button variant="primary" onClick={this.addTeacher}>
Add 
</Button>
</Form>
</Col>
</Container>

}
        
       
        </>
      
    )
    }
}

export default Home