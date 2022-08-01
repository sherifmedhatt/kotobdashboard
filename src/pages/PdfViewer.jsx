import React, { Component } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Document, Page,pdfjs} from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {set,ref, onValue,get,child,push} from "firebase/database"
import {db} from "../firebase-config";
import { Button,Row,Col,Spinner} from 'react-bootstrap';
import { TextField } from '@material-ui/core';


class Home extends Component{
    constructor(props){
        super(props);
        this.state={data:[],
        teachersKeys:[],
        loading:true,
        pageNumber:1,
        numPages:null,
        recieptNumber:""
        }
    }
    
    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
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
   
     state = { numPages: null, pageNumber: 1 };

     onDocumentLoadSuccess = ({ numPages }) => {
         this.setState({ numPages });
     };
 
     goToPrevPage = () =>
         this.setState((state) => ({ pageNumber: state.pageNumber - 1 }));
     goToNextPage = () =>
         this.setState((state) => ({ pageNumber: state.pageNumber + 1 }));

   render(){
    const {pdflink,teacherID,paperID,isFromTeacher,teacher,paper}=this.props.location;
    const pdfArray=pdflink.split("googleapis.com")
   console.log(pdflink);
   console.log(pdfArray);
   console.log(isFromTeacher);
   console.log("ddddddddd");
   console.log(teacherID);
   console.log("sssssss");
   console.log(paperID);
 
  const addNewReceipt=()=>{
    this.setState({loading:true});
    console.log(teacher);
    console.log(paper);
    get(child(ref(db),"/receipts/"+teacher.id+paper.id+this.state.recieptNumber)).then((snapshot)=>{
        console.log(snapshot.val());
        this.setState({loading:false});
        let result=snapshot.val();
        if (result==null){ 
          addReceiptFunction();
      }else{
        alert("This receipt number already exists");
      }
      })
    
   }

 const addReceiptFunction=()=>{
    this.setState({loading:true});
      set(ref(db,"/receipts/"+teacher.id+paper.id+this.state.recieptNumber),{
      used:false,
      receiptID:teacher.id+paper.id+this.state.recieptNumber,
      fBteacherID:teacher.ID,
      fBpaperID:paper.ID,
      teacherID:teacher.id,
      paperID:paper.id,
      teacherName:teacher.name,
      paperName:paper.title,
      paperlink:paper.paperlink,
      date:paper.date,
      profilepicture:teacher.profilepicture,
      subject:teacher.subject

      }).then(()=>{
       this.setState({loading:false});
       alert("Receipt has been added successfully");
      });
 }


   const handleChange=(e)=>{
      this.state.recieptNumber=e.target.value
   }

    return(
        <>
         <Navbar></Navbar>
         {isFromTeacher ?
         <Col className='text-center'>
         <h1>{}</h1>     
         <TextField id="name" label="Receipt Number" variant="outlined"onChange={handleChange}  ></TextField>
         <h1>{}</h1>
      <Button onClick={addNewReceipt}>Create New Reciept</Button> 
      <h1></h1>
      </Col> : <Col></Col>
        }
         
         <div className='text-center' > 
				<nav>
					<button onClick={this.goToPrevPage}>Prev</button>
					<button onClick={this.goToNextPage}>Next</button>
				</nav>

				<div  style={{display: 'flex',  justifyContent:'center'}}>
					<Document className="solidborder"
						file={pdfArray[1]}
						onLoadSuccess={this.onDocumentLoadSuccess}
					>
						<Page pageNumber={this.state.pageNumber} width={600} />
					</Document>
				</div>

				<p>
					Page {this.state.pageNumber} of {this.state.numPages}
				</p>
			</div>
        </>
      
    )
    }
}

export default Home