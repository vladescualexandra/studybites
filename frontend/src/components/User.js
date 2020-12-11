import React, { Component } from 'react';
const API_BASE_URL = process.env.REACT_APP_API_BASEURL;

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            name: props.name,
            email: props.email
        }
    }

    componentDidMount() {
        let user = 1;

        fetch(API_BASE_URL + `/users/${user}`)
        .then((response) => response.json())
        .then((result) => {
            this.setState({
                name: result.name,
                email: result.email
            })
        })  
    }

    render() {
        return (
            <div>
                <h3>{this.state.name}</h3>
                <h4>{this.state.email}</h4>
            </div>
        )
    }
}

export default User;