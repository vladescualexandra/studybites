import React, {Component} from 'react';
import Note from '../components/Note.js'
import CODES from '../codes.json';
import NotesByBookStore from '../stores/NotesByBookStore.js';

class NotesByBookList extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            bookID: props.id,
            notes: [],
            active: false,
            classes: "list"
        }
        
        this.store = new NotesByBookStore();

        this.showNote = (id) => {
            this.props.onSelect(id, 'notes');
        }
    }
    
    componentDidMount() {
        this.store.getAll(this.state.bookID);
        this.store.emitter.addListener(CODES.CODE_GET_ALL_NOTES_BY_BOOKS, () => {
            this.setState({
                notes: this.store.notes
            })
        })
    }


    render() {
        return (
            <div className="listContainer">
                <span className="notesByBook">
                {this.state.notes.map((note, index) => <Note key={index} 
                                                    id = {note.id}
                                                    title = {note.title}
                                                    onShow={this.showNote}/>
                )} 
                </span>            
            </div>
        )
    }
}

export default NotesByBookList;