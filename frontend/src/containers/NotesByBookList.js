import React, {Component} from 'react';
import Note from '../components/Note.js'
const API_BASE_URL = process.env.REACT_APP_API_BASEURL;

class NotesByBookList extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            bookID: props.id,
            notes: [],
            active: false,
            classes: "list"
        }

        this.showNote = (id) => {
            // console.log(id);
            this.props.onSelect(id, 'notes');
        }
    }
    
    componentDidMount() {
        fetch(API_BASE_URL + `/books/${this.state.bookID}/notes`)
        .then((response) => response.json())
        .then((result) => {
            this.setState({
                notes: result
            })
        })
    
    }

    render() {
        return (
            <div>
                {this.state.notes.map((note, index) => <Note key={index} 
                                                    id = {note.id}
                                                    title = {note.title}
                                                    onShow={this.showNote}/>
                )}            
            </div>
        )
    }
}

export default NotesByBookList;