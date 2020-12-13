import React, { Component } from 'react';
const API_BASE_URL = process.env.REACT_APP_API_BASEURL;

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            name: '',
            email: ''
        }

        this.handleClick = () => {
            alert("handle click user");
        }
    }

    async componentDidMount() {

        await this.setState({
            id: this.props.id
        })

        fetch(API_BASE_URL + `/users/${this.state.id}`)
        .then((response) => response.json())
        .then((result) => {

            console.log(result)
            this.setState({
                name: result.name,
                email: result.email
            })
        })  
    }

    render() {
        return (
            <div id="user">
                <h4 onClick={this.handleClick}>{this.state.name ? this.state.name : 'login'}</h4>
            </div>
        )
    }
}

export default User;