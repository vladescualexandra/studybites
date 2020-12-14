import './App.css';
import Menu from './containers/Menu';
import Editor from './containers/Editor';
import React, {Component} from 'react';
import UserStore from './stores/UserStore';
import CODES from './codes.json';

class App extends Component{
  constructor() {
    super();

    this.state = { 
      user: {
        id: 0,
        name: '',
        email: ''
      },
      id: 0,
      type: '',
    }

    this.store = new UserStore();

    this.handleLogin = async (value) => {

      await this.store.getUserById(value);

      this.store.emitter.addListener(CODES.CODE_GET_USER_BY_ID, async () => {
        console.log("??????")
      })

      await this.setState({
        user: {
          id: value,
          name: this.store.user.name,
          email: this.store.user.email
        }
      })
    }

    this.handleSelect = async (selectedId, selectedType) => {
      await this.setState({
        id: selectedId, 
        type: selectedType
      })
    }
  }

  render() {
    return (
        <div>
          <Menu id={this.state.user.id} 
                name={this.state.user.name}
                email={this.state.user.name}
                onSelect={this.handleSelect}
                onLogin={this.handleLogin}/>
          <Editor id={this.state.id} type={this.state.type}/>
        </div>
    );
  }
}

export default App;
