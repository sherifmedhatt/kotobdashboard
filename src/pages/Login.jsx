import React,{useState} from 'react';
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from '../firebase-config'
import {Spinner} from 'react-bootstrap';

function Login({Login,error}) {
    const [details,setDetails]=useState({email:"",password:""});
    var [loading,setLoading]=useState(false);
   
    const login=async()=>{
        try{
            console.log(details.email);
            console.log(details.password);
            setLoading(loading=true)
            const user=await signInWithEmailAndPassword(
                auth,
                details.email,
                details.password,
            );
            console.log("success");
            setLoading(loading=false)
            window.location = '/teachers';
            console.log(user);
        }catch(error){
            setLoading(loading=false)
            console.log(error.message);
            alert(error.message);
        }
    }
    return (
        <>
       {loading ? <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
       <Spinner animation='border'></Spinner>
   </div> : <div >
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
                <input onClick={login} className='btn btn-primary' type="submit" value="Login"></input>
                </div>
           </div>
           </div>
           </div>
      
       </div> }
       
        </>
    )
}

export default Login
