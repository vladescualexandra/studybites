import React, { Component } from 'react';
import UserStore from '../stores/UserStore';
import CODES from '../codes.json';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: -1,
            name: '',
            email: ''
        }

        this.store = new UserStore();

        this.handleLogin = async (id, name, email) => {
            this.props.onLogin(id, name, email);
        }

        this.handleClick = async () => {
            if (this.state.id < 1) {
                let newID = prompt("What's ur id?");

                await this.store.getUserById(newID);
                this.store.emitter.addListener(CODES.CODE_GET_USER_BY_ID, async () => {
                    console.log("??????")
                })
                
                await this.setState({
                    id: newID,
                    name: this.store.user.name,
                    email: this.store.user.email
                })

                this.props.onLogin(newID);

            } else {
                alert(this.state.id);
            }
        } 
    }

    async componentDidMount() {

    }

    render() {
        return (
            <div id="user">
                <h4 onClick={this.handleClick}>
                    {this.state.name ? this.state.name : 'login'}</h4>
            </div>
        )
    }
}

export default User;