import './App.css';
import Menu from './containers/Menu';
import Editor from './containers/Editor';
import React, {Component} from 'react';

class App extends Component{
  constructor() {
    super();

    this.state = { 
      user: {
        id: 1
      },
      id: 0,
      type: '',
    }


    this.handleSelect = async (selectedId, selectedType) => {
      await this.setState({
        id: selectedId, 
        type: selectedType
      })
    }

  
  }

  
  componentDidMount() {
  }
  
  render() {
    return (
        <div>
          <Menu id={this.state.user.id} onSelect={this.handleSelect}/>
          <Editor id={this.state.id} type={this.state.type}/>
      </div>
    );
  }
}

export default App;
