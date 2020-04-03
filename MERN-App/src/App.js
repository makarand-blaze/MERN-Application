import React, { Component } from 'react';
//import './../node_modules/spectre.css/dist/spectre.min.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../src/styles.css';
import FormContainer from './containers/FormContainer';

class App extends Component {
  render() {
    return (
      
       <div className="container">
         <div className="columns">
          <div className="col-md-8 centered">
            <h3>React.js Controlled Form Components</h3>
            <FormContainer />
          </div>
        </div>
      </div>
     
    );
  }
}

export default App;
