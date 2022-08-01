import React, { Component } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Table from "../components/Table";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {set,ref, onValue,get,child,remove} from "firebase/database"
import {db} from "../firebase-config";
import { Button,Spinner} from 'react-bootstrap';
import {Row,Col} from 'react-bootstrap';
import { TextField } from '@material-ui/core';

class Home extends Component{
    constructor(props){
        super(props);
        this.state={data:[],
         ordersKeys:[],
        loading:true,
        deliveryFees:"",
        newDeliveryFees:""
        }
    }
    

    getOrders = () => {
        this.setState({loading:true});
        onValue(ref(db,'/orders'),(snapshot)=>{
          this.setState({loading:false});
            var ordersNew=[];
            console.log(snapshot.val());
            const fetchedOrders=snapshot.val();
            if (fetchedOrders!=null){

                for (const [userID, orders] of Object.entries(fetchedOrders)) {
                    console.log(`${userID}: ${orders}`);
                    for (const [orderID, order] of Object.entries(orders)) {
                        console.log(`${orderID}: ${order}`);
                        order.userID=userID;
                        order.orderID=orderID
                        ordersNew.push(order);
                      }
                  }
              this.setState({data:ordersNew})
              console.log(ordersNew);
            }
          this.getDeliveryFees();
        });
       
      }

      getDeliveryFees=()=>{
        this.setState({loading:true});
        get(child(ref(db),"/deliveryfees")).then((snapshot)=>{
            console.log(snapshot.val());
            this.setState({deliveryFees:snapshot.val()});
            this.setState({loading:false});
            
          })
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
                   this.getOrders();
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
        {title:"Name",field:"name"},
        {title:"Phone No.",field:"phoneno"},
        {title:"Address",field:"address"},
        {title:"School",field:"school"},
        {title:"Papers Price(EGP)",field:"papersprice"},
        {title:"Delivery Price(EGP)",field:"deliveryprice"},
        {title:"Total Price(EGP)",field:"totalprice"},
        {title:"State",field:"status"}
        
    ]
   
    const handleDeliveryFeesChange=(e)=>{
        this.state.newDeliveryFees=e.target.value
    }

 const sendNewDeliveryFees=()=>{
    if (/^\d+$/.test(this.state.newDeliveryFees)){
        this.setState({loading:true});
        set(ref(db,`/deliveryfees/`),
        this.state.newDeliveryFees
        ).then(()=>{
          this.setState({deliveryFees:this.state.newDeliveryFees});
          this.setState({loading:false});
         
        });  
    }else{
        alert("Please enter only numbers");
    }
 }
        
    

      const openPapers=(e)=>{
        console.log(e.tableData.id);
        console.log(this.state.data[e.tableData.id]);
      this.props.history.push({pathname:"/orderpapers",order:this.state.data[e.tableData.id]})
    }

    const deleteMessage=(e)=>{
    console.log(e.tableData.id);

    remove(ref(db,"/orders/"+this.state.data[e.tableData.id].userID+"/"+this.state.data[e.tableData.id].orderID));
    }

    return(
        <>
       <Navbar></Navbar>
       {this.state.loading ?<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
    <Spinner animation='border'></Spinner>
</div> : 
            <Table style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} title="Orders" data={this.state.data} columns={columns}  selected={openPapers} delete={deleteMessage} ></Table>
             }

 <Col className='text-center'>
         <h2>Current Delivery Fees:{this.state.deliveryFees}EGP</h2>     
         <TextField id="name" label="New Delivery Fees" variant="outlined"onChange={handleDeliveryFeesChange}  ></TextField>
         <h1></h1>
      <Button onClick={sendNewDeliveryFees}>Change Delivery Fees</Button> 
      <h1></h1>
      </Col>

        </>
      
    )
    }
}

export default Home