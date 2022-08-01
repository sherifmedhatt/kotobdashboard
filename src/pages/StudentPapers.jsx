import { render } from '@testing-library/react';
import React, { Component } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Table from "../components/Table";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {db} from "../firebase-config";
import { Button,Dropdown,DropdownButton,Row,Col,Spinner} from 'react-bootstrap';
import {ref,set,push, onValue,update, get,child,remove} from "firebase/database"



class Home extends Component{
    constructor(props){
        super(props);
        this.state={data:[],
        teachers:[],
        teachersKeys:[],
        selectedTeacher:null,
        selectedTeacherPapers:[],
        selectedTeacherPapersKeys:[],
        selectedPaper:null, 
        papersKeys:[],
        studentTeachersKeys:[],
        selectedPaperIndex:0,
        selectedTeacherIndex:0,
        loading:true
        }
    }
    
   getTeachers=()=>{
    this.setState({loading:true})
    console.log("teachers");
    onValue(ref(db,'/teachers'),(snapshot)=>{
      this.setState({loading:false});
        var teachers=[]
        console.log(snapshot.val());
        const fetchedTeachers=snapshot.val();
        if (fetchedTeachers!=null){
          Object.values(fetchedTeachers).map((teachers1)=>{
            teachers.push(teachers1)
          })
          console.log(teachers);
          this.setState({teachers:teachers})

          Object.keys(fetchedTeachers).map((newTeacherkkey)=>{
            this.state.teachersKeys.push(newTeacherkkey)
          })
          console.log(this.state.teachersKeys);
        }
      
    });
   }

   getTeacherPapers=(id)=>{
        console.log(id);
        onValue(ref(db,'/teachers/'+id+'/papers/classifiedms'),(snapshot)=>{
            var teachers=[]
            console.log(snapshot.val());
           
            const fetchedTeachers=snapshot.val();
            if (fetchedTeachers!=null){
                Object.values(fetchedTeachers).map((teachers1)=>{
                    teachers.push(teachers1);
                  })
                  console.log(teachers);
                  this.setState({selectedTeacherPapers:teachers})
        
                  Object.keys(fetchedTeachers).map((newTeacherkkey)=>{
                    this.state.selectedTeacherPapersKeys.push(newTeacherkkey);
                  })
                  console.log(this.state.teachersKeys);
            }else{
              this.state.selectedTeacherPapers=[];
              this.state.selectedTeacherPapersKeys=[];
            }
         
        }) ;
       
   }

    getPapers = () => {
        const {student}=this.props.location;
        console.log("id");
        this.setState({loading:true});
        get(child(ref(db),'/clientsdata/'+student.ID+'/teachers')).then((snapshot)=>{
          var teachers=[]
          this.setState({loading:false});
          console.log(snapshot.val());
          const fetchedTeachers=snapshot.val();
          if (fetchedTeachers!=null){
            Object.values(fetchedTeachers).map((teachers1)=>{
              console.log("student papers");
              console.log(teachers1.name);
              teachers.push(teachers1)
            })
            console.log(teachers);
            var papers=[]
           
            teachers.map((teacher)=>{ 
              Object.values(teacher.papers.classifiedms).map((paper=>{
                  papers.push(paper);
                  console.log("student papers");
                  console.log(paper);
              }));
              
            })
                this.setState({data:papers})
      
                Object.keys(fetchedTeachers).map((newTeacherkkey)=>{
                 
                  this.state.papersKeys.push(newTeacherkkey);
                })
                console.log(this.state.papersKeys);
    }});
  }
        
       getPapers1=()=>{
        const {student}=this.props.location;  
                  let teachers=student.teachers;
                 if (teachers!==undefined){
                  var papersArray=[];
                  var teachersArray=[];
                  for (const [teacherID, teacher] of Object.entries(teachers)) {
                    teacher.teacherID=teacherID;
                     teachersArray.push(teacher);
                  }
               teachersArray.map((teacher)=>{
                let papers=teacher.papers?.classifiedms
                if (papers!==undefined){
                for (const [paperID, paper] of Object.entries(papers)) {
                  paper.paperID=paperID;
                  paper.teachername=teacher.name
                  paper.teacherID=teacher.teacherID
                   papersArray.push(paper);
                }
              }
               })
                  console.log(teachersArray);
                  console.log(papersArray);
                  this.setState({data:papersArray})
                }
              
       }
    
      

    componentDidMount() {
        console.log("dd");
        window.addEventListener('load', this.handleLoad);
        onAuthStateChanged(getAuth(),(user)=>{
            if (user){
              get(child(ref(db),"/adminuid")).then((snapshot)=>{
                console.log(snapshot.val());
                this.setState({loading:false});
                let uid=snapshot.val();
                if (user.uid===uid){ 
                  this.getPapers1();
                  this.getTeachers();
              }else{
                this.props.history.push({pathname:"/"});
              }
              })
            }else{
              this.props.history.push({pathname:"/"});
            }
        })
     }
   
   render(){
    const {student}=this.props.location;

    const columns=[
        {title:"Teacher",field:"teachername"},
        {title:"Title",field:"title"},
        {title:"Date",field:"date"}
    ]
    const addPaper=()=>{
        
    }

    const openPaper=(e)=>{
      console.log(e.tableData.id);
      console.log(this.state.data[e.tableData.id].paperlink);
      this.props.history.push({pathname:"/pdfviewer",pdflink:this.state.data[e.tableData.id].paperlink,isFromTeacher:false})
    }

    const handleSelectTeacher=(e)=>{
            this.setState({selectedPaperIndex:null});  
            this.setState({selectedPaper:null})
            this.setState({selectedTeacher:this.state.teachers[e].name});
            this.setState({selectedTeacherIndex:e});
            this.getTeacherPapers(this.state.teachersKeys[e]);
            
          }

          const handleSelectPaper=(e)=>{
            this.setState({selectedPaper:this.state.selectedTeacherPapers[e].title});
            this.setState({selectedPaperIndex:e});     
          }

          const addNewPaper=()=>{
            if (this.state.selectedPaper!=null || this.state.selectedTeacherPapers[this.state.selectedPaperIndex]!=null){
              this.setState({loading:true});
              update(ref(db,"/clientsdata/"+student.ID+"/teachers/"+this.state.teachersKeys[this.state.selectedTeacherIndex]),{
                name:this.state.teachers[this.state.selectedTeacherIndex].name,
                profilepicture:this.state.teachers[this.state.selectedTeacherIndex].profilepicture,
                subject:this.state.teachers[this.state.selectedTeacherIndex].subject,
               
               }).then(()=>{
                update(ref(db,"/clientsdata/"+student.ID+"/teachers/"+this.state.teachersKeys[this.state.selectedTeacherIndex]+"/papers/classifiedms/"+this.state.selectedTeacherPapersKeys[this.state.selectedPaperIndex]),{
                    "teachername":this.state.teachers[this.state.selectedTeacherIndex].name
                    ,"title":this.state.selectedTeacherPapers[this.state.selectedPaperIndex].title
                    ,"date":this.state.selectedTeacherPapers[this.state.selectedPaperIndex].date
                    ,"paperlink":this.state.selectedTeacherPapers[this.state.selectedPaperIndex].paperlink
                }
              
                    )
           }).then(()=>{
            this.setState({loading:false});
            alert("Paper Added Successfully");
            //this.getPapers();
            var newData=this.state.data;
            var newPaper={};
            newPaper.paperID=this.state.selectedTeacherPapersKeys[this.state.selectedPaperIndex]
            newPaper.teacherID=this.state.teachersKeys[this.state.selectedTeacherIndex];
            newPaper.profilepicture=this.state.teachers[this.state.selectedTeacherIndex].profilepicture;
            newPaper.subject=this.state.teachers[this.state.selectedTeacherIndex].subject;
            newPaper.teachername=this.state.teachers[this.state.selectedTeacherIndex].name;
            newPaper.title=this.state.selectedTeacherPapers[this.state.selectedPaperIndex].title
            newPaper.date=this.state.selectedTeacherPapers[this.state.selectedPaperIndex].date
            newPaper.paperlink=this.state.selectedTeacherPapers[this.state.selectedPaperIndex].paperlink
            newData.push(newPaper);
            this.setState({date:newData});
           })
            }else{
              alert("Please enter the above data");
             
            }
            
    }

    const deletePaper=(e)=>{
      console.log(e.tableData.id)
      console.log(student);
      remove(ref(db,"/clientsdata/"+student.ID+"/teachers/"+this.state.data[e.tableData.id].teacherID+"/papers/classifiedms/"+this.state.data[e.tableData.id].paperID)).then((e1)=>{
        var newData=[]
        newData=this.state.data.filter(obj=>{
         return obj.paperID!==this.state.data[e.tableData.id].paperID;
        })
        this.setState({data:newData});
      });
    }
    

    return(
        <>
         <Navbar></Navbar>
         {this.state.loading ? <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
    <Spinner animation='border'></Spinner>
</div>: 
       <div>
        <h1></h1>
       <Row className='text-center'>
          <Col>
          <DropdownButton onSelect={handleSelectTeacher} id="dropdown-basic-button" title="Choose Teacher">
       {this.state.teachers.map((teacher,i)=>(
              <Dropdown.Item eventKey={i}>{teacher.name}</Dropdown.Item>
          ))}
</DropdownButton>
<h1></h1>  
<h4>{this.state.selectedTeacher}</h4>
<h1></h1>
<DropdownButton onSelect={handleSelectPaper} id="dropdown-basic-button" title="Choose Paper">
 {this.state.selectedTeacherPapers.map((paper,i)=>(
              <Dropdown.Item eventKey={i}>{paper.title+" "+paper.date}</Dropdown.Item>
          ))}
  </DropdownButton> 
  <h1></h1>
  <h4>{this.state.selectedPaper}</h4>
  <Button onClick={addNewPaper}>Add</Button>

          </Col>
       

       </Row>
      
<h1></h1>
     <Table title="Papers" data={this.state.data} columns={columns} addFunction={addPaper} selected={openPaper} delete={deletePaper}></Table>

<h1></h1>
</div>
}
  
        </>
      
    )
    }
}

export default Home