import React, { Component } from 'react'
import MaterialTable from 'material-table'
class Table extends Component {
    
    render(){
        
    return (
            <MaterialTable title={this.props.title}
            data={this.props.data}
            columns={this.props.columns}
            options={{
                filtering:true,
                exportButton:true
            }}
            actions={[{
                icon:"add_box",
                tooltip:"Add",
                position:"toolbar",
                onClick:()=>
                    this.props.addFunction()
                
            }]}
            onRowClick={(event,rowData)=>
                this.props.selected(rowData)
            }
            editable={{onRowDelete:(selectedRow)=>new Promise((resolve,reject)=>{
            setTimeout(()=>resolve(),1000);
            this.props.delete(selectedRow);
            })}}
            ></MaterialTable>
     
    )
}}

export default Table
