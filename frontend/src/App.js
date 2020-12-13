import './App.css';
import Menu from './containers/Menu';
import Editor from './containers/Editor';
import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./Login.css";

class App extends Component{
  constructor() {
    super();

    this.state = { 
      user: {
        id: 1,
        name: '',
        email: ''
      },
      id: 0,
      type: '',
      login: false, 
      loginClass: "enabled",
      appClass: "disbaled"
    }


    this.handleSelect = async (selectedId, selectedType) => {
      await this.setState({
        id: selectedId, 
        type: selectedType
      })
    }

    this.handleSubmit = async () => {
        if (this.validate) {
          
            await this.setState({
              login: true,
              loginClass: "disabled", 
              appClass: "enabled"
            })
          

        }
      }

      this.validate = () => {
        return this.state.user.email.length > 0 && this.state.user.password.length > 0;
      }

      this.setPassword = async (value) => {
        await this.setState({
          user: {
            id: this.state.user.id,
            email: this.state.user.email, 
            password: value
          }
        })
      }
  
      this.setEmail = async (value) => {
        await this.setState({
          user: {
            id: this.state.user.id, 
            email: value, 
            password: this.state.user.password
          }
        })
      }
  }

  

  
  render() {
    return (
      <div>
        <div className={this.state.loginClass}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={this.state.user.email}
                onChange={(e) => this.setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={this.state.user.password}
                onChange={(e) => this.setPassword(e.target.value)}
              />
            </Form.Group>
            <Button block size="lg" type="button" disabled={!this.validate()}
                onClick={() => this.handleSubmit()}>
              Login
            </Button>
          </Form>
        </div>

        <div className={this.state.appClass}>
          <Menu id={this.state.user.id} onSelect={this.handleSelect}/>
          <Editor id={this.state.id} type={this.state.type}/>
        </div>
      </div>
    );
  }
}

export default App;
