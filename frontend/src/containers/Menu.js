import React, { Component } from 'react';

import User from '../components/User';
import New from './New';
import NotesList from './NotesList';
import BooksList from './BooksList';
import RemindersList from './RemindersList';
import SharedList from './SharedList';
import NotesStore from '../stores/NotesStore';
import RemindersStore from '../stores/RemindersStore';
import SharedStore from '../stores/SharedStore';

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
            selected: {
                type: this.props.type,
                id: this.props.id
            }
        }

        this.handleSelect = async (selectedId, selectedType) => {
            this.props.onSelect(selectedId, selectedType);
            await this.setState({
                selected: {
                    type: selectedType,
                    id: selectedId
                }
            });
        }

        this.handleCreate = async (value) => {
            switch(value) {
                case "note":
                    this.store = new NotesStore();
                    let note = await this.store.create({
                        title: '',
                        content: ''
                    });
                    this.props.onSelect(note.id, 'notes');
                    break;
                case "reminder":
                    this.store = new RemindersStore();
                    let reminder = await this.store.create({
                        title: '',
                        content: ''
                    });
                    this.props.onSelect(reminder.id, 'reminders');
                    break;
                case "shared":
                    this.store = new SharedStore();
                    let shared = await this.store.create({
                        title: '',
                        content: ''
                    });
                    this.props.onSelect(shared.id, 'shared');
                    break;
                default:
                    break;
            }
            
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
            <div id="menu" onSelect={this.handleSelect}>
                <User />
                <New onCreate={this.handleCreate}/>
                <NotesList onSelect={this.handleSelect}/>
                <BooksList onSelect={this.handleSelect}/>
                <RemindersList onSelect={this.handleSelect}/>
                <SharedList onSelect={this.handleSelect}/>
            </div>
        )
    }
}

export default Menu;