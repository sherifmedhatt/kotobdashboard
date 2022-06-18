import React,{useState} from 'react';
import {signInWithEmailAndPassword} from "firebase/auth";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase-config'

function Login({Login,error}) {
    const [details,setDetails]=useState({email:"",password:""});

    function submitHandler(){
        console.log("dddd");
       
    }
    const login=async()=>{
        try{
            console.log(details.email);
            console.log(details.password);
            const user=await createUserWithEmailAndPassword(
                auth,
                details.email,
                details.password,
            );
           
            console.log(user);
        }catch(error){
            console.log(error.message);
            alert(error.message);
        }
    }
    return (
       
       <form  onSubmit={login}>
           <div className="container">
           <div className='row'>
       <div className='col-10 mx-auto text-center text-title text-uppercase pt-5'>
       <div className="solidborder">
            <h2>Login</h2>
    
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input className="solidborder" type="email" name="email" id="email" onChange={e=>setDetails({...details,email:e.target.value})} value={details.email}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Password:</label>
                    <input className="solidborder" type="password" name="password" id="password" onChange={e=>setDetails({...details,password:e.target.value})} value={details.password}/>
                </div>
                <input  className='btn btn-primary' type="submit" value="Login"></input>
                </div>
           </div>
           </div>
           </div>
      
       </form>

    )
}

export default Login
