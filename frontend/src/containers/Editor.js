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
                    this.store = new NotesStore(this.state.id);
                    this.store.getById(this.props.id);
                    this.store.emitter.addListener(CODES.CODE_GET_NOTE_BY_ID, async () => {
                        await this.setState({
                            id: this.props.id, 
                            type: this.props.type,
                            title: this.store.object.title,
                            content: this.store.object.content
                        })
                    })
                    break;
                case "reminders":
                    this.store = new RemindersStore(this.state.id);
                    this.store.getById(this.props.id);
                    this.store.emitter.addListener(CODES.CODE_GET_REMINDER_BY_ID, async () => {
                        await this.setState({
                            id: this.props.id, 
                            type: this.props.type,
                            title: this.store.object.title,
                            content: this.store.object.content
                        })
                    })
                    break;
                case "shared":
                    this.store = new SharedStore(this.state.id);
                    this.store.getById(this.props.id);
                    this.store.emitter.addListener(CODES.CODE_GET_SHARED_BY_ID, async () => {
                        await this.setState({
                            id: this.props.id, 
                            type: this.props.type,
                            title: this.store.object.title, 
                            content: this.store.object.content
                        })
                    })
                    break;
                default:
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
                 <input className={this.state.id ? "enabled" : "disabled"} 
                        type="button" value="Delete" 
                        disabled={this.state.id ? false : true}
                    onClick={() => this.delete(this.state.id)}></input>
                    <input className={this.state.id ? "enabled" : "disabled"} 
                        type="button" value="Save" 
                        disabled={this.state.id ? false : true}
                    onClick={() => this.save(this.state.id)}></input>
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
        if (this.state.id && this.store) {        
            await this.setState({ title: value });
            await this.update();
            this.store.getAll();
        }
    } 

    updateContent = async (value) => {
        if (this.state.id && this.store) {        
            await this.setState({ content: value });
            await this.update();
            this.store.getAll();
        }
    }

    update = debounce(() => {
        this.store.update(this.props.id, {
            title: this.state.title, 
            content: this.state.content
        });
    }, 500);

    delete = async (id) => {
        if (id) {
            this.store.delete(id);
            this.setState({
                id: null, 
                type: null, 
                title: '',
                content: ''
            });
            this.props.onDelete(this.state.type);
        }
    }

    save = (id) => {
        if (id) {
            this.store.getAll();
            this.props.onSave(this.state.type);
        }
    }
}


export default Editor;