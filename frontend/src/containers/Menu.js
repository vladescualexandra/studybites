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

class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            selected: {
                id: this.props.id,
                type: this.props.type
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

    async componentDidMount() {
        await this.setState({
            id: this.props.id
        })
    }


    render() {
        return (
            <div id="menu" onSelect={this.handleSelect}>
                <User id={this.state.id}/>
                <New id={this.state.id} onCreate={this.handleCreate}/>
                <NotesList id={this.state.id} onSelect={this.handleSelect}/>
                <BooksList id={this.state.id} onSelect={this.handleSelect}/>
                <RemindersList id={this.state.id} onSelect={this.handleSelect}/>
                <SharedList id={this.state.id} onSelect={this.handleSelect}/>
            </div>
        )
    }
}

export default Menu;