import React, { Component } from 'react'
import './style.css';
function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {

        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

class Table extends Component {
   constructor(props) {
      super(props) 
      this.state = { 
        results: [],
        search: '',
        filterResult:[],
        searched:false,
         employees: [
            {
                id: 1,
                firstName: 'Albert',
                lastName:'Chen',
                title:'CEO',
                level:'8',
              },
              {
                  id: 2,
                  firstName: 'Lucy',
                  lastName:'Kao',
                  title:'President',
                  level:'6',
              },
              {
                  id: 3,
                  firstName: 'Mark',
                  lastName:'Kawasara',
                  title:'Director',
                  level:'4',
              },
              {
                  id: 4,
                  firstName: 'Peter',
                  lastName:'Smith',
                  title:'Program Manager',
                  level:'3',
              },
              {
                  id: 5,
                  firstName: 'Alan',
                  lastName:'Tucker',
                  title:'Program Manager',
                  level:'3',
              },
              {
                  id: 6,
                  firstName: 'Tom',
                  lastName:'Styer',
                  title:'Software Developer',
                  level:'2',
              }
         ]
      }
   };
   
   
   renderTableData() {
    return this.state.employees.map((employee, index) => {
       const { id, firstName, lastName, title, level } = employee //destructuring
       return (
          <tr key={id}>
             <td>{id}</td>
             <td>{firstName}</td>
             <td>{lastName}</td>
             <td>{title}</td>
             <td>{level}</td>
          </tr>
       )
    })
 }
 
 handleClick = event => {
    console.log(event.key);
		let sortedEmployees;

		if (event.key === 'id') {
            sortedEmployees= this.state.employees.sort(dynamicSort('id'));
                this.setState({ results: sortedEmployees });
		console.log(this.state.results);
            } 
        else if (event.key === 'firstName') {
            sortedEmployees= this.state.employees.sort(dynamicSort('firstName'));
                this.setState({ results: sortedEmployees });
		console.log(this.state.results);
        } 
        else if (event.key === 'lastName') {
            sortedEmployees= this.state.employees.sort(dynamicSort('lastName'));
                this.setState({ results: sortedEmployees });
		console.log(this.state.results);
        } 
        else if (event.key === 'title') {
            sortedEmployees= this.state.employees.sort(dynamicSort('title'));
                this.setState({ results: sortedEmployees });
		console.log(this.state.results);
        } 
        else if (event.key === 'level') {
            sortedEmployees= this.state.employees.sort(dynamicSort('level'));
                this.setState({ results: sortedEmployees });
		console.log(this.state.results);
        } 
		
	};
    

 renderTableHeader() {
    let header = Object.keys(this.state.employees[0])
    return header.map((key, index) => {
       return <th key={index} id={key} onClick={() => this.handleClick({key})}>{key.toUpperCase()}</th>
    })
 }

 searchSpace=(event)=>{
     let keyword = event.target.value;
    console.log(keyword);
    this.setState({search:keyword});
  };
  mySubmitHandler = (event) => {
    event.preventDefault();
    console.log(this.state.search);
    let keyword = this.state.search;
    let data = this.state.employees;
    const filtered = data.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(keyword)));
    console.log(filtered);
    this.setState({filterResult:filtered, searched: true});
  }
  renderSearchResult(){
    if (this.state.searched === true){
        return this.state.filterResult.map((employee, index) => {
            const { id, firstName, lastName, title, level } = employee //destructuring
            return (
               <tr key={id}>
                  <td>{id}</td>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{title}</td>
                  <td>{level}</td>
               </tr>
            )
         })
    } else {
        return;
    }
  }
 
 render() {
    return (
       <div>
          <h1 id='title'>Employee Directory Demo</h1>
          <table id='employee' className="table">
             <tbody className="thead-dark">
                {this.renderTableHeader()}
                {this.renderTableData()}
                <input type="text" onChange={this.searchSpace} placeholder="search for employees" /><button onClick={this.mySubmitHandler}>Submit</button>
                {this.renderSearchResult()}
             </tbody>
          </table>
       </div>
    )
 }
}

export default Table //exporting a component make it reusable and this is the beauty of react

