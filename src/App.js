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
      type: ''
    }

    this.store = new UserStore();

    this.handleLogin = async (value) => {
      if (value > 0) {
        await this.store.getUserById(value);
        this.store.emitter.addListener(CODES.CODE_GET_USER_BY_ID, async () => {
          await this.setState({
            user: {
              id: this.store.user.id,
              name: this.store.user.name,
              email: this.store.user.email
            }
          });
        });
      } else {
        await this.setState({
          user: {
            id: value,
            name: '',
            email: ''
          }
        })
      }
      localStorage.setItem('userID', value)   
    }

    this.handleSelect = async (selectedId, selectedType) => {
      await this.setState({
        id: selectedId, 
        type: selectedType
      });
    }

    this.handleSave = async (value) => {
      this.handleSelect(this.state.id, value);
    }

    this.handleDelete = (value) => {
      // here the menu should be updated
      // but idk how, cuz the state won't change
      // since you have to select an item before deleting it
      // so the state is already set to that id and value

    }
  }

  async componentDidMount() {
    if (localStorage.getItem('userID')) {
      let userID = await localStorage.getItem('userID');

      await this.store.getUserById(userID).then(() => {
        this.setState({
          user: {
            id: parseInt(userID),
            name: this.store.user.name,
            email: this.store.user.email
          }
        });
      });
    } 
  }

  render() {
    return (
        <div>
          <Menu id={this.state.user.id} 
                name={this.state.user.name}
                email={this.state.user.name}
                selectedId={this.state.id}
                selectedType={this.state.type}
                update={this.state.update}
                onSelect={this.handleSelect}
                onLogin={this.handleLogin}
                />

          <Editor 
            userID={this.state.user.id}
            id={this.state.id} 
            type={this.state.type}
            onEdit={this.handleEdit}
            onSave={this.handleSave}
            onDelete={this.handleDelete}/>
        </div>
    );
  }
}

export default App;
