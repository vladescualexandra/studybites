import React, { Component } from 'react';
import UserStore from '../stores/UserStore';
// import CODES from '../codes.json';
class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: -1,
            name: '',
            email: ''
        }

        this.store = new UserStore();

        this.handleClick = async () => {


            let newID;
            if (this.state.id < 1) {
                newID = prompt("What's ur id?");
            } else {
                newID = 0;
            }
            this.props.onLogin(newID);
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
                <h5>Your id: {this.state.id ? this.state.id : 'none'}</h5>
                <h4 onClick={this.handleClick}>
                    {this.state.name ? this.state.name : 'login'}</h4>

                <input id="logout" type="button" onClick={this.handleClick} value="Log out"/>
            </div>
        )
    }
}

export default User;