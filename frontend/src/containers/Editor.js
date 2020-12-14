import React, { Component } from 'react';
import CODES from '../codes.json';
import NotesStore from '../stores/NotesStore';
import RemindersStore from '../stores/RemindersStore';
import SharedStore from '../stores/SharedStore';
import debounce from '../helpers';

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
        this.setState({
            id: this.props.id, 
            type: this.props.type
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            switch(this.props.type) {
                case "notes":
                    this.store = new NotesStore();
                    this.store.getById(this.props.id);
                    this.store.emitter.addListener(CODES.CODE_GET_NOTE_BY_ID, () => {
                        this.setState({
                            id: this.props.id, 
                            type: this.props.type,
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
                            id: this.props.id, 
                            type: this.props.type,
                            title: this.store.object.title,
                            content: this.store.object.content
                        })
                    })
                    break;
                case "shared":
                    this.store = new SharedStore();
                    this.store.getById(this.props.id);
                    this.store.emitter.addListener(CODES.CODE_GET_SHARED_BY_ID, () => {
                        this.setState({
                            id: this.props.id, 
                            type: this.props.type,
                            title: this.store.object.title, 
                            content: this.store.object.content
                        })
                    })
                    break;
                default:
                    this.store = new NotesStore();
                    this.setState({
                        title: '',
                        content: ''
                    })
                    break;
            }       
        } 
    }

    render() {
        return (
            <div id="editor">
                 <input type="button" value="Delete" 
                    onClick={() => this.delete(this.state.id)}></input>
                <input 
                    id="title" 
                    type="text" 
                    placeholder="Title"
                    value={this.state.title ? this.state.title : ''}
                    onChange={(e) => this.updateTitle(e.target.value)}
                    /> <br/>
                <textarea 
                    id="content" 
                    type="textarea" 
                    placeholder="Content" 
                    value={this.state.content ? this.state.content : ''}
                    onChange={(e) => this.updateContent(e.target.value)}
                    />
            </div>
        )
    }

    updateTitle = async (value) => {
        if (this.state.id) {        
            await this.setState({ title: value });
            await this.update();
            this.store.getAll();
        }
    } 

    updateContent = async (value) => {
            if (this.state.content) {
            await this.setState({ content: value });
            await this.update();
            this.store.getAll();
        }
    }

    update = debounce(() => {
        this.store.update(this.props.id, {
            title: this.state.title, 
            content: this.state.content
        })
    }, 500);

    delete = async (id) => {
        this.store.delete(id);
        this.setState({
            id: null, 
            type: null, 
            title: '',
            content: ''
        })
    }
}


export default Editor;