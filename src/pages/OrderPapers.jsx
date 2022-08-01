import React, { Component } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Table from "../components/Table";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {set,ref, onValue,get,child,push} from "firebase/database"
import {db} from "../firebase-config";
import { Button,Spinner,Row,Col} from 'react-bootstrap';


class Home extends Component{
    constructor(props){
        super(props);
        this.state={data:[],
         ordersKeys:[],
        loading:true
        }
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
    const {order}=this.props.location;
    
    const columns=[
        {title:"Title",field:"papertitle"},
        {title:"Teacher",field:"teachername"},
        {title:"Paper Date",field:"paperdate"},
        {title:"Price(EGP)",field:"price"},
        
    ]

    const changeDeliveryStatus=()=>{
        console.log(order.userID);
        console.log(order.orderID);
        this.setState({loading:true});
        if(order.status){
            set(ref(db,`/orders/${order.userID}/${order.orderID}/status`),
              false
              ).then(()=>{
                order.status=false
                this.setState({loading:false});
               
              });
        }else{
            set(ref(db,`/orders/${order.userID}/${order.orderID}/status`),
                true
               ).then(()=>{
                order.status=true
                 this.setState({loading:false});
                
               });
        }
    }
     
    return(
        <>
       <Navbar></Navbar>
       {this.state.loading ?<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
    <Spinner animation='border'></Spinner>
</div> : 
            <Table style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} title="Messages" data={order.papers} columns={columns}  ></Table>
             }
  
  <Col className='text-center'>   
  {order.status ? <h2>The order has been delivered</h2> :<h2>the order is not delivered yet</h2> } 
      <Button onClick={changeDeliveryStatus}>Change Delivery State</Button> 
      <h1></h1>
      </Col>
        </>
      
    )
    }
}

export default Home