import React, { Component } from 'react';
import CODES from '../codes.json';
import NotesStore from '../stores/NotesStore';
import RemindersStore from '../stores/RemindersStore';
import SharedStore from '../stores/SharedStore';
import debounce from '../helpers';
import BooksStore from '../stores/BooksStore';
import CollaboratorsStore from '../stores/CollaboratorsStore';
import ReactQuill from 'react-quill';
import UserStore from '../stores/UserStore';

var modules = {
	toolbar: [
		[{ font: [] }, { size: [] }],
		[{ align: [] }, 'direction' ],
		[ 'bold', 'italic', 'underline', 'strike' ],
		[{ color: [] }, { background: [] }],
		[{ script: 'super' }, { script: 'sub' }],
		['blockquote', 'code-block' ],
		[{ list: 'ordered' }, { list: 'bullet'}, { indent: '-1' }, { indent: '+1' }],
		[ 'link', 'image', 'video' ],
		[ 'clean' ]
    ]
};


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
        this.formats = ["bold"];
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
                    this.store.emitter.addListener(CODES.CODE_GET_SHARED_BY_ID, 
                        async () => {
                            await this.setState({
                                id: this.props.id, 
                                type: this.props.type,
                                title: this.store.object.title, 
                                content: this.store.object.content
                            });
                        });

                    let collabsStore = new CollaboratorsStore();
                    collabsStore.getCollaboratorsBySharedId(this.props.id);    
                    collabsStore.emitter.addListener(CODES.CODE_GET_COLLABORATORS, 
                        async () => {
                            await this.setState({
                                collaborators: collabsStore.collaborators
                            })
                    });
                    this.getCollaborators();
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

    return(
      <div id="editor">

<div id="buttonsEditor" 
                    className={this.state.id ? "enabled" : "disabled"}>
                    <input  type="button" value="Delete" 
                            disabled={this.state.id ? false : true}
                            onClick={() => this.delete(this.state.id)}></input>
                    

                    <input type="button" value="Save" 
                            disabled={this.state.id ? false : true}
                            onClick={() => this.save(this.state.id)}></input>
                                
                </div>

                <select 
                        id="bookSelect"
                        className={this.state.id && this.state.type === 'notes' ? "enabled" : "disabled"}
                        onChange={(e) => this.handleSelectBook(e.target.value)}>
                        {this.createSelectItems()}
                    </select>

                <div id="collaborators" 
                    className={this.state.type === 'shared' ? "enabled" : "disabled"}>
                    <div>
                        {this.getCollaborators()}
                            <span id="addCollab">
                                <input id="collabID" type="text" placeholder="Add a new collaborator by id"></input>
                                <input 
                                    type="button" value="Add" 
                                    onClick={() => this.addCollaborator()}>
                                </input>
                            </span>
                    
                    </div>
                    
                </div>

        <input id="title"
          placeholder='Note title...'
          value={this.state.title ? this.state.title : ''}
          onChange={(e) => this.updateTitle(e.target.value)}
          >
        </input>
        
        <ReactQuill 
            id="content"
            value={this.state.content} 
            onChange={this.updateContent}
            modules={modules}
          >
        </ReactQuill>
      </div>
    );
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

    getCollaborators() {
        let items = [];

        for (let i=0; i<this.state.collaborators.length; i++) {
            items.push(<span id="collab" key={i}>
                {this.state.collaborators[i].name}
            <input type="button" value="x" onClick={() => this.deleteCollaborator(this.state.collaborators[i].id)}></input>
        </span>)
        }

        return items;
    }

    async addCollaborator() {
        let id = document.getElementById('collabID').value;
            let userStore = new UserStore();
            let user = await userStore.getUserById(id);
            document.getElementById('collabID').value = '';
            let collabStore = new CollaboratorsStore();
            collabStore.create(user.id, this.state.id);

            this.getCollaborators();       
    }

    deleteCollaborator(id) {
        let collabStore = new CollaboratorsStore();
        collabStore.delete(this.props.id, id);
    }
}


export default Editor;