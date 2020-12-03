import React, { Component } from 'react';

import NotesList from './NotesList';
import BooksList from './BooksList';
import RemindersList from './RemindersList';
import SharedList from './SharedList';

const API_BASE_URL = process.env.REACT_APP_API_BASEURL;
const user = {
    id: 1
};

class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            email: null,
            selected: {}
        }

        
    } 


    componentDidMount() {
        fetch(API_BASE_URL + `/users/${user.id}`)
        .then((result) => result.json())
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
                <input type="button" value="Notes" />
                <NotesList />
                <input type="button" value="Books" />
                <BooksList />
                <input type="button" value="Reminders" />
                <RemindersList />
                <input type="button" value="Shared" />
                <SharedList />
            </div>
        )
    }
}

export default Menu;