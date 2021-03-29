import React, { Component } from 'react';
import UserStore from '../stores/UserStore';
import CODES from '../codes.json';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: -1,
            name: '',
            email: '',
        }

        this.store = new UserStore();

        this.handleClickOpenSignIn = () => {
            if (document.getElementById('signinForm') != null) {
                document.getElementById('signinForm').setAttribute('class', 'enabled');
            }
            if (document.getElementById('signupForm') != null) {
                document.getElementById('signupForm').setAttribute('class', 'disabled');
            }
        }

        this.handleClickOpenSignUp = () => {
            if (document.getElementById('signinForm') != null) {
                document.getElementById('signinForm').setAttribute('class', 'disabled');
            }
            if (document.getElementById('signupForm') != null) {
                document.getElementById('signupForm').setAttribute('class', 'enabled');
            }        
        }

        this.handleSignIn = async () => {
            let email = document.querySelector('#inEmail').value;
            let password = document.querySelector('#inPassword').value;

            if (password.length > 3
                && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
                
                 await this.store.validate(email, password);
                    await this.store.emitter.emit(CODES.CODE_GET_USER, async () => {
                        console.log("log in - emit");
                    });  
                    
                    if (this.store.user !== null 
                        && this.store.user !== undefined) {
                        await this.setState({
                            id: this.store.user.id,
                            name: this.store.user.name, 
                            email: this.store.user.email
                        });  
                        this.props.onLogin(this.state.id);
                    } else {
                        alert("Incorrect email or password");
                        this.props.onLogin(0);
                    }
                } else {
                    alert("Invalid data!");
                }
        }

        this.handleSignUp = async () => {
            let name = document.querySelector('#upName').value;
            let email = document.querySelector('#upEmail').value;
            let password = document.querySelector('#upPassword').value;

             if (name.length > 3 
                && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
                && password.length > 3) {
                
                    await this.store.create(name, email, password);

                await this.store.emitter.emit(CODES.CODE_GET_USER, async () => {
                    console.log("sign up - emit");
                });
                if (this.store.user != null) {
                    await this.setState({
                        id: this.store.user.id,
                        name: this.store.user.name, 
                        email: this.store.user.email
                    });  
    
                    alert("Account created successfully");
                    this.handleClickOpenSignIn();
                    
                    this.props.onLogin(this.state.id); 
                } else {
                    console.log(this.store.user);
                    alert("Account already exists!");
                    this.props.onLogin(0);
                }
            } else {
                alert("Inavlid data!");
            }
        }

        this.handleSignOut = async () => {
            this.props.onLogin(0);
        }
    }

    async componentDidMount() {
        await this.setState({
            id: this.props.id, 
            name: this.props.name, 
            email: this.props.email
        });  
    }


    async componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            await this.setState({
                id: this.props.id, 
                name: this.props.name, 
                email: this.props.email
            });
        }
    }

    render() {
        return (
            <div id="user">
                {this.handleLogin()}
            </div>
        )
    }

    handleLogin() {
        if (this.state.id < 1) { 
            return this.displayLogin();
        } else {
            return this.displayUser();
        };
    }

 

    displayLogin() {
        return (
            <div>

                <input  className="loginButton" type="button" value="Sign in"
                    onClick={this.handleClickOpenSignIn}/>

                <input  className="loginButton" type="button" value="Sign up"
                    onClick={this.handleClickOpenSignUp}/>
                
                <div  id="signinForm" className="disabled">
                    <input id="inEmail" className="login" type="email" placeholder="email"/>
                    <input id="inPassword" className="login" type="password" placeholder="password"/>
                    <input id="signIn" className="loginButton" type="button" value="Login"
                        onClick={this.handleSignIn}/>
                </div>

                <div id="signupForm" className="disabled">
                <input  id="upName" className="login" type="text" placeholder="name"/>
                <input id="upEmail" className="login" type="email" placeholder="email"/>
                <input id="upPassword" className="login" type="password" placeholder="password"/>
                <input id="signUp" className="loginButton" type="button" value="Create new account"
                    onClick={this.handleSignUp}/>
                </div>
            </div>
            );
    }

    displayUser() {
        return ( 
            <div>
                <h3>{this.state.name}</h3>
                <h4>Your id: {this.state.id}</h4>
                <input id="signOut" className="loginButton" type="button" value="Sign out" 
                    onClick={this.handleSignOut}/>
            </div>
            );
    }
}

export default User;