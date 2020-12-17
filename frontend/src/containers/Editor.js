import React, { Component } from 'react';
import CODES from '../codes.json';
import NotesStore from '../stores/NotesStore';
import RemindersStore from '../stores/RemindersStore';
import SharedStore from '../stores/SharedStore';
import debounce from '../helpers';
import BooksStore from '../stores/BooksStore';
import CollaboratorsStore from '../stores/CollaboratorsStore';
import UserStore from '../stores/UserStore';

class Editor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: this.props.id,
            bookID: null,
            id: this.props.id,
            type: this.props.type,
            title: '',
            content: '',
            books: [],
            collaborators: []
        }

        this.store = null;
    }

    componentDidMount() {
        this.setState({
            userID: this.props.userID,
            id: this.props.id, 
            type: this.props.type,
            collaborators: [],
            books: [],
        })
    }

    async componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            console.log("before update: ", this.state.id);
            console.log(this.state.collaborators);
            await this.setState({
                userID: this.props.userID
            });
            switch(this.props.type) {
                case "notes":
                    this.store = new NotesStore(this.state.id);
                    this.store.getById(this.props.id);
                    this.store.emitter.addListener(CODES.CODE_GET_NOTE_BY_ID, async () => {
                        await this.setState({
                            id: this.props.id, 
                            type: this.props.type,
                            bookID: this.store.object.bookID,
                            title: this.store.object.title,
                            content: this.store.object.content
                        });

                    });



                    let bookStore = new BooksStore(this.state.userID);
                    bookStore.getAll(this.state.userID);
                    bookStore.emitter.addListener(CODES.CODE_GET_ALL_BOOKS, async () => {
                        await this.setState({
                            books: bookStore.books
                        });
                    });
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
                        });
                    });

                    let collabsStore = new CollaboratorsStore();
                    await collabsStore.getCollaboratorsBySharedId(this.state.id);
                    let collabsIds = collabsStore.collaborators;

                    let userStore = new UserStore();
                    let col = [];
                    for (let i = 0; i < collabsIds.length; i++) {
                        let user = await userStore.getUserById(collabsIds[i].userId);
                        col.push(user);
                    }
                    await this.setState({
                        collaborators: col
                    });
                    console.log("after update: ", this.state.id);
                    console.log(this.state.collaborators);

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

                
                <select 
                    className={this.state.id && this.state.type === 'notes' ? "enabled" : "disabled"}
                    onChange={(e) => this.handleSelectBook(e.target.value)}>
                    {this.createSelectItems()}
                </select>

                <div id="collaborators" 
                    className={this.state.type === 'shared' ? "enabled" : "disabled"}>
                    <ol>
                        {/* {this.getCollaborators()} */}
                        {this.state.collaborators.map(
                            (item, index) => (
                                <li key={index}>{item.name}</li>
                            ))}
                    </ol>
                    <input id="collabID" type="text" placeholder="Add a new collaborator"></input>
                    <input 
                    type="button" value="Add" 
                        onClick={() => this.addCollaborator()}></input>
                </div>
                


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

    setBook = (value) => {
        let updatedNote = {
            bookID: value
        }
        if (parseInt(value)) {
            this.store.update(this.state.id, updatedNote);
        }
    }

    createSelectItems() {
        let items = [];
        
        for (let i=0; i< this.state.books.length; i++) {
            if (this.state.books[i]) {
                items.push(<option key={i} value={this.state.books[i].id} 
                selected={this.state.bookID === this.state.books[i].id}>
                    {this.state.books[i].name}
                </option>);
            } 
        }
        return items;
    }

    handleSelectBook(value) {
        let updatedNote = {
            bookID: parseInt(value)
        }
        this.store.update(this.state.id, updatedNote);
    }

    addCollaborator() {
        let collabID = parseInt(document.getElementById('collabID').value);

        let collabStore = new CollaboratorsStore();
        collabStore.create(collabID, this.state.id);
    }
}


export default Editor;