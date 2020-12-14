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
import UserStore from '../stores/UserStore';
import CODES from '../codes.json';

class Menu extends Component {

   
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            name: this.props.name, 
            email: this.props.email, 
            selected: {
                id: this.props.id,
                type: this.props.type
            }
        }

        this.store = new UserStore();

        this.handleLogin = async (value) => {
            if (value > 0) {
                await this.store.getUserById(value);
                this.store.emitter.addListener(CODES.CODE_GET_USER_BY_ID, async () => {
                    console.log("??????")
                    await this.setState({
                        id: value,
                        name: this.store.user.name,
                        email: this.store.user.email
                    })
                })
                
                
            } else {
                await this.setState({
                    id: 0,
                    name: '',
                    email: ''
                })
            }

           this.props.onLogin(value);    
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

    async componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            await this.setState({
                id: this.props.id, 
                name: this.props.name, 
                email: this.props.email
            })
        }
    }

    render() {
        return (
            <div id="menu" onSelect={this.handleSelect}>
                <User id={this.state.id} 
                        name={this.state.name}
                        email={this.state.email}
                        onLogin={this.handleLogin}/>
                <New  id={this.state.id} onCreate={this.handleCreate}/>
                <NotesList id={this.state.id} onSelect={this.handleSelect}/>
                <BooksList id={this.state.id} onSelect={this.handleSelect}/>
                <RemindersList id={this.state.id} onSelect={this.handleSelect}/>
                <SharedList id={this.state.id} onSelect={this.handleSelect}/>
            </div>
        )
    }
}

export default Menu;