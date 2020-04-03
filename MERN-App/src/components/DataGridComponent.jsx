import React, { Component } from 'react';


class DataGridComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            column :[ 'StudentId', 'StudentName','StudentEmail','DateOfBirth',
			'Course','University','Year','Description','Image']
         }
    }
    
    handleRowClick=(row)=>{
        this.props.selectedRow(row);
    }


    delStd=(evt)=>{
          this.props.deleteStd(evt.target.value) 
    }
    
    sortOrder(x){
        return function(m,n){
            if(m[x] > n[x]){
                return 1;
            }else if(m[x] < n[x]){
                return -1;
            }
        return 0;
        }
    }

    sortData=(evt)=>{
        let students = this.props.dataSource;
        console.log(evt.target.className);
        if(evt.target.className == 'up'){
            students.sort(this.sortOrder([evt.target.id]));            
        }
        else if(evt.target.className == 'down'){
            students.sort(this.sortOrder([evt.target.id]));
            students.reverse();             
        }
        this.setState({data: students});       
    }

    render() { 
        console.log(`In DataGrid ${JSON.stringify(this.props.dataSource)}`);
       
        return ( 
        <div className="container">
          <table className="table table-bordered table-striped">
             <thead>
               <tr>
                  {
                      this.state.column.map((c,i) => (
                          <th Key={i}>
                              {
                                  c
                              }
                          </th>
                          
                      ))
                  }
               </tr>
             </thead>
             <tbody>
               {
                   this.props.dataSource.map((s,j) => (
                       <tr key={j}>
                           {
						  <td>{s.StudentId}</td>
						 }
						 {
						  <td>{s.StudentName}</td>
						 }
						 {
						  <td>{s.StudentEmail}</td>
						 }
						 {
						  <td>{s.DateOfBirth}</td>
						 }
						 {
						  <td>{s.Course}</td>
						 }
						 {
						  <td>{s.University}</td>
						 }
						 {
						   <td>{s.Year}</td>
						 }
						 {
						   <td>{s.Description}</td>
						 }
                           {
                            <td>
                            { 
                              <img src={`data:image/jpeg;base64,${s.File}`}  
                                style={{width: 100, height: 100}} alt="data"></img>
                            }
                            </td>
                           }
                       </tr>
                   ))
               }
             </tbody>
          </table>
        </div>
        );
    }
}
 
export default DataGridComponent;