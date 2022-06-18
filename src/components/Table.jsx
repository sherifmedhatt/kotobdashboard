import React, { Component } from 'react'
import MaterialTable from 'material-table'
class Table extends Component {
    
    render(){
        
        const data=[
            {name:"shefna",email:"shefna@gmail.com",nationalid:"12345678901234"},
            {name:"sherif medhat",email:"sherif@gmail.com",nationalid:"12345678901234"},
            {name:"ahmed emad",email:"ahmedemad@gmail.com",nationalid:"12345678901234"}
        ]
        const columns=[
            {title:"Name",field:"name"},
            {title:"Email",field:"email"},
            {title:"National ID",field:"nationalid"}
        ]
    return (
        <div className="table">
            <MaterialTable title={this.props.title}
            data={data}
            columns={columns}
            options={{
                filtering:true,
                exportButton:true
            }}
            ></MaterialTable>
        </div>
    )
}}

export default Table
