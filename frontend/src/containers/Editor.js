import React, { Component } from 'react';
import CODES from '../codes.json';
import NotesStore from '../stores/NotesStore';
import RemindersStore from '../stores/RemindersStore';

class Editor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            type: this.props.type,
            title: '',
            content: ''
        }

        this.store = null;
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            switch(this.props.type) {
                case "notes":
                    this.store = new NotesStore();
                    this.store.getById(this.props.id);
                    this.store.emitter.addListener(CODES.CODE_GET_NOTE_BY_ID, () => {
                        this.setState({
                            title: this.store.object.title,
                            content: this.store.object.content
                        })
                    })
                    break;
                case "reminders":
                    this.store = new RemindersStore();
                    this.store.getById(this.props.id);
                    this.store.emitter.addListener(CODES.CODE_GET_REMINDER_BY_ID, () => {
                        this.setState({
                            title: this.store.object.title,
                            content: this.store.object.details
                        })
                    })
                    break;
                default:
                    this.store = new RemindersStore();
                    break;
            }       
        } 
    }

    render() {
        return (
            <div id="editor">
                <input 
                    id="title" 
                    type="text" 
                    placeholder="Title"
                    value={this.state.title ? this.state.title : ''}
                    /> <br/>
                <textarea 
                    id="content" 
                    type="textarea" 
                    placeholder="Content" 
                    value={this.state.content ? this.state.content : ''}
                    />
            </div>
        )
    }
}


export default Editor;