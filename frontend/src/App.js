import './App.css';
import Menu from './containers/Menu';
import React, {Component} from 'react';

class App extends Component{
  constructor() {
    super();

    this.state = {
      id: 0
    }
  }
  
  render() {
    return (
        <div>
          <Menu />
      </div>
    );
  }
}

export default App;
