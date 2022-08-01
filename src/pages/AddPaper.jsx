import { render } from '@testing-library/react';
import React, { Component } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Table from "../components/Table";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {ref as ref_db,set,push, onValue,get,child} from "firebase/database"
import {db} from "../firebase-config";
import {useState,useEffect} from "react";
import { Col, Container, Row,Form ,Button,Spinner} from 'react-bootstrap';
import { Input } from '@material-ui/core';
import {storage} from "../firebase-config"
import {ref,uploadBytes,getDownloadURL} from "firebase/storage"



class Home extends Component{
    constructor(props){
        super(props);
        this.state={loading:false}
        this.state={data:[]}
        this.state={image:null}
        this.state={name:""}
        this.state={subject:""};
        this.state={paperID:""};
        this.state={price:""};
       
    }
    

    componentDidMount() {
        console.log("dd");
        window.addEventListener('load', this.handleLoad);
        onAuthStateChanged(getAuth(),(user)=>{
          this.setState({loading:true});
          if (user){
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
        const {id}=this.props.location;
        console.log("teacher");
        this.setState({loading:true});
        const imageRef=ref(storage,'papersms/'+id+this.state.name);
        uploadBytes(imageRef,this.state.image).then(()=>{
            getDownloadURL(imageRef).then((url)=>{
                console.log(url)
                push(ref_db(db,"/teachers/"+id+"/papers/classifiedms"),{
                  paperlink:url,
                  title:this.state.name,
                  date:this.state.subject,
                  id:this.state.paperID,
                  price:this.state.price
                }).then(()=>{
                 this.setState({loading:false});
                 alert("Paper Added Successfully")
                })
            }).catch(error=>{
                console.log(error)
            })
        })
       
      }


   render(){
    const {id}=this.props.location;

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

    const handlePaperIDChange=(e)=>{
      this.setState({paperID:e.target.value})
      console.log(e.target.value)
    }

    const handlePaperPriceChange=(e)=>{
      this.setState({price:e.target.value})
      console.log(e.target.value)
    }
    return(
        <>
         <Navbar></Navbar>
         {this.state.loading?
         <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
         <Spinner animation='border'></Spinner>
     </div>
         :
           <Container>
           <Col>
           <h1>Please Enter Paper Info</h1>
           
           <Form>
     <Form.Group className="mb-3">
       <Form.Label>Paper's Title</Form.Label>
       <Form.Control type="name" onChange={e=>handleNameChange(e)} placeholder="Enter Papers's Title" />
     </Form.Group>
   
     <Form.Group className="mb-3">
       <Form.Label>Paper's Date</Form.Label>
       <Form.Control type="name" onChange={e=>handleSubjectChange(e)} placeholder="Enter Paper's Date" />
     </Form.Group>
     <Form.Group className="mb-3" controlId="formBasicCheckbox">
     </Form.Group>
   
     <Form.Group className="mb-3">
       <Form.Label>Paper's Price</Form.Label>
       <Form.Control type="name" onChange={e=>handlePaperPriceChange(e)} placeholder="Enter Papers's Price" />
     </Form.Group>

     <Form.Group className="mb-3">
       <Form.Label>Paper's ID</Form.Label>
       <Form.Control type="name" onChange={e=>handlePaperIDChange(e)} placeholder="Enter Papers's ID" />
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